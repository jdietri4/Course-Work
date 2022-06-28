
class multiDimArrays {


	public static void main(String[] args) {

	int rows;
	int columns;
	int mult;

	if(args.length != 2) {  //Checks if the user passed correct number of parameters.
		System.out.println("ERROR: Invalid number of parameters");
		return;
	}
	
	rows = Integer.parseInt(args[0]);
	columns = Integer.parseInt(args[1]);

	rows++;
	columns++;

	int[][] array = new int[rows][columns];

	for(int i = 1;i<array.length;i++) { //Iterates through first dimension of array

		for(int j = 1;j<array[i].length;j++) { //Iterates through second dimension of array
			
			mult = i*j;
			array[i][j] = mult;
		}
	}

	for(int i = 1;i<array.length;i++) {

		for(int j = 1;j<array[i].length;j++) {

			System.out.print(array[i][j] + "\t");

			mult = i*j;

			if(j==columns-1) {
				System.out.print("\n");
			}
		}
	}
	}
}
