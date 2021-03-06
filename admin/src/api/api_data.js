import API from '@/utils/API'

export default {
    findDataRestoreList: params => {
        return API.POST('/syx/backup/getAllsql', params)
    },
    // 删除备份列表syx/backup/deletesavesql
    delDataRestoreList: params => {
        return API.POST('/syx/backup/deletesavesql/' + params.createTime, params)
    },
    // 数据库还原-开始还原按钮请求
    dbRestore: params => {
        // /syx/backup/databaserecovery
        return API.POST('/syx/backup/databaserecovery', params)
            // return API.POST('/syx/backup/reduction', params)
    },
    // 备份请求type:2 自动，1 手动（后台已做判断关闭自动）
    restore: params => {
        return API.POST('/syx/backup/dbbackup', params)
    },
    //查询自动备份当前状态
    searchAutoRestore: params => {
        return API.POST('/syx/backup/getdataschedulerstatus', params)
    },
    // n自动备份状态切换，开启或关闭
    backupturnon: params => {
        return API.POST('/syx/backup/backupturnon?status=' + params.status + '&type=' + params.type, params)
    },
    // 上传本地文件
    uploadFile: params => {
        return API.POST('/syx/file/multipleUpload', params)
    }
}