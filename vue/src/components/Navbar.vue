<template>
    <nav class="navbar fixed-top navbar-dark bg-primary">
        <div class="row">
            <div class="col col-2 text-left">
                <slot name="left">
                    <i class="fas fa-arrow-left" @click="back(-1)"></i>
                </slot>
            </div>
            <div class="col col-8 text-center">
                <slot name="center">
                    Title
                </slot>
            </div>
            <div class="col col-2 text-right">
                <slot name="right">
                </slot>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
};
</script>

<style>
.navbar {
    padding-left: 25px;
    padding-right: 25px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    /* border-bottom: 3px solid #f00; */
}

.navbar .col {
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    font-size: 1.25rem;
    white-space: nowrap;
}

.navbar-dark .col,
.navbar-dark .col a,
.navbar-dark .col a:link,
.navbar-dark .col a:active,
.navbar-dark .col a:visited {
    color: #ffffff;
}

.row {
    flex-grow: 1;
}
</style>