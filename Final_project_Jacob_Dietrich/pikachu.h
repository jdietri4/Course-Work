//pikachu.h Jacob Dietrich
#ifndef PIKACHUH
#define PIKACHUH
#include "pokemonTrainer.h"

class pikachu {
public:
	pikachu();
	~pikachu();
	void drawPikachu();
	void startPikachu(int WIDTH, int HEIGHT);
	void updatePikachu();
	void collidePikachu(trainer& Trainer,int HEIGHT);
	int getBoundX() { return boundx; }
	int getBoundY() { return boundy; }
	int getX() { return x; }
	int getY() { return y; }
	bool getLive() { return live; }
	void setLive(bool l) { live = l; }
	void playCry();
private:
	int x;
	int y;
	bool live;
	int speed;
	int boundx;
	int boundy;
	ALLEGRO_BITMAP* image;
	ALLEGRO_BITMAP* image2;
};
#endif