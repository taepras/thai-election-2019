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
                        <div class="party-logo" :style="'background-image:url(\'' + partyLogo + '\')'"></div>
                    </div>
                </div>
                <div class="col-12 text-center">
                    <h1>พรรค{{ partyName }}</h1>
                    <table class="table mt-3">
                        <tr>
                            <td class="text-right"><b>ส.ส. เขต</b></td>
                            <td class="text-left">ลงสมัคร <b>{{ party ? party.candidateCount : 'N/A' }}</b> จาก 350 เขต</td>
                        </tr>
                        <tr>
                            <td class="text-right"><b>ส.ส. บัญชีรายชื่อ</b></td>
                            <td class="text-left">ลงสมัคร <b>{{ party ? party.partyListCount || 'N/A' : 'N/A' }}</b> จาก 350 ที่นั่ง</td>
                        </tr>
                        <tr>
                            <td class="text-right"><b>รวม</b></td>
                            <td class="text-left">ลงสมัคร <b>{{ party ? party.candidateCount + party.partyListCount || 'N/A' : 'N/A' }}</b> จาก 500 ที่นั่ง</td>
                        </tr>
                    </table>
                    <!-- <p>
                        : 
                        ส.ส.บัญชีรายชื่อ: ลงสมัคร {{ party ? party.candidateCount : 'N/A' }} จาก 150 ที่นั่ง</p>
                    </p> -->
                    <a target="_blank" :href="'http://www.google.com/search?q=พรรค' + partyName + '+นโยบาย'" class="btn btn-primary btn-block">
                        ค้นหานโยบายพรรคใน Google <i class="fas fa-external-link-alt ml-1"></i>
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <hr class="my-4">
                    <floating-card class="mt-3" :height="1">
                        <h2>แคนดิเดตนายกรัฐมนตรี</h2>
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
                        <h2>ผู้สมัคร ส.ส. บัญชีรายชื่อ</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ชื่อ-นามสกุล</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(c, i) in party.partylist_candidates" :key="i">
                                    <td>
                                        {{ i + 1 }}
                                    </td>
                                    <td>
                                        <a target="_blank" :href="'http://www.google.com/search?q=พรรค' + c.firstName + '+' + c.lastName">
                                            {{ c.title }} {{ c.firstName }} {{ c.lastName }}
                                            <i class="fas fa-external-link-alt ml-1"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr v-if="party.partylist_candidates && party.partylist_candidates.length == 0">
                                    <td class="text-center" colspan="2">พรรคนี้ไม่ได้ส่งรายชื่อผู้สมัคร ส.ส. บรรชีรายชื่อ</td>
                                </tr>
                                <tr v-if="!party.partylist_candidates">
                                    <td class="text-center" colspan="2">ขออภัย ยังไม่มีข้อมูล</td>
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
            partyName: ""
        };
    },
    computed: {
        partyLogo() {
            return "/static/logo/" + this.partyName + ".png";
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
</style>
