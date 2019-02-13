<template>
    <div class="accordion" :class="accordionClasses">
        <div @click="toggleAccordion" class="above">
            <slot name="above">
            </slot>
        </div>
        <div class="below">
            <slot name="below">
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            isOpen: false
        }
    },
    methods: {
        toggleAccordion: function() {
            this.isOpen = !this.isOpen
            this.$emit('update', this.isOpen)
        }
    },
    computed: {
        accordionClasses: function() {
            return {
                "is-closed": !this.isOpen,
                "is-primary": this.isOpen,
                "is-dark": !this.isOpen
            };
        }
    }
};
</script>

<style>
.above {
    cursor: pointer;
}
.below {
    overflow: hidden;
    max-height: 500px;
    transition: 0.5s all;
}
.is-closed .below {
    max-height: 0;
}
</style>


