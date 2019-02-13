import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import RegionPage from '@/components/RegionPage'
import PartyPage from '@/components/PartyPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/region',
      name: 'Region',
      component: RegionPage
    },
    {
      path: '/region/:province/:area',
      name: 'Region',
      component: RegionPage
    },
    {
      path: '/party/:partyName',
      name: 'Party',
      component: PartyPage
    }
  ]
})
