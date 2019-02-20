<template>
    <div class="navbar-padding">
        <navbar>
            <template v-slot:left>
                <router-link :to="{ path: '/' }">
                    <i class="fas fa-arrow-left"></i>
                </router-link>
            </template>
            <template v-slot:center>
                <span class="accent">
                    รายชื่อพรรคทั้งหมด
                </span>
            </template>
            <template v-slot:right>
            </template>
        </navbar>
        <div class="container">
            <h1 class="mt-4">พรรคทั้งหมดที่ลงสมัครรับเลือกตั้ง 2562</h1>
            <div class="row">
                <div class="col">
                    <list-of-parties :parties="parties"></list-of-parties>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Candidate from "@/components/Candidate.vue";
import AccordionFloatingCard from "@/components/AccordionFloatingCard.vue";
import ListOfParties from "@/components/ListOfParties.vue";
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
        Modal,
        ListOfParties
    },
    props: ["candidates", "areas", "parties"]
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
