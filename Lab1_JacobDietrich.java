
import java.util.Scanner;

public class Average {

	public static void main(String args[]) {

	int x;
	int elements;
	double input;
	double total = 0;
	double average;

	Scanner scanner = new Scanner(System.in);

	System.out.print("\nEnter number of elements: ");
	elements = scanner.nextInt();
	double[] array = new double[elements];

	for(x=0;x<elements;x++) {
		
		System.out.print("\nEnter value: ");
		input = scanner.nextInt();
		array[x] = input;
	
	} for(x=0;x<elements;x++) {
			
		input = array[x];
		total = total + input;

	}

	average = total/elements;
	System.out.println("Average is " + average);
	}
}


