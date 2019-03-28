<template>
    <div class="order">
        <div class="desk" v-if="order">
            桌號 {{order.title}}
            <div class="time">訂單編號：{{order.id}}</div>
            <div class="time">下單時間：{{order.time}}</div>
            <div class="time">状态：进行中</div>
        </div>
        <div class="table" v-if="order">
            <div class="row" v-for="(item,index) in order.content" :key="index">
                <div class="cell" style="width:2rem;"><img :src="item.thumb" class="thumb"></div>
                <div class="cell">
                    <div class="title">{{item.title}}</div>
                    <div class="price">{{item.price}} {{priceSign}}</div>
                </div>
                <div class="cell count">
                    ×{{item.count}}
                </div>
            </div>
        </div>
        <div class="pay" v-if="order">
            合計<br>{{order.price}} {{priceSign}}
        </div>
    </div>
</template>
<script>
import $ from '../tool.js'
export default{
    name:'order',
    data(){
        return{
            oid:0,
            order:null,
            priceSign:$.PRICE_SIGN
        }
    },
    mounted(){
        this.loadData()
    },
    methods:{
        async loadData(){
            let sid = localStorage.getItem('sid')
            let did = localStorage.getItem('did')
            let oid = localStorage.getItem('oid')
            let order = localStorage.getItem('order')
            let res = await $.post('Wap','sit',{sid:sid,did:did,order:order,oid:oid})
            if(res.status == 1){
                this.order = res.data
                this.order.time = $.formatDate($.stamp2date(this.order.createtime),'yyyy-MM-dd hh:mm:ss')
                localStorage.setItem('oid',res.data.id)
            }else { // 訂單有問題
                localStorage.removeItem('oid')
                localStorage.removeItem('order')
                this.$router.replace('/')
            }
        }
    }
}
</script>
<style scoped>
.order{
    padding:0.5rem;
}
.table{
    font-size:0.35rem;
    margin-top:1rem;
}
.desk{
    text-align:center;
    font-size:0.7rem;
    line-height:2rem;
}
.thumb{
    width:1.6rem;
    height:1.6rem;
    object-fit:cover;
    margin:0.5rem 0;
}
.title,.price{
    line-height:0.7rem;
}
.title{
    font-size:0.35rem;
    width:5rem;
}
.price{
    color:#f00;
}
.count{
    font-size:0.35rem;
    text-align:right;
}
.time{
    font-size:0.38rem;
    line-height:0.8rem;
}
.pay {
    padding-top:1rem;
    line-height:0.8rem;
    text-align:center;
    font-size:0.5rem;
    font-weight:bold;
    color:#f00;
}
</style>
