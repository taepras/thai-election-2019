<template>
    <div>
        <div class="form-group">
            <label>จังหวัด</label>
            <select v-model="selectedProvince" name="province" class="form-control" id="provinces" @change="provinceChanged">
                <option v-for="(regions, province) in areas" :key="province" :value="province">
                    {{province}}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label>เขตเลือกตั้ง
                <a href="http://www.ratchakitcha.soc.go.th/DATA/PDF/2561/A/101/T_0005.PDF" target="_blank">
                    <i class="far fa-question-circle"></i>
                </a>
            </label>
            <select v-model="selectedArea" name="area" class="form-control" id="areas" @change="update">
                <option v-for="(data, areaNumber) in areas[selectedProvince]" :key="areaNumber" :value="areaNumber">
                    เขต {{ areaNumber }} ({{ selectedProvince == "กรุงเทพมหานคร" ? "เขต" : "อำเภอ"}}{{ districtList(areas[selectedProvince][areaNumber]) }})
                </option>
            </select>
        </div>
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
            selectedArea: ""
        };
    },
    created() {
        this.selectedProvince = utils.provinceEnglishToThai(
            this.$route.params.province
        );
        this.selectedArea = this.$route.params.area;
        this.init();
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
            for (var i in area) {
                if (area[i].district) districtNames.push(area[i].district);
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
</style>
