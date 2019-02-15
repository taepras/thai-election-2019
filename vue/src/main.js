// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// Vue.directive('click-outside', {
//   bind () {
//       this.event = event => this.vm.$emit(this.expression, event)
//       this.el.addEventListener('click', this.stopProp)
//       document.body.addEventListener('click', this.event)
//   },   
//   unbind() {
//     this.el.removeEventListener('click', this.stopProp)
//     document.body.removeEventListener('click', this.event)
//   },

//   stopProp(event) { event.stopPropagation() }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


