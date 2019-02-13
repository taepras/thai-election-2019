#  -*- coding: utf-8 -*-

import json

infile = open("pm_candidate.txt", mode="r", encoding="utf-8")
outfile = open("parties.json", mode="w", encoding="utf-8")

listOfLines = infile.readlines()

# jsonDict = dict()

parties = json.load(open("parties_count.json", "r", encoding="utf-8"))

for line in listOfLines:
    # source
    # https://www.bbc.com/thai/thailand-47086016

    lineSplit = line.split(" - ")
    partyName = lineSplit[0]
    if not partyName in parties:
        parties[partyName] = dict({ 'pm_candidates': [] })

    candidates_split = lineSplit[1].strip().split(",")
    pmCandidates = []

    print(len(candidates_split))
    for c in candidates_split:
        
        nameParts = c.strip().split(' ')
        pmCandidates.append({
            'title': nameParts[0].strip(),
            'firstName': nameParts[1].strip(),
            'lastName': nameParts[2].strip()
        })

        
    parties[partyName]['pm_candidates'] = pmCandidates
    # lastLine = lineSplit

for p in parties:
    if 'pm_candidates' not in parties[p]:
        parties[p]['pm_candidates'] = []

# print(json.dumps(jsonDict, sort_keys=True, indent=4, separators=(',', ': ')))
# print(json)
outfile.write(json.dumps(parties, ensure_ascii=False, sort_keys=True, indent=4, separators=(',', ': ')))
# outfile = open("out.csv", "w") 
outfile.close()
