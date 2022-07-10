// Final_project_Jacob_Dietrich.cpp
#include <allegro5/allegro.h>
#include <allegro5/allegro_font.h>
#include <allegro5/allegro_ttf.h>
#include <allegro5/allegro_primitives.h>
#include <allegro5/allegro_native_dialog.h>
#include <allegro5/allegro_image.h>
#include <allegro5/allegro_audio.h>
#include <allegro5/allegro_acodec.h>
#include <string>
#include <sstream>
#include <iostream>
#include "pokeball.h"
#include "pikachu.h"
#include "pokemonTrainer.h"

int main(void)
{
	const int WIDTH = 1200;
	const int HEIGHT = 800;
	const int num_pikachus = 10;
	const int num_pokeballs = 5;
	enum KEYS { UP, DOWN, LEFT, RIGHT, SPACE };
	bool keys[5] = { false,false,false,false,false };

	//Primitive variables
	bool done = false;
	bool redraw = true;
	const int FPS = 60;

	//Allegro variables
	ALLEGRO_DISPLAY* display = NULL;
	ALLEGRO_EVENT_QUEUE* event_queue = NULL;
	ALLEGRO_TIMER* timer = NULL;
	ALLEGRO_BITMAP* titleScreen = NULL;
	ALLEGRO_BITMAP* background = NULL;
	ALLEGRO_BITMAP* endScreen = NULL;
	ALLEGRO_SAMPLE* sample = NULL;

	//Initialize Allegro
	if (!al_init()) {
		return -1;
	}
	//Initialize audio
	if (!al_install_audio()) {
		return -1;
	}
	if (!al_init_acodec_addon()) {
		return -1;
	}
	//Initialize primitives
	if (!al_init_primitives_addon()) {
		return -1;
	}
	//Initialize font
	if (!al_init_font_addon()) {
		return -1;
	}
	//Initialize ttf
	if (!al_init_ttf_addon()) {
		return -1;
	}
	//Reserve memory for audio samples
	if (!al_reserve_samples(3)) {
		return -1;
	}

	//Checks for creation of the timer
	timer = al_create_timer(1.0 / FPS);
	if (!timer) {
		return -1;
	}

	//Test display initialization
	display = al_create_display(WIDTH, HEIGHT);
	if (!display) {
		al_destroy_timer(timer);
		return -1;
	}

	//Allegro addons
	al_install_keyboard();
	al_init_image_addon();
	
	//Initializes background bitmaps and fonts
	ALLEGRO_FONT* font = al_load_ttf_font("Roboto-Black.ttf", 24, 0);
	ALLEGRO_FONT* font2 = al_load_ttf_font("Roboto-Black.ttf", 36, 0);
	ALLEGRO_FONT* font3 = al_load_ttf_font("Roboto-Black.ttf", 48, 0);
	titleScreen = al_load_bitmap("title_screen.png");
	background = al_load_bitmap("pokemon_background.png");
	endScreen = al_load_bitmap("end_screen.png");

	//Object variables
	trainer Trainer;
	Pokeball pokeballs[num_pokeballs];
	pikachu pikachus[num_pikachus];
	sample = al_load_sample("battle_loop.wav");

	if (!sample) {
		exit(9);
	}

	Trainer.initSprites(WIDTH, HEIGHT);

	//Initializes event queue and returns -1 if it fails
	event_queue = al_create_event_queue();
	if (!event_queue) {
		al_destroy_bitmap(background);
		al_destroy_display(display);
		al_destroy_timer(timer);
		return -1;
	}

	srand(time(NULL));

	//Registers all event based objects in the event queue
	al_register_event_source(event_queue, al_get_keyboard_event_source());
	al_register_event_source(event_queue, al_get_timer_event_source(timer));
	al_register_event_source(event_queue, al_get_display_event_source(display));

	//Draws title screen
	al_clear_to_color(al_map_rgb(0, 0, 0));
	al_flip_display();

	al_clear_to_color(al_map_rgb(255, 255, 255));
	al_draw_scaled_bitmap(titleScreen, 0, 0, 300, 161, 200, 150, 800, 350, 0);

	al_draw_text(font, al_map_rgb(0, 0, 0), 200, 550, ALLEGRO_ALIGN_LEFT, "The objective of this game is to defeat as many Pikachu as possible before you faint.");
	al_draw_text(font, al_map_rgb(0, 0, 0), 200, 600, ALLEGRO_ALIGN_LEFT, "You have 5 HP to do so.");
	al_draw_text(font, al_map_rgb(0, 0, 0), 200, 650, ALLEGRO_ALIGN_LEFT, "Use the arrow keys to move your character.");
	al_draw_text(font, al_map_rgb(0, 0, 0), 200, 700, ALLEGRO_ALIGN_LEFT, "If a Pikachu reaches the bottom of the screen, you will lose 1 HP.");

	al_flip_display();
	al_rest(15.0);
	al_start_timer(timer);
	al_play_sample(sample, 0.10, 0.0, 1.0, ALLEGRO_PLAYMODE_LOOP, NULL);
	while (!done) {
		ALLEGRO_EVENT ev;
		al_wait_for_event(event_queue, &ev);

		if (ev.type == ALLEGRO_EVENT_TIMER) {
			redraw = true;
			if (keys[LEFT]) {
				Trainer.setFacingDirection(2);
				Trainer.updateSprites(2);
			}
			if (keys[RIGHT]) {
				Trainer.setFacingDirection(3);
				Trainer.updateSprites(3);
			}
			if (keys[UP]) {
				Trainer.setFacingDirection(4);
				Trainer.updateSprites(4);
			}
			if (keys[DOWN]) {
				Trainer.setFacingDirection(1);
				Trainer.updateSprites(1);
			}

			//Calls these functions at every frame redraw
			for (int i = 0; i < num_pokeballs; i++) {
				pokeballs[i].updatePokeball(Trainer,WIDTH,HEIGHT);
			}
			for (int i = 0; i < num_pikachus; i++) {
				pikachus[i].startPikachu(WIDTH,HEIGHT);
			}
			for (int i = 0; i < num_pikachus; i++) {
				pikachus[i].updatePikachu();
			}
			for (int i = 0; i < num_pokeballs; i++) {
				pokeballs[i].collidePokeball(pikachus, num_pikachus);
			}
			for (int i = 0; i < num_pikachus; i++) {
				pikachus[i].collidePikachu(Trainer,HEIGHT);
			}
		}

		//Closes the display if user hits the X button
		else if (ev.type == ALLEGRO_EVENT_DISPLAY_CLOSE) {
			done = true;
		}

		//Registers when the user hits any valid button
		else if (ev.type == ALLEGRO_EVENT_KEY_DOWN) {
			switch (ev.keyboard.keycode) {
			case ALLEGRO_KEY_LEFT:
				keys[LEFT] = true;
				break;
			case ALLEGRO_KEY_RIGHT:
				keys[RIGHT] = true;
				break;
			case ALLEGRO_KEY_UP:
				keys[UP] = true;
				break;
			case ALLEGRO_KEY_DOWN:
				keys[DOWN] = true;
				break;
			case ALLEGRO_KEY_SPACE:
				keys[SPACE] = true;
				for (int i = 0; i < num_pokeballs; i++) {
					int x = Trainer.getX();
					int y = Trainer.getY();
					pokeballs[i].firePokeball(WIDTH, HEIGHT,x,y);
				}
				break;
			}
		}

		//Returns the key values to false when the keys aren't pressed anymore
		else if (ev.type == ALLEGRO_EVENT_KEY_UP) {
			switch (ev.keyboard.keycode) {
			case ALLEGRO_KEY_LEFT:
				keys[LEFT] = false;
				break;
			case ALLEGRO_KEY_RIGHT:
				keys[RIGHT] = false;
				break;
			case ALLEGRO_KEY_UP:
				keys[UP] = false;
				break;
			case ALLEGRO_KEY_DOWN:
				keys[DOWN] = false;
				break;
			case ALLEGRO_KEY_SPACE:
				keys[SPACE] = false;
				break;
			}
		}

		//Redraws the screen and checks for statuses if the event_queue is empty
		if (redraw && al_is_event_queue_empty(event_queue)) {
			redraw = false;

			al_clear_to_color(al_map_rgb(0, 0, 0));
			al_draw_scaled_bitmap(background, 0, 0, 637, 422, 0, 0, WIDTH, HEIGHT, 0);
			Trainer.drawSprites();
			for (int i = 0; i < num_pokeballs; i++) {
				pokeballs[i].drawPokeball();
			}
			for (int i = 0; i < num_pikachus; i++) {
				pikachus[i].drawPikachu();
			}
			if (Trainer.getHP() == 0) {
				al_stop_timer(timer);
				al_rest(5.0);
				done = true;
			}

			//Draws updated time
			int time = al_get_time();
			time = time - 15;
			std::stringstream ss;
			ss << time;
			std::string temp = ss.str();
			char* char_time = (char*)temp.c_str();
			al_draw_text(font2, al_map_rgb(0, 0, 0), 10, HEIGHT - 50, 0, "Time:");
			al_draw_text(font2, al_map_rgb(0, 0, 0), 120, HEIGHT - 50, 0, char_time);

			//Draws updated HP remaining
			al_draw_text(font2, al_map_rgb(0, 0, 255), 250, HEIGHT - 50, 0, "HP Remaining:");
			int hpTemp = Trainer.getHP();
			std::stringstream ss2;
			ss2 << hpTemp;
			std::string char_temp = ss2.str();
			char* char_hp = (char*)char_temp.c_str();
			al_draw_text(font2, al_map_rgb(0, 0, 255), 500, HEIGHT - 50, 0, char_hp);

			al_flip_display();
		}
	}

	//Displays end game statistics
	int time = al_get_time();
	time = time - 20;
	std::stringstream ss;
	ss << time;
	std::string temp = ss.str();
	char* char_time = (char*)temp.c_str();
	al_draw_scaled_bitmap(endScreen, 0, 0, 1200, 675, 0, 0, WIDTH, HEIGHT, 0);
	al_draw_text(font3, al_map_rgb(0, 0, 0), 400, 200, 0, "Final time:");
	al_draw_text(font3, al_map_rgb(0, 0, 0), 650, 200, 0, char_time);
	
	int hpTemp = Trainer.getHP();
	std::stringstream ss2;
	ss2 << hpTemp;
	std::string char_temp = ss2.str();
	char* char_hp = (char*)char_temp.c_str();
	al_draw_text(font3, al_map_rgb(0, 0, 0), 400, 300, 0, "HP Remaining:");
	al_draw_text(font3, al_map_rgb(0, 0, 0), 740, 300, 0, char_hp);

	al_flip_display();
	al_rest(20.0);
	al_destroy_event_queue(event_queue);
	al_destroy_timer(timer);
	al_destroy_display(display);
	al_destroy_sample(sample);
	system("Pause");
	return 0;
}