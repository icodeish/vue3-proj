import { createRouter,createWebHashHistory } from 'vue-router'
const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/login',
        name: 'login',
        component: () => import(/*webpackChunkName:'Login'*/ '@/components/login/login.vue')
    },
    {
        path: '/index',
        name: 'index',
        component: () => import(/*webpackChunkName:'Index'*/ '@/components/index/index.vue'),
        redirect:'/user',
        children:[{
            path: '/user',
            name: 'user',
            component: () => import(/*webpackChunkName:'User'*/ '@/components/user/user.vue'),
        },
        {
            path: '/updatepwd',
            name: 'updatepwd',
            component: () => import(/*webpackChunkName:'update'*/ '@/components/update/updatepwd.vue'),
        }
        
    ]
    },
    
   
]
const router =createRouter({
    history:createWebHashHistory(),
    routes
})
export default router