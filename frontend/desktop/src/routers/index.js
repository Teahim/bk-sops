/**
* Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community
* Edition) available.
* Copyright (C) 2017-2019 THL A29 Limited, a Tencent company. All rights reserved.
* Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
* http://opensource.org/licenses/MIT
* Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
* an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
* specific language governing permissions and limitations under the License.
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
import { setAtomConfigApiUrls } from '@/config/setting.js'

const NotFoundComponent = () => import('@/components/layout/NotFoundComponent.vue')

const Home = () => import('@/pages/home/index.vue')

const Template = () => import('@/pages/template/index.vue')
const TemplateEdit = () => import('@/pages/template/TemplateEdit/index.vue')
const TemplateList = () => import('@/pages/template/TemplateList/index.vue')

const Task = () => import('@/pages/task/index.vue')
const TaskList = () => import('@/pages/task/TaskList/index.vue')
const TaskCreate = () => import('@/pages/task/TaskCreate/index.vue')
const TaskExecute = () => import('@/pages/task/TaskExecute/index.vue')

const ConfigPage = () => import('@/pages/config/index.vue')

const AppMaker = () => import('@/pages/appmaker/index.vue')
const AppMakerTaskHome = () => import('@/pages/appmaker/AppTaskHome/index.vue')

const ProjectHome = () => import('@/pages/project/index.vue')

const ErrorPage = () => import('@/pages/error/index.vue')

const Admin = () => import('@/pages/admin/index.vue')
const Statistics = () => import('@/pages/admin/statistics/index.vue')
const StatisticsTemplate = () => import('@/pages/admin/statistics/Template/index.vue')
const StatisticsInstance = () => import('@/pages/admin/statistics/Instance/index.vue')
const StatisticsAtom = () => import('@/pages/admin/statistics/Atom/index.vue')
const StatisticsAppmaker = () => import('@/pages/admin/statistics/Appmaker/index.vue')
const CommonTemplate = () => import('@/pages/admin/common/template.vue')

const FunctionHome = () => import('@/pages/functor/index.vue')

const AuditHome = () => import('@/pages/audit/index.vue')

const periodic = () => import('@/pages/periodic/index.vue')
const periodicTemplateList = () => import('@/pages/periodic/PeriodicList/index.vue')

Vue.use(VueRouter)

const routers = new VueRouter({
    base: SITE_URL,
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: to => {
                return `/project/home/${store.state.project.project_id}/`
            }
        },
        {
            path: '/project/home/:project_id',
            component: Home,
            props: (route) => ({
                project_id: route.params.project_id
            })
        },
        {
            path: '/template',
            component: Template,
            children: [
                {
                    path: '',
                    component: NotFoundComponent
                },
                {
                    path: 'home/:project_id/',
                    component: TemplateList,
                    props: (route) => ({
                        project_id: route.params.project_id,
                        common: route.query.common,
                        common_template: route.query.common_template
                    })
                },
                {
                    path: 'common/:project_id/',
                    component: TemplateList,
                    props: (route) => ({
                        project_id: route.params.project_id,
                        common: 1,
                        common_template: 'common'
                    })
                },
                {
                    path: 'edit/:project_id?/',
                    component: TemplateEdit,
                    props: (route) => ({
                        project_id: route.params.project_id,
                        template_id: route.query.template_id,
                        type: 'edit',
                        common: route.query.common
                    })
                },
                {
                    path: 'new/:project_id/',
                    component: TemplateEdit,
                    props: (route) => ({
                        project_id: route.params.project_id,
                        type: 'new',
                        common: route.query.common
                    })
                },
                {
                    path: 'clone/:project_id/',
                    component: TemplateEdit,
                    props: (route) => ({
                        project_id: route.params.project_id,
                        template_id: route.query.template_id,
                        type: 'clone',
                        common: route.query.common
                    })
                },
                {
                    path: 'newtask/:project_id/:step/',
                    component: TaskCreate,
                    name: 'templateStep',
                    props: (route) => ({
                        project_id: route.params.project_id,
                        step: route.params.step,
                        template_id: route.query.template_id,
                        common: route.query.common
                    })
                }]
        },
        {
            path: '/taskflow',
            component: Task,
            children: [
                {
                    path: '',
                    component: NotFoundComponent
                },
                {
                    path: 'home/:project_id/',
                    component: TaskList,
                    name: 'taskList',
                    props: (route) => ({
                        project_id: route.params.project_id,
                        common: route.query.common,
                        create_method: route.query.create_method
                    })
                },
                {
                    path: 'execute/:project_id/',
                    component: TaskExecute,
                    props: (route) => ({
                        project_id: route.params.project_id,
                        instance_id: route.query.instance_id
                    })
                }]
        },
        {
            path: '/config/home/:project_id/',
            component: ConfigPage,
            props: (route) => ({
                project_id: route.params.project_id
            })
        },
        {
            path: '/appmaker/home/:project_id/',
            component: AppMaker,
            props: (route) => ({
                project_id: route.params.project_id
            })
        },
        {
            path: '/appmaker/:app_id/newtask/:project_id/:step',
            name: 'appmakerTaskCreate',
            component: TaskCreate,
            props: (route) => ({
                project_id: route.params.project_id,
                step: route.params.step,
                template_id: route.query.template_id
            })
        },
        {
            path: '/appmaker/:app_id/execute/:project_id/',
            name: 'appmakerTaskExecute',
            component: TaskExecute,
            props: (route) => ({
                project_id: route.params.project_id,
                instance_id: route.query.instance_id
            })
        },
        {
            path: '/appmaker/:app_id/task_home/:project_id/',
            name: 'appmakerTaskHome',
            component: AppMakerTaskHome,
            props: (route) => ({
                project_id: route.params.project_id,
                app_id: route.params.app_id
            })
        },
        {
            path: '/project/home/',
            name: 'projectHome',
            component: ProjectHome
        },
        {
            path: '/error/:code(401|403|405|406|500)/',
            component: ErrorPage,
            name: 'errorPage',
            props: (route) => ({
                code: route.params.code
            })
        },
        {
            path: '/admin',
            component: Admin,
            children: [
                {
                    path: 'statistics/',
                    component: Statistics,
                    children: [
                        {
                            path: '',
                            component: NotFoundComponent
                        },
                        {
                            path: 'template/',
                            name: 'statisticsTemplate',
                            component: StatisticsTemplate
                        },
                        {
                            path: 'instance/',
                            name: 'statisticsInstance',
                            component: StatisticsInstance
                        },
                        {
                            path: 'atom/',
                            name: 'statisticsAtom',
                            component: StatisticsAtom
                        },
                        {
                            path: 'appmaker/',
                            name: 'statisticsAppmaker',
                            component: StatisticsAppmaker
                        }
                    ]
                },
                {
                    path: 'common/template',
                    component: CommonTemplate
                }
            ]
        },
        
        {
            path: '/function/home/',
            name: 'functionHome',
            component: FunctionHome
        },
        {
            path: '/audit/home/',
            name: 'auditHome',
            component: AuditHome
        },
        {
            path: '/periodic',
            component: periodic,
            children: [{
                path: 'home/:project_id/',
                component: periodicTemplateList,
                name: 'periodicTemplate',
                props: (route) => ({
                    project_id: route.params.project_id
                })
            }]
        },
        {
            path: '*',
            name: 'notFoundPage',
            component: NotFoundComponent
        }
    ]
})

routers.beforeEach((to, from, next) => {
    // 生产环境 404 页面头部导航跳转统一设置为首页
    if (process.env.NODE_ENV === 'production' && to.name === 'notFoundPage') {
        store.commit('setNotFoundPage', true)
    } else {
        store.commit('setNotFoundPage', false)
    }
    if (to.params.project_id) {
        store.commit('setProjectId', to.params.project_id)
        setAtomConfigApiUrls(store.state.site_url, to.params.project_id)
    }
    next()
})

export default routers