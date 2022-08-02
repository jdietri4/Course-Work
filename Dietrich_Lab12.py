import os
import shutil
import arcpy
import sys
from csv import reader
from time import strftime

arcpy.AddMessage("Start script: Dietrich_Lab12 " + strftime("%Y-%m-%d %H:%M:%S"))

def main():

    arcpy.env.overwriteOutput = True

    #User Inputs
    #Input parameter specifying the location of the text file to read
    inputFile = arcpy.GetParameterAsText(0)

    #Input spatial reference parameter that will be used when creating the new FC
    inputSpatialReference = arcpy.GetParameterAsText(1)
    #inputSpatialReference = arcpy.SpatialReference(inputSpatialReference)

    #Existing file GDB that the FC will be created within
    existingFileGDB = arcpy.GetParameterAsText(2)

    #String parameter name specifying the new FC that it will create (within a file GDB)
    newFC = arcpy.GetParameterAsText(3)

    #Output GDB
    outGDBPath = os.path.dirname(existingFileGDB)
    outGDBName = f"Dietrich_Lab12_newGDB"
    outGDB = arcpy.CreateFileGDB_management(outGDBPath, outGDBName)
    if outGDB:
        arcpy.AddMessage(f"\tNew GDB created Successfully")
    arcpy.env.workspace = str(outGDB)

    #Create Feature Class
    #spatial_reference = arcpy.SpatialReference(inputSpatialReference)
    fc = arcpy.CreateFeatureclass_management(outGDBPath, newFC, geometry_type="POINT", spatial_reference=inputSpatialReference)
    if fc:
        arcpy.AddMessage(f"\tNew FC created successfully")

    #Add Fields to new Feature Class
    arcpy.AddMessage(f"\tAdding fields...")
    arcpy.AddField_management(fc, "SCHOOLNAME", "TEXT", 50)
    arcpy.AddField_management(fc, "ADDRESS", "TEXT", 35)
    arcpy.AddField_management(fc, "CITY", "TEXT", 17)
    arcpy.AddField_management(fc, "STATE", "TEXT", 2)
    arcpy.AddMessage(f"\tFields added successfully")

    #Declare fields and point geometries for cursors
    arcpy.AddMessage(f"\tDeclaring fields and instantiating cursors...")
    fields = ['SCHOOLNAME', 'ADDRESS', 'CITY', 'STATE']
    #pointGeometries = ['LATITUDE', 'LONGITUDE']
    cursor = arcpy.da.InsertCursor(fc, fields)
    #pointCursor = arcpy.da.InsertCursor(fc, pointGeometries)
    arcpy.AddMessage(f"\tFields and cursors declared and instantiated successfully")

    #Iterate through csv
    arcpy.AddMessage(f"Iterating through csv...")
    with open(inputFile, 'r') as infile:
        csv_reader = reader(infile)
        listOfRows = list(csv_reader)

        #add rows from cursors
        arcpy.AddMessage(f"Adding rows to FC...")
        for row in listOfRows:
            #latitude = row.getValue("LATITUDE")
            #longitude = row.getValue("LONGITUDE")
            if row[0].startswith('#'):
                continue
            elif row[0].startswith('#'):
                cursor.insertRow(row)
                #point = arcpy.Point(row[1], row[2])
                #ptGeometry = arcpy.PointGeometry(point)
                #cursor.insertRow(ptGeometry)
    arcpy.AddMessage(f"Rows added to FC successfully")

    del cursor, row

main()
arcpy.AddMessage("Finished script: " + strftime("%Y-%m-%d %H:%M:%S"))