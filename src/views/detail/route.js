export default [
  {
    path: "/detail",
    name: "detail",
    component: () => import(/* webpackChunkName: "login" */ "./index"),
    meta: { title: "详情" }
  },
  {
    path: "/goodsDetail",
    name: "/goodsDetail",
    component: () => import(/* webpackChunkName: "login" */ "./goodsDetail"),
    meta: { title: "商品详情" }
  },

];
