<template>
    <div>
        <div class="form-group">
            <label>ค้นหาจากชื่อพรรค</label>
            <div class="input-group">
                <input type="text" class="form-control with-search" v-model="partyQuery" placeholder="เช่น พรรคประชาชนไทย">
                <span class="search-clear fas fa-times" @click="partyQuery = ''"></span>
            </div>
        </div>
        <div class="form-group">
            <label>จัดเรียงตาม</label>
            <select v-model="sortBy" class="form-control">
                <option value="allCount desc">จำนวนผู้ลงสมัคร ส.ส. ทั้งหมด (มาก-น้อย)</option>
                <option value="allCount asc">จำนวนผู้ลงสมัคร ส.ส. ทั้งหมด (น้อย-มาก)</option>
                <option value="partyName asc">ชื่อพรรค (ก-ฮ)</option>
                <option value="partyName desc">ชื่อพรรค (ฮ-ก)</option>
                <option value="candidateCount desc">จำนวนผู้ลงสมัคร ส.ส. เขต (มาก-น้อย)</option>
                <option value="candidateCount asc">จำนวนผู้ลงสมัคร ส.ส. เขต (น้อย-มาก)</option>
                <option value="partyListCandidateCount desc">จำนวนผู้ลงสมัคร ส.ส. บัญชีรายชื่อ (มาก-น้อย)</option>
                <option value="partyListCandidateCount asc">จำนวนผู้ลงสมัคร ส.ส. บัญชีรายชื่อ (น้อย-มาก)</option>
            </select>
        </div>

        <!-- <p>แตะที่ชื่อพรรคเพื่อดูรายละเอียดพรรค</p> -->
        <table class="table table-hover" :class="{ 'logo-sm': smallerLogo }">
            <thead>
                <tr>
                    <th colspan="2" @click="sort('partyName')">
                        ชื่อพรรค
                        <i class="ml-1 fas fa-sort-alpha-down" v-if="currentSort == 'partyName' && currentSortDir == 'asc'"></i>
                        <i class="ml-1 fas fa-sort-alpha-up" v-if="currentSort == 'partyName' && currentSortDir == 'desc'"></i>
                    </th>
                    <!-- <th @click="sort('candidateCount')">
                                    จำนวนเขตที่ลงสมัคร
                                    <i class="ml-1 fas fa-sort-amount-up" v-if="currentSort == 'candidateCount' && currentSortDir == 'asc'"></i>
                                    <i class="ml-1 fas fa-sort-amount-down" v-if="currentSort == 'candidateCount' && currentSortDir == 'desc'"></i>
                                </th>
                                <th @click="sort('partyListCandidateCount')">
                                    จำนวน ส.ส. บัญชีรายชื่อ
                                    <i class="ml-1 fas fa-sort-amount-up" v-if="currentSort == 'partyListCandidateCount' && currentSortDir == 'asc'"></i>
                                    <i class="ml-1 fas fa-sort-amount-down" v-if="currentSort == 'partyListCandidateCount' && currentSortDir == 'desc'"></i>
                                </th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(partyData, i) in partiesFormatter" :key="i" @click="goToPartyPage(partyData.partyName)" class="clickable">
                    <td>
                        <div class="logo" :class="{ 'invalid': !isValid(partyData.partyName) }" :style="'background-image:url(\'/static/logo/' + partyData.partyName + '.png\')'"></div>
                    </td>
                    <td class="" :class="{ 'invalid': !isValid(partyData.partyName) }">
                        <span class="accent" :class="{ 'text-primary': isValid(partyData.partyName) }">พรรค{{ partyData.partyName }}</span>
                        <!-- <br><b>จำนวนที่ลงสมัคร</b> -->
                            
                        <br>สมัคร ส.ส. เขต {{ partyData.candidateCount || 0 }} / 350 เขต
                        <br>บัญชีรายชื่อ {{ partyData.partyListCandidateCount || 0 }} / 150 ที่นั่ง
                        <br>รวม {{ partyData.allCount || 0 }} / 500 ที่นั่ง
                    </td>
                    <!-- <td>{{ partyData.candidateCount || 0 }} / 350</td>
                                <td>{{ partyData.partyListCandidateCount || 0 }} / 150</td> -->
                </tr>
                <tr v-if="partiesFormatter.length == 0">
                    <td colspan="2" class="text-center">ขออภัย ไม่มีพรรคที่ตรงกับคำค้นหาของท่าน</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Candidate from "@/components/Candidate.vue";
import AccordionFloatingCard from "@/components/AccordionFloatingCard.vue";
import FloatingCard from "@/components/FloatingCard.vue";
import Navbar from "@/components/Navbar.vue";
import AreaFinder from "@/components/AreaFinder.vue";
import Modal from "@/components/Modal.vue";
import utils from "@/utils.js";

export default {
    name: "AllPartiesPage",
    components: {
        AccordionFloatingCard,
        Candidate,
        FloatingCard,
        Navbar,
        AreaFinder,
        Modal
    },
    props: ["candidates", "areas", "parties", "smallerLogo"],
    data() {
        return {
            sortBy: "allCount desc",
            partyQuery: ""
            // currentSort: "candidateCount",
            // currentSortDir: "desc"
        };
    },
    computed: {
        currentSort() {
            return this.sortBy.split(" ")[0];
        },
        currentSortDir() {
            return this.sortBy.split(" ")[1];
        },
        partiesFormatter() {
            var allParties = [];
            for (var p in this.parties) {
                allParties.push({
                    ...this.parties[p],
                    partyName: p
                });
            }
            var thisComponent = this;
            var matchedParties = allParties.filter(function(p) {
                return (
                    ("พรรค" + p.partyName).indexOf(thisComponent.partyQuery) >=
                    0
                );
            });

            if (Array.isArray(matchedParties))
                matchedParties.sort(function(a, b) {
                    let dif = utils.thaiCompare(
                        a[thisComponent.currentSort],
                        b[thisComponent.currentSort]
                    );
                    return thisComponent.currentSortDir == "asc" ? dif : -dif;
                });
            return matchedParties;
        }
    },
    methods: {
        goToPartyPage(partyName) {
            this.$router.push("/party/" + partyName);
        },
        isValid(partyName) {
            return !this.parties[partyName].dissolved
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
            // console.log("sort", this.currentSort, this.currentSortDir);
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
    /* margin: -0.25rem 0; */
}

.logo {
    /* width: 100%; */
    width: 3rem;
    height: 3rem;

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

.logo-sm .logo {
    /* width: 100%; */
    width: 2rem;
    height: 2rem;
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

.search-clear {
    position: absolute;
    right: 12px;
    top: 0;
    bottom: 0;
    height: 14px;
    margin: auto;
    font-size: 14px;
    cursor: pointer;
    color: #333;
    z-index: 5;
}

.input-group .with-search {
    border-radius: 10px;
}
</style>
