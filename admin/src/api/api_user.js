//用户相关api

import API from '@/utils/API'

export default {
    // 登录
    login: params => {
        return API.POST('/syx/user/userlogin/' + params.phone + "/" + params.passwd, params)
    },
    getUserById: params => {
        return API.GET('/syx/user/1', params)
    },
    // 退出
    logout: params => {
        return API.GET('/carcloud/logout', params)
    },
    // 上传用户头像
    uploadUserImg: params => {
        return API.POST('/syx/file/multipleUpload', params)
    },
    // 修改个人信息
    updateUserInfo: params => {
        return API.PUT('/syx/user/updatepersoninfo/' + params.id, params); //根据userid字段修改用户信息
        // return API.PUT('/syx/user', params);//根据手机号修改用户信息

        // return API.PUT('/syx/user/' + params.id, params)
    },
    readPass: params => {
        return API.POST('/syx/user/select/pwd/' + params.pass, params)
    },
    //  修改密码
    changePass: params => { //请求的数据格式为 form data类型
        // password原密码，phone手机号，repassword新密码
        return API.POST('syx/user/repassword', params)
    },
    // 查询获取user列表（通过page进行分页）
    findUserList: params => {
        return API.POST('/syx/user/search/' + params.page + '/' + params.size, params)
    },
    // 添加用户
    addUser: params => {
        return API.POST('/syx/user', params)
    },
    // 导出用户/syx/user/downloadexcel
    exportUser: params => {
        return API.POST('/syx/user/downloadexcel', params)
    },
    // 修改用户信息
    updateUserById: params => {
        return API.POST('/syx/user/update', params)
    },
    findAllRole: params => { //获取系统所有用户类型
        return API.POST('/syx/user/checkrole', params)
            // return API.POST('/syx/user/admin/roles', params)
    },
    // 删除用户
    delUser: params => {
        return API.DELETE('/syx/user/deleteUser', params)
    },
    // 生成随机吗
    getRandomCode: params => {
        return API.POST('/syx/user/randomCode', params)
    },
    // 查询用户来源接口
    getDeviceType: params => {
        return API.GET('/syx/deviceType', params)
    }
}