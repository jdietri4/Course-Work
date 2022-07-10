import java.util.LinkedList;
import java.io.File;
import java.util.Scanner;
import java.io.IOException;
import java.util.Queue;
import java.util.ArrayDeque;

public class bankSimulation {
	public static void main(String[] args) throws IOException {
		if(args.length < 1) { //Checks if there is any input at all
			System.out.println("Please pass a file name to execute");
			System.exit(1);
		} else if(!args[0].endsWith(".txt")) { //Checks if input ends in .txt, closes if not.
			System.out.println("Incorrect file format");
			System.exit(1);
		} else if(args[0].endsWith(".txt")) { //Checks if input ends in .txt, proceeds if so.
			String filename = args[0];
			File f = new File(filename);
			if(!f.exists()) { //Checks for existence of file, exits if file is not found.
				System.out.println("File does not exist!");
				System.exit(1);
			} else if(f.exists()) { //Checks for existence of file
				String name = "";
				int arrivalTime;
				int stayTime = 0;
				int timeSpentAtCounter = 0;
				String ATOut;
				String STOut;
				customer c = null;
				double totalWaitTime = 0.0;
				double numberOfCustomers = 0.0;
				
				Scanner sc = new Scanner(f);
				Queue<customer> queue = new ArrayDeque<customer>(); 
				String inputString = sc.nextLine();
				String[] inputArray = inputString.split(" "); //Splits input information into array.
				String nameInput = inputArray[0]; //Enters customer's name in first cell.
				String ATInput = inputArray[1];   //Enters customer's time of arrival in second cell.
				String SDInput = inputArray[2];	  //Enters customer's stay duration in third cell.
				int arrivalTimeInput = Integer.parseInt(ATInput);
				int stayDurationInput = Integer.parseInt(SDInput);
				
				for(int i=900;i<=1800;i++) {
					//Keeps for loop counter equal to real time.	
					String time = Integer.toString(i);
					if(time.endsWith("60")) {
						i=i+40;
					}
					//Enters if-statement if the time equals the time when the customer entered bank.
					if(inputArray[1].equals(time)) {
						//create customer and enqueue
						queue.add(new customer(nameInput,arrivalTimeInput,stayDurationInput));
						System.out.println(nameInput+" got in line at " + time + ".");
						numberOfCustomers += 1;
						if(sc.hasNextLine()) { //Update information from file's next line.
							inputString = sc.nextLine();
							inputArray = inputString.split(" ");
							nameInput = inputArray[0];
							ATInput = inputArray[1];
							SDInput = inputArray[2];
							arrivalTimeInput = Integer.parseInt(ATInput);
							stayDurationInput = Integer.parseInt(SDInput);
						}
					}
					if(c != null) {
						//Prints output and resets customer currently at teller.
						if(timeSpentAtCounter == stayTime) {
							System.out.println(name+" is done at "+time+".");
							c = null;
							totalWaitTime = totalWaitTime + timeSpentAtCounter;
							timeSpentAtCounter = 0;
						}
						//Counts number of minutes customer has spent at teller.
						if(timeSpentAtCounter != stayTime) { 
							timeSpentAtCounter += 1;
						}
					}
					//If queue isn't empty and c is null, remove from queue.
					if(c==null && (queue.peek()!=null)) {
						c = queue.remove();
						name = c.getName();
						arrivalTime = c.getArrivalTime();
						stayTime = c.getStayDuration();
						ATOut = String.valueOf(arrivalTime);
						STOut = String.valueOf(stayTime);
					}
				}
				System.out.println("Average wait time is " + (totalWaitTime/numberOfCustomers) + " minutes");
			}
		}
	}
}
