import API from '@/utils/API'

export default {
    findlinkList: params => {
        return API.POST('/syx/link/search/' + params.page + '/' + params.size, params)
    }
}