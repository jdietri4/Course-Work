import java.util.Random;
import java.io.File;
import java.io.PrintWriter;
import java.io.IOException;

class DoubleList<Type> {
	// a Node of the list
	private class Node {
		public Type data;
		public Node next;
		public Node prev;
	}

	//we store the head and tail
	Node head;
	Node tail;

	//the list starts empty
	public DoubleList() {
		head = null;
		tail = null;
	}

	//add a new value at the start
	public void addStart(Type value) {
		Node newNode = new Node();
		newNode.data = value;
		newNode.next = head;
		newNode.prev = null;

		if (head != null) {
			head.prev = newNode;
		} else {
			tail = newNode;
		}

		head = newNode;
	}

	//add a new value to the end
	public void addEnd(Type value) {
		Node newNode = new Node();
		newNode.data = value;
		newNode.prev = tail;
		newNode.next = null;
		
		//set node before to point to new node, or head
		if(tail != null) {
			tail.next = newNode;
		} else {
			head = newNode;
		}

		tail = newNode;
	}

	//print the list from start to finish
	public void printForwards() {
		Node current = head;
		while(current != null) {
			System.out.println(current.data);
			current = current.next;
		}
		current = head;
		System.out.println("");
	}

	//remove a node from the list by value
	public void remove(Type value) { //This does not work because value does not match current.data
		Node current = head;
		while(current!=null) {
			//if we found the node
			if(current.data.equals(value)) {
				if(current.prev != null) {
					current.prev.next = current.next;
				} else {
					head = current.next;
				}

				if(current.next != null) {
					current.next.prev = current.prev;
				} else {
					tail = current.prev;
				}

				break;
			}

			//move on to the next one
			current = current.next;
		}
		System.out.println("");
		current = head;
	}

	public int count() { //Counts the number of nodes in the list and returns the result.
		
		Node temp = head;
		int count = 0;
		while(temp != null) {
			count++;
			temp = temp.next;
		}
		return count;
	}

	public void reverse() { //Reverses the order of the playlist
		
		Node temp = null;
		Node current = head;

		while(current != null) {
			temp = current.prev;
			current.prev = current.next;
			current.next = temp;
			current = current.prev;
		}

		if(temp != null) {
			head = temp.prev;
		}
	}

	public DoubleList<Song> shuffle() { //Shuffles the order of the playlist to be pseudo-random

		int rando;
		Object temp;
		Node current = this.head;
		Random randomGenerator = new Random();
		Object array[] = new Object[this.count()];

		for(int i=0;i<this.count();i++) { //moves list into array
			array[i] = current.data;
		}

		for(int i = 0;i<array.length; i++) { //shuffles array  This does not work. Random generates 1 0 0 on 3 entries.
			rando = randomGenerator.nextInt(array.length);
			temp = array[rando];
			array[rando] = array[i];
			array[i] = temp;
		}

		DoubleList<Song> newPlaylist = new DoubleList<Song>();

		for(int i = 0;i<array.length; i++) { //adding info from array into a new linked list
			
			Object tempSong = array[i];
			Song songTemp = new Song();
			songTemp = (Song)tempSong; //Casting may not work, double check.
			newPlaylist.addStart(songTemp);	
		}
		return newPlaylist;
	}

	public void save(PrintWriter w) throws IOException { //Takes a PrintWriter object and prints the Songs to a file
		Node current = head;
		while(current != null) {
			w.println(current.data);
			current = current.next;
		}
		current = head;
		System.out.println("");
	}
}
