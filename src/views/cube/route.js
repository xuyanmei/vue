export default [
  {
    path: "/cube",
    name: "cube",
    component: () => import(/* webpackChunkName: "login" */ "./index"),
    meta: { title: "旋转魔方" }
  },
]