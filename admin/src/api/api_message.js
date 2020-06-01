// /blstation-web/leavemessage/all   获取留言信息
import API from '@/utils/API'

export default {
    findSingInList: params => {
        return API.POST('/syx/signInInfo/findusersignlist', params); //
    },
    findMessageList: params => {
        return API.POST('/syx/liuyanbiao/queryliuyan', params); //
    },
    // 留言回复列表 
    findMessageReply: params => {
        return API.POST('/syx/liuyanbiao/queryliuyanreply', params); //
    },
    getMessageTotal: params => {
        return API.POST('/syx/liuyanbiao/getliuyantotal', params); //
    },
    getSingInTotal: params => {
        return API.POST('/syx/signInInfo/queryusersigntotal', params); //
    },
    getReplyTotal: params => {
        return API.POST('/syx/liuyanbiao/queryliuyanreplytotal', params); //
    },
    auditMessage: params => { //留言审核接口
        return API.PUT('/syx/liuyanbiao/' + params.id, params); //
    },
    auditReplyMessage: params => { //回复留言内容接口
        return API.PUT('/syx/liuyanbiao/' + params.id, params); //
    }
}