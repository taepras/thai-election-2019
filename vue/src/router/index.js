import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/components/HomePage";
import RegionPage from "@/components/RegionPage";
import PartyPage from "@/components/PartyPage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage
    },
    {
      path: "/region",
      name: "Region",
      component: RegionPage
    },
    {
      path: "/region/:province/:area",
      name: "Region",
      component: RegionPage
    },
    {
      path: "/party/:partyName",
      name: "Party",
      component: PartyPage
    }
  ],
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    // workaround for flickering transition problem from
    // https://github.com/quasarframework/quasar/issues/1466

    let position = { x: 0, y: 0 }
    // Keep scroll position when using browser buttons
    if (savedPosition) {
      position = savedPosition
    }

    // Workaround for transitions scrolling to the top of the page
    // However, there are still some problems being fixed by the vue team
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(position)
      }, 250)
    })
  }
});
