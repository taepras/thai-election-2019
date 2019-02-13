<template>
    <div class="card mb-3 floating-card" :style="shadowStyle">
        <div class="card-body">
            <slot>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "FloatingCard",
    props: {
        height: {
            type: Number,
            default: 3
        }
    },
    computed: {
        shadowStyle () {
            // this.height;
            return { boxShadow: `0px ${this.height * 3}px ${this.height * 10}px rgba(0, 0, 0, 0.12)` }
        }
    }
};
</script>

<style>
.floating-card {
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    border: none;
    transition: all 0.5s;
    border-radius: 10px;
}

.floating-card .row {
    margin-left: -7.5px;
    margin-right: -7.5px;
}

.floating-card-col {
    padding-left: 7.5px;
    padding-right: 7.5px;
}

.floating-card.expanded {
    transform: scale(1.03);
    margin: 20px 0 30px !important;
}
</style>


