import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import useStore from '@/store';
import { App } from 'vue';
import { createRouterGuards } from './routerGuard';

/**
 * 注意: sub-menu 仅在route children.length>=1 时出现
 * 详情请看: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item 不会显示在侧边栏中 sidebar(默认值为false)
 * alwaysShow: true               if set true, 将始终显示根菜单
 *                                 如果未设置alwaysShow，则当项目有多个子路线时,
 *                                 它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           重定向：如果设置为noRedirect，noRedirect将不会在面包屑中重定向
 * name:'router-name'             'router-name'该名称由<keep-alive>使用 (必须设置!!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色 (你可以设置多个角色)
    title: 'title'               侧边栏和面包屑中显示的名称（推荐设置）、多页签的标签名字
    icon: 'svg-name'/'el-icon-x' 侧边栏要显示的图标
    breadcrumb: false            如果设置为false，则项目将隐藏在breadcrumb中（默认为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径
    affix: true                  如果设置为true,可以固定在标签页，tag-view
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基页
 * 所有角色都可以访问
 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home',
    meta: { hidden: true }
  },
  {
    path: '/Home',
    component: () => import('@/views/Home/index.vue'),
    name: 'Home',
    meta: { title: '首页', icon: 'fits-home', affix: true, hidden: true }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true }
  },



  //   404页必须放在末尾！！！
  { path: '/:catchAll(.*)', redirect: '/404', meta: { hidden: true } }
];





// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});

// 重置路由
export function resetRouter() {
  const { permission } = useStore();
  permission.routes.forEach(route => {
    const name = route.name;
    if (name && router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
}


/**
 * 定义一个方法，方便main.ts直接调用。
 * @param app
 */
export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
  // 路由方法的拓展，改写push、replace等写法
  // RouterUtils(app.config.globalProperties.$router)

}

export default router;