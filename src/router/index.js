import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import User from "@/views/User.vue";
import Welcome from "@/views/Welcome.vue";
import Right from "@/views/Right.vue";
import Roles from "@/views/Role.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import GoodList from "@/views/GoodList.vue";
import GoodPara from "@/views/GoodPara.vue";
import GoodClass from "@/views/GoodClass.vue";
import OrderList from "@/views/OrderList.vue";
import DataSta from "@/views/DataSta.vue";
import store from "@/store";
Vue.use(VueRouter);
// 定义路由规则
const usersRule = { path: "users", component: User };
const rightsRule = { path: "rights", component: Right };
const rolesRule = { path: "roles", component: Roles };
const goodlistRule = { path: "goodlist", component: GoodList };
const goodparaRule = { path: "goodpara", component: GoodPara };
const goodclassRule = { path: "goodclass", component: GoodClass };
const orderlistRule = { path: "orderlist", component: OrderList };
const datastaRule = { path: "datasta", component: DataSta };
// 定义路由对应路由规则
const mapRule = {
  users: usersRule,
  rights: rightsRule,
  roles: rolesRule,
  goodlist: goodlistRule,
  goodpara: goodparaRule,
  goodclass: goodclassRule,
  orderlist: orderlistRule,
  datasta: datastaRule
};
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/home",
    component: Home,
    children: [{ path: "/", component: Welcome }]
  },
  { path: "*", component: ErrorPage }
];

const router = new VueRouter({
  routes
});
// 获取动态路由规则
export function getDynamicRouterStyle() {
  console.log(router,store, 111111);
  const currentDynamicRoutes = router.options.routes;
  // 一级权限
  const rights = store.state.muneRights;
  rights.forEach(value => {
    // 二级权限
    const TwoRights = value.children;
    TwoRights.forEach(value => {
      // 三级权限
      const ThreeRights = value.rights || [];
      const pathName = value.path;
      const temp = mapRule[pathName];
      temp.meta = ThreeRights;
      currentDynamicRoutes[2].children.push(temp)
    })
  })
  router.addRoutes(currentDynamicRoutes)

}
// 设置全局路由拦截
router.beforeEach((to, from, next) => {
  // 访问‘/login’放行
  if (to.path == "/login") return next();
  // 提取存储token
  var token = window.sessionStorage.getItem("token");
  // 判断是否有token
  if (!token) return next("/login");
  next();
});


export default router;
