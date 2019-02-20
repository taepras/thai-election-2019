# import io
import csv
import json
import re

infile = open("areas_complete_raw.csv", mode="r", encoding="utf-8")
outfile = open("areas_complete.json", mode="w", encoding="utf-8")

areas_csv = csv.reader(infile)

jsonDict = dict()

currentProvince = ''

def single_district_repl(matchobj):
    return matchobj.group(0)[0] + ' ๑. ' + matchobj.group(0)[1:]

def extract_subdistrict_conditions(s):
    '''
    input: '(เฉพาะตำบลxxx ตำบลyyy และตำบลzzz)
    '''
    
    s = re.sub(r'(และ|เฉพาะ|ยกเว้น|\(|\))', '', s)
    return s.split(' ')

for row in areas_csv:
    if row[7] == 0 or row[1] == 'จังหวัด':
        continue
    if row[1]:
        currentProvince = row[1]
        jsonDict[currentProvince] = []
    if currentProvince:
        if row[5]:
            jsonDict[currentProvince].append(row[5])

for province in jsonDict.keys():
    all_areas = ' '.join(jsonDict[province])

    all_areas = re.sub(r'[^\.] (เขต|อำเภอ)', single_district_repl, all_areas)
    all_areas = re.sub(r'\n', '', all_areas)

    areas_list = re.split(r'[๑1]\.', all_areas)
    if len(areas_list[0]) == 0:
        areas_list = areas_list[1:]

    for i, s in enumerate(areas_list):
        area_string = areas_list[i].strip()
        areas_list[i] = re.split(r'[๐-๙1-9] ?\.', area_string)
        for j, v in enumerate(areas_list[i]):
            areas_list[i][j] = areas_list[i][j].strip()
    
    jsonDict[province] = dict()

    for i, s in enumerate(areas_list):
        area_id = str(i + 1)
        if area_id not in jsonDict[province]:
            jsonDict[province][area_id] = []

        for j, v in enumerate(areas_list[i]):
            conditions = re.search("\(.*\)", areas_list[i][j])
            subdistricts_list = {
                'all': not bool(conditions),
            }

            if conditions:
                conditions_string = conditions.group(0)
                if 'เฉพาะ' in conditions_string:
                    subdistricts_list['only'] = extract_subdistrict_conditions(conditions_string)
                if 'ยกเว้น' in conditions_string:
                    subdistricts_list['except'] = extract_subdistrict_conditions(conditions_string)
            
            district_name = areas_list[i][j].split(' ')[0] 

            if district_name == 'ทั้งจังหวัด':
                jsonDict[province][area_id].append({
                    'all_districts': True
                })
            else:
                jsonDict[province][area_id].append({
                    'district': district_name,
                    'subdistricts': subdistricts_list
                })

outfile.write(json.dumps(jsonDict, ensure_ascii=False, sort_keys=True, indent=4, separators=(',', ': ')))
outfile.close()
