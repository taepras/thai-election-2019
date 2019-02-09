# import io

infile = open("areas_raw.csv", mode="r", encoding="utf-8")
outfile = open("out.csv", mode="w", encoding="utf-8")

listOfLines = infile.readlines()

lastLine = []
for line in listOfLines:
        
    x = line.encode("utf-8")
    lineSplit = x.decode().split(",")
    if len(lineSplit) == 1:
        print(x)

    if len(lastLine) == 0:
        lastLine = lineSplit

    for (index, cell) in enumerate(lineSplit):
        # print(len(lineSplit[index]))
        if len(lineSplit[index]) == 0:
            print(len(lastLine[index]))
            lineSplit[index] = lastLine[index]

    # xo = 
    outfile.write(",".join(lineSplit))
    lastLine = lineSplit

# outfile = open("out.csv", "w") 
outfile.close()
