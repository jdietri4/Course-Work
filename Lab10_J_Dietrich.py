import arcpy
import os


def main():

    # set overwrite to true
    arcpy.env.overwriteOutput = True

    # user input
    inputGDB = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab10_J_Dietrich\Virginia_Site_Address_Point_Dataset_2021Q2.gdb\Virginia_Site_Address_Point_Dataset_2021Q2.gdb"

    # set workspace
    arcpy.env.workspace = inputGDB
    fc = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab10_J_Dietrich\Virginia_Site_Address_Point_Dataset_2021Q2.gdb\Virginia_Site_Address_Point_Dataset_2021Q2.gdb\addresses_fc"

    # set new field
    fieldName = "mailing_address"
    arcpy.AddField_management(fc, fieldName, "STRING", "", "", "", "", "")

    # list fields to be used
    fields = ["FULLADDR", "STATE", "ZIP_5", "mailing_address"]

    # update each row using UpdateCursor
    with arcpy.da.UpdateCursor(fc, fields) as cursor:
        for row in cursor:

            # concatenate columns into last column and update row
            row[3] = str(row[0]) + ", " + str(row[1]) + ", " + str(row[2])
            cursor.updateRow(row)


main()
