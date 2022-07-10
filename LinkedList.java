


public class LinkedList<Type> {

	// a Node of the list
	private class Node {
		public Type data;
		public Node next;
	}

	// The head of the list is first node
	private Node head;

	// The list starts empty
	public LinkedList() {
		head = null;
	}

	// Add an item to the list
	public void add(Type item) {
		Node newNode = new Node();
		newNode.data = item;
		newNode.next = head;
		head = newNode;
	}

	// Print the list from start to finish
	public void print() {
		
		Node current = head;
		
		while(current != null) {
			System.out.println(current.data);
			current = current.next;
		}
	}

	public int count() {

		Node temp = head;
		int count = 0;
		while(temp != null) {
			count++;
			temp = temp.next;
		}
		return count;

	}
}
