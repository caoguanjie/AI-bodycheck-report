/* eslint-disable @typescript-eslint/ban-ts-comment */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus';
import { RouteLocationNormalized, Router } from 'vue-router'
import useStore from '@/store';
NProgress.configure({ showSpinner: false })
import ENV from '@/environment/index';
const whiteList = ['/login', '/404']
import { deleteCache } from './utils';
import { isPlatform } from '@/utils/base/platform';

export const createRouterGuards = (router: Router) => {
    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
        // 开启进度条
        NProgress.start()
        next()

    })

    router.afterEach((to: RouteLocationNormalized) => {
        // 关闭 进度条
        NProgress.done()
        // 设置页面标题
        if (to.meta.title) {
            document.title = to.meta.title + ' - ' + ENV.project.title
        }
    })
}

