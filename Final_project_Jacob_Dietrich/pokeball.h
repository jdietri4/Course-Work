//pokeball.h Jacob Dietrich
#include "pikachu.h"

class Pokeball {
public:
	Pokeball();
	~Pokeball();
	void drawPokeball();
	void firePokeball(int width, int height,int x,int y);
	void updatePokeball(trainer pokemonTrainer, int WIDTH, int HEIGHT);
	void collidePokeball(pikachu pikachus[], int cSize);
private:
	int x;
	int y;
	int dir;
	bool live;
	int speed;
	ALLEGRO_BITMAP* image;
};