//pikachu.cpp Jacob Dietrich
#include <allegro5/allegro.h>
#include <allegro5/allegro_primitives.h>
#include <allegro5/allegro_image.h>
#include <allegro5/allegro_audio.h>
#include <allegro5/allegro_acodec.h>
#include "pikachu.h"

/*pikachu constructor initializes each pikachu on the screen with its own
 alive image, fainted image, live status, speed, boundx, and boundy
*/
pikachu::pikachu() {
	image = al_load_bitmap("pikachuAlive.png");
	image2 = al_load_bitmap("pikachuFaint.png");
	al_convert_mask_to_alpha(image2, al_map_rgb(255, 255, 255));
	live = false;
	speed = 3;
	boundx = al_get_bitmap_width(image);
	boundy = al_get_bitmap_height(image);
}

//pikachu deconstructor
pikachu::~pikachu() {
	al_destroy_bitmap(image);
	al_destroy_bitmap(image2);
}

//drawPikachu draws the pikachus at the coordinates given to them by the startPikachu and updatePikachu methods
void pikachu::drawPikachu() {
	if (live) {
		al_draw_bitmap(image, x, y, 0);
	}
	if (!live) {
		playCry();
		al_draw_bitmap(image2, x, y, 0);
	}
}

/*startPikachu determines where to start the pikachus on the top of the screen
 WIDTH - Display WIDTH
 HEIGHT - Display HEIGHT
*/
void pikachu::startPikachu(int WIDTH, int HEIGHT) {
	if (!live) {
		if (rand() % 500 == 0) {
			live = true;
			x = rand() % (WIDTH - boundx);
			y = 0;
		}
	}
}

//updatePikachu moves the y coordinate of each pikachu down the screen, regardless if they are alive or not
void pikachu::updatePikachu() {
	if (live) {
		y += speed;
	}
	if (!live) {
		y += speed;
	}
}

/*collidePikachu removes an HP if the pikachu reaches the bottom of the screen without being hit
 Trainer - The trainer instance that is deducted HP
 HEIGHT - Display height
*/
void pikachu::collidePikachu(trainer& Trainer,int HEIGHT) {
	if (live) {
		if (y > HEIGHT) {
			Trainer.removeHP();
			live = false;
		}
	}
}

//playCry plays the crying sound for when a Pikachu collides with a pokeball
void pikachu::playCry() {
	ALLEGRO_SAMPLE* sampleCry = al_load_sample("pikachu_cry.wav");
	al_play_sample(sampleCry, 25.0, 0.0, 0.2, ALLEGRO_PLAYMODE_ONCE, NULL);
}