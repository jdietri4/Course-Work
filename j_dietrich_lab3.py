import csv


def main():

    #Define in and out files
    infile = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab3_J_Dietrich\elevationdata.txt"
    outfile = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab3_J_Dietrich\j_dietrich_elevationdata.csv"

    #open infile as a read only file
    indata = open(infile, 'r')

    #Assign variable names and types
    latdd = []
    longdd = []
    elevationm = []
    elevationf = []
    header = ""

    #Open infile, pull out header and append Elevation_ft to fourth column
    with open(infile, 'r') as indata:

        header = indata.readline()
        headerInfo = header.split(',')
        headerInfo.append("Elevation_ft")

        #Loop through indata and parse information by splitting on commas
        for line in indata:

            lines = line.split(',')

            #Cast all values to floats
            result = [float(num) for num in lines]

            count = 0

            #Loop through list of floats and depending on which column they are in, either sort it as latitude,
            #longitude, or elevation.
            for item in result:
                if count == 0:
                    latdd.append((result[0]))
                    count += 1
                elif count == 1:
                    longdd.append((result[1]))
                    count += 1
                else:
                    elevationm.append((result[2]))
                    item = (item * 3.2808399)   #Convert meters to feet and store in separate variable
                    elevationf.append(f'{item:g}')  #Add elevation_ft data to that list
                    count = 0

    #Open outfile, consolidate lists into one, and write header
    with open(outfile, 'w', newline='') as csv_writer:

        writer = csv.writer(csv_writer)
        writer.writerow(headerInfo)
        col = zip(latdd, longdd, elevationm, elevationf)

        #loop through consolidated list and write the information into csv
        for row in col:
            writer.writerow(row)

if __name__ == '__main__':
    main()
