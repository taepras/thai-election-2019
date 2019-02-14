<template>
    <div class="navbar-padding">
        <navbar>
            <template v-slot:left>
                <router-link :to="{ path: '/' }"><i class="fas fa-arrow-left"></i></router-link>
            </template>
            <template v-slot:center>
                <span class="accent">{{selectedProvince}} เขต {{selectedArea}}</span>
            </template>
            <template v-slot:right>
                <i class="fas fa-edit"></i>
            </template>
        </navbar>
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
                    <p>จังหวัด{{selectedProvince}}<br>เขต {{selectedArea}} ({{ selectedProvince == "กรุงเทพมหานคร" ? "เขต" : "อำเภอ"}}{{ areas[selectedProvince] ? districtList(areas[selectedProvince][selectedArea]) : ' -' }})</p>
                    <hr>
                    <div class="alert alert-danger">*หมายเหตุ: แต่ละเขตเรียงหมายเลขไม่เหมือนกัน</div>
                    <div class="row mb-3 px-3">
                        <div class="col-3">หมายเลข</div>
                        <div class="col-9">พรรค/ผู้สมัคร ส.ส.เขต</div>
                    </div>
                    <floating-card v-if="isLoading" class="text-center">
                        กำลังโหลดข้อมูล
                        <i class="fas fa-spinner fa-pulse"></i>
                    </floating-card>
                    <candidate v-for="(c, i) in candidatesInArea" :key="i" :candidate="c" :parties="parties"></candidate>
                    <accordion-floating-card>
                        <template v-slot:above>
                            จะเกิดอะไรขึ้นถ้ากาช่อง
                            <br>
                            <b>"ไม่ประสงค์ลงคะแนน"</b>
                        </template>
                        <template v-slot:below>
                            ตามกติกาเลือกตั้ง 2562 ถ้าผู้ชนะในเขตใดได้รับคะแนนเสียง
                            <b>น้อยกว่า</b>จำนวนเสียง "ไม่ประสงค์ลงคะแนน" เขตนั้นจะต้อง
                            <b>เลือกตั้งใหม่</b> และผู้สมัครฯ ชุดเดิมจะไม่มีสิทธิ์ลงสมัครรับเลือกตั้งในครั้งใหม่นั้น
                        </template>

                    </accordion-floating-card>
                </div>
            </div>
            <hr>
            <h2>หาพรรคที่สนใจไม่เจอ?</h2>
            <!-- <h2>พรรคที่ไม่ได้ลงสมัครรับเลือกตั้งในเขตนี้</h2> -->
            <p class="text-muted">รายชื่อด้านล่างคือพรรคที่ไม่ได้ลงสมัครในเขตนี้ หากพรรคที่ท่านสนใจไม่ลงสมัครรับเลือกตั้งในเขตของท่าน ท่านจะไม่สามารถเลือกเพื่อเพิ่มที่นั่ง ส.ส. บัญชีรายชื่อให้พรรคนั้นได้</p>
            <div class="row mt-3" id="not-in-this-area">
                <div class="col">
                    <floating-card :height="1">
                        <p>แตะที่ชื่อพรรคเพื่อดูรายละเอียดพรรค</p>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th colspan="2" @click="sort('partyName')">
                                        ชื่อพรรค
                                        <i class="ml-1 fas fa-sort-alpha-down" v-if="currentSort == 'partyName' && currentSortDir == 'asc'"></i>
                                        <i class="ml-1 fas fa-sort-alpha-up" v-if="currentSort == 'partyName' && currentSortDir == 'desc'"></i>
                                    </th>
                                    <th @click="sort('candidateCount')">
                                        จำนวนเขตที่ลงสมัคร
                                        <i class="ml-1 fas fa-sort-amount-up" v-if="currentSort == 'candidateCount' && currentSortDir == 'asc'"></i>
                                        <i class="ml-1 fas fa-sort-amount-down" v-if="currentSort == 'candidateCount' && currentSortDir == 'desc'"></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(partyData, i) in partiesWithoutCandidate" :key="i" @click="goToPartyPage(partyData.partyName)">
                                    <td>
                                        <div class="logo" :style="'background-image:url(\'/static/logo/' + partyData.partyName + '.png\')'"></div>
                                    </td>
                                    <td>พรรค{{ partyData.partyName }}</td>
                                    <td>{{ partyData.candidateCount || 0 }} / 350</td>
                                </tr>
                            </tbody>
                        </table>
                    </floating-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Candidate from "@/components/Candidate.vue";
import AccordionFloatingCard from "@/components/AccordionFloatingCard.vue";
import FloatingCard from "@/components/FloatingCard.vue";
import Navbar from "@/components/Navbar.vue";
import utils from "@/utils.js";

export default {
    name: "RegionPage",
    components: { AccordionFloatingCard, Candidate, FloatingCard, Navbar },
    props: ["candidates", "areas", "parties"],
    data() {
        return {
            loading: true,
            selectedProvince: "",
            selectedArea: "",
            // non-candidate table
            currentSort: "candidateCount",
            currentSortDir: "desc"
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
        isLoading() {
            return !this.candidates[this.selectedProvince];
        },
        candidatesInArea() {
            if (
                Object.keys(this.candidates).length <= 0 ||
                !this.selectedProvince ||
                !this.selectedArea
            )
                return [];

            var candidatesList = this.candidates[this.selectedProvince][
                this.selectedArea
            ];

            return Object.keys(candidatesList)
                .map(function(number) {
                    var candidateData = Object.assign(
                        {},
                        candidatesList[number]
                    );
                    candidateData.number = number;
                    return candidateData;
                })
                .sort(function(a, b) {
                    return a.number - b.number;
                });
        },
        partiesWithoutCandidate() {
            var partiesNotInvolved = Object.assign({}, this.parties);
            this.candidatesInArea.forEach(candidate => {
                delete partiesNotInvolved[candidate.party];
            });

            var notInvolvedList = [];
            for (var p in partiesNotInvolved) {
                notInvolvedList.push({
                    ...partiesNotInvolved[p],
                    partyName: p
                });
            }

            var thisComponent = this;
            console.log(Array.isArray(notInvolvedList));
            if (Array.isArray(notInvolvedList))
                notInvolvedList.sort(function(a, b) {
                    let dif =
                        a[thisComponent.currentSort] ==
                        b[thisComponent.currentSort]
                            ? 0
                            : a[thisComponent.currentSort] >
                              b[thisComponent.currentSort]
                                ? 1
                                : -1;
                    return thisComponent.currentSortDir == "asc" ? dif : -dif;
                });
            console.log(notInvolvedList);
            return notInvolvedList;
        }
    },
    methods: {
        init() {
            if (!this.selectedProvince)
                this.selectedProvince = Object.keys(this.areas)[0];
            if (!this.selectedArea)
                this.selectedArea = Object.keys(
                    this.areas[this.selectedProvince]
                ).sort()[0];
            this.updateUrl();
        },
        districtList(area) {
            var districtNames = [];
            for (var i in area) {
                if (area[i].district) districtNames.push(area[i].district);
            }
            return districtNames.join(", ");
        },
        provinceToEnglish(province) {
            return utils.provinceMap[province];
        },
        provinceToUrl: function(province) {
            return utils.provinceMap[province].toLowerCase().replace(/\s/g, "");
        },
        provinceChanged() {
            this.selectedArea = Object.keys(
                this.areas[this.selectedProvince]
            )[0];
            this.updateUrl();
        },
        updateUrl() {
            // console.log("!", this.selectedArea);
            this.$router.push({
                path: `/region/${this.provinceToUrl(this.selectedProvince)}/${
                    this.selectedArea
                }`
            });
        },
        goToPartyPage(partyName) {
            this.$router.push("/party/" + partyName);
        },
        sort(s) {
            //if s == current sort, reverse
            if (s === this.currentSort) {
                this.currentSortDir =
                    this.currentSortDir === "asc" ? "desc" : "asc";
            } else {
                this.currentSortDir = "asc";
            }
            this.currentSort = s;
            console.log("sort", this.currentSort, this.currentSortDir);
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

td .logo {
    margin: -0.25rem 0;
}

.logo {
    /* width: 100%; */
    width: 2rem;
    height: 2rem;

    /* width: 40px;
    height: 40px; */
    /* height: 100%; */
    margin: auto;
    margin-bottom: 10px;

    /* padding-bottom: 100%; */
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 10%;
}
</style>
