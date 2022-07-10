//pokeball.cpp Jacob Dietrich
#include <allegro5/allegro.h>
#include <allegro5/allegro_primitives.h>
#include <allegro5/allegro_image.h>
#include <allegro5/allegro_audio.h>
#include <allegro5/allegro_acodec.h>
#include <allegro5/allegro_audio.h>
#include <allegro5/allegro_acodec.h>
#include <iostream>
#include "pokeball.h"
#include "math.h"

//Pokeball constructor. Initializes the speed, "live" status, and bitmap of each pokeball
Pokeball::Pokeball() {
	speed = 15;
	live = false;
	image = al_load_bitmap("pokeball.png");
}

//Pokeball deconstructor
Pokeball::~Pokeball() {
	al_destroy_bitmap(image);
}

//drawPokeball draws the pokeball bitmap at the x and y values that are attached to that image
void Pokeball::drawPokeball() {
	if (live) {
		al_draw_bitmap(image, x, y, 0);
	}
}

/*firePokeball takes the pokemonTrainer's width, height, and x and y coordinates to direct where to draw the pokeball
 WIDTH - Display width
 HEIGHT - Display height
 a - X coordinate where the Trainer is
 b - Y coordinate where the Trainer is
*/
void Pokeball::firePokeball(int WIDTH, int HEIGHT,int a, int b) {
	if (!live) {
		x = a;
		y = b;
		live = true;
	}
}

/*updatePokeball takes the screen's WIDTH and HEIGHT passed to it to update it's position on the display
 pokemonTrainer - Trainer object
 WIDTH - Display width
 HEIGHT - Display height
*/
void Pokeball::updatePokeball(trainer pokemonTrainer, int WIDTH, int HEIGHT) {
	if (live) {
		int direction = pokemonTrainer.getFacingDirection();

		if (direction == 1) {
			y += speed;
		}
		if (direction == 2) {
			x -= speed;
		}
		if (direction == 3) {
			x += speed;
		}
		if (direction == 4) {
			y -= speed;
		}

		if (y < 0 || y > HEIGHT) {
			live = false;
		}
		if (x < 0 || x > WIDTH) {
			live = false;
		}
	}
}

/*collidePokeball takes the array of pikachus and the size of the pikachu array and determines whether any are colliding with pokeballs.
 pikachus[] - Array of pikachu images
 size - number of pikachus
*/
void Pokeball::collidePokeball(pikachu pikachus[], int size) {
	if (live) {
		for (int i = 0; i < size; i++) {
			if (pikachus[i].getLive()) {
				if (x > (pikachus[i].getX() - pikachus[i].getBoundX()) &&
					x < (pikachus[i].getX() + pikachus[i].getBoundX()) &&
					y >(pikachus[i].getY() - pikachus[i].getBoundY()) &&
					y < (pikachus[i].getY() + pikachus[i].getBoundY()))
				{
					ALLEGRO_SAMPLE* sampleCry = al_load_sample("pikachu_cry.wav");
					al_play_sample(sampleCry, 25.0, 0.0, 0.2, ALLEGRO_PLAYMODE_ONCE, NULL);
					live = false;
					pikachus[i].setLive(false);
				}
			}
		}
	}
}