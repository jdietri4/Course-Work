import java.util.Scanner;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

public class playlistMain{

	public static void main(String[] args) throws ArrayIndexOutOfBoundsException,IOException {
		
		System.out.println("*** Playlist Manager! ***");
		System.out.println("Commands:\n"+"add\n"+"remove\n"+"count\n"+"play\n"+"shuffle\n"+"reverse\n"+"quit\n"+"save\n"+"load\n");
		

		DoubleList<Song> playlist = new DoubleList<Song>();
		Scanner in = new Scanner(System.in);

		String command = in.nextLine();

		if(command.equalsIgnoreCase("quit")) { //Checks for a quit entry before anything.
			System.exit(0);
		}
		
		while(!command.equalsIgnoreCase("quit")) { //Reiterates until user enters "quit".

			if(command.equalsIgnoreCase("add")) { //Handles the "add" command.
				if(playlist.head == null) {
					
					System.out.print("Enter artist: ");
					String artist = in.nextLine();
					System.out.print("Enter title: ");
					String title = in.nextLine();

					Song song = new Song(artist,title);
					playlist.addStart(song);
					System.out.println("");

					command = in.nextLine();
				} else if(playlist.head != null) {
					
					System.out.print("Enter artist: ");
					String artist = in.nextLine();
					System.out.print("Enter title: ");
					String title = in.nextLine();

					Song song = new Song(artist,title);
					playlist.addEnd(song);
					System.out.println("");

					command = in.nextLine();
				}

			} else if(command.equalsIgnoreCase("remove")) { //Handles the "remove" command.
				if(playlist.head == null) {
					System.out.println("Playlist empty, please enter another command.\n");
					command = in.nextLine();
				} else if(playlist.head != null) {
					
					System.out.print("Enter artist: ");
					String artist = in.nextLine();
					System.out.print("Enter title: ");
					String title = in.nextLine();
					
					Song song = new Song(artist,title);
					playlist.remove(song);

					command = in.nextLine();
				}
			} else if(command.equalsIgnoreCase("count")) { //Handles the "count" command.
				if(playlist.head == null) {
					System.out.println("0");
					command = in.nextLine();
					System.out.println("");
				} else if(playlist.head != null) {
					int count = playlist.count();
					System.out.println(count);
					System.out.println("");
					command = in.nextLine();
				}
			} else if(command.equalsIgnoreCase("play")) { //Handles the "play" command.
				if(playlist.head == null) {
					System.out.println("Playlist empty, please add a song to play.");
					command = in.nextLine();
					System.out.println("");
				} else if(playlist.head != null) {
					playlist.printForwards();
					command = in.nextLine();
					System.out.println("");
				}
			} else if(command.equalsIgnoreCase("shuffle")) { //Handles the "shuffle" command.
				if(playlist.head == null) {
					System.out.println("Playlist empty, please add at least two songs to shuffle.");
					command = in.nextLine();
					System.out.println("");
				} else if(playlist.head != null) {
					playlist = playlist.shuffle();
					command = in.nextLine();
					System.out.println("");
				}
			} else if(command.equalsIgnoreCase("reverse")) { //Handles the "reverse" command.
				if(playlist.head == null) {
					System.out.println("Playlist empty, please add at least two songs to reverse.");
					command = in.nextLine();
					System.out.println("");
				} else if(playlist.head != null) {
					playlist.reverse();
					command = in.nextLine();
					System.out.println("");
				}
			} else if(command.equalsIgnoreCase("save")) { //Handles the "save" command.
				File file = new File("savedPlaylist.txt");
				PrintWriter w = new PrintWriter(file);
				playlist.save(w);
				w.close();
				command = in.nextLine();
			} else if(command.equalsIgnoreCase("load")) { //Handles the "load" command.
				File inFile = new File("savedPlaylist.txt");
				Scanner scanner = new Scanner(inFile);
				
				//while(scanner.hasNext()) {
				//	Cannot write this until formatting is correct from "save" and printForwards().	
				//}
			} else { //Asks user for a new command if input is invalid.
				System.out.println("Input is not considered a Command.  Please enter a command.\nYour commands are:\nadd\nremove\ncount\nplay\nshuffle\nreverse\nquit\n");
				command = in.nextLine();
			}
		}
	}
}
