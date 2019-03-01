export default {
  provinceMap: {
    กรุงเทพมหานคร: "Bangkok",
    เชียงราย: "Chiang Rai",
    เชียงใหม่: "Chiang Mai",
    น่าน: "Nan",
    พะเยา: "Phayao",
    แพร่: "Phrae",
    แม่ฮ่องสอน: "Mae Hong Son",
    ลำปาง: "Lampang",
    ลำพูน: "Lamphun",
    อุตรดิตถ์: "Uttaradit",
    กาฬสินธุ์: "Kalasin",
    ขอนแก่น: "Khon Kaen",
    ชัยภูมิ: "Chaiyaphum",
    นครพนม: "Nakhon Phanom",
    นครราชสีมา: "Nakhon Ratchasima",
    บึงกาฬ: "Bueng Kan",
    บุรีรัมย์: "Buri Ram",
    มหาสารคาม: "Maha Sarakham",
    มุกดาหาร: "Mukdahan",
    ยโสธร: "Yasothon",
    ร้อยเอ็ด: "Roi Et",
    เลย: "Loei",
    ศรีสะเกษ: "Si Sa Ket",
    สกลนคร: "Sakon Nakhon",
    สุรินทร์: "Surin",
    หนองคาย: "Nong Khai",
    หนองบัวลำภู: "Nong Bua Lam Phu",
    อำนาจเจริญ: "Amnat Charoen",
    อุดรธานี: "Udon Thani",
    อุบลราชธานี: "Ubon Ratchathani",
    กำแพงเพชร: "Kamphaeng Phet",
    ชัยนาท: "Chai Nat",
    นครนายก: "Nakhon Nayok",
    นครปฐม: "Nakhon Pathom",
    นครสวรรค์: "Nakhon Sawan",
    นนทบุรี: "Nonthaburi",
    ปทุมธานี: "Pathum Thani",
    พระนครศรีอยุธยา: "Phra Nakhon Si Ayutthaya",
    พิจิตร: "Phichit",
    พิษณุโลก: "Phitsanulok",
    เพชรบูรณ์: "Phetchabun",
    ลพบุรี: "Lop Buri",
    สมุทรปราการ: "Samut Prakan",
    สมุทรสงคราม: "Samut Songkhram",
    สมุทรสาคร: "Samut Sakhon",
    สิงห์บุรี: "Sing Buri",
    สุโขทัย: "Sukhothai",
    สุพรรณบุรี: "Suphan Buri",
    สระบุรี: "Saraburi",
    อ่างทอง: "Ang Thong",
    อุทัยธานี: "Uthai Thani",
    จันทบุรี: "Chanthaburi",
    ฉะเชิงเทรา: "Chachoengsao",
    ชลบุรี: "Chon Buri",
    ตราด: "Trat",
    ปราจีนบุรี: "Prachin Buri",
    ระยอง: "Rayong",
    สระแก้ว: "Sa Kaeo",
    กาญจนบุรี: "Kanchanaburi",
    ตาก: "Tak",
    ประจวบคีรีขันธ์: "Prachuap Khiri Khan",
    เพชรบุรี: "Phetchaburi",
    ราชบุรี: "Ratchaburi",
    กระบี่: "Krabi",
    ชุมพร: "Chumphon",
    ตรัง: "Trang",
    นครศรีธรรมราช: "Nakhon Si Thammarat",
    นราธิวาส: "Narathiwat",
    ปัตตานี: "Pattani",
    พังงา: "Phangnga",
    พัทลุง: "Phatthalung",
    ภูเก็ต: "Phuket",
    ยะลา: "Yala",
    ระนอง: "Ranong",
    สงขลา: "Songkhla",
    สตูล: "Satun",
    สุราษฎร์ธานี: "Surat Thani"
  },
  provinceEnglishToThai: function(province) {
    if (!province) return "";
    for (var k in this.provinceMap) {
      if (
        this.provinceMap[k].toLowerCase().replace(/\s/g, "") ===
        province.toLowerCase().replace(/\s/g, "")
      )
        return k;
    }
    return "";
  },
  provinceToUrl: function(province) {
    return this.provinceMap[province].toLowerCase().replace(/\s/g, "");
  },
  thaiReorder: function (s) {
    if (Number.isInteger(s))
      return s
    var sArr =  s.split('')
    for (var i in sArr) {
      if (['เ', 'แ', 'โ', 'ใ', 'ไ'].indexOf(sArr[i]) >= 0) {
        var temp = sArr[i]
        sArr[i] = sArr[i + 1]
        sArr[i + 1] = temp
      }
    }
    return sArr.join('')
  },
  thaiCompare: function (a, b) {
    var ta = this.thaiReorder(a)
    var tb = this.thaiReorder(b)
    return ta == tb ? 0 : ta > tb ? 1 : -1
  }
};
