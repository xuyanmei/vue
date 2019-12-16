export default[
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ './index'),
    meta: { title: '购你喜欢' }
  },
  {
    path: '/consumerNotice',
    name: 'consumerNotice',
    component: () => import(/* webpackChunkName: "consumerNotice" */ './consumerNotice'),
    meta: { title: '消费者告知书' }
  },  
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './login'),
    meta: { title: '注册/登录' }
  },  
  
]
  
