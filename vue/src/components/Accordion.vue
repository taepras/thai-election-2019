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
            isExpanded: false
        }
    },
    methods: {
        toggleAccordion: function() {
            this.isExpanded = !this.isExpanded
            this.$emit('update', this.isExpanded)
        }
    },
    computed: {
        accordionClasses: function() {
            return {
                "is-closed": !this.isExpanded,
                "is-primary": this.isExpanded,
                "is-dark": !this.isExpanded
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
    max-height: 600px;
    transition: 0.5s all;
}
.is-closed .below {
    max-height: 0;
}
</style>


