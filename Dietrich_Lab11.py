import os
import shutil
import arcpy
import sys
from time import strftime

arcpy.AddMessage("Start script: Dietrich_Lab11 " + strftime("%Y-%m-%d %H:%M:%S"))

def main():

    arcpy.env.overwriteOutput = True

    #User Inputs
    pdNum = arcpy.GetParameterAsText(0)
    landfills = arcpy.GetParameterAsText(1)
    rivers = arcpy.GetParameterAsText(2)
    roads = arcpy.GetParameterAsText(3)
    pdfc = arcpy.GetParameterAsText(4)
    #landfills = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab11_J_Dietrich\Lab11_Data\Lab11_Data\landfills.shp"
    #rivers = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab11_J_Dietrich\Lab11_Data\Lab11_Data\varivers.shp"
    #roads = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab11_J_Dietrich\Lab11_Data\Lab11_Data\vards.shp"
    #pdfc = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab11_J_Dietrich\Lab11_Data\Lab11_Data\vapdbounds.shp"

    inputSelectionType = "NEW_SELECTION"

    outGDBPath = os.path.dirname(landfills)
    outGDBName = f"Dietrich_Lab11_{pdNum}"

    #Set buffer distances
    riverDist = 150
    roadDist = 700

    #Output gdb
    outGDB = arcpy.CreateFileGDB_management(outGDBPath, outGDBName)
    arcpy.env.workspace = str(outGDB)

    #Get pd
    arcpy.AddMessage("Run summary")
    whereClause = f"PD_NO = '{pdNum}'"
    arcpy.AddMessage(f"\tWhere clause used: {whereClause}")
    pdSelectName = f"PD_{pdNum}"
    arcpy.AddMessage(f"\t{pdSelectName} selected")
    pdSelect = arcpy.SelectLayerByAttribute_management(pdfc, inputSelectionType, whereClause)
    arcpy.CopyFeatures_management(pdSelect, pdSelectName)

    #count landfills in pd
    landfillSelectName = f"landfills_{pdNum}"
    arcpy.Clip_analysis(landfills, pdSelectName, landfillSelectName)
    landfillsCount = arcpy.GetCount_management(landfillSelectName)
    arcpy.AddMessage(f"\t{landfillsCount} landfills were located in PD {pdNum}")

    #Display buffer distances
    arcpy.AddMessage(f"\tCriteria road distance = {roadDist}")
    arcpy.AddMessage(f"\tCriteria river distance = {riverDist}")

    #Buffer roads
    roadsBufferName = "roadBuffer_700m"
    arcpy.Buffer_analysis(roads, roadsBufferName, f"{roadDist} Meters")
    arcpy.AddMessage("\tRoad buffer is complete")

    landfillsRoadBuffer = f"landfills_{pdNum}_road_buffer"
    arcpy.Clip_analysis(landfillSelectName, roadsBufferName, landfillsRoadBuffer)
    landfillsCount_roads = arcpy.GetCount_management(landfillsRoadBuffer)
    arcpy.AddMessage(f"\t\t{landfillsCount_roads} landfills are within the 700 meter road buffer")

    #Count landfills  in roads buffer
    landfillCountDiff = int(str(landfillsCount)) - int(str(landfillsCount_roads))
    arcpy.AddMessage(f"\t\t{landfillCountDiff} landfills located more than 700 meters from a road\n")

    #Buffer rivers
    riverBufferName = "riverBuffer_150m"
    arcpy.Buffer_analysis(rivers, riverBufferName, f"{riverDist} Meters")
    arcpy.AddMessage("\tRiver buffer is complete")

    landfillsRiverBuffer = f"landfills_{pdNum}_river_buffer"
    arcpy.Clip_analysis(landfillSelectName, riverBufferName, landfillsRiverBuffer)
    landfillsCount_rivers = arcpy.GetCount_management(landfillsRiverBuffer)
    arcpy.AddMessage(f"\t\t{landfillsCount_rivers} landfills are within the 150 meter river buffer")
    landfillCountDiff = int(str(landfillsCount)) - int(str(landfillsCount_rivers))
    arcpy.AddMessage(f"\t\t{landfillCountDiff} landfills located more than 150 meters from a river\n")

    #Count landfills in river buffers
    allBuff = f"allBuff_{pdNum}"
    arcpy.management.Merge([roadsBufferName, riverBufferName], allBuff)
    landfillsRoadsRiversBuffer = f"landfills_{pdNum}_all"
    arcpy.Clip_analysis(landfillSelectName, allBuff, landfillsRoadsRiversBuffer)
    landfillsCount_rivers_roads = arcpy.GetCount_management(landfillsRoadsRiversBuffer)
    countFinal = int(str(landfillsCount)) - int(str(landfillsCount_rivers_roads))
    arcpy.AddMessage(f"***{countFinal} landfills fell outside both buffers***")


main()
arcpy.AddMessage("Finished script: " + strftime("%Y-%m-%d %H:%M:%S"))