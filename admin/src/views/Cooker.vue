<!--厨师-->
<template>
    <div class="fullscreen cooker">
        <a class="refresh" @click="loadData()">刷新</a>
        <a class="logout" @click="logout()">登出</a>
        <div class="h1-title" v-if="shop">
            <h1><img src="/imgs/icon/chushi.png" alt="" style="height:0.8rem;position:absolute;right:7.5rem;top:0.2rem;">廚師專頁</h1>
            <h2>{{shop.title}}-{{user.position}}-{{user.username}}</h2>
            <p>{{shop.description}}</p>
        </div>
        <div class="replace" v-if="replace">
            大廚先生，暫無訂單，請休息一會~
        </div>
        <div v-if="!replace">
            <el-row>
                <el-col :span="8" v-for="(item,index) in list" :key="index" class="text-center">
                    <div class="card" @click="showOrder(item.id)">
                        <div class="title">{{item.title}}</div>
                        <div style="font-size:0.3rem;padding-top:0.2rem;">
                            <div>訂單：{{item.orderNum}}</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="客戶菜單" :visible.sync="dialog">
            <div class="order" v-for="(item,index) in orders" :key="index">
                <h1 class="order-title">訂單號：{{item.id}}</h1>
                <div class="tag" v-for="(item2,index2) in item.content" :key="index2">
                    <div class="tag-content">
                        <img :src="item2.thumb" class="tag-thumb">
                        {{item2.title}}
                        <div class="tag-num">×{{item2.count}}</div>
                    </div>
                    <div class="tag-opt">
                        完成
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import $ from '../tool.js'
export default {
    name:'Cooker',
    data(){
        return {
            list: [],
            dialog:false,
            shop: null,
            orders: [],
            user: $.getUserInfo(),
            replace:false
        }
    },
    async mounted(){
        let res = await $.post('User','shopInfo',{},true)
        if(res.status) this.shop = res.data
        this.loadData()
        setInterval(()=>{
            this.loadData()
        },10000)
        
    },
    methods:{
        async loadData(){
            let res = await $.post('Cooker','deskList')
            if(res.status==1){
                if(!res.data || res.data.length == 0) return this.replace = true
                for(let i in res.data){
                    this.list = res.data
                }
            }
        },
        async showOrder(id){
            let res = await $.post('Cooker','foodList',{id:id},true)
            if(res.status == 1){
                this.orders = res.data
                this.dialog = true
            } else this.$message.error(res.msg)
        },
        logout(){
            this.$confirm('是否退出登錄?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('userinfo')
                this.$router.replace('/Login')
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
}
.h1-title h2{
    font-size:0.5rem;
    line-height:0.7rem;
}
.h1-title p{
    font-size:0.3rem;
    line-height:0.7rem;
    color:#ccc;
}
.card {
    padding:0.5rem 1rem;
    display:inline-block;
    border-radius:0.1rem;
    background:#409EFF;
    color:#fff;
    margin:0 auto;
    text-align:center;
    font-size:0.5rem;
    font-weight:bold;
    cursor:pointer;
}
.order {

}
.order .order-title{
    font-size:0.3rem;
    color:#ccc;
    line-height:0.8rem;
}
.order .tag{
    display:inline-block;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
    border-radius:0.1rem;
    font-size:0.3rem;
    margin-left:0.3rem;
    text-align: center;
}
.order .tag .tag-content{
    padding:0.3rem 0.5rem;
}
.order .tag .tag-num{
    font-weight:bold;
    color:red;
    line-height:0.6rem;
    font-size:0.4rem;
}
.order .tag .tag-thumb{
    display:block;
    max-width:2rem;
}
.order .tag .tag-opt{
    background:#4caf50;
    padding:0.2rem 0.3rem;
    font-size:0.25rem;
    color:#fff;
}
.logout{
    position:fixed;
    top:0.5rem;
    right:0.5rem;
    font-size:0.5rem;
}
.refresh{
    position:fixed;
    top:0.5rem;
    left:0.5rem;
    color:#4caf50;
    font-size:0.5rem;
}
</style>
