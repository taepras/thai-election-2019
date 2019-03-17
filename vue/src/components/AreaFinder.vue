<template>
    <div>
        <!-- <ul class="nav nav-tabs mb-2">
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': mode == 'search' }" href="#" @click=" mode = 'search' ">ค้นหาเขต</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': mode == 'browse' }" href="#" @click=" mode = 'browse' ">เลือกจากรายชื่อเขต</a>
            </li>
        </ul> -->
        <template v-if=" mode == 'search' ">
            <div class="form-group">
                <label>ค้นหาเขตเลือกตั้งจากรหัสไปรษณีย์</label>
                <input type="number" name="" id="" class="form-control" placeholder="XXXXX">
            </div>
        </template>
        <template v-if=" mode == 'address' ">

            <div class="mb-1 clearfix thailand-autocomplete">
                <!-- <small>พิมพ์ชื่อตำบล/แขวงโดยไม่ต้องพิมพ์คำว่า "ตำบล" หรือ "แขวง"</small> -->
                <ThailandAutoComplete v-model="subdistrict" type="district" @select="addressSelected" label="ค้นหาเขตเลือกตั้งจากชื่อตำบล/แขวง" placeholder="ไม่ต้องพิมพ์คำว่าตำบล/แขวง" />
            </div>
            <div class="form-group" v-if="selectedArea">
                <div class="alert alert-info">
                    <small>
                        <span class="nowrap">{{ province == 'กรุงเทพมหานคร' ? 'แขวง' : 'ต. ' }}{{ selectedAddress.district }}</span>
                        <span class="nowrap">{{ province == 'กรุงเทพมหานคร' ? 'เขต' : 'อ. ' }}{{ selectedAddress.amphoe }}</span>
                        <span class="nowrap">จ. {{ selectedAddress.province }}</span>
                    </small>
                    <!-- ตำบลที่เลือก:
                <span class="nowrap">{{ province == 'กรุงเทพมหานคร' ? 'แขวง' : 'ต.' }} {{ subdistrict }}</span>
                <span class="nowrap">{{ province == 'กรุงเทพมหานคร' ? 'เขต' : 'อ.' }} {{ district }}</span>
                <span class="nowrap">จ. {{ province }}</span>
                <br> เขตเลือกตั้ง: {{ selectedProvince }} เขต {{ selectedArea }} -->
                    <!-- <table class="selected-table">
                        <tr>
                            <td class="nowrap">
                                <small>ตำบลที่เลือก</small>
                            </td>
                            <td class="pl-2">
                                <small>
                                    <span class="nowrap">{{ province == 'กรุงเทพมหานคร' ? 'แขวง' : 'ต. ' }}{{ selectedAddress.district }}</span>
                                    <span class="nowrap">{{ province == 'กรุงเทพมหานคร' ? 'เขต' : 'อ. ' }}{{ selectedAddress.amphoe }}</span>
                                    <span class="nowrap">จ. {{ selectedAddress.province }}</span>
                                </small>
                            </td>
                        </tr>
                        <tr>
                            <td class="nowrap">
                                <small>เขตเลือกตั้ง</small>
                            </td>
                            <td class="pl-2">
                                <b>{{ selectedProvince == 'กรุงเทพมหานคร' ? 'กทม.' : selectedProvince }} เขต {{ selectedArea }}</b>
                            </td>
                        </tr>
                    </table> -->
                </div>
            </div>

            <button v-for="a in selectedArea" :key="a.number" class="btn btn-primary btn-block" @click="onSelect(a)">
                {{ selectedProvince == 'กรุงเทพมหานคร' ? 'กทม.' : selectedProvince }} เขต {{ a.number }} ({{ detailsToWords(a) }})
            </button>
            <button v-if="!selectedArea" class="btn btn-secondary btn-block" disabled>
                กรุณาเลือกตำบลเพื่อดูรายชื่อผู้สมัคร
            </button>

            <!-- <div class="form-group">
                <ThailandAutoComplete v-model="district" type="amphoe" @select="addressSelected" label="อำเภอ/เขต" placeholder=""/>
            </div>
            <div class="form-group">
                <ThailandAutoComplete v-model="province" type="province" @select="addressSelected" label="จังหวัด" placeholder=""/>
            </div> -->
        </template>
        <template v-if=" mode == 'browse' ">
            <div class="form-group">
                <label>เลือกจังหวัดและเขตเลือกตั้ง</label>
                <select v-model="selectedProvince" name="province" class="form-control" id="provinces" @change="provinceChanged">
                    <option v-for="province in sortedProvinces" :key="province" :value="province">
                        {{province}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <select v-model="selectedArea" name="area" class="form-control" id="areas" @change="update">
                    <option v-for="(data, areaNumber) in areas[selectedProvince]" :key="areaNumber" :value="areaNumber">
                        เขต {{ areaNumber }} ({{ districtList(areas[selectedProvince][areaNumber]) }})
                    </option>
                </select>
            </div>
        </template>
    </div>
</template>

<script>
import utils from "@/utils.js";
import ThailandAutoComplete from "vue-thailand-address-autocomplete";

export default {
    name: "AreaFinder",
    props: ["areas", "value"],
    components: {
        ThailandAutoComplete
    },
    data() {
        return {
            subdistrict: "",
            district: "",
            province: "",
            selectedAddress: {},
            selectedProvince: "",
            selectedArea: "",
            mode: "address"
        };
    },
    created() {
        this.selectedProvince = utils.provinceEnglishToThai(
            this.$route.params.province
        );
        this.selectedArea = this.$route.params.area;
        this.init(false);
    },
    computed: {
        sortedProvinces() {
            console.log(Object.keys(this.areas));
            return Object.keys(this.areas).sort(function(a, b) {
                return utils.thaiCompare(a, b);
            });
        }
    },
    methods: {
        init(autoDefault = true) {
            if (autoDefault) {
                if (!this.selectedProvince)
                    this.selectedProvince = Object.keys(this.areas)[0];
                if (!this.selectedArea && this.areas[this.selectedProvince])
                    this.selectedArea = Object.keys(
                        this.areas[this.selectedProvince]
                    ).sort()[0];
            } else {
                this.selectedProvince = "";
                this.selectedArea = "";
            }

            this.update();
        },
        districtList(area) {
            var districtNames = [];
            // console.log(area)
            for (var i in area) {
                var name;
                if (area[i].all_districts) name = "ทั้งจังหวัด";
                if (area[i].district) {
                    name = area[i].district;

                    if (!area[i].subdistricts.all)
                        if (area[i].subdistricts.only)
                            name =
                                name +
                                " (เฉพาะ" +
                                area[i].subdistricts.only.join(", ") +
                                ")";
                    if (area[i].subdistricts.except)
                        name =
                            name +
                            " (ยกเว้น" +
                            area[i].subdistricts.except.join(", ") +
                            ")";
                }
                districtNames.push(name);
            }
            return districtNames.join(", ");
        },
        provinceChanged() {
            this.selectedArea = Object.keys(
                this.areas[this.selectedProvince]
            )[0];
            this.update();
        },
        update() {
            this.$emit("input", {
                selectedProvince: this.selectedProvince,
                selectedArea: this.selectedArea
            });
        },
        addressSelected(address) {
            this.subdistrict = address.district;
            this.district = address.amphoe;
            this.province = address.province;

            this.selectedAddress = address;

            address = {
                subdistrict:
                    (this.province === "กรุงเทพมหานคร" ? "แขวง" : "ตำบล") +
                    this.subdistrict,
                district:
                    (this.province === "กรุงเทพมหานคร" ? "เขต" : "อำเภอ") +
                    this.district,
                province: this.province
            };

            const provinceInfo = this.areas[address.province];
            console.log(
                this.areas,
                this.areas[address.province],
                address.province,
                provinceInfo
            );
            const provinceAreaNumbers = Object.keys(provinceInfo);

            // Case 1: one area in one province
            if (provinceAreaNumbers.length === 1) {
                this.selectedProvince = address.province;
                this.selectedArea = [
                    {
                        number: '1',
                        matched: 'all_province',
                        details: address.province
                    }
                ];
                this.update();
                return;
            }

            console.log(this.selectedAddress, provinceAreaNumbers);
            let matchedAreaNumber = [];
            provinceAreaNumbers.forEach(provinceAreaNumber => {
                provinceInfo[provinceAreaNumber].forEach(districtInfo => {
                    if (districtInfo.district === address.district) {
                        console.log(
                            "district matched",
                            address.province,
                            provinceAreaNumber
                        );
                        if (
                            "all" in districtInfo.subdistricts &&
                            districtInfo.subdistricts.all === true
                        ) {
                            matchedAreaNumber = [
                                {
                                    number: provinceAreaNumber,
                                    matched: "all",
                                    details: address.district
                                }
                            ];
                        } else if ("only" in districtInfo.subdistricts) {
                            districtInfo.subdistricts.only.forEach(
                                subdistrict => {
                                    // subdistrict = subdistrict.replace("เทศบาลตำบล", "ตำบล");
                                    // subdistrict = subdistrict.replace("เทศบาลเมือง", "ตำบล");
                                    // subdistrict = subdistrict.replace("เทศบาลนคร", "ตำบล");
                                    console.log(
                                        "only",
                                        subdistrict,
                                        address.subdistrict
                                    );
                                    if (subdistrict === address.subdistrict) {
                                        matchedAreaNumber = [
                                            {
                                                number: provinceAreaNumber,
                                                matched: "only",
                                                details: subdistrict
                                            }
                                        ];
                                    } else if (
                                        subdistrict.subdistrict &&
                                        subdistrict.subdistrict ===
                                            address.subdistrict
                                    ) {
                                        matchedAreaNumber.push({
                                            number: provinceAreaNumber,
                                            matched: "only",
                                            details: subdistrict
                                        });
                                    }
                                }
                            );
                        } else if ("except" in districtInfo.subdistricts) {
                            let found = false;
                            districtInfo.subdistricts.except.forEach(
                                subdistrict => {
                                    console.log(
                                        "except",
                                        subdistrict,
                                        address.subdistrict
                                    );
                                    // subdistrict = subdistrict.replace("เทศบาลตำบล", "ตำบล");
                                    // subdistrict = subdistrict.replace("เทศบาลเมือง", "ตำบล");
                                    // subdistrict = subdistrict.replace("เทศบาลนคร", "ตำบล");
                                    if (
                                        subdistrict.subdistrict &&
                                        subdistrict.subdistrict ===
                                            address.subdistrict
                                    ) {
                                        // except but not all area of subdistrict
                                        matchedAreaNumber.push({
                                            number: provinceAreaNumber,
                                            matched: "except",
                                            details: subdistrict
                                        });
                                        found = true;
                                    }

                                    if (subdistrict === address.subdistrict) {
                                        found = true;
                                    }
                                }
                            );
                            if (found === false) {
                                matchedAreaNumber = [
                                    {
                                        number: provinceAreaNumber,
                                        matched: "except",
                                        details: subdistrict
                                    }
                                ];
                            }
                        }
                    }
                });
            });

            console.log("matched", matchedAreaNumber);
            this.selectedProvince = address.province;
            this.selectedArea = matchedAreaNumber;
            this.update();
        },
        detailsToWords(a) {
            // {
            //     number: provinceAreaNumber,
            //     matched: "except",
            //     details: subdistrict
            // }
            // return JSON.stringify(a)
            try {
                if (a.matched === "all_province") {
                    return "ทั้งจังหวัด";
                } if (a.matched === "all") {
                    return "ทั้งอำเภอ/เขต";
                } else if (a.matched === "only") {
                    var output = "เฉพาะ";
                    if (a.details.subdistrict) {
                        if (a.details.inside) {
                            output += "ในเขต" + a.details.inside;
                        } else if (a.details.outside) {
                            output += "นอกเขต" + a.details.outside;
                        } else {
                            output += a.details.subdistrict;
                        }
                    } else {
                        output += a.details;
                    }
                    return output;
                } else if (a.matched === "except") {
                    var output = "ยกเว้น";
                    if (a.details.subdistrict) {
                        if (a.details.inside) {
                            output += "ในเขต" + a.details.inside;
                        } else if (a.details.outside) {
                            output += "นอกเขต" + a.details.outside;
                        } else {
                            output += a.details.subdistrict;
                        }
                    } else {
                        output += a.details;
                    }
                    return output;
                } else {
                    return "unknown";
                }
            } catch (e) {
                console.error(e);
                return JSON.stringify(a);
            }
        },
        onSelect(a) {
            this.$emit("select", {
                selectedProvince: this.selectedProvince,
                selectedArea: a.number
            });
        }
    },
    watch: {
        areas: function() {
            this.init(false);
        },
        value: function() {
            this.selectedProvince = this.value.selectedProvince;
            this.selectedArea = this.value.selectedArea;
        }
    }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.thailand-autocomplete .container {
    padding: 0;
}

.thailand-autocomplete .input {
    border-radius: 10px !important;
}

.nowrap {
    white-space: nowrap;
}

.selected-table td {
    vertical-align: top;
}
</style>
