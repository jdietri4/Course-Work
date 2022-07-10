
import java.io.File;
import java.util.Scanner;
import java.io.IOException;
import java.io.PrintWriter;

public class grayscaleConverter {

	public static void main(String args[]) throws ArrayIndexOutOfBoundsException,IOException {

		if(args.length < 1) { //checks if there is any input
			System.out.println("\nInvalid input");
			System.exit(1);
		}

		if(args[0].endsWith(".ppm")) { //Checks if the input's name ends in .ppm
			
			String filename = args[0];
			File infile = new File(filename);  
			Scanner sc = new Scanner(infile);
			
			File file = new File("grayscale.ppm");
			PrintWriter w = new PrintWriter(file);
			
			int width = 500; 
			int height = 500;
			int total;
			int red;
			int green;
			int blue;
			int maxPigment;
			
			sc.nextLine(); //Reads past the "P3"
			sc.nextInt(); //Reads past the first "500", as we can assume the dimensions.
			sc.nextInt(); //Reads past the second "500", as we can assume the dimensions.
			
			maxPigment = sc.nextInt(); //Reads past the maximum pigment number.
			
			w.println("P3");
			w.println(width + " " + height); //These three lines print the "header"
			w.println(maxPigment);
			
			int[][] array = new int[500][1500];

			for(int i = 0; i<array.length;i++) { //Reads in the .ppm file
				for(int j = 0; j<array[i].length;j++) {
					if(sc.hasNext()) {
						array[i][j] = sc.nextInt(); //Stores .ppm file into array
					}
				}
			}

			int count = 1; //keeps track of R,G,B
			
			for(int i = 0; i<array.length;i++) {
				for(int j = 0; j<array[i].length;j=j+3) { //iterates through the array in groups
				
					if(count == 1) { //passes if count is first of group of three 
						red = array[i][j];
					} else if(count == 2) { // passes if count is second of group of three
						green = array[i][j];
					} else if(count == 3) { // passes if count is third of group of three
						blue = array[i][j];
						count = 1;
					}

					count++;
					
					red = array[i][j]; //reads in red pigment
					green = array[i][j+1]; //reads in green pigment
					blue = array[i][j+2]; //reads in blue pigment

					total = red + green + blue;					
					total = total/3; //takes average of RGB
				
					red = total; 
					green = total;
					blue = total;

					w.print(red + " " + green + " " + blue + " ");
				}
			}
			
			w.close();

		}
	}
}
