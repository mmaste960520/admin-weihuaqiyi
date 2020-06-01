import {
    loginByUsername,
    logout,
    getUserInfo
} from '@/api/login'
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'
import $ from 'jquery'
const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        name: '',
        avatar: '',
        classesId: '',
        userId: "",
        introduction: '',
        roleid: '',
        roles: [],
        perms: [],
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_USERROLEID: (state, roleid) => {
            state.roleid = roleid
        },
        SET_USERID: (state, userId) => {
            state.userId = userId
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMS: (state, perms) => {
            state.perms = perms
        }
    },

    actions: {
        // 用户名登录
        LoginByUsername({
            commit
        }, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUsername(userInfo).then(response => {
                    sessionStorage.setItem("userInfoLogin", JSON.stringify(userInfo));
                    let res = response.data;
                    if (!!res && res.code !== 20000) {
                        resolve(res)
                        return;
                    }
                    const resData = res.data;
                    sessionStorage.setItem("token", resData.token);
                    commit('SET_TOKEN', resData.token)
                    setToken(resData.token)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetUserInfo({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                let userInfoLogin = JSON.parse(sessionStorage.getItem("userInfoLogin"));
                getUserInfo(userInfoLogin).then(response => {
                    // 由于mockjs 不支持自定义状态码只能这样hack
                    if (!response.data) {
                        reject('Verification failed, please login again.')
                    }
                    sessionStorage.setItem(
                        "access-user",
                        JSON.stringify(response.data.data.user)
                    );
                    const data = response.data.data.user;
                    const resMenu = response.data.data.rolemenu;
                    var rolemenu = [];
                    if (!!resMenu && resMenu.length > 0) {
                        for (var i = 0; i < resMenu.length; i++) {
                            rolemenu.push(resMenu[i].title);
                        }
                    } else {
                        rolemenu = ["景区概况", "景区新闻", "渭华起义"];
                    }
                    commit('SET_PERMS', rolemenu);
                    commit('SET_ROLES', data.rolename);
                    commit('SET_NAME', data.userName)
                    data.avatar = !!data.imgPath ? data.imgPath : require("../../../src/assets/img/noImg.png");
                    commit('SET_AVATAR', data.avatar)
                    commit('SET_USERID', data.id)
                    commit('SET_USERROLEID', data.roleid)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 第三方验证登录
        // LoginByThirdparty({ commit, state }, code) {
        //   return new Promise((resolve, reject) => {
        //     commit('SET_CODE', code)
        //     loginByThirdparty(state.status, state.email, state.code).then(response => {
        //       commit('SET_TOKEN', response.data.token)
        //       setToken(response.data.token)
        //       resolve()
        //     }).catch(error => {
        //       reject(error)
        //     })
        //   })
        // },

        // 登出
        LogOut({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_PERMS', [])
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({
            commit
        }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_PERMS', [])
                commit('SET_ROLES', [])
                removeToken()
                resolve()
            })
        },
        // 动态修改权限
        ChangeRoles({
            commit,
            dispatch
        }, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role)
                setToken(role)
                getUserInfo(role).then(response => {
                    const data = response.data.data.user;
                    const resMenu = response.data.data.rolemenu;
                    var rolemenu = [];
                    if (!!resMenu && resMenu.length > 0) {
                        for (var i = 0; i < resMenu.length; i++) {
                            rolemenu.push(resMenu[i].title);
                        }
                    } else {
                        rolemenu = ["景区概况", "景区新闻", "渭华起义"]
                    }
                    commit('SET_PERMS', rolemenu)
                    commit('SET_ROLES', data.rolename)
                    commit('SET_NAME', data.userName)
                    commit('SET_AVATAR', !!data.imgPath ? data.imgPath : require("../../../src/assets/img/noImg.png"))
                    commit('SET_USERID', data.id)
                    commit('SET_INTRODUCTION', data.phone)
                    commit('SET_USERROLEID', data.roleid)
                    dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
                    resolve()
                })
            })
        }
    }
}

export default user