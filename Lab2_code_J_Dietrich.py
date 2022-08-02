def hemisphere(latin, longin):
    latin = float(latin)
    longin = float(longin)

    if latin > 0:
        if longin > 0:
            return "Northeast Hemisphere"
        if longin < 0:
            return "Northwest Hemisphere"
    elif latin < 0:
        if longin > 0:
            return "Southeast Hemisphere"
        if longin < 0:
            return "Southwest Hemisphere"


def main():

    points = [(40.4319077, 116.5681862),
              (20.6828074, -88.5727964),
              (30.3206257, 35.4530111),
              (-13.2088354, -72.6319811),
              (-22.951916, -43.2126759),
              (41.8902102, 12.4900422),
              (27.1751448, 78.0399535),
              (38.3013039, -77.4766587)]

    #points = {
    #    (40.4319077, 116.5681862): "Northeast Hemisphere",
    #    (20.6828074, -88.5727964): "Northwest Hemisphere",
    #    (30.3206257, 35.4530111):  "Northeast Hemisphere",
    #    (-13.2088354, -72.6319811):"Southwest Hemisphere",
    #    (-22.951916, -43.2126759): "Southwest Hemisphere",
    #    (41.8902102, 12.4900422):  "Northeast Hemisphere",
    #    (27.1751448, 78.0399535):  "Northeast Hemisphere",
    #    (38.3013039, -77.4766587): "Northwest Hemisphere"
    #}

    #latin = input(f"Please enter a latitude\n")
    #longin = input(f"Please enter a longitude\n")

    dict_hemisphere = {}

    for lat, lon in points:

        whichhemi = hemisphere(lat, lon)

        print(f"({lat}, {lon}) is in the {whichhemi}")

        dict_hemisphere[(lat, lon)] = whichhemi

    print(dict_hemisphere)

    #for coord in points:
    #    latitude = coord[0]
    #    longitude = coord[1]
    #    if latitude > 0:
    #        if longitude > 0:
    #            coord2 = str(coord)
    #            print(coord2 + ' is in the NE hemisphere.')
    #        if longitude < 0:
    #            coord2 = str(coord)
    #            print(coord2 + ' is in the NW hemisphere.')
    #    elif latitude < 0:
    #        if longitude > 0:
    #            coord2 = str(coord)
    #            print(coord2 + ' is in the SE hemisphere.')
    #        if longitude < 0:
    #            coord2 = str(coord)
    #            print(coord2 + ' is in the SW hemisphere.')
    #    elif latitude == 0:
    #        print(coord + ' is on the equator.')
    #    elif longitude == 0:
    #        print(coord + ' is on the prime meridian.')
    #    else:
    #        print("Invalid input")


main()
