<template>
    <div id="app">
        <transition name="page-fade" mode="out-in">
            <!-- <keep-alive> -->
            <router-view :candidates="candidates" :areas="areas" :parties="parties" />
            <!-- </keep-alive> -->
        </transition>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "App",
    data: function() {
        return {
            candidates: {},
            areas: {},
            parties: {}
        };
    },
    created: function() {
        var thisComponent = this;
        axios
            .all([
                axios.get("/static/data/candidates.json"),
                axios.get("/static/data/areas_complete.json"),
                axios.get("/static/data/parties.json")
            ])
            .then(
                axios.spread(function(candidates, areas, parties) {
                    thisComponent.preprocessData(
                        candidates.data,
                        areas.data,
                        parties.data
                    );
                })
            );
    },
    methods: {
        preprocessData(candidates, areas, parties) {
            var partyMap = {};
            for (var province in candidates) {
                for (var area in candidates[province]) {
                    for (var number in candidates[province][area]) {
                        var party = candidates[province][area][number].party;
                        if (!parties[party])
                            parties[party] = { candidateCount: 0 };
                        if (!parties[party].candidateCount)
                            parties[party].candidateCount = 0;
                        // console.log(party, parties[party].candidateCount)
                        parties[party].candidateCount++;
                    }
                }
            }

            for (var p in parties) {
                if (!parties[p].candidateCount) parties[p].candidateCount = 0;
                parties[p].partyListCandidateCount = parties[p].partyListCandidates
                    ? parties[p].partyListCandidates.length
                    : 0;

                parties[p].allCount = parties[p].candidateCount + parties[p].partyListCandidateCount
                // if (!parties[p].candidateCount) parties[p].partyListCount = 0;
                // if (!parties[p].candidateCount) parties[p].partyListCount = 0;
            }
            this.candidates = candidates;
            this.areas = areas;
            this.parties = parties;
        }
    }
};
</script>

<style>
body {
    margin: 0;
    padding: 0px 10px;
    background-color: #f8f8fa;
}

.page-fade-enter-active,
.page-fade-leave-active {
    transition: 0.2s all;
}

.page-fade-enter {
    opacity: 0;
    transform: translateX(50px);
}

.page-fade-leave-active {
    opacity: 0;
    transform: translateX(-50px);
}

.btn,
.alert,
.form-control {
    border-radius: 10px;
}

.navbar-padding {
    padding-top: 56px;
}

.fill-page-height {
    height: 100vh;
}

h1,
h2,
h3,
h4,
h5,
h6,
.accent {
    font-family: "Athiti", sans-serif;
    font-weight: bold;
}

h1 {
    font-size: 24pt;
}
h2 {
    font-size: 20pt;
}
h3 {
    font-size: 18pt;
}
h4 {
    font-size: 16pt;
}
h5 {
    font-size: 14pt;
}
h6 {
    font-size: 12pt;
}

.not-bold {
    font-weight: normal;
}

.highlight {
    font-weight: bold;
    background: linear-gradient(to right, #fff1adff 50%, #ffffff00 50%);
    background-size: 200% 100%;
    background-position: 100% 0;
    transition: background-position 0.5s;
    transition-delay: 400ms;
}

.highlight.active {
    background-position: 0 0;
}

.container {
    max-width: 600px;
}

.clickable {
    cursor: pointer;
}

.clickable:hover {
    opacity: 0.8;
}
</style>
