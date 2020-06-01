import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
import contentComponent from '@/views/contentManage/content'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    perms: ['admin','editor']    will control the page perms (you can set multiple perms)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

export const constantRouterMap = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path*',
            component: () =>
                import ('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: '/usercenter',
    }
]

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})

export const asyncRouterMap = [{
        id: 10000,
        path: '/contentManage',
        component: Layout,
        meta: {
            title: '内容管理 ',
        },
        hidden: true,
        redirect: {
            path: '/contentManage/senceSituation/situationIntroduce',
            query: {
                menuId: 10001001
            }
        },
        children: [{
                id: 10001,
                path: 'senceSituation',
                name: '景区概况',
                component: contentComponent,
                class: 'fa-line-chart',
                img: require('@/assets/img/access/user.png'),
                redirect: {
                    path: '/contentManage/senceSituation/situationIntroduce',
                    query: {
                        menuId: 10001001
                    }
                },
                meta: {
                    perms: ['景区概况', '景区简介', 'admin']
                },
                children: [{
                        id: 10001001,
                        path: 'situationIntroduce',
                        name: '景区简介',
                        component: resolve => {
                            require(['@/views/contentManage/senceSituation/situationIntroduce'], resolve)
                        },
                        class: 'fa-line-chart',
                        meta: {
                            perms: ['景区简介', '景区概况', 'admin']
                        }
                    },
                    {
                        id: 10001002,
                        path: 'situationImg',
                        name: '景区掠影',
                        component: resolve => {
                            require(['@/views/contentManage/senceSituation/situationImg'], resolve)
                        },
                        class: 'fa-line-chart',
                        meta: {
                            perms: ['景区掠影', '景区概况']
                        }
                    },
                    {
                        id: 10001003,
                        path: 'situationDepart',
                        name: '组织机构',
                        component: resolve => {
                            require(['@/views/contentManage/senceSituation/situationDepart'], resolve)
                        },
                        class: 'fa-line-chart',
                        meta: {
                            perms: ['组织机构', '景区概况']
                        }
                    }
                ]
            }, {
                id: 10002,
                path: 'senceNews',
                name: '景区新闻',
                component: contentComponent,
                redirect: {
                    path: '/contentManage/senceNews/senceNews',
                    query: {
                        menuId: 10002001
                    }
                },
                children: [{
                        id: 10002001,
                        path: 'senceNews',
                        name: '新闻中心',
                        meta: {
                            perms: ['新闻中心', '景区新闻']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/senceNews/senceNews'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                    },
                    {
                        id: 10002002,
                        path: 'inform',
                        name: '通知公告',
                        meta: {
                            perms: ['通知公告', '景区新闻']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/senceNews/inform'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                    },
                    {
                        id: "",
                        path: 'newsAdd',
                        name: '新闻中心-添加',
                        meta: {
                            perms: ['新闻中心-添加', '景区新闻']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/senceNews/newsAdd'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                        show: false
                    },
                    {
                        id: "",
                        path: 'newsView',
                        name: '新闻中心-查看',
                        meta: {
                            perms: ['新闻中心-查看', '景区新闻']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/senceNews/newsAdd'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                        show: false
                    },
                    {
                        id: "",
                        path: 'newsUpdate',
                        name: '新闻中心-编辑',
                        meta: {
                            perms: ['新闻中心-编辑', '景区新闻']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/senceNews/newsAdd'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                        show: false
                    },
                    {
                        id: "",
                        path: 'informAdd',
                        name: '通知公告-添加',
                        meta: {
                            perms: ['通知公告-添加', '景区新闻']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/senceNews/informAdd'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                        show: false
                    },
                    {
                        id: "",
                        path: 'informUpdate',
                        name: '通知公告-编辑',
                        meta: {
                            perms: ['通知公告-编辑', '景区新闻']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/senceNews/informAdd'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                        show: false
                    }, {
                        id: "",
                        path: 'informView',
                        name: '通知公告-查看',
                        meta: {
                            perms: ['通知公告-查看', '景区新闻']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/senceNews/informAdd'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                        show: false
                    }
                ]
            },
            {
                id: 10004,
                path: 'huaIntroduction',
                name: '渭华起义',
                component: contentComponent,
                redirect: {
                    path: '/contentManage/huaIntroduction/revoltIntro',
                    query: {
                        menuId: 10004001
                    }
                },
                children: [{
                        id: 10004001,
                        path: 'revoltIntro',
                        name: '起义简介',
                        meta: {
                            perms: ['渭华起义', '起义简介'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/revoltIntro'], resolve)
                        }
                    },
                    {
                        id: 10004003,
                        path: 'revoltProcess',
                        name: '起义经过',
                        meta: {
                            perms: ['渭华起义', '起义简介'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/revoltProcess'], resolve)
                        }
                    },
                    {
                        id: "",
                        path: 'huaAdd',
                        name: '渭华起义-添加',
                        meta: {
                            perms: ['渭华起义', '渭华起义-添加'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: 10004004,
                        path: 'imgRecord',
                        name: '图片档案',
                        meta: {
                            perms: ['渭华起义', '图片档案'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/imgRecord'], resolve)
                        }
                    }, {
                        id: 10004005,
                        path: 'souvenir',
                        name: '回忆纪念',
                        meta: {
                            perms: ['渭华起义', '回忆纪念'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/souvenir'], resolve)
                        }
                    }, {
                        id: "",
                        path: 'souvenirAdd',
                        name: '回忆纪念-添加',
                        meta: {
                            perms: ['回忆纪念', '回忆纪念-添加', '渭华起义'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'souvenirView',
                        name: '回忆纪念-查看',
                        meta: {
                            perms: ['回忆纪念', '回忆纪念-查看', '渭华起义'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'souvenirUpdate',
                        name: '回忆纪念-编辑',
                        meta: {
                            perms: ['回忆纪念', '回忆纪念-编辑', '渭华起义'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'historyDataView',
                        name: '历史资料-查看',
                        meta: {
                            perms: ['历史资料', '历史资料-查看', '渭华起义'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'historyDataAdd',
                        name: '历史资料-添加',
                        meta: {
                            perms: ['历史资料', '历史资料-添加', '渭华起义'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'historyDataUpdate',
                        name: '历史资料-编辑',
                        meta: {
                            perms: ['历史资料', '历史资料-编辑', '渭华起义'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'studyView',
                        name: '研究著论-查看',
                        meta: {
                            perms: ['研究著论', '研究著论-查看', '渭华起义'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'studyAdd',
                        name: '研究著论-添加',
                        meta: {
                            perms: ['研究著论', '研究著论-添加', '渭华起义'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'studyUpdate',
                        name: '研究著论-编辑',
                        meta: {
                            perms: ['研究著论', '研究著论-编辑', '渭华起义'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, , {
                        id: "",
                        path: 'VideoWorksView',
                        name: '影音作品-查看',
                        meta: {
                            perms: ['影音作品', '影音作品-查看', '渭华起义'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'VideoWorksAdd',
                        name: '影音作品-添加',
                        meta: {
                            perms: ['影音作品', '影音作品-添加', '渭华起义'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'VideoWorksUpdate',
                        name: '影音作品-编辑',
                        meta: {
                            perms: ['影音作品', '影音作品-编辑', '渭华起义'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/huaAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: 10004006,
                        path: 'historyData',
                        name: '历史资料',
                        meta: {
                            perms: ['渭华起义', '历史资料'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/historyData'], resolve)
                        }
                    },
                    {
                        id: 10004007,
                        path: 'StudyTheTheoryOf',
                        name: '研究著作',
                        meta: {
                            perms: ['渭华起义', '研究著作'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/StudyTheTheoryOf'], resolve)
                        }
                    }, {
                        id: 10004008,
                        path: 'VideoWorks',
                        name: '影音作品',
                        meta: {
                            perms: ['渭华起义', '影音作品'],
                        },
                        component: resolve => {
                            require(['@/views/contentManage/huaIntroduction/VideoWorks'], resolve)
                        }
                    }
                ]
            },
            {
                id: 10005,
                path: 'xianThings',
                name: '先烈事迹',
                component: contentComponent,
                redirect: {
                    path: '/contentManage/xianThings/heros',
                    query: {
                        menuId: 10005001
                    }
                },
                children: [{
                        id: 10005001,
                        path: 'heros',
                        name: '渭华英雄',
                        meta: {
                            perms: ['渭华英雄', '先烈事迹']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/xianThings/heros'], resolve)
                        }
                    }, {
                        id: 10005002,
                        path: 'GreatDeeds',
                        name: '重大事迹',
                        meta: {
                            perms: ['重大事迹', '先烈事迹']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/xianThings/GreatDeeds'], resolve)
                        }
                    }, {
                        id: "",
                        path: 'heroView',
                        meta: {
                            perms: ['渭华英雄-查看', '先烈事迹']
                        },
                        name: '渭华英雄-查看',
                        component: resolve => {
                            require(['@/views/contentManage/xianThings/heroAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'heroAdd',
                        meta: {
                            perms: ['渭华英雄-添加', '先烈事迹']
                        },
                        name: '渭华英雄-添加',
                        component: resolve => {
                            require(['@/views/contentManage/xianThings/heroAdd'], resolve)
                        },
                        show: false
                    },
                    {
                        id: "",
                        path: 'heroUpdate',
                        meta: {
                            perms: ['渭华英雄-编辑', '先烈事迹']
                        },
                        name: '渭华英雄-编辑',
                        component: resolve => {
                            require(['@/views/contentManage/xianThings/heroAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'xianTingsView',
                        meta: {
                            perms: ['重大事迹-查看', '先烈事迹']
                        },
                        name: '重大事迹-查看',
                        component: resolve => {
                            require(['@/views/contentManage/xianThings/xianTingsAdd'], resolve)
                        },
                        show: false
                    },
                    {
                        id: "",
                        path: 'xianTingsAdd',
                        name: '重大事迹-添加',
                        meta: {
                            perms: ['重大事迹-添加', '先烈事迹']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/xianThings/xianTingsAdd'], resolve)
                        },
                        show: false
                    },
                    {
                        id: "",
                        path: 'xianTingsUpdate',
                        name: '重大事迹-编辑',
                        meta: {
                            perms: ['重大事迹-编辑', '先烈事迹']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/xianThings/xianTingsAdd'], resolve)
                        },
                        show: false
                    }
                ]
            },
            {
                id: "",
                path: 'souvenir',
                name: '亲切留念',
                component: contentComponent,
                redirect: {
                    path: '/contentManage/souvenir/souvenir',
                    query: {
                        menuId: 10003003
                    }
                },
                children: [{
                    id: 10003003,
                    path: 'souvenir',
                    name: '亲切留念列表',
                    meta: {
                        perms: ['亲切留念']
                    },
                    component: resolve => {
                        require(['@/views/contentManage/collectionAppreciation/souvenir'], resolve)
                    },
                    show: false,
                    class: 'fa-line-chart',
                }]
            },
            {
                id: 10006,
                path: 'xiSpirit',
                name: '文化教育',
                component: contentComponent,
                redirect: { path: '/contentManage/xiSpirit/HistoricalMoments', query: { menuId: 10006003 } },
                children: [{
                        id: "",
                        path: 'xiSpiritAdd',
                        name: '文化教育-添加',
                        meta: {
                            perms: ['文化教育-添加', '文化教育']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/xiSpirit/xiSpiritAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'xiSpiritUpdate',
                        name: '文化教育-编辑',
                        meta: {
                            perms: ['文化教育-编辑', '文化教育']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/xiSpirit/xiSpiritAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: "",
                        path: 'xiSpiritView',
                        name: '文化教育-查看',
                        meta: {
                            perms: ['文化教育-查看', '文化教育']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/xiSpirit/xiSpiritAdd'], resolve)
                        },
                        show: false
                    }, {
                        id: 10006003,
                        path: 'HistoricalMoments',
                        name: '爱国主义教育',
                        meta: {
                            perms: ['爱国主义教育', '文化教育']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/xiSpirit/HistoricalMoments'], resolve)
                        }
                    }, {
                        id: 10006004,
                        path: 'xiSpirtArtical',
                        name: '党性示范教育',
                        meta: {
                            perms: ['党性示范教育', '文化教育']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/xiSpirit/xiSpirtArtical'], resolve)
                        }
                    }, {
                        id: 10006005,
                        path: 'motto',
                        name: '廉政教育',
                        meta: {
                            perms: ['廉政教育', '文化教育']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/xiSpirit/motto'], resolve)
                        }
                    }, {
                        id: 10006006,
                        path: 'inscription',
                        name: '中小学生研学教育',
                        meta: {
                            perms: ['中小学生研学教育', '文化教育']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/xiSpirit/inscription'], resolve)
                        }
                    },
                    {
                        id: 10006007,
                        path: 'Memoriam',
                        name: '国防教育',
                        meta: {
                            perms: ['国防教育', '文化教育']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/xiSpirit/Memoriam'], resolve)
                        }
                    }
                ]
            },
            {
                id: 10011,
                path: 'huaHall',
                name: '渭华讲堂',
                component: contentComponent,
                redirect: {
                    path: '/contentManage/huaHall/huaHall',
                    query: {
                        menuId: 10011
                    }
                },
                children: [{
                    id: 10011,
                    path: 'huaHall',
                    name: '渭华讲堂列表',
                    component: resolve => {
                        require(['@/views/contentManage/huaHall/huaHall'], resolve)
                    },
                    meta: {
                        perms: ['渭华讲堂']
                    },
                    show: false
                }, {
                    id: "",
                    path: 'huaHallView',
                    name: '渭华讲堂-查看',
                    meta: {
                        perms: ['渭华讲堂-查看', '渭华讲堂']
                    },
                    component: resolve => {
                        require(['@/views/contentManage/huaHall/huaHallAppend'], resolve)
                    },
                    show: false
                }, {
                    id: "",
                    path: 'huaHallAppend',
                    name: '渭华讲堂-添加',
                    meta: {
                        perms: ['渭华讲堂-添加', '渭华讲堂']
                    },
                    component: resolve => {
                        require(['@/views/contentManage/huaHall/huaHallAppend'], resolve)
                    },
                    show: false
                }]
            },
            {
                id: 10012,
                path: 'knowledgeAnswer',
                name: '知识问答',
                component: contentComponent,
                redirect: {
                    path: '/contentManage/knowledgeAnswer/knowledgeAnswer',
                    query: {
                        menuId: 10012
                    }
                },
                children: [{
                    id: 10012,
                    path: 'knowledgeAnswer',
                    name: '题库列表',
                    meta: {
                        perms: ['题库列表', '知识问答']
                    },
                    component: resolve => {
                        require(['@/views/contentManage/knowledgeAnswer/knowledgeAnswer'], resolve)
                    },
                    show: false
                }, {
                    path: 'knowledgeAnswerAppend',
                    name: '知识问答-添加',
                    meta: {
                        perms: ['知识问答-添加', '知识问答']
                    },
                    component: resolve => {
                        require(['@/views/contentManage/knowledgeAnswer/knowledgeAnswerAppend'], resolve)
                    },
                    show: false
                }]
            },
            {
                id: 10003,
                path: 'collectionAppreciation',
                name: '藏品欣赏',
                component: contentComponent,
                redirect: {
                    path: '/contentManage/collectionAppreciation/appreciationShow',
                    query: {
                        menuId: 10003001
                    }
                },
                children: [{
                        id: 10003001,
                        path: 'appreciationShow',
                        name: '精品展示',
                        meta: {
                            perms: ['精品展示', '藏品欣赏']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/collectionAppreciation/appreciationShow'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                    },
                    {
                        id: 10003002,
                        path: 'appreciationStrory',
                        name: '文物故事',
                        meta: {
                            perms: ['文物故事', '藏品欣赏']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/collectionAppreciation/appreciationStrory'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                    },
                    {
                        id: "",
                        path: 'collectionAppreciationAdd',
                        name: '文物故事-添加',
                        meta: {
                            perms: ['文物故事-添加', '藏品欣赏']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/collectionAppreciation/collectionAppreciationAdd'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                        show: false
                    },
                    {
                        id: "",
                        path: 'collectionAppreciationView',
                        name: '文物故事-查看',
                        meta: {
                            perms: ['文物故事-查看', '藏品欣赏']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/collectionAppreciation/collectionAppreciationAdd'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                        show: false
                    },
                    {
                        id: "",
                        path: 'collectionAppreciationUpdate',
                        name: '文物故事-编辑',
                        meta: {
                            perms: ['文物故事-编辑', '藏品欣赏']
                        },
                        component: resolve => {
                            require(['@/views/contentManage/collectionAppreciation/collectionAppreciationAdd'], resolve)
                        },
                        class: 'fa-line-chart',
                        img: require('@/assets/img/access/user.png'),
                        show: false
                    }
                ]
            }, {
                id: 10013,
                path: 'redTourism',
                name: '红色旅游',
                component: contentComponent,
                redirect: {
                    path: '/contentManage/redTourism/classicRoute',
                    query: {
                        menuId: 10013001
                    }
                },
                children: [{
                    id: 10013001,
                    path: 'classicRoute',
                    name: '经典路线',
                    meta: {
                        perms: ['经典路线', '红色旅游']
                    },
                    component: resolve => {
                        require(['@/views/contentManage/redTourism/classicRoute'], resolve)
                    }
                }, {
                    id: 10013002,
                    path: 'folk',
                    name: '风土民俗',
                    meta: {
                        perms: ['风土民俗', '红色旅游']
                    },
                    component: resolve => {
                        require(['@/views/contentManage/redTourism/folk'], resolve)
                    }
                }, {
                    id: 10013003,
                    path: 'convenienceSearch',
                    name: '便民查询',
                    meta: {
                        perms: ['便民查询', '红色旅游']
                    },
                    component: resolve => {
                        require(['@/views/contentManage/redTourism/convenienceSearch'], resolve)
                    }
                }, {
                    id: "",
                    path: 'convenienceAdd',
                    name: '红色旅游-添加/编辑',
                    meta: {
                        perms: ['红色旅游-添加/编辑', '红色旅游']
                    },
                    component: resolve => {
                        require(['@/views/contentManage/redTourism/convenienceAdd'], resolve)
                    },
                    show: false
                }, {
                    id: "",
                    path: 'flokAdd',
                    name: '风土民俗-添加/编辑',
                    meta: {
                        perms: ['风土民俗-添加/编辑', '红色旅游']
                    },
                    component: resolve => {
                        require(['@/views/contentManage/redTourism/flokAdd'], resolve)
                    },
                    show: false
                }]
            },
            {
                id: 10014,
                path: 'serviceGuide',
                name: '服务指南',
                component: contentComponent,
                redirect: {
                    path: '/contentManage/serviceGuide/TicketReservation',
                    query: {
                        menuId: 10014001
                    }
                },
                children: [{
                        id: 10014001,
                        path: 'TicketReservation',
                        component: () =>
                            import ('@/views/contentManage/serviceGuide/TicketReservation'),
                        name: '门票预订',
                        meta: {
                            perms: ['门票预订', '服务指南']
                        }
                    },
                    {
                        id: 10014002,
                        path: 'InterpretationOfTheBook',
                        component: () =>
                            import ('@/views/contentManage/serviceGuide/InterpretationOfTheBook'),
                        name: '讲解预订',
                        meta: {
                            perms: ['讲解预订', '服务指南']
                        }
                    },
                    {
                        id: 10014003,
                        path: 'rulesAndRegulations',
                        component: () =>
                            import ('@/views/contentManage/serviceGuide/rulesAndRegulations'),
                        name: '游客须知',
                        meta: {
                            perms: ['游客须知', '服务指南']
                        }
                    }
                ]
            }, {
                id: 10015,
                path: 'visitMessage',
                name: '参观留言',
                component: contentComponent,
                redirect: {
                    path: '/contentManage/visitMessage/SignIn',
                    query: {
                        menuId: 10015001
                    }
                },
                children: [{
                    id: 10015001,
                    path: 'SignIn',
                    name: '游客签到',
                    component: resolve => {
                        require(['@/views/contentManage/visitMessage/SignIn'], resolve)
                    },
                    meta: {
                        perms: ['游客签到', '参观留言']
                    }
                }, {
                    id: 10015002,
                    path: 'message',
                    name: '游客留言',
                    component: resolve => {
                        require(['@/views/contentManage/visitMessage/message'], resolve)
                    },
                    meta: {
                        perms: ['游客留言', '参观留言']
                    }
                }, {
                    id: 10015003,
                    path: 'answering',
                    name: '留言回复',
                    component: resolve => {
                        require(['@/views/contentManage/visitMessage/answering'], resolve)
                    },
                    meta: {
                        perms: ['留言回复', '参观留言']
                    }
                }]
            }
        ]
    }, {
        path: '/usercenter',
        component: Layout,
        children: [{
            path: '',
            component: () =>
                import ('@/views/usersManage/userInfo'),
            name: 'userInfo',
            meta: {
                icon: require('@/assets/img/usercenter.png'),
                perms: ['用户管理', '个人中心'],
                title: '个人中心'
            }
        }]
    }, {
        path: '/rights',
        component: Layout,
        meta: {
            title: '权限管理',
            icon: require('@/assets/img/access/rights.png')
        },
        children: [{
                path: 'index',
                component: () =>
                    import ('@/views/rightsManage/rightsList'),
                name: 'rightsList',
                meta: {
                    perms: ['权限管理', 'admin'],
                    title: '权限管理',
                    icon: require('@/assets/img/access/rights.png')
                }
            },
            {
                path: 'addRights',
                component: () =>
                    import ('@/views/rightsManage/addRights'),
                name: 'addRights',
                hidden: true,
                meta: {
                    perms: ['添加权限', '权限管理'],
                    title: '添加权限'
                }
            },
            {
                path: 'updateRights',
                component: () =>
                    import ('@/views/rightsManage/addRights'),
                name: 'updateRights',
                hidden: true,
                meta: {
                    perms: ['编辑权限', '权限管理', 'admin'],
                    title: '编辑权限'
                }
            }
        ]
    },
    {
        path: '/usersManage',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/usersManage/userList'),
            name: 'userList',
            meta: {
                icon: require('@/assets/img/access/user.png'),
                perms: ['用户管理'],
                title: '用户管理'
            }
        }]
    },

    {
        path: '/content',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/contentManage/content'),
            name: 'content',
            meta: {
                title: '内容管理',
                perms: ['内容管理', 'admin'],
                icon: require('@/assets/img/access/content.png')
            },
            redirect: {
                path: '/contentManage/senceSituation/situationIntroduce',
                query: {
                    menuId: 10001001
                }
            }
        }]
    },
    {
        path: '/siteManage',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/siteManage/siteList'),
            name: 'siteManage',
            meta: {
                title: '站点管理',
                perms: ['站点管理', 'admin'],
                icon: require('@/assets/img/access/site.png')
            }
        }]
    },
    {
        path: '/bannerManage',
        component: Layout,
        meta: {
            perms: ['栏目管理', 'admin'],
        },
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/bannerManage/pageBannerList'),
            name: 'bannerManage',
            meta: {
                title: '栏目管理',
                perms: ['栏目管理', 'admin'],
                icon: require('@/assets/img/access/banner.png')
            }
        }]
    },
    {
        path: '/visitCount',
        component: Layout,
        meta: {
            perms: ['访问统计', 'admin'],
        },
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/visitCount/visitCountList'),
            name: 'visitCountList',
            meta: {
                title: '访问统计',
                perms: ['访问统计', 'admin'],
                icon: require('@/assets/img/access/access.png')
            }
        }]
    },
    {
        path: '/logManage',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/logManage/logManageList'),
            name: 'logManageList',
            meta: {
                title: '日志管理',
                perms: ['日志管理', 'admin'],
                icon: require('@/assets/img/access/log.png')
            }
        }]
    },
    {
        path: '/linkManage',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/linkManage/linkManageList'),
            name: 'linkManageList',
            meta: {
                title: '链接管理',
                perms: ['链接管理', 'admin'],
                icon: require('@/assets/img/access/link.png')
            }
        }]
    },
    {
        path: '/dataManage',
        component: Layout,
        meta: {},
        children: [{
                path: 'index',
                component: () =>
                    import ('@/views/dataCopy/dataCopyList'),
                name: 'rightsList',
                meta: {
                    title: '数据管理',
                    perms: ['数据管理', 'admin'],
                    icon: require('@/assets/img/access/interface.png')
                }
            },
            {
                path: 'dataRestore',
                component: () =>
                    import ('@/views/dataCopy/dataRestore'),
                name: 'dataRestore',
                hidden: true,
                meta: {
                    perms: ['数据备份', 'admin', '数据管理'],
                    title: '数据备份'
                }
            }
        ]
    },
    {
        path: '/systemMaintain',
        component: Layout,
        meta: {
            title: '系统维护',
            icon: require('@/assets/img/access/maintain.png')
        },
        children: [{
                path: 'index',
                component: () =>
                    import ('@/views/systemMaintain/system'),
                name: 'systemMaintain',
                meta: {
                    title: '系统维护',
                    perms: ['系统维护', 'admin'],
                    icon: require('@/assets/img/access/maintain.png')
                }
            },
            {
                path: 'cacheClear',
                component: () =>
                    import ('@/views/systemMaintain/cacheClear'),
                name: 'cacheClear',
                hidden: true,
                meta: {
                    title: '缓存清理',
                    perms: ['缓存清理', '系统维护', 'admin'],
                    icon: 'class'
                }
            },
            {
                path: 'problemDiagnose',
                component: () =>
                    import ('@/views/systemMaintain/problemDiagnose'),
                name: 'updateRights',
                hidden: true,
                meta: {
                    title: '问题诊断',
                    perms: ['问题诊断', '系统维护', 'admin'],
                    icon: 'class'
                }
            }, {
                path: 'performanceOptimize',
                component: () =>
                    import ('@/views/systemMaintain/performanceOptimize'),
                name: 'performanceOptimize',
                hidden: true,
                meta: {
                    title: '性能优化',
                    perms: ['性能优化', '系统维护', 'admin'],
                    icon: 'class'
                }
            }
        ]
    },
    {
        path: '/menuManage',
        component: Layout,
        meta: {
            icon: require('@/assets/img/access/banner.png')
        },
        hidden: true,
        children: [{
            path: 'menutree',
            component: () =>
                import ('@/views/menuManage/index'),
            name: 'MenuTreeTableDemo',
            meta: {
                perms: ['admin', '菜单管理'],
                title: '菜单管理',
                icon: require('@/assets/img/access/data.png')
            }
        }]
    },
    {
        path: '/ruleSetting',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/ruleSetting/setting'),
            name: 'setting',
            meta: {
                title: '小红旗规则',
                perms: ['小红旗规则', 'admin'],
                icon: require('@/assets/img/access/data.png')
            }
        }]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]