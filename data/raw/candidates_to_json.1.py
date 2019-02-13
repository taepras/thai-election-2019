#  -*- coding: utf-8 -*-

# https://www.bbc.com/thai/thailand-47086016

import json

infile = open("candidates.csv", mode="r", encoding="utf-8")
outfile = open("candidates.json", mode="w", encoding="utf-8")

listOfLines = infile.readlines()

jsonDict = dict()

for line in listOfLines:
        
    # x = line.encode("utf-8")
    lineSplit = line.split(",")
    # print(lineSplit[0])
    key = lineSplit[0]
    if not key in jsonDict:
        jsonDict[key] = dict()

    # print('\u0e01\u0e23\u0e30\u0e1a\u0e35\u0e48'.decode('unicode-escape'))
    if not lineSplit[1].zfill(2) in jsonDict[key]:
        jsonDict[key][lineSplit[1].zfill(2)] = dict()
        
    jsonDict[key][lineSplit[1].zfill(2)][lineSplit[5]] = {
        'title': lineSplit[2],
        'firstName': lineSplit[3],
        'lastName': lineSplit[4],
        'party': lineSplit[6]
    }

    # lastLine = lineSplit

# print(json.dumps(jsonDict, sort_keys=True, indent=4, separators=(',', ': ')))
# print(json)
outfile.write(json.dumps(jsonDict, ensure_ascii=False, sort_keys=True, indent=4, separators=(',', ': ')))
# outfile = open("out.csv", "w") 
outfile.close()
