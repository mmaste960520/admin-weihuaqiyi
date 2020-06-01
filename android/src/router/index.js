import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login' //登录
import registered from '../views/PersonalCenter/registered' //注册
import SetPassword from '../views/PersonalCenter/SetPassword' //注册-输入密码
import password from '../views/PersonalCenter/password' //修改密码
// 个人中心
import personal from '../views/PersonalCenter/personal' //个人中心首页
import mylevel from '../views/PersonalCenter/mylevel' //我的等级
import set from '../views/PersonalCenter/set' //系统设置
import AboutApp from '../views/PersonalCenter/AboutApp' //关于APP
import alerts from '../views/PersonalCenter/alerts' //消息通知
import MyLiuYan from '../views/PersonalCenter/MyLiuYan' //我的留言
import MyLiuYanDetails from '../views/PersonalCenter/MyLiuYanDetails' //我的留言-详情通知
import alertDetails from '../views/PersonalCenter/alertDetails' //消息通知-详情
import information from '../views/PersonalCenter/information' //个人信息
import theInformation from '../views/PersonalCenter/theInformation' //修改用户名
import ThePhone from '../views/PersonalCenter/ThePhone' //修改手机号
import TheMail from '../views/PersonalCenter/TheMail' //修改邮箱
import TheSex from '../views/PersonalCenter/TheSex' //修改性别
import TheAddress from '../views/PersonalCenter/TheAddress' //修改地区

// 陈列展示
import exhibition from '../views/display/exhibition' //陈列展示首页
import VisitMessage from '../views/display/visitMessage' //参观留言(展示留言)
import visitMessageCon from '../views/display/visitMessageCon' //参观留言(展示留言)-详情
import UserMessage from '../views/display/UserMessage' //参观留言(用户留言页面)
import serviceGuide from '../views/display/serviceGuide' //服务指南
import ChoiceQuestion from '../views/display/ChoiceQuestion' //选择题库
import KnowledgeQuiz from '../views/display/KnowledgeQuiz' //知识问答
import VisitorsNeedToKnow from '../views/display/VisitorsNeedToKnow' //游客需知
import TicketReservation from '../views/display/TicketReservation' //门票预订
import explain from '../views/display/explain' //讲解预订
import activityNews from '../views/display/activityNews' //活动新闻
import activityNewsDetails from '../views/display/activityNewsDetails' //活动新闻-详情

import notice from '../views/display/notice' //通知公告
import organization from '../views/display/organization' // 组织机构
import WeKnow from '../views/display/WeKnow' // 景区掠影
import ScenicSpotIntroduction from '../views/display/ScenicSpotIntroduction' // 景区简介
import revolt from '../views/display/revolt' //渭华讲课
import RevoltDetails from '../views/display/RevoltDetails' //渭华讲课-详情
import CollectionAppreciation from '../views/display/CollectionAppreciation' //藏品欣赏
import CollectionAppreciationDetails from '../views/display/CollectionAppreciationDetails' //藏品欣赏-详情

//数字展馆
import pavilion from '../views/DigitalPavilion/pavilion' //数字展馆首页

// 文化教育
import CulturalEducation from '../views/CulturalEducation/CulturalEducation' //数字展馆首页
//渭华起义介绍目录
import UprisingIntroduce from '../views/CulturalEducation/UprisingIntroduceDirectory/UprisingIntroduce' //起义简介
import UprisingAfter from '../views/CulturalEducation/UprisingIntroduceDirectory/UprisingAfter' //起义经过
import UprisingPrepare from '../views/CulturalEducation/UprisingIntroduceDirectory/UprisingPrepare' //渭华起义的准备
import UprisingOutbreak from '../views/CulturalEducation/UprisingIntroduceDirectory/UprisingOutbreak' //渭华起义的爆发
import AroundTheNest from '../views/CulturalEducation/UprisingIntroduceDirectory/AroundTheNest' //渭华民军反“围巢”斗争
import PictureFile from '../views/CulturalEducation/UprisingIntroduceDirectory/PictureFile' //图片档案
import PictureFileDetails from '../views/CulturalEducation/UprisingIntroduceDirectory/PictureFileDetails' //图片档案-详情
import MemoriesMemorial from '../views/CulturalEducation/UprisingIntroduceDirectory/MemoriesMemorial' //回忆纪念
import MemoriesMemorialDetails from '../views/CulturalEducation/UprisingIntroduceDirectory/MemoriesMemorialDetails' //回忆纪念-详情
import VideoWorks from '../views/CulturalEducation/UprisingIntroduceDirectory/VideoWorks' //影音作品
import VideoWorksDetails from '../views/CulturalEducation/UprisingIntroduceDirectory/VideoWorksDetails' //影音作品-详情
import HistoricalData from '../views/CulturalEducation/UprisingIntroduceDirectory/HistoricalData' //历史资料
import HistoricalDataDetails from '../views/CulturalEducation/UprisingIntroduceDirectory/HistoricalDataDetails' //历史资料-详情
import ResearchWorks from '../views/CulturalEducation/UprisingIntroduceDirectory/ResearchWorks' //研究著作
//先烈事迹目录
import WhHeroes from '../views/CulturalEducation/MartyrsDeeds/WhHeroes' //渭华英烈
import WhHeroesDetails from '../views/CulturalEducation/MartyrsDeeds/WhHeroesDetails' //渭华英烈-详情
import GreatDeeds from '../views/CulturalEducation/MartyrsDeeds/GreatDeeds' //重大事迹
import GreatDeedsChronological from '../views/CulturalEducation/MartyrsDeeds/GreatDeedsChronological' //重大事迹-编年体
import biography from '../views/CulturalEducation/XiOldSpirit/biography' //生平简介
import TheFeats from '../views/CulturalEducation/XiOldSpirit/TheFeats' //丰功伟绩
import HistoricalMoments from '../views/CulturalEducation/XiOldSpirit/HistoricalMoments' //历史瞬间
import WritingArticles from '../views/CulturalEducation/XiOldSpirit/WritingArticles' //著作文章
import WritingArticlesDetails from '../views/CulturalEducation/XiOldSpirit/WritingArticlesDetails' //著作文章-详情
import MaximExtract from '../views/CulturalEducation/XiOldSpirit/MaximExtract' //格言选粹
import InscriptionHandwriting from '../views/CulturalEducation/XiOldSpirit/InscriptionHandwriting' //题词手迹
import AfterWordToRemember from '../views/CulturalEducation/XiOldSpirit/AfterWordToRemember' //追词缅怀
import AfterWordToRememberDetails from '../views/CulturalEducation/XiOldSpirit/AfterWordToRememberDetails' //追词缅怀=详情
// 红色教育
import RedPropaganda from '../views/CulturalEducation/RedEducation/RedPropaganda' //红色宣传
import IndustryPropaganda from '../views/CulturalEducation/RedEducation/IndustryPropaganda' //行业宣传
import LeadershipCare from '../views/CulturalEducation/RedEducation/LeadershipCare' //领导关怀
import RedEducationDetails from '../views/CulturalEducation/RedEducation/RedEducationDetails' //红色教育详情
// 党性教育
import SpiritOfTheUprising from '../views/CulturalEducation/SpiritEducation/SpiritOfTheUprising' //渭华起义精神
import NineteenSpirits from '../views/CulturalEducation/SpiritEducation/NineteenSpirits' //十九大精神
import NineteenSpiritsDetails from '../views/CulturalEducation/SpiritEducation/NineteenSpiritsDetails' //十九大精神-详情
import PartyConstitution from '../views/CulturalEducation/SpiritEducation/PartyConstitution' //党章党规
import PartyConstitutionDetails from '../views/CulturalEducation/SpiritEducation/PartyConstitutionDetails' //党章党规-详情
import Classic from '../views/CulturalEducation/SpiritEducation/Classic' //经典著作
import ClassicDetails from '../views/CulturalEducation/SpiritEducation/ClassicDetails' //经典著作-详情
import ClassicYueDu from '../views/CulturalEducation/SpiritEducation/ClassicYueDu' //经典著作-详情-阅读
// 历史文化教育
import CulturalHeritage from '../views/CulturalEducation/HistoryCulture/CulturalHeritage' //文化遗产
import CulturalHeritageDetails from '../views/CulturalEducation/HistoryCulture/CulturalHeritageDetails' //文化遗产-详情
import CulturalMonuments from '../views/CulturalEducation/HistoryCulture/CulturalMonuments' //文化古迹
import CulturalMonumentsDetails from '../views/CulturalEducation/HistoryCulture/CulturalMonumentsDetails' //文化古迹-详情
import AncientModernCelebrity from '../views/CulturalEducation/HistoryCulture/AncientModernCelebrity' //古今名人
import AncientModernCelebrityDetails from '../views/CulturalEducation/HistoryCulture/AncientModernCelebrityDetails' //古今名人-详情
// 不忘初心 牢记使命
import storyWindow from '../views/CulturalEducation/BeginnerMindMission/storyWindow' //故事之窗
import storyWindowDetails from '../views/CulturalEducation/BeginnerMindMission/storyWindowDetails' //故事之窗-详情
import AdvancedTypical from '../views/CulturalEducation/BeginnerMindMission/AdvancedTypical' //先进典型
import AdvancedTypicalDetails from '../views/CulturalEducation/BeginnerMindMission/AdvancedTypicalDetails' //先进典型-详情
// 红色旅行
import ClassicLine from '../views/CulturalEducation/RedTraveling/ClassicLine' //经典路线
import ClassicLineDetails from '../views/CulturalEducation/RedTraveling/ClassicLineDetails' //经典路线-详情
import FolkCustom from '../views/CulturalEducation/RedTraveling/FolkCustom' //风土民俗
import FolkCustomDetails from '../views/CulturalEducation/RedTraveling/FolkCustomDetails' //风土民俗-详情
import ConvenientQuery from '../views/CulturalEducation/RedTraveling/ConvenientQuery' //便民查询
import ConvenientQueryDetails from '../views/CulturalEducation/RedTraveling/ConvenientQueryDetails' //便民查询-详情
// 文化教育
import Patriotic from '../views/CulturalEducation/CultureEdu/patriotic' //爱国主义教育
import EduDetails from '../views/CulturalEducation/CultureEdu/EduDetails' //详情



Vue.use(Router)

export default new Router({
    routes: [{ //登录页
            path: '/',
            name: 'login',
            component: login
        },
        { //注册
            path: '/registered',
            name: 'registered',
            component: registered
        },
        { //注册-输入密码
            path: '/SetPassword',
            name: 'SetPassword',
            component: SetPassword
        },
        { //修改密码
            path: '/password',
            name: 'password',
            component: password
        },

        { //个人中心首页
            path: '/personal',
            name: 'personal',
            component: personal
        },
        { //个人中心-我的等级
            path: '/mylevel',
            name: 'mylevel',
            component: mylevel
        },
        { //个人中心-系统设置
            path: '/set',
            name: 'set',
            component: set
        },
        { //个人中心-关于APP
            path: '/AboutApp',
            name: 'AboutApp',
            component: AboutApp
        },
        { //个人中心-消息通知
            path: '/alerts',
            name: 'alerts',
            component: alerts
        },
        { //个人中心-我的留言
            path: '/MyLiuYan',
            name: 'MyLiuYan',
            component: MyLiuYan
        },
        { //个人中心-我的留言-详情通知
            path: '/MyLiuYanDetails',
            name: 'MyLiuYanDetails',
            component: MyLiuYanDetails
        },
        { //个人中心-消息通知-详情
            path: '/alertDetails',
            name: 'alertDetails',
            component: alertDetails
        },
        { //个人中心-个人信息
            path: '/information',
            name: 'information',
            component: information
        },
        { //个人中心-修改用户名
            path: '/theInformation',
            name: 'theInformation',
            component: theInformation
        },
        { //个人中心-修改手机号
            path: '/ThePhone',
            name: 'ThePhone',
            component: ThePhone
        },
        { //个人中心-修改邮箱
            path: '/TheMail',
            name: 'TheMail',
            component: TheMail
        },
        { //个人中心-修改性别
            path: '/TheSex',
            name: 'TheSex',
            component: TheSex
        },
        { //个人中心-修改地区
            path: '/TheAddress',
            name: 'TheAddress',
            component: TheAddress
        },

        { //陈列展示首页
            path: '/exhibition',
            name: 'exhibition',
            component: exhibition
        },
        { //渭华讲课
            path: '/revolt',
            name: 'revolt',
            component: revolt
        },
        { //渭华讲课-详情
            path: '/RevoltDetails',
            name: 'RevoltDetails',
            component: RevoltDetails
        },
        { //活动新闻
            path: '/activityNews',
            name: 'activityNews',
            component: activityNews
        },
        { //活动新闻-详情
            path: '/activityNewsDetails',
            name: 'activityNewsDetails',
            component: activityNewsDetails
        },
        { //通知公告
            path: '/notice',
            name: 'notice',
            component: notice
        },
        { //景区简介
            path: '/ScenicSpotIntroduction',
            name: 'ScenicSpotIntroduction',
            component: ScenicSpotIntroduction
        },
        { //景区掠影
            path: '/WeKnow',
            name: 'WeKnow',
            component: WeKnow
        },
        { //组织机构
            path: '/organization',
            name: 'organization',
            component: organization
        },
        { //留言参观(展示留言)
            path: '/VisitMessage',
            name: 'VisitMessage',
            component: VisitMessage
        },
        { //留言参观(展示留言)-详情
            path: '/visitMessageCon',
            name: 'visitMessageCon',
            component: visitMessageCon
        },
        { //留言参观(用户留言页面)
            path: '/UserMessage',
            name: 'UserMessage',
            component: UserMessage
        },
        { //服务指南
            path: '/serviceGuide',
            name: 'serviceGuide',
            component: serviceGuide
        },
        { //选择题库
            path: '/ChoiceQuestion',
            name: 'ChoiceQuestion',
            component: ChoiceQuestion
        },
        { //知识问答
            path: '/KnowledgeQuiz',
            name: 'KnowledgeQuiz',
            component: KnowledgeQuiz
        },
        { //游客需知
            path: '/VisitorsNeedToKnow',
            name: 'VisitorsNeedToKnow',
            component: VisitorsNeedToKnow
        },
        { //讲解预订
            path: '/explain',
            name: 'explain',
            component: explain
        },
        { //讲解预订
            path: '/TicketReservation',
            name: 'TicketReservation',
            component: TicketReservation
        },
        { //藏品欣赏
            path: '/CollectionAppreciation',
            name: 'CollectionAppreciation',
            component: CollectionAppreciation
        },
        { //藏品欣赏-详情
            path: '/CollectionAppreciationDetails',
            name: 'CollectionAppreciationDetails',
            component: CollectionAppreciationDetails
        },

        { //数字展馆首页
            path: '/pavilion',
            name: 'pavilion',
            component: pavilion
        },
        { //文化教育首页
            path: '/CulturalEducation',
            name: 'CulturalEducation',
            component: CulturalEducation
        },
        { //起义简介
            path: '/UprisingIntroduce',
            name: 'UprisingIntroduce',
            component: UprisingIntroduce
        },
        { //起义经过
            path: '/UprisingAfter',
            name: 'UprisingAfter',
            component: UprisingAfter
        },
        { //渭华起义的准备
            path: '/UprisingPrepare',
            name: 'UprisingPrepare',
            component: UprisingPrepare
        },
        { //渭华起义的爆发
            path: '/UprisingOutbreak',
            name: 'UprisingOutbreak',
            component: UprisingOutbreak
        },
        { //渭华民军反“围巢”斗争
            path: '/AroundTheNest',
            name: 'AroundTheNest',
            component: AroundTheNest
        },
        { //图片档案
            path: '/PictureFile',
            name: 'PictureFile',
            component: PictureFile
        },
        { //图片档案-详情
            path: '/PictureFileDetails',
            name: 'PictureFileDetails',
            component: PictureFileDetails
        },
        { //回忆纪念
            path: '/MemoriesMemorial',
            name: 'MemoriesMemorial',
            component: MemoriesMemorial
        },
        { //回忆纪念-详情
            path: '/MemoriesMemorialDetails',
            name: 'MemoriesMemorialDetails',
            component: MemoriesMemorialDetails
        },
        { //影音作品
            path: '/VideoWorks',
            name: 'VideoWorks',
            component: VideoWorks
        },
        { //影音作品-详情
            path: '/VideoWorksDetails',
            name: 'VideoWorksDetails',
            component: VideoWorksDetails
        },
        { //历史资料
            path: '/HistoricalData',
            name: 'HistoricalData',
            component: HistoricalData
        },
        { //历史资料-详情
            path: '/HistoricalDataDetails',
            name: 'HistoricalDataDetails',
            component: HistoricalDataDetails
        },
        { //研究著作
            path: '/ResearchWorks',
            name: 'ResearchWorks',
            component: ResearchWorks
        },

        { //渭华英烈
            path: '/WhHeroes',
            name: 'WhHeroes',
            component: WhHeroes
        },
        { //渭华英烈-详情
            path: '/WhHeroesDetails',
            name: 'WhHeroesDetails',
            component: WhHeroesDetails
        },
        { //重大事迹
            path: '/GreatDeeds',
            name: 'GreatDeeds',
            component: GreatDeeds
        },
        { //重大事迹-编年体
            path: '/GreatDeedsChronological',
            name: 'GreatDeedsChronological',
            component: GreatDeedsChronological
        },
        { //生平简介
            path: '/biography',
            name: 'biography',
            component: biography
        },
        { //丰功伟绩
            path: '/TheFeats',
            name: 'TheFeats',
            component: TheFeats
        },
        { //历史瞬间
            path: '/HistoricalMoments',
            name: 'HistoricalMoments',
            component: HistoricalMoments
        },
        { //著作文章
            path: '/WritingArticles',
            name: 'WritingArticles',
            component: WritingArticles
        },
        { //著作文章-详情
            path: '/WritingArticlesDetails',
            name: 'WritingArticlesDetails',
            component: WritingArticlesDetails
        },
        { //格言选粹
            path: '/MaximExtract',
            name: 'MaximExtract',
            component: MaximExtract
        },
        { //题词手迹
            path: '/InscriptionHandwriting',
            name: 'InscriptionHandwriting',
            component: InscriptionHandwriting
        },
        { //追词缅怀
            path: '/AfterWordToRemember',
            name: 'AfterWordToRemember',
            component: AfterWordToRemember
        },
        { //追词缅怀-详情
            path: '/AfterWordToRememberDetails',
            name: 'AfterWordToRememberDetails',
            component: AfterWordToRememberDetails
        },

        { //红色宣传
            path: '/RedPropaganda',
            name: 'RedPropaganda',
            component: RedPropaganda
        },
        { //行业宣传
            path: '/IndustryPropaganda',
            name: 'IndustryPropaganda',
            component: IndustryPropaganda
        },
        { //领导关怀
            path: '/LeadershipCare',
            name: 'LeadershipCare',
            component: LeadershipCare
        },
        { //红色教育详情
            path: '/RedEducationDetails',
            name: 'RedEducationDetails',
            component: RedEducationDetails
        },
        { //渭华起义精神
            path: '/SpiritOfTheUprising',
            name: 'SpiritOfTheUprising',
            component: SpiritOfTheUprising
        },
        { //十九大精神
            path: '/NineteenSpirits',
            name: 'NineteenSpirits',
            component: NineteenSpirits
        },
        { //十九大精神-详情
            path: '/NineteenSpiritsDetails',
            name: 'NineteenSpiritsDetails',
            component: NineteenSpiritsDetails
        },
        { //党章党规
            path: '/PartyConstitution',
            name: 'PartyConstitution',
            component: PartyConstitution
        },
        { //党章党规-详情
            path: '/PartyConstitutionDetails',
            name: 'PartyConstitutionDetails',
            component: PartyConstitutionDetails
        },
        { //经典著作
            path: '/Classic',
            name: 'Classic',
            component: Classic
        },
        { //经典著作-详情
            path: '/ClassicDetails',
            name: 'ClassicDetails',
            component: ClassicDetails
        },
        { //经典著作-详情-阅读
            path: '/ClassicYueDu',
            name: 'ClassicYueDu',
            component: ClassicYueDu
        },
        { //文化遗产
            path: '/CulturalHeritage',
            name: 'CulturalHeritage',
            component: CulturalHeritage
        },
        { //文化遗产-详情
            path: '/CulturalHeritageDetails',
            name: 'CulturalHeritageDetails',
            component: CulturalHeritageDetails
        },
        { //文化古迹
            path: '/CulturalMonuments',
            name: 'CulturalMonuments',
            component: CulturalMonuments
        },
        { //文化古迹-详情
            path: '/CulturalMonumentsDetails',
            name: 'CulturalMonumentsDetails',
            component: CulturalMonumentsDetails
        },
        { //古今名人
            path: '/AncientModernCelebrity',
            name: 'AncientModernCelebrity',
            component: AncientModernCelebrity
        },
        { //古今名人-详情
            path: '/AncientModernCelebrityDetails',
            name: 'AncientModernCelebrityDetails',
            component: AncientModernCelebrityDetails
        },
        { //故事之窗
            path: '/storyWindow',
            name: 'storyWindow',
            component: storyWindow
        },
        { //故事之窗-详情
            path: '/storyWindowDetails',
            name: 'storyWindowDetails',
            component: storyWindowDetails
        },
        { //先进典型
            path: '/AdvancedTypical',
            name: 'AdvancedTypical',
            component: AdvancedTypical
        },
        { //先进典型-详情
            path: '/AdvancedTypicalDetails',
            name: 'AdvancedTypicalDetails',
            component: AdvancedTypicalDetails
        },
        { //经典路线
            path: '/ClassicLine',
            name: 'ClassicLine',
            component: ClassicLine
        },
        { //经典路线-详情
            path: '/ClassicLineDetails',
            name: 'ClassicLineDetails',
            component: ClassicLineDetails
        },
        { //风土民俗
            path: '/FolkCustom',
            name: 'FolkCustom',
            component: FolkCustom
        },
        { //风土民俗-详情
            path: '/FolkCustomDetails',
            name: 'FolkCustomDetails',
            component: FolkCustomDetails
        },
        { //便民查询
            path: '/ConvenientQuery',
            name: 'ConvenientQuery',
            component: ConvenientQuery
        },
        { //便民查询-详情
            path: '/ConvenientQueryDetails',
            name: 'ConvenientQueryDetails',
            component: ConvenientQueryDetails
        },
        { //爱国主义教育
            path: '/Patriotic',
            name: 'Patriotic',
            component: Patriotic
        },
        { //文化教育-详情
            path: '/EduDetails',
            name: 'EduDetails',
            component: EduDetails
        }
    ]
})




//
// Vue.use(Router);
//
// const router = new Router({
//   routes: [
//     {
//       path: '/',
//       redirect: '/login'
//     },
//     {
//       path: '/login',
//       name: 'login',
//       component: login
//     },
//     {
//       path: '/personal',
//       name: 'personal',
//       component: personal
//     }
//   ]
// });
//
// // 导航守卫
// // 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('Authorization');
//
//     if (token === 'null' || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// });