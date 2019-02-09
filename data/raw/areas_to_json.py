# import io
import json

infile = open("areas_clean.csv", mode="r", encoding="utf-8")
outfile = open("areas.json", mode="w", encoding="utf-8")

listOfLines = infile.readlines()

jsonDict = dict()

for line in listOfLines:
        
    # x = line.encode("utf-8")
    lineSplit = line.split(",")

    key = lineSplit[1]
    if not key in jsonDict:
        jsonDict[key] = dict()

    if not lineSplit[2].zfill(2) in jsonDict[key]:
        jsonDict[key][lineSplit[2].zfill(2)] = []

    # print(json[key])
    jsonDict[key][lineSplit[2].zfill(2)].append({
        'district': lineSplit[3],
        'ballot': lineSplit[4]
    })

    # lastLine = lineSplit

# print(json.dumps(jsonDict, sort_keys=True, indent=4, separators=(',', ': ')))
# print(json)
outfile.write(json.dumps(jsonDict, ensure_ascii=False, sort_keys=True, indent=4, separators=(',', ': ')))
# outfile = open("out.csv", "w") 
outfile.close()
