import { Loading,Message } from 'element-ui'
import {i18n} from './plugins/i18n'
/*---------------测试服-
---------------*/
const URL = 'http://localhost:3000' //本地測試服
const CLIENT = 'http://diet.devil.ren'

/*---------------正式服
const CLIENT = 'http://diet.devil.ren'
const URL = 'http://node.diet.devil.ren' // 正式服
*/

const PRICE_SIGN = '$'
export default {
    async post(ctl='',act='',data={},load=false){
        if(!ctl || !act) throw new Error('no controller or action')
        let url = `${URL}/${ctl}/${act}`
        // 表單信息
        let form = new FormData()
        for (let i in data) form.append(i, data[i])
        // 用戶信息
        form.append('user', JSON.stringify(this.getUserInfo()))

        let request = new Request(url, { method: 'POST', body: form})
        try {
            if (load) Loading.service({ fullscreen: true })
            let res = await fetch(request).then(res => res.json())
            res.status = parseInt(res.status) || 0
            // 登陆失效
            if(res.status === -1) {
                this.logout()
            }
            return res
        } catch (err) {
            Message({
                showClose: true,
                message: i18n.t('error_network'),
                type: 'error'
            })
            throw err
        } finally {
            if (load) Loading.service({ fullscreen: true }).close()
        }
    },
    getParams(){
        let url = location.href
        let theRequest = {}
        let i = url.indexOf('?')
        if (i !== -1) url = url.substr(++i)
        else return {}

        if (url.indexOf('&') !== -1) {
            let strs = url.split('&')
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
            }
        } else {
            theRequest[url.split('=')[0]] = unescape(url.split('=')[1])
        }
        return theRequest
    },
    removeDuplicatedItem(arr) {
        for(var i = 0; i < arr.length-1; i++){
            for(var j = i+1; j < arr.length; j++){
                if(arr[i]==arr[j]){
                    arr.splice(j,1)
                    j--
                }
            }
        }
        return arr
    },
    getUserInfo(){
        try{
            let userinfo = localStorage.getItem('userinfo')
            if(userinfo) return JSON.parse(userinfo)
            else return {}
        } catch(err) {
            return {}
        }
    },
    logout(){
        localStorage.removeItem('userinfo')
        location.replace('/Login')
    },
    // 時間格式化函數
    stamp2date: function (ns) {
        return new Date(parseInt(ns)*1000)
    },
    date2stamp: function (date) {
        return Date.parse(date) / 1000
    },
    // 传入date对象Date类型，格式String类型
    formatDate: function (date, fmt) {
        let o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (let k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        return fmt
    },
    random(minNum,maxNum){
        switch(arguments.length){
            case 1:return Math.random()*minNum+1
            case 2:return Math.random()*(maxNum-minNum+1)+minNum
            default:return 0 
        }
    },
    unique(array) {
        // res用来存储结果
        var res = [];
        for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
            for (var j = 0, resLen = res.length; j < resLen; j++ ) {
                if (array[i] === res[j]) {
                    break;
                }
            }
            // 如果array[i]是唯一的，那么执行完循环，j等于resLen
            if (j === resLen) {
                res.push(array[i])
            }
        }
        return res;
    },
    URL:URL,
    CLIENT:CLIENT,
    PRICE_SIGN:PRICE_SIGN
}
