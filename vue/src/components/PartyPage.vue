<template>
    <div class="navbar-padding">
        <navbar>
            <template v-slot:center>
                <span class="accent">พรรค{{partyName}}</span>
            </template>
            <template v-slot:right>
            </template>
        </navbar>
        <div class="container">
            <div class="row">
                <div class="col-12 text-center my-3 mt-4">
                    <div style="max-width: 120px" class="m-auto">
                        <div class="party-logo" :class="{ 'invalid': !isValid }" :style="'background-image:url(\'' + partyLogo + '\')'"></div>
                    </div>
                </div>
                <div class="col-12 text-center">
                    <h1 :class="{ 'strikethrough': !isValid }">พรรค{{ partyName }}</h1>
                    <div class="alert alert-danger" v-if="!isValid"><span v-html="party.comments"></span></div>
                    <table class="table mt-3 less-padding" :class="{ 'invalid': !isValid }">
                        <tr>
                            <th colspan="2">จำนวนที่ลงสมัคร</th>
                        </tr>
                        <tr>
                            <td class="text-right">
                                <b>ส.ส. เขต</b>
                            </td>
                            <td class="text-left">
                                <b>{{ party ? party.candidateCount : 'N/A' }}</b> / 350 เขต</td>
                        </tr>
                        <tr>
                            <td class="text-right">
                                <b>ส.ส. บัญชีรายชื่อ</b>
                            </td>
                            <td class="text-left">
                                <b>{{ party.partyListCandidates ? party.partyListCandidates.length || 0 : 'N/A' }}</b> / 350 ที่นั่ง</td>
                        </tr>
                        <tr>
                            <td class="text-right">
                                <b>รวม</b>
                            </td>
                            <td class="text-left">
                                <b>{{ (party ? party.candidateCount : 'N/A') + (party.partyListCandidates ? party.partyListCandidates.length || 0 : 'N/A') }}</b> / 500 ที่นั่ง</td>
                        </tr>
                    </table>
                    <!-- <p>
                        : 
                        ส.ส.บัญชีรายชื่อ: ลงสมัคร {{ party ? party.candidateCount : 'N/A' }} จาก 150 ที่นั่ง</p>
                    </p> -->
                    <a target="_blank" :href="'http://www.google.com/search?q=พรรค' + partyName + '+นโยบาย'" class="btn btn-primary btn-block">
                        ค้นหานโยบายพรรคใน Google
                        <i class="fas fa-external-link-alt ml-1"></i>
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <hr class="my-4">
                    <floating-card class="mt-3" :height="1">
                        <h2 :class="{ 'strikethrough': !isValid }">แคนดิเดตนายกรัฐมนตรี</h2>
                        <table class="table">
                            <tr v-for="(c, i) in party.pm_candidates" :key="i">
                                <td>
                                    <a target="_blank" :href="'http://www.google.com/search?q=' + c.firstName + '+' + c.lastName">
                                        {{ c.title }} {{ c.firstName }} {{ c.lastName }}
                                        <i class="fas fa-external-link-alt ml-1"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr v-if="party.pm_candidates && party.pm_candidates.length == 0">
                                <td class="text-center">พรรคนี้ไม่ได้ส่งรายชื่อแคนดิเดตนายกรัฐมนตรี</td>
                            </tr>
                        </table>
                    </floating-card>

                    <floating-card :height="1">
                        <h2 :class="{ 'strikethrough': !isValid }">ผู้สมัคร ส.ส. บัญชีรายชื่อ</h2>
                        <p :class="{ 'invalid': !isValid }">ลงสมัคร {{ party.partyListCandidates ? party.partyListCandidates.length || 0 : 0 }} ที่นั่งจาก 150 ที่นั่ง</p>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อ-นามสกุล</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(c, i) in party.partyListCandidates" :key="i" v-if="i < 10">
                                    <td>
                                        {{ i + 1 }}
                                    </td>
                                    <td>
                                        <a target="_blank" :href="'http://www.google.com/search?q=' + c">
                                            {{ c }}
                                            <i class="fas fa-external-link-alt ml-1"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr v-if="party.partyListCandidates && party.partyListCandidates.length == 0">
                                    <td class="text-center" colspan="2">พรรคนี้ไม่ได้ส่งรายชื่อผู้สมัคร ส.ส. บรรชีรายชื่อ</td>
                                </tr>
                                <tr v-if="!party.partyListCandidates">
                                    <td class="text-center" colspan="2">ขออภัย ยังไม่มีข้อมูล</td>
                                </tr>
                            </tbody>
                        </table>

                        <button class="btn btn-outline-dark btn-block" @click="showAllPartyList = !showAllPartyList">
                            <span v-if="!showAllPartyList">
                                ดูรายชื่อทั้งหมด {{ party.partyListCandidates ? party.partyListCandidates.length || 0 : 0 }} คน
                                <i class="fas fa-chevron-down ml-1"></i>
                            </span>
                            <span v-else>
                                ปิดรายชื่อด้านล่าง
                                <i class="fas fa-chevron-up ml-1"></i>
                            </span>
                        </button>

                        <transition name="list-fade">
                            <table class="table" v-if="showAllPartyList">
                                <thead>
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>ชื่อ-นามสกุล</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(c, i) in party.partyListCandidates" :key="i" v-if="i >= 10">
                                        <td>
                                            {{ i + 1 }}
                                        </td>
                                        <td>
                                            <a target="_blank" :href="'http://www.google.com/search?q=พรรค' + c.firstName + '+' + c.lastName">
                                                {{ c }}
                                                <i class="fas fa-external-link-alt ml-1"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr v-if="party.partyListCandidates && party.partyListCandidates.length == 0">
                                        <td class="text-center" colspan="2">พรรคนี้ไม่ได้ส่งรายชื่อผู้สมัคร ส.ส. บรรชีรายชื่อ</td>
                                    </tr>
                                    <tr v-if="!party.partyListCandidates">
                                        <td class="text-center" colspan="2">ขออภัย ยังไม่มีข้อมูล</td>
                                    </tr>
                                </tbody>
                            </table>
                        </transition>
                    </floating-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FloatingCard from "@/components/FloatingCard.vue";
import Accordion from "@/components/Accordion.vue";
import Candidate from "@/components/Candidate.vue";
import Navbar from "@/components/Navbar.vue";
import utils from "@/utils.js";

export default {
    name: "PartyPage",
    components: { FloatingCard, Accordion, Candidate, Navbar },
    props: ["candidates", "areas", "parties"],
    data() {
        return {
            party: {
                candidateCount: ""
            },
            partyName: "",
            showAllPartyList: false
        };
    },
    computed: {
        partyLogo() {
            return "/static/logo/" + this.partyName + ".png";
        },
        isValid() {
            return !this.party.dissolved
        }
    },
    beforeMount() {
        this.partyName = this.$route.params.partyName;
        if (this.parties && this.parties[this.partyName])
            this.party = this.parties[this.partyName];
    },
    beforeUpdate() {
        this.partyName = this.$route.params.partyName;
        if (this.parties && this.parties[this.partyName])
            this.party = this.parties[this.partyName];
    },
    watch: {
        parties: function() {
            // watch it
            // this.$forceUpdate()
            this.party = this.parties[this.partyName];
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.party-logo {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
}

.party-name {
    font-size: 18pt;
    font-weight: bold;
}

.table.less-padding td, .table.less-padding th {
    padding: 0.5rem;
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
