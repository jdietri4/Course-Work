// Complete.java
  
class Graph<Type> {
    // the matrix stores the edge information
    private int[][] matrix;
    // this stores the values being stored by this graph
    private Type[] values;
    // the size of the graph
    private int size;
    // set the graph as empty
    public Graph(int size) {
        matrix = new int[size][size];
        this.size = size;
        for(int i = 0; i < size; i++) {
            for(int j = 0; j < size; j++) {
                matrix[i][j] = 0;
            }
        }
        // make space for the values (and ignore the cast warning)
        @SuppressWarnings("unchecked")
        Type[] values = (Type[]) new Object[size];
        this.values = values;
    }
    // insert an edge, in both directions
    public void insertEdge(int from, int to, int cost) {
        matrix[from][to] = cost;
        matrix[to][from] = cost;
    }
    // remove an edge
    public void removeEdge(int from, int to) {
        matrix[from][to] = 0;
    }
    // return the cost of an edge or 0 for none
    public int getCost(int from, int to) {
        return matrix[from][to];
    }
    // add a node's data to the graph
    public void setValue(int node, Type value) {
        values[node] = value;
    }
    // return whether the graph is complete
    boolean complete() {
        for(int i = 0;i < size; i++) {
                for(int j = 0; j < size; j++) {
                        if(i != j && matrix[i][j] == 0) {
                                return false;
                        }
                }
        }
        return true;
    }
}


public class Complete {
    public static void main(String args[]) {
        Graph<Character> graph = new Graph<Character>(5);
        graph.setValue(0, 'A');
        graph.setValue(1, 'B');
        graph.setValue(2, 'C');
        graph.setValue(3, 'D');
        graph.setValue(4, 'E');
        graph.insertEdge(0, 1, 13);
        graph.insertEdge(0, 2, 29);
        graph.insertEdge(0, 3, 31);
        graph.insertEdge(0, 4, 48);
        graph.insertEdge(1, 2, 13);
        graph.insertEdge(1, 3, 23);
        graph.insertEdge(1, 4, 26);
        graph.insertEdge(2, 3, 24);
        graph.insertEdge(2, 4, 18);
        graph.insertEdge(3, 4, 14);
        // should print "Complete!"
        if (graph.complete()) {
            System.out.println("Complete!");
        } else {
            System.out.println("Not complete!");
        }
        // remove an edge and try it again
        graph.removeEdge(1, 2);
        // should print "Not complete!"
        if (graph.complete()) {
            System.out.println("Complete!");
        } else {
            System.out.println("Not complete!");
        }
    }
}