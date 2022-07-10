//Graph.java
import java.util.ArrayList;

class Graph<Type> {
    
    //The matrix stores the edge information
    private boolean[][] matrix;
    private ArrayList<Type> activeSet = new ArrayList<Type>();
    int k = 0;
    
    //This stores the values being stored by this graph
    private Type[] values;

    //The size of the graph
    private int size;

    //Set the graph as empty
    public Graph(int size) {
        matrix = new boolean[size][size];
        this.size = size;

        for(int i = 0;i < size; i++) {
            for(int j = 0;j < size; j++) {
                matrix[i][j] = false;
            }
        }
    

        //Make space for the values (and ignore the cast warning)
        @SuppressWarnings("unchecked")
        Type[] values = (Type[]) new Object[size];
        this.values = values;
    }

    //Add nodes to active set
    public void addToActiveSet(Type value) {
        activeSet.add(value);
    }

    //Print the active set
    public void printActiveSet() {
        for(Type str : activeSet) {
            System.out.println(str);
        }
    }
    
    //Lookup a node number by value
    public int lookup(Type value) {
        for(int i = 0;i < size;i++) {
            if(values[i] != null && values[i].equals(value)) {
                return i;
            }
        }
        return -1;
    }

    //Insert an edge by index
    public void insertEdge(int from, int to) {
        matrix[from][to] = true;
    }

    //Insert an edge by value
    public void insertEdge(Type from, Type to) {
        int fromIndex = lookup(from);
        int toIndex = lookup(to);
        insertEdge(fromIndex, toIndex);
    }

    //Remove an edge
    public void removeEdge(int from, int to) {
        matrix[from][to] = false;
    }

    //Return whether these are connected
    public boolean isEdge(int from, int to) {
        return matrix[from][to];
    }

    //Add a node's data to the graph
    public void setValue(int node, Type value) {
        values[node] = value;
    }

    //Return the size of the graph
    public int getSize() {
        return size;
    }

    //Get the value of a node
    public Type getValue(int index) {
        return values[index];
    }

    //Provides a topological sorting of the graph
    public void topologicalSort() {
        
        ArrayList<Type> ordering = new ArrayList<Type>();
        int i = 0;

        while(!activeSet.isEmpty()) {

            Type n = activeSet.get(i);
            ordering.add(activeSet.get(i));
            activeSet.remove(i);
            int v = lookup(getValue(lookup(n)));

            for(int j = 0;j < getSize();j++) {
                if(isEdge(v,j)) {
                    
                    removeEdge(v,j);
                    Type z = getValue(j);
                    int y = lookup(z);
                    int countingNonEdges = 0;

                    for(int q = 0;q < getSize();q++) {
                        if(!isEdge(q,y)) {
                            countingNonEdges++;
                        }
                        if(countingNonEdges == getSize()-1) {
                            if(!activeSet.contains(z)) {
                                addToActiveSet(z);
                            }
                        }
                    }
                }
            }
        }
        for(int b = 0;b < getSize();b++) {
            for(int c = 0;c < getSize();c++) {
                if(isEdge(b,c)) {
                    System.out.println("There is no topological ordering!");
                    System.exit(1);
                }
            }
        }
        for(Type typ : ordering) {
            System.out.println(typ);
        }
    }
}