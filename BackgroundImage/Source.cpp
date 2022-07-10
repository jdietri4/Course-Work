
//Jacob Dietrich Lab 8

#include <allegro5\allegro.h>
#include <allegro5\allegro_image.h>

int main(int argc, char** argv) {

	const float FPS = 60;
	const int SCREEN_W = 900;
	const int SCREEN_H = 800;
	const int rocket_SIZE = 199;
	enum KEYS { UP, DOWN, LEFT, RIGHT, SPACE };
	bool keys[5] = { false,false,false,false,false };
	ALLEGRO_DISPLAY* display = NULL;
	ALLEGRO_EVENT_QUEUE* event_queue = NULL;
	ALLEGRO_TIMER* timer = NULL;

	float rocket_x = SCREEN_W / 2.0 - rocket_SIZE / 2.0;
	float rocket_y = SCREEN_H / 2.0 - rocket_SIZE / 2.0;
	float rocket_dx = -4.0, rocket_dy = 4.0;

	bool redraw = true;
	ALLEGRO_BITMAP* rocket = NULL;
	ALLEGRO_BITMAP* image2 = NULL;

	if (!al_init()) {
		return -1;
	}

	timer = al_create_timer(1.0 / FPS);
	if (!timer) {
		return -1;
	}

	display = al_create_display(SCREEN_W, SCREEN_H);
	if (!display) {
		al_destroy_timer(timer);
		return -1;
	}

	al_install_keyboard();
	al_init_image_addon();
	image2 = al_load_bitmap("space_background.png");
	rocket = al_load_bitmap("rocket.png");
	al_convert_mask_to_alpha(rocket, al_map_rgb(0, 0, 0));
	event_queue = al_create_event_queue();
	if (!event_queue) {
		al_destroy_bitmap(rocket);
		al_destroy_display(display);
		al_destroy_timer(timer);
		return -1;
	}

	al_register_event_source(event_queue, al_get_keyboard_event_source());

	al_register_event_source(event_queue, al_get_display_event_source(display));

	al_register_event_source(event_queue, al_get_timer_event_source(timer));

	al_set_target_bitmap(al_get_backbuffer(display));

	al_clear_to_color(al_map_rgb(0, 0, 0));

	al_flip_display();

	al_start_timer(timer);

	while (1)
	{
		ALLEGRO_EVENT ev;
		al_wait_for_event(event_queue, &ev);

		if (ev.type == ALLEGRO_EVENT_TIMER) {
			redraw = true;

			if (keys[UP]) {  //If UP key is pressed, go "up" until bitmap hits the boundary.
				if (rocket_y < 0 || rocket_y > SCREEN_H - rocket_SIZE) {
					al_draw_rotated_bitmap(rocket, rocket_SIZE/2, rocket_SIZE/2, rocket_SIZE/2, rocket_SIZE+64, 3.14, 0);
					rocket_dy = -rocket_dy;
				}
				rocket_y -= rocket_dy;
			}
			if (keys[DOWN]) {  //If DOWN key is pressed, go "down" until bitmap hits the boundary.
				if (rocket_y < 0 || rocket_y > SCREEN_H - rocket_SIZE) {
					rocket_dy = -rocket_dy;
				}
				rocket_y += rocket_dy;
			}
			if (keys[LEFT]) {  //If LEFT key is pressed, go "left" until bitmap hits the boundary.
				if (rocket_x < 0 || rocket_x > SCREEN_W - rocket_SIZE) {
					rocket_dx = -rocket_dx;
				}
				rocket_x += rocket_dx;
			}
			if (keys[RIGHT]) {  //If RIGHT key is pressed, go "right" until bitmap hits the boundary.
				if (rocket_x < 0 || rocket_x > SCREEN_W - rocket_SIZE) {
					rocket_dx = -rocket_dx;
				}
				rocket_x -= rocket_dx;
			}
			if (keys[SPACE]) { //If SPACE key is pressed, pause movement until another valid key is pressed.
				keys[UP] = false;
				keys[DOWN] = false;
				keys[LEFT] = false;
				keys[RIGHT] = false;
				keys[SPACE] = false;
			}
		}
		else if (ev.type == ALLEGRO_EVENT_DISPLAY_CLOSE) {
			break;
		}
		else if (ev.type == ALLEGRO_EVENT_KEY_DOWN) {  //Switch statement for each valid keystroke.
			switch (ev.keyboard.keycode) {
			case ALLEGRO_KEY_UP:
				keys[UP] = true;
				break;
			case ALLEGRO_KEY_DOWN:
				keys[DOWN] = true;
				break;
			case ALLEGRO_KEY_LEFT:
				keys[LEFT] = true;
				break;
			case ALLEGRO_KEY_RIGHT:
				keys[RIGHT] = true;
				break;
			case ALLEGRO_KEY_SPACE:
				keys[SPACE] = true;
				break;
			}
		}

		if (redraw && al_is_event_queue_empty(event_queue)) {
			redraw = false;
			al_clear_to_color(al_map_rgb(0, 0, 0));
			al_draw_scaled_bitmap(image2, 0, 0, 512, 341, 0, 0, 900, 800, 0); //Scales the background to the correct size
			al_draw_bitmap(rocket, rocket_x, rocket_y, 0); //Draws the rocket
			al_flip_display();
		}
	}
	
	al_destroy_bitmap(rocket);
	al_destroy_bitmap(image2);
	al_destroy_timer(timer);
	al_destroy_display(display);
	al_destroy_event_queue(event_queue);
	system("pause");
	return 0;
}