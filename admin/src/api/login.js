import request from '@/utils/request'

export function loginByUsername(params) {
    return request({
        url: '/syx/user/userlogin/' + params.phone + "/" + params.passwd,
        method: 'post',
        data: params
    });
}


export function logout(params) {
    return request({
        // url: 'syx/carcloud/logout',
        url: 'syx/user/logout',
        method: 'post'
    })
}


export function getUserInfo(params) {
    return request({
        url: '/syx/user/userlogin/' + params.phone + "/" + params.passwd,
        method: 'post',
        data: params
            // params: params,
            // // params: {
            // //     "sessionid": params
            // // },
            // method: 'get'
    });
}
export function findClassList(params) {
    params.page = !!params.page ? params.page - 1 : 0;
    return request({
        url: '/classes/getresultforclasses',
        data: params,
        method: 'post'
    });
}
// 获取角色对应的菜单列表，暂时调菜单列表接口，后面修改
export function getMenu(params) {
    return request({
        url: '/syx/menu',
        method: 'get'
    })
}