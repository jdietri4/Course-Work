import java.util.Scanner;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

public class SpellCheck {
        public static void main(String[] args) throws IOException {
                if(args.length < 1) {  //Checks if there is any dictionary input
                        System.out.println("\nInvalid Input");
                        System.exit(1);
                }
				
                if(args[0].equals("words.txt")) { //Checks if the input's name equals words.txt
                        String filename = args[0];
                        File dictionaryFile = new File(filename);
                        Scanner sc = new Scanner(dictionaryFile);
                        Scanner scIn = new Scanner(System.in);
                        String input;
                        BinarySearchTree<String> BST = new BinarySearchTree<String>();
                        while(sc.hasNext()) {
                                String line = sc.nextLine();
                                BST.insert(line);
                        }
                        System.out.println("Loaded the words into a tree with height = " + BST.getHeight());
                        input = scIn.nextLine();
                        while(!input.equalsIgnoreCase("end")) {
                                if(input.contains(" ")) {
                                        String[] words = input.split("\\si+");
                                        for(int i = 0;i < words.length; i++) {
                                                if(BST.search(words[i]) == null) {
                                                        System.out.println(words[i] + " is spelled wrong!");
                                                }
                                        }
                                } else if(input.equalsIgnoreCase("end")) {
                                        System.exit(1);
                                } else {
                                        if(BST.search(input) == null) {
                                                System.out.println(input + " is spelled wrong!");
                                        }
                                }
                                input = scIn.nextLine();
                        }
                }
        }
}