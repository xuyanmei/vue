import Vue from 'vue'
import Router from 'vue-router'

import home from '@/views/home/route'
import detail from '@/views/detail/route'
import shoppingCart from '@/views/shoppingCart/route'
import cube from '@/views/cube/route'
Vue.use(Router)
const router=new Router({
  routes:[
    ...home,
    ...detail,
    ...shoppingCart,
    ...cube
  ]
})
router.beforeEach(async(to,from,next)=>{
  next()
})
export default router