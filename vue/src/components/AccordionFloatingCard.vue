<template>
    <floating-card :class="{ 'expanded': isExpanded }">
        <accordion @update="onAccordionUpdate">
            <template v-slot:above class="clickable">
                <div class="row">
                    <div class="col-10 floating-card-col">
                        <slot name="above" :isExpanded="isExpanded">
                        </slot>
                    </div>
                    <div class="col-2 floating-card-col text-right">
                        <i class="fas fa-chevron-down" :class="{ 'expanded': isExpanded }"></i>
                    </div>
                </div>
            </template>
            <template v-slot:below>
                <hr>
                <slot name="below" :isExpanded="isExpanded">
                </slot>
            </template>
        </accordion>
    </floating-card>
</template>

<script>
import Accordion from "@/components/Accordion.vue";
import FloatingCard from "@/components/FloatingCard.vue";

export default {
    name: "AccordionFloatingCard",
    components: { Accordion, FloatingCard },
    data: function() {
        return {
            isExpanded: false
        };
    },
    methods: {
        onAccordionUpdate(state) {
            this.isExpanded = state;
            this.$emit('change', this.isExpanded)
        }
    }
};
</script>

<style>
.fa-chevron-down {
    transition: all 0.5s;
    line-height: 3;
    vertical-align: middle;
}

.fa-chevron-down.expanded {
    transform: rotate(180deg);
}
</style>


