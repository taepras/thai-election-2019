<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <form>
          <div class="row">
            <div class="col-6">
              <label>จังหวัด</label>
              <select v-model="selectedProvince" name="province" class="form-control" id="provinces" @change="provinceChanged">
                <option v-for="(regions, province) in areas" :key="province" :value="province">
                  {{province}}
                </option>
              </select>
            </div>
            <div class="col-6">
              <label>เขตเลือกตั้ง</label>
              <select v-model="selectedArea" name="area" class="form-control" id="areas" @change="updateUrl">
                <option v-for="(data, areaNumber) in areas[selectedProvince]" :key="areaNumber" :value="areaNumber">
                  เขต {{ areaNumber }} ({{ selectedProvince == "กรุงเทพมหานคร" ? "เขต" : "อำเภอ"}}{{ districtList(areas[selectedProvince][areaNumber]) }})
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div class="col-12">
        <hr>
        <h1>รายชื่อผู้สมัคร ส.ส. เขต</h1>
        <p>จังหวัด{{selectedProvince}}<br>เขต {{selectedArea}} ({{ selectedProvince == "กรุงเทพมหานคร" ? "เขต" : "อำเภอ"}}{{ districtList(areas[selectedProvince][selectedArea]) }})</p>
        <hr>
        <!-- <div class="accent mb-3 text-center">24 มีนา เข้าคูหา <b>กาเบอร์เดียว</b> ได้ 3 อย่าง</div> -->
        <!-- <button class="btn btn-primary btn-block">อ่านกติกาการเลือกตั้ง 2562</button> -->
        <div class="alert alert-danger">*หมายเหตุ: แต่ละเขตเรียงหมายเลขไม่เหมือนกัน</div>
        <div class="row mb-3 px-3">
          <div class="col-3">หมายเลข</div>
          <div class="col-9">พรรค/ผู้สมัคร ส.ส.เขต</div>
        </div>
        <candidate v-for="(c, i) in candidateListInRow(0, 100, false)" :key="i" :candidate="c" :parties="parties"></candidate>
        <accordion-floating-card>
          <template v-slot:above>
            จะเกิดอะไรขึ้นถ้ากาช่อง
            <br>
            <b>"ไม่ประสงค์ลงคะแนน"</b>
          </template>
          <template v-slot:below>
            กติกาเลือกตั้ง 2562 ระบุว่า หากผู้ชนะในเขตใดได้รับคะแนนเสียงน้อยกว่าจำนวนเสียง "ไม่ประสงค์ลงคะแนน" เขตนั้นจะต้องเลือกตั้งใหม่ และผู้สมัครฯ ชุดเดิมจะไม่มีสิทธิ์ลงสมัครรับเลือกตั้งในครั้งใหม่นั้น
          </template>

        </accordion-floating-card>
      </div>
    </div>
    <hr>
    <h2>พรรคที่ไม่ได้ลงสมัครรับเลือกตั้งในเขตนี้</h2>
    <p class="text-muted">หากพรรคที่ท่านสนใจไม่ลงสมัครรับเลือกตั้งในเขตของท่าน ท่านจะไม่สามารถเลือกเพื่อเพิ่มที่นั่ง ส.ส. บัญชีรายชื่อให้พรรคนั้นได้</p>
    <div class="row mt-3" id="not-in-this-area">
      <div class="col-6 col-sm-4 col-md-3 col-lg-3" v-for="(partyData, partyName) in partiesWithoutCandidate" :key="partyName">
        <router-link :to="'/party/' + partyName">
          <floating-card :height="1" class="mb-2">
            <div class="row">
              <div class="floating-card-col col-md-3 text-center">
                <div class="logo" :style="'background-image:url(\'/static/logo/' + partyName + '.png\')'"></div>
              </div>
              <div class="floating-card-col col-md-9 text-center">
                <b>พรรค{{ partyName }}</b><br> ลงสมัคร {{ partyData.candidateCount }} เขต
              </div>
            </div>
          </floating-card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Candidate from "@/components/Candidate.vue";
import AccordionFloatingCard from "@/components/AccordionFloatingCard.vue";
import FloatingCard from "@/components/FloatingCard.vue";
import utils from "@/utils.js";

export default {
    name: "RegionPage",
    components: { AccordionFloatingCard, Candidate, FloatingCard },
    props: ["candidates", "areas", "parties"],
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
    computed: {
        candidatesInArea: function() {
            if (
                Object.keys(this.candidates).length <= 0 ||
                !this.selectedProvince ||
                !this.selectedArea
            )
                return [];

            var candidatesList = this.candidates[this.selectedProvince][
                this.selectedArea
            ];
            console.log(this.candidates, this.selectedProvince);
            return Object.keys(candidatesList).map(function(number) {
                var candidateData = Object.assign({}, candidatesList[number]);
                candidateData.number = number;
                return candidateData;
            });
        },
        partiesWithoutCandidate: function() {
            var partiesNotInvolved = Object.assign({}, this.parties);
            this.candidatesInArea.forEach(candidate => {
                delete partiesNotInvolved[candidate.party];
            });
            return partiesNotInvolved;
        }
    },
    methods: {
        districtList: function(area) {
            var districtNames = [];
            for (var i in area) {
                if (area[i].district) districtNames.push(area[i].district);
            }
            return districtNames.join(", ");
        },
        candidateListInRow: function(
            row = 0,
            candidatesPerColumn = 20,
            fill = true
        ) {
            var sortedCandidates = this.candidatesInArea.sort(function(a, b) {
                return a.number - b.number;
            });

            var candidatesInRange = sortedCandidates.slice(
                candidatesPerColumn * row,
                candidatesPerColumn * (row + 1)
            );
            while (fill && candidatesInRange.length < candidatesPerColumn) {
                candidatesInRange.push({ empty: true });
            }

            return candidatesInRange;
        },
        provinceToEnglish: function(province) {
            return utils.provinceMap[province];
        },
        provinceToUrl: function(province) {
            return utils.provinceMap[province].toLowerCase().replace(/\s/g, "");
        },
        provinceChanged: function() {
            this.selectedArea = Object.keys(
                this.areas[this.selectedProvince]
            )[0];
            this.updateUrl();
        },
        updateUrl: function() {
            // console.log("!", this.selectedArea);
            this.$router.push({
                path: `/region/${this.provinceToUrl(this.selectedProvince)}/${
                    this.selectedArea
                }`
            });
        },
        init() {
            if (!this.selectedProvince)
                this.selectedProvince = Object.keys(this.areas)[0];
            if (!this.selectedArea)
                this.selectedArea = Object.keys(
                    this.areas[this.selectedProvince]
                ).sort()[0];
            this.updateUrl();
        }
    },
    watch: {
        areas: function() {
            // watch it
            this.init();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.candidate:hover {
    background-color: #eeeeee;
}

.logo {
    /* width: 100%; */
    width: 40px;
    height: 40px;
    margin: auto;
    margin-bottom: 10px;

    /* padding-bottom: 100%; */
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 10%;
}
</style>
