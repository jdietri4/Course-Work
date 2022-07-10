// AllegroHello.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <allegro5/allegro.h>
#include <allegro5/allegro_font.h>
#include <allegro5/allegro_ttf.h>

int main()
{
    al_init();
    al_init_font_addon();
    al_init_ttf_addon();

    ALLEGRO_DISPLAY * display = al_create_display(640, 480);
    ALLEGRO_FONT* font = al_load_ttf_font("Roboto-Black.ttf", 64, 0);
    
    while (true) {
        al_clear_to_color(al_map_rgb(255, 255, 255));
        al_draw_text(font, al_map_rgb(0, 0, 0), 0, 0, 0, "Hello World!");
        al_flip_display();
    }

    al_destroy_display(display);
    al_destroy_font(font);
}

// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
