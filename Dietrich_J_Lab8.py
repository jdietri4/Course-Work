import arcpy
import os
import sys


def main():

    #Input GDB path
    workspace = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab8_J_Dietrich\Lab8_Data\Lab8_Data"
    arcpy.env.workspace = workspace

    #Output GDB name
    GDB_name = 'Lab8.gdb'

    #Get location of output and set a boolean for the existence of the original GDB
    GDB_location = os.path.join(workspace, GDB_name)
    GDB_exists = arcpy.Exists(GDB_location)

    #Set workspace
    arcpy.env.overwriteOutput = True

    #If GDB exists, do nothing
    #If GDB does not exist, create a new GDB under the GDB_name
    if (GDB_exists):
        print("GDB already exists!")
    elif (GDB_exists):
        arcpy.CreateFileGDB_management(os.path.dirname(workspace), GDB_name)

    #List all feature classes in inputGDB and save to new
    listFC = arcpy.ListFeatureClasses()
    for fc in listFC:

        description = arcpy.Describe(fc)

        name = description.name
        outputFCPName = f"{fc}_project"
        #outputFCSFName = f"{fc}_extent"

        sfn = description.ShapeFieldName

        spatial_reference = arcpy.Describe(fc).spatialReference

        if spatial_reference.name == "Unknown" or spatial_reference != "NAD_1983_UTM_Zone_11N":
            sr = arcpy.CreateSpatialReference_management(26911)
            arcpy.Project_management(fc, outputFCPName, sr)

        arcpy.FeatureClassToFeatureClass_conversion(fc, os.path.join(GDB_location, GDB_name), fc)

        xmin = description.extent.XMin
        xmax = description.extent.XMax
        ymin = description.extent.YMin
        ymax = description.extent.YMax

        print("X Minimum: %s \nX Maximum: %s \nY Minimum: %s \nY Maximum: %s" % (xmin, xmax, ymin, ymax))

        poly = description.extent.polygon
        arcpy.CopyFeatures_management(poly, name)

if __name__ == '__main__':
    main()

