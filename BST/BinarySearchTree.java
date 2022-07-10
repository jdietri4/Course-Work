// BinarySearchTree.java

public class BinarySearchTree<Type extends Comparable<Type>> {
    // a class for one node of the tree
    private class Node {
        public Type data;
        public Node left;
        public Node right;

        // initialize the node with the given value
        public Node(Type data) {
            this.data = data;
            left = null;
            right = null;
        }
    };

    // reference to the root node of the tree
    private Node root;

    // recursive function to insert at a particular node
    private Node insertAt(Type value, Node node) {
        // if this part of the tree is empty, return a new node
        if (node == null) {
            return new Node(value);
        }

        // otherwise, insert into the appropriate side recursively
        if (node.data.compareTo(value) < 0) {
            node.right = insertAt(value, node.right);
        } else {
            node.left = insertAt(value, node.left);
        }

        return node;
    }

    // recursive function to search starting at a particular node it
    private Node searchAt(Type target, Node node) {
        if (node == null) {
            return null;
        } else if (node.data.equals(target)) {
            return node;
        } else if (node.data.compareTo(target) < 0) {
            return searchAt(target, node.right);
        } else {
            return searchAt(target, node.left);
        }
    }

    // find smallest node in a tree
    private Node min(Node node) {
        // if the tree is empty there is no smallest node
        if (node == null) {
            return null;
        }

        // if there are none to the left, return this one
        else if (node.left == null) {
            return node;
        }

        // if there are some to the left, smallest is there
        else {
            return min(node.left);
        }
    }

    // remove a particular node
    public Node removeAt(Type value, Node node) {
        // if the subtree is empty, return null (item not found)
        if (node == null) {
            return node;
        }

        // if the node isn't equal, recurse to search for it
        if (value.compareTo(node.data) < 0) {
            node.left = removeAt(value, node.left);
        } else if (value.compareTo(node.data) > 0) {
            node.right = removeAt(value, node.right);
        } else {
            // in this case, the node is equal in value, so remove it

            // if one subtree, is empty, just return the other one, skipping over this node
            if (node.left == null) {
                return node.right;
            } else if (node.right == null) {
                return node.left;
            }

            // in this case, there are two children, so find the smallest node to the right
            Node least = min(node.right);

            // put it's data into this node
            node.data = least.data;

            // now recursively remove that least node
            node.right = removeAt(least.data, node.right);
        }

        return node;
    }

    // an in-order tree traversal
    private void inorderPrint(Node node) {
        if (node != null) {
            inorderPrint(node.left);
            System.out.println(node.data);
            inorderPrint(node.right);
        }
    }

    // set the whole tree to null
    public BinarySearchTree() {
        root = null;
    }

    // insert a number calls recursive function to insert at the root
    public void insert(Type value) {
        root = insertAt(value, root);
    }

    // search for a value starting at the root
    public Type search(Type target) {
        Node node = searchAt(target, root);
        if (node == null) {
            return null;
        } else {
            return node.data;
        }
    }

    // remove a particular data item from the tree
    public void remove(Type value) {
        root = removeAt(value, root);
    }

    // print the nodes inorder
    public void print() {
        inorderPrint(root);
    }

    public int count(Node node) {
    	int number = 1;
	if(node == null) {
		return 0;
	}
	if(node.left != null) {
		number = number + count(node.left);
	} 
	if(node.right != null) {
		number = number + count(node.right);

	} else if(node.left == null && node.right == null) {
		return 1;
	}
	return number;
    }

    public int count() {
	return count(root);	
    }
}
