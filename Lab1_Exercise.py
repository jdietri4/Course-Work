def main():
    celsius_temps = [23.4, 10.2, 8.9, 15.8, 24.3, 0.8]
    celsius_temps = sorted(celsius_temps, reverse=True)
    valueToConvert = celsius_temps[1]
    valueInF = (valueToConvert*1.8) + 32
    print(valueInF)

if __name__== "__main__":
    main()