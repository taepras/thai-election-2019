<template>
  <div id="app">
    <transition
        name="fade"
        mode="out-in"
      >
    <router-view :candidates="candidates" :areas="areas" :parties="parties" />
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
                axios.get("/static/data/areas.json"),
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
                if (!parties[party].candidateCount)
                    parties[party].candidateCount = 0;
            }
            this.candidates = candidates
            this.areas = areas
            this.parties = parties
        }
    }
};
</script>

<style>
body {
    padding: 10px;
    background-color: #fafafa;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s all;
}

.fade-enter {
  opacity: 0;
  transform: translateX(50px);
}

.fade-leave-active {
  opacity: 0;
  transform: translateX(-50px);
}

.btn {
  border-radius: 10px;
}

h1, h2, h3, h4, h5, h6, .accent {
  font-family: 'Athiti', sans-serif;
}

h1 { font-size: 24pt; }
h2 { font-size: 20pt; }
h3 { font-size: 18pt; }
h4 { font-size: 16pt; }
h5 { font-size: 14pt; }
h6 { font-size: 12pt; }
</style>
