<template>
    <div class="navbar-padding">
        <navbar>
            <template v-slot:left>
                <router-link :to="{ path: '/' }">
                    <i class="fas fa-arrow-left"></i>
                </router-link>
            </template>
            <template v-slot:center>
                <span class="accent clickable" @click="showModal = true">
                    {{selectedProvince}} เขต {{selectedArea}}
                </span>
            </template>
            <template v-slot:right>
                <span class="clickable" @click="showModal = true">
                    <i class="fas fa-edit"></i>
                    <span class="accent not-bold d-none d-sm-inline">
                        เปลี่ยนเขต
                    </span>
                </span>
            </template>
        </navbar>
        <keep-alive>
            <modal v-if="showModal" @close="showModal = false" class="pb-1">
                <template v-slot:header>
                    เลือกเขตเลือกตั้ง
                </template>
                <template v-slot:body>
                    <area-finder :areas="areas" :value="selected" @input="selected = $event" @select="commitAreaChange"></area-finder>
                    <!-- <button class="btn btn-primary btn-block" @click="commitAreaChange">เลือกเขต</button> -->
                </template>
            </modal>
        </keep-alive>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <!-- <hr> -->
                    <h1 class="mt-4">รายชื่อผู้สมัคร ส.ส. เขต</h1>
                    <p>
                        จังหวัด <b>{{selectedProvince}}</b> เขต <b>{{selectedArea}}</b>
                        <ul class="normal-space" v-if="areas[selectedProvince]">
                            <li v-for="(d, i) in districtList(areas[selectedProvince][selectedArea])" :key="i">{{ d }}</li>
                        </ul>
                        </p>
                    <hr>
                    <div class="alert alert-warning">
                        <b>หมายเหตุ</b>: แต่ละเขตเรียงหมายเลขไม่เหมือนกัน</div>
                    <div class="row mb-3 px-3">
                        <div class="col-3">หมายเลข</div>
                        <div class="col-9">พรรค/ผู้สมัคร ส.ส.เขต</div>
                    </div>
                    <transition-group name="list-fade" appear tag="div">
                        <floating-card v-if="isLoading" class="text-center" key="loading">
                            กำลังโหลดข้อมูล
                            <i class="fas fa-spinner fa-pulse"></i>
                        </floating-card>
                        <candidate v-if="!isLoading" v-for="(c, i) in candidatesInArea" :key="selectedProvince + '-' + selectedArea + '-' + i" :candidate="c" :parties="parties"></candidate>
                        <accordion-floating-card v-if="!isLoading" key="no-vote">
                            <template v-slot:above>
                                จะเกิดอะไรขึ้นถ้ากาช่อง
                                <br>
                                <b>"ไม่ประสงค์ลงคะแนน"</b>
                            </template>
                            <template v-slot:below="slotProps">
                                ตามกติกาเลือกตั้ง 2562 ถ้าผู้ชนะในเขตใดได้รับคะแนนเสียง
                                <span class="highlight" :class="{ 'active' : slotProps.isExpanded }">น้อยกว่า</span>จำนวนเสียง "ไม่ประสงค์ลงคะแนน" เขตนั้นจะต้อง
                                <span class="highlight" :class="{ 'active' : slotProps.isExpanded }">เลือกตั้งใหม่</span> และผู้สมัครฯ ชุดเดิมจะไม่มีสิทธิ์ลงสมัครรับเลือกตั้งในครั้งใหม่นั้น
                            </template>
                        </accordion-floating-card>
                    </transition-group>
                </div>
            </div>
            <div v-if="!isLoading">
                <hr>
                <h2>หาพรรคที่สนใจไม่เจอ?</h2>
                <p class="text-muted">ถ้าพรรคที่ท่านสนใจไม่ลงสมัครรับเลือกตั้งในเขตของท่าน ท่านจะ
                    <b class="text-dark">ไม่สามารถเลือกเพื่อเพิ่มที่นั่ง ส.ส. บัญชีรายชื่อ</b>ให้พรรคนั้นได้</p>
                <div class="row mt-3" id="not-in-this-area">
                    <div class="col">
                        <floating-card :height="1">
                            <h3>พรรคที่ไม่ได้ลงสมัครในเขตนี้</h3>
                            <!-- <p>แตะที่ชื่อพรรคเพื่อดูรายละเอียดพรรค</p> -->
                            <list-of-parties :parties="partiesWithoutCandidate" :smallerLogo="true"></list-of-parties>
                            <!-- <table class="table table-hover">
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
                                        <th @click="sort('partyListCandidatesCount')">
                                            จำนวน ส.ส.บัญชีรายชื่อ
                                            <i class="ml-1 fas fa-sort-amount-up" v-if="currentSort == 'partyListCandidatesCount' && currentSortDir == 'asc'"></i>
                                            <i class="ml-1 fas fa-sort-amount-down" v-if="currentSort == 'partyListCandidatesCount' && currentSortDir == 'desc'"></i>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(partyData, i) in partiesWithoutCandidate" :key="i" @click="goToPartyPage(partyData.partyName)" class="clickable">
                                        <td>
                                            <div class="logo" :style="'background-image:url(\'/static/logo/' + partyData.partyName + '.png\')'"></div>
                                        </td>
                                        <td class="text-primary">พรรค{{ partyData.partyName }}</td>
                                        <td>{{ partyData.candidateCount || 0 }} / 350</td>
                                        <td>{{ partyData.partyListCandidates ? partyData.partyListCandidates.length || 0 : 0 }} / 150</td>
                                    </tr>
                                </tbody>
                            </table> -->
                        </floating-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Candidate from "@/components/Candidate.vue";
import AccordionFloatingCard from "@/components/AccordionFloatingCard.vue";
import FloatingCard from "@/components/FloatingCard.vue";
import ListOfParties from "@/components/ListOfParties.vue";
import Navbar from "@/components/Navbar.vue";
import AreaFinder from "@/components/AreaFinder.vue";
import Modal from "@/components/Modal.vue";
import utils from "@/utils.js";

export default {
    name: "RegionPage",
    components: {
        AccordionFloatingCard,
        Candidate,
        FloatingCard,
        Navbar,
        AreaFinder,
        Modal,
        ListOfParties
    },
    props: ["candidates", "areas", "parties"],
    data() {
        return {
            loading: true,
            showModal: false,
            selected: {
                selectedProvince: "",
                selectedArea: ""
            },
            selectedProvince: "",
            selectedArea: "",
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
            })
            return partiesNotInvolved;
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
            // console.log(area);
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
                                area[i].subdistricts.only.map(this.districtDetailsToWords).join(", ") +
                                ")";
                    if (area[i].subdistricts.except)
                        name =
                            name +
                            " (ยกเว้น" +
                            area[i].subdistricts.except.map(this.districtDetailsToWords).join(", ") +
                            ")";
                }
                districtNames.push(name);
            }
            return districtNames;
        },
        districtDetailsToWords(d) {
            if (typeof(d) === 'object') {
                var output = d.subdistrict
                if (d.inside) {
                    output += 'ในเขต' + d.inside
                } else if (a.outside) {
                    output += 'นอกเขต' + d.outside
                }
                return output
                // return JSON.stringify(d)
            } else {
                return d
            }
        },
        provinceToEnglish(province) {
            return utils.provinceMap[province];
        },
        updateUrl() {
            // console.log("!", this.selectedArea);
            this.$router.push({
                path: `/region/${utils.provinceToUrl(this.selectedProvince)}/${
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
        },
        commitAreaChange(e) {
            this.showModal = false;
            this.selectedProvince = e.selectedProvince;
            this.selectedArea = e.selectedArea;
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

.list-fade.move,
.list-fade-enter-active,
.list-fade-leave-active {
    transition: opacity 0.5s;
}
.list-fade-enter, .list-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    /* transform: translateY(-10px); */
}
</style>
