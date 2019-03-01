#  -*- coding: utf-8 -*-

# https://www.bbc.com/thai/thailand-47086016

import json

infile = open("candidates_areas.csv", mode="r", encoding="utf-8")
outfile = open("candidates_areas.json", mode="w", encoding="utf-8")

listOfLines = infile.readlines()

jsonDict = dict()
count = 0
lastNumber = 0

for line in listOfLines:
        
    # x = line.encode("utf-8")
    lineSplit = line.split(",")
    # print(lineSplit[0])
    if not lineSplit[0].isdigit():
        continue
    if not lineSplit[7]:
        continue

    province = lineSplit[1]
    key = province
    if not key in jsonDict:
        jsonDict[key] = dict()

    # print('\u0e01\u0e23\u0e30\u0e1a\u0e35\u0e48'.decode('unicode-escape'))
    if not lineSplit[2].strip() in jsonDict[key]:
        jsonDict[key][lineSplit[2].strip()] = dict()
        
    # print((lineSplit[2], lineSplit[3]))
    jsonDict[key][lineSplit[2].strip()][lineSplit[3].strip()] = {
        'title': lineSplit[4],
        'firstName': lineSplit[5],
        'lastName': lineSplit[6],
        'party': lineSplit[7].strip()
    }
    if lastNumber != int(lineSplit[0]) - 1:
        print('!!' + str(lastNumber) + ', ' + str((lineSplit[2], lineSplit[3])))
    lastNumber = int(lineSplit[0])
    count += 1

print('# total area candidates = ' + str(count) + '')

    # lastLine = lineSplit

# print(json.dumps(jsonDict, sort_keys=True, indent=4, separators=(',', ': ')))
# print(json)
outfile.write(json.dumps(jsonDict, ensure_ascii=False, sort_keys=True, indent=4, separators=(',', ': ')))
# outfile = open("out.csv", "w") 
outfile.close()
