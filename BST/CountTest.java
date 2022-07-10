// CountTest.java

import java.util.Scanner;

public class CountTest {
    public static void main(String args[]) {
        BinarySearchTree<Integer> tree = new BinarySearchTree<Integer>();

        // build a BST from a set of numbers
        int nums [] = {32, 12, 44, 99, 76, 36, 9, 81, 65, 72};
        for (int i = 0; i < nums.length; i++) {
            tree.insert(nums[i]);
        }

        // print the count, should be 10
	System.out.println("The tree has " + tree.count() + " nodes.");
    }
}
