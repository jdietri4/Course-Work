//pokemonTrainer.h Jacob Dietrich

#ifndef TRAINERH
#define TRAINERH
#include <allegro5/allegro.h>
#include <allegro5/allegro_image.h>
#include <allegro5/allegro_font.h>
#include <allegro5/allegro_ttf.h>
#include <iostream>

class trainer {
public:
	trainer();
	~trainer();
	int getX() { return x; }
	int getY() { return y; }
	int getHP();
	void removeHP() { hp--; }
	void initSprites(int width, int height);
	void updateSprites(int animationRow);
	void drawSprites();
	void setFacingDirection(int dir);
	int getFacingDirection();
private:
	int x;
	int y;
	int speed;
	int hp;
	int score;
	int dirX;
	int dirY;

	int maxFrame;
	int maxFrame2;
	int maxFrame3;
	int maxFrame4;
	int curFrame;
	int frameCount;
	int frameDelay;
	int frameWidth;
	int frameHeight;
	int animationColumns;
	int animationRows;
	int animationDirection;
	int animationRow;

	ALLEGRO_BITMAP* image;
};
#endif