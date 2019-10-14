<!--厨师-->
<template>
    <div class="fullscreen cooker">
        <a class="refresh" @click="loadData()">{{$t("refreshButtonLabel")}}</a>
        <a class="logout" @click="logout()">{{$t("logout")}}</a>
        <div class="h1-title" v-if="shop">
            <h1>{{$t("chefsPageTitle")}}</h1>
            <h2>{{shop.title}}-{{user.position}}-{{user.username}}</h2>
            <p>{{shop.description}}</p>
        </div>
        <div class="replace" v-if="replace">
            {{$t("noOrdersText")}}
        </div>
        <div class="orders" v-if="!replace">
            <el-row :gutter="20">
                <el-col v-for="(item,index) in list" :key="index" :span="6">
                    <div class="i-table title" :class="item.percent==1?'finish':''">
                        <div class="i-cell i-text-left">{{$t("orderNumber")}} {{item.id}}</div>
                        <div class="i-cell i-text-left">{{$t("tableNumber")}} {{item.title}}</div>
                    </div>
                    <div class="i-table" :class="item.percent==1?'tbg':''">
                        <div class="i-row orders-content" :class="item2.cooked==item2.count?'finish':''" v-for="(item2,index2) in item.content" :key="index2">
                            <div class="i-cell" style="width:0.7rem;"><img :src="item2.thumb"></div>
                            <div class="i-cell order-title">{{item2.title}}</div>
                            <div class="i-cell">{{item2.cooked}}/{{item2.count}}</div>
                            <div class="i-cell text-center">
                                <i class="el-icon-success" v-if="item2.cooked==item2.count"></i>
                                <i class="el-icon-dish" v-else></i>
                            </div>
                        </div>
                    </div>
                    <el-progress class="progress" :text-inside="true" :stroke-width="15" color="#4caf50" :percentage="parseInt(item.percent*100)"></el-progress>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import $ from '../tool.js'
export default {
    name:'Cooker',
    data(){
        return {
            list: [],
            shop: null,
            user: $.getUserInfo(),
            interval:null,
            replace:false
        }
    },
    async mounted(){
        let res = await $.post('User','shopInfo',{},true)
        if(res.status) this.shop = res.data
        this.loadData()
        this.interval = setInterval(this.loadData,8000)
    },
    methods:{
        async loadData(){
            let res = await $.post('Cooker','orderList')
            if(res.status==1){
                if(!res.data || res.data.length == 0) return this.replace = true
                this.replace = false
                if(res.data.length>this.list.length)
                    this.$message({
                        message: this.$t('newOrderLabel'),
                        type: 'warning'
                    })
                for(let i in res.data){
                    let cooked = 0
                    let count = 0
                    for(let j in res.data[i].content){
                        count += parseInt(res.data[i].content[j].count)
                        cooked += parseInt(res.data[i].content[j].cooked)
                    }
                    console.log(count)
                    console.log(cooked)
                    res.data[i].percent = cooked/count
                }
                this.list = []
                this.list = res.data
            }
        },
        logout(){
            this.$confirm(this.$t('logoutNotice'), this.$t('logoutNoticeTitle'), {
                confirmButtonText: this.$t('confirm'),
                cancelButtonText: this.$t('cancel'),
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('userinfo')
                clearInterval(this.interval)
                location.replace('/Login')
            }).catch(() => {})
        }
    }
}
</script>
<style>
.cooker .el-dialog{
    width:90%;
}
</style>
<style scoped>
.h1-title {
    text-align:center;
    padding:0.5rem 0;
    font-size:0.6rem;
}
.h1-title h1{
    line-height:1rem;
    font-size: 1rem;
}
.h1-title h2{
    font-size:0.5rem;
    line-height:0.7rem;
}
.h1-title p{
    font-size:0.3rem;
    line-height:0.7rem;
    color:#ccc;
    margin: 0;
}
.orders{
    paddinG:0 0.5rem;
}
.orders .title{
    font-size:0.25rem;
    font-weight:bold;
    background:#ccc;
    color:#fff;
}
.orders .title.finish{
    background:#4caf50;
}
.orders .title .i-cell{
    padding:0.1rem 0.2rem;
}
.orders .orders-content{
    font-size:0.2rem;
}
.orders .orders-content .i-cell.order-title{
    max-width:1.5rem;
}
.orders .orders-content.finish .i-cell.order-title{
    text-decoration:line-through;
    color:#ccc;
}
.orders .orders-content.finish img{
    opacity:0.5;
}
.orders .orders-content img{
    vertical-align:middle;
    width:0.5rem;height:0.5rem;object-fit:cover;
    border-radius:0.05rem;
    padding:0.05rem;
}
.orders .orders-content i.el-icon-success{
    color:#4caf50;
}
.orders .orders-content i.el-icon-dish{
    color:#ccc;
}
.orders .progress{
    margin:0.2rem 0;
}
.orders .tbg{
    background:rgba(76, 175, 80,0.1);
}
.app .logout{
    position:fixed;
    top:0.5rem;
    right:0.5rem;
    font-size:0.5rem;
    cursor: pointer;
}
.app .refresh{
    position:fixed;
    top:0.5rem;
    left:0.5rem;
    color:#4caf50;
    font-size:0.5rem;
    cursor: pointer;
}
</style>
