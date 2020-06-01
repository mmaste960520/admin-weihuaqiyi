import API from '@/utils/API'


export default {
    // 上传作业照片
    uploadAPI: params => {
        return API.POST('/file/multipleUpload', params)
    },
    // 教师发布作业
    taskTeacher: params => {
        return API.POST('/taskTeacher', params)
    },
    // 学生上传作业接口
    taskStudent: params => {
        if (!!params.id) {
            // return API.PUT("/taskStudent/params.id", params)
            return API.PUT("/taskStudent/" + params.id, params)

        } else {
            return API.POST("/taskStudent", params)
        }
    },
    getMyWorkById: params => {
        return API.POST("/taskStudent/search", params)
    },
    getMyWorkDetail: params => {
        return API.POST("/taskStudent/search/1/10", params)
    }
}