<template>

    <accordion-floating-card>
        <template v-slot:above>
            <div class="row candidate">
                <div class="col-2 floating-card-col candidate-number">{{ +candidate.number }}</div>
                <div class="col-2 floating-card-col text-center">
                    <div class="logo" :style="'background-image:url(\'' + partyLogo + '\')'"></div>
                </div>
                <div class="col-8 floating-card-col text-nowrap party-name">
                    <span>
                        <b class="accent">พรรค{{candidate.party}}</b><br> {{candidate.title}} {{candidate.firstName}} {{candidate.lastName}}</span>
                </div>
            </div>
        </template>
        <template v-slot:below>
            <div class="row candidate-details">
                <div class="col">
                    ถ้าเลือก
                    <b>{{candidate.firstName}} {{candidate.lastName}}</b> จะได้...
                    <ol>
                        <li>เพิ่มโอกาสให้
                            <b>{{candidate.title}} {{candidate.firstName}} {{candidate.lastName}}</b> เป็นผู้แทนเขต</li>
                        <li>เพิ่มที่นั่งให้ ส.ส. บัญชีรายชื่อของ
                            <b>พรรค{{candidate.party}}</b> (ทุกเสียงที่ได้จะถูกนำไปคำนวณจำนวน ส.ส. บัญชีรายชื่อ โดยไม่จำเป็นต้องชนะเลือกตั้งในเขต)
                        </li>
                        <li>
                            <span :class="{ 'strikethrough': parties[candidate.party].pm_candidates.length == 0 }">
                                ถ้า <b>พรรค{{candidate.party}}</b> ได้ที่นั่ง ส.ส. ในสภา 5% ขึ้นไป บุคคลที่พรรคเสนอชื่อเป็นนายกฯ ต่อไปนี้ มีสิทธิ์ได้รับเลือกในสภา:
                            </span>
                            <ul>
                                <li v-for="(c, i) in parties[candidate.party].pm_candidates" :key="i">
                                    {{ c.title }} {{ c.firstName }} {{ c.lastName }}
                                </li>
                                <li v-if="parties[candidate.party].pm_candidates.length == 0" class="text-muted"><i>[พรรคนี้ไม่ได้ส่งชื่อแคนดิเดตนายกฯ]</i></li>
                            </ul>
                        </li>
                    </ol>

                    <!-- <a target="_blank" :href="'http://www.google.com/search?q=พรรค' + candidate.party + '+นโยบาย'" class="btn btn-primary btn-block">
                                ค้นหานโยบายพรรคใน Google
                            </a> -->
                    <router-link :to="'/party/' + candidate.party" class="btn btn-primary btn-block">
                        ดูข้อมูลผู้สมัครของพรรค{{ candidate.party }}
                    </router-link>
                    <a target="_blank" :href="'http://www.google.com/search?q=' + candidate.firstName + '+' + candidate.lastName" class="btn btn-outline-secondary btn-block">
                        ค้นหาผู้สมัครใน Google
                        <i class="fas fa-external-link-alt ml-1"></i>
                    </a>
                </div>
            </div>
        </template>
    </accordion-floating-card>
</template>

<script>
import AccordionFloatingCard from "@/components/AccordionFloatingCard.vue";

export default {
    name: "Candidate",
    components: { AccordionFloatingCard },
    props: ["candidate", "parties"],
    computed: {
        partyLogo() {
            return "/static/logo/" + this.candidate.party + ".png";
        }
    }
};
</script>

<style>
.candidate-number {
    font-size: 200%;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
}

.disabled {
    background-color: #eee;
    opacity: 0.5;
}

.logo {
    /* width: 40px; */
    height: 100%;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 10%;
}

.logo.blank {
    background-color: #cccccc;
}

.party-name span {
    background-color: #fff;
    z-index: 10;
    padding-right: 5px;
}

ul, ol {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-inline-start: 20px;
}

ol {
    padding-inline-start: 15px;
}

.strikethrough {
    text-decoration: line-through;
}
</style>


