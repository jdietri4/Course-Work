// DoubleList.java

class DoubleList<Type> {
    // a Node of the list
    private class Node {
        public Type data;
        public Node next;
        public Node prev;
    }

    // we store the head and tail
    private Node head;
    private Node tail;

    // the list starts empty
    public DoubleList() {
        head = null;
        tail = null;
    }

    // add a new value at the start
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

    // add a new value to the end
    public void addEnd(Type value) {
        Node newNode = new Node();
        newNode.data = value;
        newNode.prev = tail;
        newNode.next = null;

        // set node before to point to new node, or head
        if (tail != null) {
            tail.next = newNode;
        } else {
            head = newNode;
        }

        tail = newNode;
    }

    // print the list from start to finsih
    public void printForwards() {
        Node current = head;
        while (current != null) {
            System.out.println(current.data);
            current = current.next;
        }
    }

    // print the list from finish to start
    public void printBackwards() {
        Node current = tail;
        while (current != null) {
            System.out.println(current.data);
            current = current.prev;
        } 
    }

    // remove a node from the list by value
    public void remove(Type value) {
        Node current = head;
        while (current != null) {
            // if we found the node
            if (current.data == value) {

                if (current.prev != null) {
                    current.prev.next = current.next;
                } else {
                    head = current.next;
                }

                if (current.next != null) {
                    current.next.prev = current.prev;
                } else {
                    tail = current.prev;
                }

                break;
            }

            // move on to the next one
            current = current.next;
        }
    }

    public void removeFirst() {
	Node current = head;
	
	if(current.next != null) {
		current = current.next;
		current.prev.next = null;
		current.prev = null;
		head = current;
	} else {
		return;
	}
    }

    public void removeLast() {
	Node current = tail;

	if(current.prev != null) {
		current = current.prev;
		current.next.prev = null;
		current.next = null;
		tail = current;
	} else {
		return;
	}
    }

    public Type get(int index) {
	
	Node current = head;
	Type dataRet = null;
	int i = 0;
	if(current.next != null) {
		while(current.next.data!= null) {
			current = current.next;
			if(i == index) {
				dataRet = current.prev.data;
				return dataRet;
			}
			i++;
		}
	}
	return null;
    }

    public void clear() {
	head = null;
	tail = null;	
    }
}
