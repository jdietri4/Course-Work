import arcpy


def main():

    #Request user input and split the input on backslash
    print("Enter full pathname to the GDB")
    inputGDB = input()
    gdbName = inputGDB.split('\\')
    gdbName = gdbName[-1]

    #Check for the existence of the GDB
    if not arcpy.Exists(inputGDB):
        print("Invalid GDB pathname.")
        exit()

    #Set workspace to input GDB
    arcpy.env.workspace = inputGDB

    #Pull feature classes into list, find the length of the list, and cast to string
    featureClasses = arcpy.ListFeatureClasses()
    print(featureClasses)
    fcLen = len(featureClasses)
    fcLen = str(fcLen)

    #Pull rasters into list, find the length of the list, and cast to string
    rasters = arcpy.ListRasters()
    rLen = len(rasters)
    rLen = str(rLen)

    #Pull tables into list, find the length of the list, and cast to string
    tables = arcpy.ListTables()
    tLen = len(tables)
    tLen = str(tLen)

    #Set delimiter for multiple uses
    delimiter = "==================================================\n" \
                "=================================================="

    #Start printing out results
    print(delimiter)
    print("File Geodatabase Name: " + gdbName)
    print("File Geodatabase Directory: " + inputGDB)
    print("Number of Feature Classes: " + fcLen)
    print("Number of Tables: " + tLen)
    print("Number of Rasters: " + rLen)
    print(delimiter)

    #Print formatted results from the tables
    print("Tables:", end='\n')
    for t in tables:
        print('\t' + t)

    #Print formatted results from the rasters
    print("Rasters:", end='\n')
    for r in rasters:
        print('\t' + r)

    #Print formatted results from the feature classes
    print("FeatureClasses:")
    for fc in featureClasses:

        print('\t' + fc) #Print a tab and the feature class name

        fieldNames = [f.name for f in arcpy.ListFields(fc)] #List name for each field
        fieldTypes = [f.type for f in arcpy.ListFields(fc)] #List type for each field
        mergedList = [(fieldNames[i], fieldTypes[i]) for i in range(0, len(fieldNames))] #Merge lists of names and types

        #Iterate times equal to the length of the merged list
        for i in range(len(mergedList)):
            print(f'\t\t{fieldNames[i]} ({fieldTypes[i]})') #Print formatted tuple


if __name__ == '__main__':
    main()

