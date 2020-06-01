import API from '@/utils/API'

export default {
    findMenuList: params => {
        return API.GET('/syx/managemenu', params)
    },

    //查询获取一条book信息
    findById: id => {
        return API.GET(`/syx/managemenu/${id}`)
    },

    addMenu: params => {
        if (!!params.id) {
            return API.PUT(`/syx/managemenu/` + params.id, params)
        } else {
            return API.POST(`/syx/managemenu`, params)
        }
    },
    //删除
    delMenu: params => {
        return API.DELETE('/syx/managemenu/delete', params);
    }
}