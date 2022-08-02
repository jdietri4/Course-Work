import arcpy
import os


def main():

    # Set overwrite to true
    arcpy.env.overwriteOutput = True

    #User input
    inputGDB = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab9_J_Dietrich\Lab9_data (1)\Lab9_data\Lab9_J_Dietrich.gdb"
    outGDBLocation = os.path.dirname(inputGDB)
    outGDBName = "Lab9_J_Dietrich2.gdb"

    #Create a new GDB
    arcpy.CreateFileGDB_management(outGDBLocation, outGDBName)

    #Set workspace
    arcpy.env.workspace = inputGDB

    #List feature classes and copy them to new GDB
    listSHP = arcpy.ListFeatureClasses()

    outGDB2 = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab9_J_Dietrich\Lab9_data (1)\Lab9_data\Lab9_J_Dietrich2.gdb"
    outGDBLocation2 = os.path.dirname(outGDB2)

    for fc in listSHP:
        arcpy.FeatureClassToFeatureClass_conversion(fc, os.path.join(outGDBLocation2, outGDBName), fc)

    #CSV input
    crimeCSV = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab9_J_Dietrich\Lab9_data (1)\Lab9_data\FburgCrimeReportXY.csv"

    #Convert latitude and longitude to points
    GCS = arcpy.SpatialReference(4152)
    arcpy.management.XYTableToPoint(crimeCSV, "crimes", "POINT_X", "POINT_Y", "", GCS)

    #Set inputs for summarizewithin
    inPolys = 'PoliceBeats'
    inSumFeatures = 'crimes'
    outFeatureClass = 'crimes_sum'

    #Run summarizewithin and set to variable for analysis
    sf = arcpy.SummarizeWithin_analysis(inPolys, inSumFeatures, outFeatureClass)

    #Set search cursor on the summarizewithin shapefile
    TheRows = arcpy.SearchCursor(sf)

    #Find the two columns within the search cursor and print the values
    for row in TheRows:
        pb = row.getValue("ALPHA")
        counts = row.getValue("Point_Count")
        print(f"Police Beat zone {pb} has a crime count of {counts}")

    #Set inputs for summarizewithin for the addresses
    inSumFeatures2 = 'SiteAddresses'
    outFeatureClass2 = 'addresses_sum'

    #Run summarizewithin and set to variable for analysis
    sf = arcpy.SummarizeWithin_analysis(inPolys, inSumFeatures2, outFeatureClass2)

    #Set search curosr on the summarize within shapefile
    TheRows = arcpy.SearchCursor(sf)

    #Find the two columns within the search cursor and print the values
    for row in TheRows:
        pb = row.getValue("ALPHA")
        counts = row.getValue("Point_Count")
        print(f"Police Beat zone {pb} has an address count of {counts}")


main()

