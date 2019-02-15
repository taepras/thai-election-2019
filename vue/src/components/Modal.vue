<template>
    <transition name="modal">
        <div class="vue-modal-mask">
            <div class="vue-modal-wrapper" v-on:click.self="$emit('close')">
                <floating-card :height="5" class="vue-modal-container">
                    <div class="vue-modal-header">
                        <div class="float-right">
                            <i class="fas fa-times" @click="$emit('close')"></i>
                        </div>
                        <h3>
                            <slot name="header"></slot>
                        </h3>
                    </div>
                    <hr>
                    <div class="vue-modal-body">
                        <slot name="body">
                        </slot>
                    </div>
                </floating-card>

                <!-- <div class="modal-container">

                </div> -->
            </div>
        </div>
    </transition>
</template>


<script>
import FloatingCard from "@/components/FloatingCard.vue";

export default {
    name: "Modal",
    components: {
        FloatingCard
    }
};
</script>


<style>
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

.vue-modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    padding: 25px;
}

.vue-modal-container {
    width: 100%;
    margin: 0px auto;
    transition: all 0.3s ease;
}

.vue-modal-header h3 {
    margin-top: 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .vue-modal-container,
.modal-leave-active .vue-modal-container {
    -webkit-transform: translateY(-100px);
    transform: translateY(-100px);
}

</style>
