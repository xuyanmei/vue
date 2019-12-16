export default [
  {
    path: "/shoppingCart",
    name: "shoppingCart",
    component: () => import(/* webpackChunkName: "login" */ "./index"),
    meta: { title: "我的购物车" }
  },
  {
    path: "/password",
    name: "password",
    component: () => import(/* webpackChunkName: "login" */ "./password"),
    meta: { title: "密码支付" }
  }
];