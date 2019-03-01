#  -*- coding: utf-8 -*-

import json
import re

# infile = open("partylist_rawtext_fromgoogledocsocr_processed.txt", mode="r", encoding="utf-8")
infile = open("partylist_ocr_raw_clean1.txt", mode="r", encoding="utf-8")
# outfile = open("partylist_ocr_processed.txt", mode="w", encoding="utf-8")
outfile = open("parties.json", mode="w", encoding="utf-8")

listOfLines = infile.readlines()

# jsonDict = dict()

parties = json.load(open("../parties.json", "r", encoding="utf-8"))
# parties = json.load(open("parties.json", "r", encoding="utf-8"))
# parties = json.load(outfile)

key = ''

# analysis_mode = True
analysis_mode = False

# regex
re_name_title = r'(นาย|หม่อม|นาง|นางสาว|คุณหญิง|(รอง|ผู้ช่วย)?ศาสตราจารย์|((ว่าที่)?(พัน(จ่า)?|พล|นาวา|(จ่า)?สิบ|จ่า|ร้อย|เรือ|ดาบ)(ตำรวจ|อากาศ|เรือ)?(ตำรวจ|ตรี|โท|เอก)))[^าะีิุูัืึ]'

regexlist = [
    (r'ํา','ำ'),
    (r'.*นายอิทธิพร บุญประคอง.*', ''),
    (r'(/|\()?.*\.\.\.?\.?', ''),
    (r'อำเภอ \n', 'อำเภอ'),
    (r'(เลขที่|ตำบล|อำเภอ|จังหวัด|กรุงเทพมหานคร).*[๐-๙0-9]{5}[๐-๙0-9]*', ''),
    (r'(' + re_name_title + r'[^ ].*|พรรค[^ ]*)', r'"\1"'),
    (r'".*"', r'\n\g<0>\n'),
    #(r'(เลขที่|ตำบล|อำเภอ|จังหวัด|กรุงเทพมหานคร).*"', '"'),
    (r'[^\"]*\n', '\n'),
    (r'เลขที่.*"', '"'),
    (r' +"', '"'),
    (r'("|\||:|,)', ''),
    (r'.+อำเภอ.*\n', ''),
    (r'^[^ ]\n', ''),
    (r'\n$', ''),
]

text = '\n'.join(listOfLines)
for r in regexlist:
    text = re.sub(r[0], r[1], text)

while True:
    print('!')
    old_text = text
    text = re.sub('\n\n', '\n', text)
    if old_text == text:
        break

text = re.sub('^\n', '', text)

if analysis_mode:
    outfile.write(text)
    outfile.close()
else:
    listOfLines = text.split('\n')

    for line in listOfLines:
        if line.find('พรรค') == 0:
            prevKey = key
            if len(prevKey) > 0:
                parties[prevKey]['partyListCandidatesCount'] = len(parties[prevKey]['partyListCandidates'])

            key = line.split('พรรค')[1].strip()
            if key not in parties:
                parties[key] = dict()
            if 'partyListCandidates' not in parties[key]:
                parties[key]['partyListCandidates'] = []
        else:
            parties[key]['partyListCandidates'].append(line.strip())

    for p in parties:
        if 'partyListCandidates' not in parties[p]:
            parties[p]['partyListCandidates'] = []

    # print(json.dumps(jsonDict, sort_keys=True, indent=4, separators=(',', ': ')))
    # print(json)
    outfile.write(json.dumps(parties, ensure_ascii=False, sort_keys=True, indent=4, separators=(',', ': ')))
    # outfile = open("out.csv", "w") 
    outfile.close()
