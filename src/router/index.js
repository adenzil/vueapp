import Vue from 'vue'
import Router from 'vue-router'

import Trackers from '@/components/Trackers'
import TrackerData from '@/components/TrackerData'
// import MyChart from '@/components/MyChart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Trackers',
      component: Trackers
    },
    {
      path: '/:element',
      name: 'TrackerData',
      component: TrackerData
    }
  ]
})
