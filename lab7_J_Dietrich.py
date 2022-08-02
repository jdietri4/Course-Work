import arcpy


def main():

    arcpy.env.overwriteOutput = True

    workspace = r"C:\Users\Jacob\Documents\GISC450\Assignments\Lab7_J_Dietrich\Lab7_J_Dietrich\Lab7_J_Dietrich.gdb"
    arcpy.env.workspace = workspace

    GDB_name = 'Lab7_J_Dietrich.gdb'

    GDB_location = os.path.join(workspace, GDB_name)
    GDB_exists = arcpy.Exists(GDB_location)

    if(GDB_exists):
        print("GDB already exists!")
    elif(GDB_exists):
        arcpy.CreateFileGDB_management(os.path.dirname(workspace), GDB_name)

    input_layer = "vapdbounds"
    input_selection_type = "NEW_SELECTION"
    where_clause = " PD_NO = '11' "
    arcpy.SelectLayerByAttribute_management(input_layer, input_selection_type, where_clause)
    arcpy.CopyFeatures_management("vapdbounds", "vapdbounds_select")

    input_layer = "landfills"
    relationship = "intersect"
    selecting_features = "vapdbounds_select"
    arcpy.SelectLayerByLocation_management(input_layer, relationship, selecting_features)
    arcpy.CopyFeatures_management("landfills", "landfills_select")

    input_layer = "landfills_select"
    output_feature_class = "landfills_select_buffer"
    distance = "5 miles"
    arcpy.Buffer_analysis(input_layer, output_feature_class, distance)
    arcpy.CopyFeatures_management("landfills_select", "landfills_buffer_select")

    input_layer = "va_towns"
    relationship = "intersect"
    arcpy.SelectLayerByLocation_management(input_layer, relationship, selecting_features)
    arcpy.CopyFeatures_management("va_towns", "va_towns_select")

    input_layer = "varivers"
    relationship = "within"
    arcpy.SelectLayerByLocation_management(input_layer, relationship, selecting_features)
    arcpy.CopyFeatures_management("varivers", "varivers_select")

    input_layer = "vards"
    relationship = "within"
    arcpy.SelectLayerByLocation_management(input_layer, relationship, selecting_features)
    arcpy.CopyFeatures_management("vards", "vards_select")



if __name__ == '__main__':
    main()
