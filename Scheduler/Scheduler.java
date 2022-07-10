import java.util.Scanner;
import java.io.File;
import java.io.IOException;

public class Scheduler {
    public static void main(String[] args) throws IOException {
        
        if(args.length<1) { //Checks if there is any input at all
            
            System.out.println("Please pass a file name to execute");
            System.exit(1);

        } else if(!args[0].endsWith(".txt")) { //Checks if input ends in .txt, closes if not
            
            System.out.println("Incorrect file format");
            System.exit(1);

        } else if(args[0].endsWith(".txt")) { //Checks if input ends in .txt, proceeds if so
            
            String filename = args[0];
            File f = new File(filename);
            
            if(!f.exists()) { //Checks for existence of file, exits if file is not found
                
                System.out.println("File does not exist!");
                System.exit(1);
            
            } else if(f.exists()) { //Checks for existence of file
                
                Scanner sc = new Scanner(f);
                String inputString;
                int i = 0;
                int activeSetSearch;

                int inputInt = sc.nextInt();
                sc.nextLine();
                Graph<String> graph = new Graph<String>(inputInt+1);

                while(sc.hasNext()) { //Adds nodes to graph

                    inputString = sc.nextLine();
                    String[] splitString;

                    splitString = inputString.split(" ");
                    String nodeName = splitString[0];
                    activeSetSearch = Integer.valueOf(splitString[1]);
                    graph.setValue(i, nodeName);

                    if(activeSetSearch==0) {
                        String val = graph.getValue(i);
                        graph.addToActiveSet(val);
                    }

                    i++;

                }

                sc.close();
                Scanner scan = new Scanner(f); //Opens fresh scanner for second iteration
                int j;
                inputInt = scan.nextInt();
                scan.nextLine();

                while(scan.hasNext()) { //Adds edges to graph
                    
                    inputString = scan.nextLine();
                    String[] splitString;

                    splitString = inputString.split(" ");
                    j = Integer.valueOf(splitString[1]);

                    if(splitString.length>2) { //Only goes through this loop if there are edges to create 
                        for(j=2;j<splitString.length;j++) {
                            
                            int fromNumber = graph.lookup(splitString[j]);
                            int toNumber = graph.lookup(splitString[0]);
                            graph.insertEdge(fromNumber,toNumber);
                        
                        }
                    }
                }
                scan.close();  
                graph.topologicalSort();
            }
        }
    }
}