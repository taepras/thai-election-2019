<template>
    <div class="home">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="d-flex flex-column fill-page-height justify-content-center pb-5">
                        <div class="mb-5">
                            <h5 class="mb-0 not-bold text-muted">เตรียมตัวเลือกตั้ง 2562</h5>
                            <h3 class="m-0 text-muted">"24 มีนาฯ เข้าคูหา กา 1 ได้ถึง 3"</h3>
                            <!-- <hr> -->
                        </div>
                        <floating-card :height="5" class="pb-1">
                            <h2 class="m-0 mb-3">ค้นหารายชื่อ ส.ส. เขต</h2>
                            <!-- <h3>เลือกเขตเลือกตั้ง</h3> -->
                            <area-finder :areas="areas" :value="selected" @input="selected = $event" @select="go"></area-finder>
                            <!-- <button class="btn btn-primary btn-block" @click="go" :disabled="!selected.selectedArea" :class="{ 'btn-secondary': !selected.selectedArea }">ดูรายชื่อผู้สมัคร</button> -->
                        </floating-card>
                        <router-link class="btn btn-outline-secondary btn-block no-shadow mt-4" :to="{ 'path': '/all_parties' }">
                            ดูข้อมูลทุกพรรคที่ลงเลือกตั้ง 2562
                        </router-link>
                        <p class="mb-5 mt-3" style="line-height: 1.2">
                            <small>
                            รายชื่ออัพเดทล่าสุดวันที่ 7 มี.ค. 2562
                            <br>
                            ทีมงาน: <a href="https://taepras.com">ธนวิชญ์ ประสงค์พงษ์ชัย</a>, <a href="https://github.com/xvista">อติคุณ ออไอศูรย์</a> 
                            <br>
                            ติดต่อทีมงาน เสนอแนะ ติชม ได้ที่
                            <a href="mailto:taepras@gmail.com">taepras@gmail.com</a>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
            <floating-card :height="3" class="fixed-bottom bottom-suggest" :class="{ 'active': showVideo }">
                <div class="row clickable">
                    <div class="floating-card-col col-10 no-wrap" @click="showVideo = !showVideo">
                        ดูวิดีโอกติกาเลือกตั้ง 2562 จาก กกต.
                    </div>
                    <div class="floating-card-col col-2 text-right" @click="showVideo = !showVideo">
                        <i class="fas fa-chevron-up ml-1"></i>
                    </div>
                </div>
                <div class="row">
                    <div class="floating-card-col col-12">
                        <hr>
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/_bWyDxZZ7AE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </floating-card>
            <transition name="modal">
                <div class="vue-modal-mask" v-if="showVideo" @click.self="showVideo = false">
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import FloatingCard from "@/components/FloatingCard.vue";
import AreaFinder from "@/components/AreaFinder.vue";
import utils from "@/utils.js";

export default {
    name: "HomePage",
    props: ["areas"],
    components: {
        FloatingCard,
        AreaFinder
    },
    data() {
        return {
            selected: {
                selectedProvince: "",
                selectedArea: ""
            },
            showVideo: false
        };
    },
    methods: {
        go(e) {
            this.selected.selectedProvince = e.selectedProvince
            this.selected.selectedArea = e.selectedArea
            this.$router.push({
                path: `/region/${utils.provinceToUrl(
                    this.selected.selectedProvince
                )}/${this.selected.selectedArea}`
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
    /* background-color: #eee; */
}

.bottom-suggest {
    margin: 0 25px;
    transition: all 0.5s;
    transform: translateY(calc(100% - 45px));
    z-index: 10000;
    /* max-width: 600px; */
}

@media (min-width: 768px) {
    .bottom-suggest {
        margin: auto;
        max-width: 600px;
    }
}

.bottom-suggest.active {
    transform: translateY(0);
}

.bottom-suggest.active .fa-chevron-up {
    transition: all 0.5s;
}

.bottom-suggest.active .fa-chevron-up {
    transform: rotate(180deg);
}

.no-wrap {
    white-space: nowrap;
}

.vue-modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}
</style>
