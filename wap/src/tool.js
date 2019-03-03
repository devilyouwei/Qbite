import { Toast, Dialog } from 'vant'
const URL = 'http://localhost:3000'
const PRICE_SIGN = 'MOP$'
export default {
    async post(ctl='',act='',data={},load=false){
        if(!ctl || !act) throw new Error('no controller or action')
        let url = `${URL}/${ctl}/${act}`
        // 表單信息
        let form = new FormData()
        for (let i in data) form.append(i, data[i])
        // 用餐者信息
        form.append('sid',localStorage.getItem('sid')) // 門店
        form.append('did',localStorage.getItem('did')) // 桌子

        let request = new Request(url, { method: 'POST', body: form})
        try {
            if (load) this.loading(true)
            let res = await fetch(request).then(res => res.json())
            res.status = parseInt(res.status) || 0
            // 錯誤信息
            if(res.status === 0) {
                this.alert('提示',res.msg)
            }
            return res
        } catch (err) {
            throw err
        } finally {
            if (load) this.loading(false)
        }
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
        location.replace('/')
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
    // 加載中
    loading(flag=true){
        if(flag){
            Toast.loading({
                mask: true,
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                message: '加載中...'
            })
        }else{
            Toast.clear()
        }
    },
    async alert(title='', content=''){
        return await Dialog.alert({
            title: title,
            message: content
        })
    },
    async confirm(){

    },
    URL:URL,
    PRICE_SIGN:PRICE_SIGN
}
