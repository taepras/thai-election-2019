# import io

infile = open("candidates.csv", mode="r", encoding="utf-8")
outfile = open("out.csv", mode="w", encoding="utf-8")


listOfLines = infile.readlines()

for line in listOfLines:
    x = line.encode("utf-8")
    if x[0] == ',':
        continue
    elif len(x.split(',')[1]) == 0:
        continue
    else:
        outfile.write("test")
        


print (x)
# outfile = open("out.csv", "w") 
outfile.close()
