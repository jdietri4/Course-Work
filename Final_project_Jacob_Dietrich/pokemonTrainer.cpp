//pokemonTrainer.cpp Jacob Dietrich
#include <allegro5/allegro.h>
#include <allegro5/allegro_primitives.h>
#include <allegro5/allegro_image.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "pokemonTrainer.h"

//trainer constructor
trainer::trainer() {
	image = NULL;
	hp = 5;
}

//trainer deconstructor
trainer::~trainer() {
}

/*initSprites takes the width and height of the screen and initializes the trainer sprite with specific values
width - width of display
height - height of display
*/
void trainer::initSprites(int width, int height) {
	x = width / 2;
	y = height - 100;

	speed = 50;
	maxFrame = 2;
	maxFrame2 = 5;
	maxFrame3 = 8;
	maxFrame4 = 11;
	curFrame = 0;
	frameCount = 0;
	frameDelay = 5;
	frameWidth = 25;
	frameHeight = 40;
	animationColumns = 3;
	animationRow = 1;
	animationDirection = 1;
	
	image = al_load_bitmap("pokemon-sprite-sheet.bmp");
	al_convert_mask_to_alpha(image, al_map_rgb(255, 255, 255));
}

/*updateSprites takes in the animationRow to determine which region of the bitmap to draw
animationRow - 1 is down, 2 is left, 3 is right, 4 is up.
*/
void trainer::updateSprites(int animationRow) {
	if (++frameCount >= frameDelay) {
		if ((animationRow == 4) && (++curFrame > maxFrame4)) {
			curFrame = curFrame - 2;
			if ((y -= speed) < 30) {
				y = 30;
			}
		}
		else if ((animationRow == 4) && (curFrame < maxFrame4)) {
			curFrame += animationDirection;
			if ((y -= speed) < 30) {
				y = 30;
			}
		}
		else if ((animationRow == 3) && (++curFrame > maxFrame3)) {
			curFrame = curFrame - 2;
			if ((x += speed) > 1160) {
				x = 1170;
			}
		}
		else if ((animationRow == 3) && (curFrame < maxFrame3)) {
			curFrame += animationDirection;
			if ((x += speed) > 1160) {
				x = 1160;
			}
		}
		else if ((animationRow == 2) && (++curFrame > maxFrame2)) {
			curFrame = curFrame - 2;
			if ((x -= speed) < 30) {
				x = 30;
			}
		}
		else if ((animationRow == 2) && (curFrame < maxFrame2)) {
			curFrame += animationDirection;
			if ((x -= speed) < 30) {
				x = 30;
			}
		}
		else if ((animationRow == 1) && (++curFrame > maxFrame)) {
			curFrame = curFrame - 2;
			if ((y += speed) > 750) {
				y = 750;
			}
		}
		else if ((animationRow == 1) && (curFrame < maxFrame)) {
			curFrame += animationDirection;
			if ((y += speed) > 750) {
				y = 750;
			}
		}
		frameCount = 0;
	}
}

//drawSprites draws the trainer where it is moving to on the screen
void trainer::drawSprites() {
	int fx = (curFrame % animationColumns) * frameWidth;
	int fy = (curFrame / animationColumns) * frameHeight;
	al_draw_tinted_scaled_rotated_bitmap_region(image, fx, fy, frameWidth, frameHeight,al_map_rgba_f(1,1,1,1),frameWidth/2,frameHeight/2,x,y,3,3,0,0);
}

//getHP returns the hp that the player still has
int trainer::getHP() {
	return hp;
}

/*setFacingDirection sets the animation row to the integer passed
dir - 1, 2, 3, or 4, which represent the animation rows used in initSprites
*/
void trainer::setFacingDirection(int dir) {
	animationRow = dir;
}

//getFacingDirection gets the animation row that the trainer is currently using and returns it
int trainer::getFacingDirection() {
	return animationRow;
}