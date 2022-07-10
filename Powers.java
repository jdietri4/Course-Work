import java.util.Scanner;


public class Powers {
	public static void main(String[] args) {
		int base = getPosInt();
		int exponent = getPosInt();
		System.out.println(powerTo(base,exponent));
	}

	public static int getPosInt() {
		System.out.println("Please enter a positive integer");
		Scanner sc = new Scanner(System.in);
		int number = sc.nextInt();

		if(number > 0) {
			return number;
		} else {
			System.out.println("Please enter a positive integer");
			return getPosInt();
		}
	}

	public static int powerTo(int base, int exponent) {
		if(exponent == 0) {
			return 1;
		} if((exponent % 2) == 0) {
			int split = powerTo(base, exponent/2);
			int finalCalc = split * split;
			return finalCalc;
		} else {
			int split = powerTo(base, exponent/2);
			return split*split*base;
		}
	}
}
