


public class BigInt {

	public char array[];

	public BigInt() { //Constructs a BigInt with a value of 0
		this.array = new char[1];
		array[0] = '0';
	}

	public BigInt(int bI) { //Constructs a BigInt with a value equal to bI
		String stringInt = Integer.toString(bI);
		this.array = new char[stringInt.length()];
		for(int i=0;i<stringInt.length();i++) {
			this.array[i] = stringInt.charAt(i);
		}
	}

	public BigInt(String bI) { //Constructs a BigInt with a value equal to bI
		this.array = new char[bI.length()];
		for(int i=0;i<bI.length();i++) {
			this.array[i] = bI.charAt(i);
		}

	}
	
	public String toString() { //Converts a BigInt to a string value and returns it
		String ret = "";
		for(int i = 0;i<this.array.length;i++) {
			ret += this.array[i];
		}
		return ret;
	}

	public BigInt add(BigInt bI) { //Adds two BigInt objects together and returns sum

		String first = this.toString(); //String of this
		String second = bI.toString();  //String of bI
		String extra = "";		//String that keeps track of digits past the length of shorter int
		String leftOver = "";		//String that holds the substring leftover after split
		String finalTotal = "";		//Final value that enters into a BigInt
		String stringTotal = "";	//String of value after addition of a digit

		char a;
		char b;

		int total;				
		int firstInt;
		int secondInt;
		int firstLength = first.length();
		int secondLength = second.length();
		int carryOver = 0;			//Equals either 1 or 0 since two single digits cannot exceed 18

		if(firstLength >= secondLength) {
			
			int diff = firstLength - secondLength;
			if(diff > 0) { // Divides String into two parts to be processed if they are different lengths
				extra = first.substring(0,diff);
				leftOver = first.substring(diff+1,first.length()); //This works now.
			}
			for(int i = 0;i<=leftOver.length();i++) {  //THIS IS WHERE PROBLEM IS
				a = leftOver.charAt(i); 
				b = second.charAt(i);
				firstInt = Character.getNumericValue(a); 
				secondInt = Character.getNumericValue(b);

				total = firstInt + secondInt + carryOver; //Totals the digits in equal places
				if(total > 9) {
					carryOver = 1;
				} else {	
					carryOver = 0;
				}

				stringTotal = Integer.toString(total);		 //Converts totals to String
				finalTotal = stringTotal.charAt(1) + finalTotal; //Splits string and adds to final
			
			}
			finalTotal = extra + finalTotal; //Prepends extra digits to front  THIS IS WRONG

		} else if (secondLength > firstLength) {
			
			int diff = secondLength - firstLength;
			if(diff > 0) {
				extra = second.substring(0,diff);
				leftOver = second.substring(diff+1,second.length());
			}
			for(int i = leftOver.length();i>0;i--) {
				a = first.charAt(i);
				b = leftOver.charAt(i);

				firstInt = Character.getNumericValue(a);
				secondInt = Character.getNumericValue(b);

				total = firstInt + secondInt + carryOver;
				System.out.println(total);
				if(total > 9) {
					carryOver = 1;
				} else {
					carryOver = 0;
				}
				stringTotal = Integer.toString(total);
				finalTotal = stringTotal.charAt(1) + finalTotal;
			}	
			finalTotal = extra + finalTotal;
		}
		BigInt added = new BigInt(finalTotal);
		return added;

	}	

	public int compareTo(BigInt bI) { //Compares two BigInt objects and returns 1,0,or -1

		String first = this.toString();
		String second = bI.toString();

		int firstLength = first.length();
		int secondLength = second.length();
		
		if(firstLength < secondLength) {
			return (-1);
		} else if(firstLength > secondLength) {
			return (1);
		} else if(firstLength == secondLength) {
			for(int i = 0;i<firstLength;i++) {
				if(this.array[i] < second.charAt(i)) {
					return -1;
				} else if(this.array[i] > second.charAt(i)) {
					return 1;
				}
			}
		}
		return 0;
	}

}
