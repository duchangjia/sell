import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/goods.vue'
import ratings from '@/components/ratings/ratings.vue'
import seller from '@/components/seller/seller.vue'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
  	{
  		path: '/',
  		redirect:'/sell/dist/goods',
  	},
  	{
      path: '/sell/dist/goods',
      component: Goods
    },
    {
      path: '/sell/dist/ratings',
      component: ratings
    },
    {
      path: '/sell/dist/seller',
      component: seller,
    },  
  ],
  linkActiveClass:'active'
})
 /*Router.push('/goods')*/
