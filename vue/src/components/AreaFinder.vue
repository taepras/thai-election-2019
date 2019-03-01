<template>
    <div>
        <ul class="nav nav-tabs mb-2">
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': mode == 'search' }" href="#" @click=" mode = 'search' ">ค้นหาเขต</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{ 'active': mode == 'browse' }" href="#" @click=" mode = 'browse' ">เลือกจากรายชื่อเขต</a>
            </li>
        </ul>
        <template v-if=" mode == 'search' ">
            <div class="form-group">
                <label>ค้นหาเขตเลือกตั้งจากรหัสไปรษณีย์</label>
                <input type="number" name="" id="" class="form-control" placeholder="XXXXX">
            </div>
        </template>
        <template v-else>
            <div class="form-group">
                <label>จังหวัด / เขตเลือกตั้ง</label>
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

export default {
    name: "AreaFinder",
    props: ["areas", "value"],
    data() {
        return {
            selectedProvince: "",
            selectedArea: "",
            mode: "browse"
        };
    },
    created() {
        this.selectedProvince = utils.provinceEnglishToThai(
            this.$route.params.province
        );
        this.selectedArea = this.$route.params.area;
        this.init();
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
        init() {
            if (!this.selectedProvince)
                this.selectedProvince = Object.keys(this.areas)[0];
            if (!this.selectedArea && this.areas[this.selectedProvince])
                this.selectedArea = Object.keys(
                    this.areas[this.selectedProvince]
                ).sort()[0];

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
        }
    },
    watch: {
        areas: function() {
            this.init();
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
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
</style>
