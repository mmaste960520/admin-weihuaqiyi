import API from '@/utils/API'
export default {
    // 权限相关
    addAPI: params => {
        if (!!params && !!params.role.roleid) { //json类型
            return API.POST('/syx/user/updatepermission2', params);
        } else {
            return API.POST('/syx/user/addpermission2', params);
        }
    },
    findPermissionList: params => { //查询所有操作权限菜单
        return API.POST('/syx/user/permission/' + params.roleid, params)
    },
    findPermissionAll: params => { //分页查询后台权限和角色
        return API.POST('/syx/user/permission/alluser', params)
    },
    // 删除用户
    delRights: params => {
        params.roleid = params.id;
        delete params['id'];
        return API.POST('syx/user/delete/permission/' + params.roleid, params)
    },
    getDepartment: params => {
        return API.GET('/syx/department', params)
    },
    findAllRole: params => {
        return API.POST('/syx/user/checkrole', params)
    },
    // 检查角色是否已存在
    checkRole: params => {
        return API.POST('/syx/user/checkrole', params)
    }
}