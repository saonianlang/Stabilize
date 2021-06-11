import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set,
    loginWhite: false            if set true, login will not be validated
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/private',
        children: [
            {
                path: 'porfolio',
                name: 'porfolio',
                component: () => import('@/pages/porfolio')
            },
            {
                path: 'private',
                name: 'private',
                component: () => import('@/pages/private')
            },
            {
                path: 'stake',
                name: 'stake',
                component: () => import('@/pages/stake')
            },
            {
                path: 'bond',
                name: 'bond',
                component: () => import('@/pages/bond')
            },
            {
                path: '404',
                name: '404',
                component: () => import('@/pages/error-page/404'),
                hidden: true,
                meta: {loginWhite: true, breadcrumb: false, title: '404'}
            }
        ]
    },
    {path: '*', redirect: '/404', hidden: true, meta: {breadcrumb: false}}
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{path: '*', redirect: '/404', hidden: true, meta: {breadcrumb: false}}];

const createRouter = () =>
    new Router({
        mode: 'history', // require service support
        scrollBehavior: () => ({y: 0}),
        routes: [...constantRoutes, ...asyncRoutes]
    });

const router = createRouter();

export default router;
