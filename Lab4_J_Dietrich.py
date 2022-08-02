import csv


def main():

    #Define in and out files
    infile = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab4_J_Dietrich\starbucks_us_locations.csv"
    outfile = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab4_J_Dietrich\j_dietrich_starbucks_count.csv"

    #open infile as a read only file
    indata = open(infile, 'r')

    #Assign variable names and types
    latIn = []
    lonIn = []
    name = []
    address = []
    state = []
    header = ""

    abbreviations = ['AK','AL','AR','AZ','CA','CO','CT','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA',
                     'MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA',
                     'RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY']
    countsOfLocations = []

    #Open infile, pull out header, then other columns
    with open(infile, 'r') as indata:

        header = indata.readline()

        #Loop through indata and parse information by splitting on " - " string
        for line in indata:

            lines = line.split(' - ')

            columnNum = 0
            #Iterate through list of the split up line and append state abbreviation to state list
            for item in lines:
                if columnNum == 0:
                    columnNum += 1
                elif columnNum == 1:
                    if(len(item) != 2):
                        continue
                    elif(len(item) == 2):
                        state.append(item)
                    columnNum += 1
                elif columnNum == 2:
                    columnNum = 0
        #Iterate through premade list of unique, alphabetical state abbreviations and compare
        for unique in abbreviations:
            count = 0
            #Iterate through list of states to count
            for line in state:
                if(line != unique):
                    #Need this if statement to ensure the list starts on a number other than zero
                    if(count != 0):
                        countsOfLocations.append(count)
                    unique = line
                    count = 1
                #If the input equals the current abbreviation, add 1 to the count
                elif(line == unique):
                    count += 1
            #Add the count to the list in same index of the abbreviation
            countsOfLocations.append(count)
            count = 0

    #Open outfile, write header, and write lists
    with open(outfile, 'w', newline='') as csv_writer:

        writer = csv.writer(csv_writer)
        headerOut = ['State Abbreviation','Number of Starbucks']
        writer.writerow(headerOut)

        column = zip(abbreviations,countsOfLocations)

        #loop through list and write the information into csv
        for row in column:
            writer.writerow(row)


if __name__ == '__main__':
    main()

