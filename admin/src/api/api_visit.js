import API from '@/utils/API'

export default {
    getDeviceBzt: params => {
        var URL;
        var type = params.type;
        delete params["type"];
        URL = type !== "月访问量" ? API.POST('/syx/other/deviceBzt', params) : API.POST('/syx/other/deviceBztMonth', params);
        //访问路径饼状图
        return URL;
    },
    getDeviceZzt: params => {
        var URL;
        URL = params.type !== "月访问量" ? API.POST('/syx/other/deviceZztHour', params) : API.POST('/syx/other/deviceZztDay', params);
        //访问量柱状图 // deviceZztHour 小时分组 //deviceZztDay按天分
        return URL;
    },
    getModuleZzt: params => {
        // var URL;
        // URL = params.type !== "月访问量" ? API.POST('/syx/other/moduleZzt', params) : API.POST('/syx/other/moduleZztMonth', params);
        // //模块柱状图
        // return URL;
        return API.POST('/syx/other/moduleZzt', params); //模块柱状图
    },
    getTodayVisit: params => {
        return API.GET('/syx/other/todayVisit', params); //今日访客总数
    },
    getAllVisit: params => {
        return API.GET('/syx/other/allVisit', params); //获取访客总数
    },

    // 月访问量柱状图
    //   getMonthDeviceBzt: params => {
    //     return API.POST('/syx/other/deviceBztMonth', params); //访问路径饼状图
    //   },
    //   getMonthDeviceZzt: params => {
    //     return API.POST('/syx/other/deviceZztMonth', params); //访问量柱状图
    //   },
    //   getMonthModuleZzt: params => {
    //     return API.POST('/syx/other/moduleZztMonth', params); //模块柱状图
    //   },
}