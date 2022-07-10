import java.util.LinkedList;
import java.io.File;
import java.util.Scanner;
import java.io.IOException;
import java.util.ArrayDeque;

public class customer {
	
	private String name;      //Name of customer.
	private int arrivalTime;  //Time of arrival.
	private int stayDuration; //Duration of stay.

	public customer() {	  //Constructs a blank customer.
		this.name = null;
		this.arrivalTime = 0;
		this.stayDuration = 0;
	}

	public customer(String name,int arrivalTime,int stayDuration) { //Constructs a customer object.
		this.name = name;
		this.arrivalTime = arrivalTime;
		this.stayDuration = stayDuration;
	}

	public String toString() {
		return this.name + " " + this.arrivalTime + " " + this.stayDuration; 
	}

	String getName() { return name; } 		//Returns customer's name.
	int getArrivalTime() { return arrivalTime; }	//Returns customer's time of arrival.
	int getStayDuration() { return stayDuration; }  //Returns customer's duration of stay.
}
