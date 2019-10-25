<template>
    <div class="order">
        <div class="desk" v-if="order">
            <div class="desk-title">{{shop.title}} {{order.title}}</div>
            <div class="time">Order Num: {{order.id}}</div>
            <div class="time">Order time：{{order.time}}</div>
        </div>
        <div class="table" v-if="order">
            <div class="row" v-for="(item,index) in order.content" :key="index">
                <div class="cell" style="width:2rem;"><img :src="item.thumb" class="thumb"></div>
                <div class="cell">
                    <div class="title">{{item.title}}</div>
                    <div class="price">{{item.price}} {{priceSign}}</div>
                </div>
                <div class="cell status making" style="min-width:1.5rem;" v-if="item.count-item.cooked>0">
                    preparing×{{item.count-item.cooked}}
                </div>
                <div class="cell status success" style="min-width:2rem;" v-else>
                    finished
                </div>
                <div class="cell count" :class="item.count==item.cooked?'success':''">
                    ×{{item.count}}
                </div>
            </div>
        </div>
        <div class="pay" v-if="order">
            Price<br>{{order.price}} {{priceSign}}
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
            shop: JSON.parse(localStorage.getItem('shop')) || null,
            order:null,
            interval:null,
            priceSign:$.PRICE_SIGN
        }
    },
    mounted(){
        this.loadData(true)
        this.interval = setInterval(this.loadData,5000)
    },
    methods:{
        async loadData(load=false){
            let oid = localStorage.getItem('oid')
            let order = localStorage.getItem('order')
            let res = await $.post('Wap','order',{order:order,oid:oid},load)
            if(res.status == 1){
                this.order = res.data
                this.order.time = $.formatDate($.stamp2date(this.order.createtime),'yyyy-MM-dd hh:mm:ss')
                localStorage.setItem('oid',res.data.id)
            } else { // 訂單有問題
                localStorage.removeItem('oid')
                localStorage.removeItem('order')
                clearInterval(this.interval)
                await $.alert(res.msg)
                location.replace('/')
            }
        }
    }
}
</script>
<style scoped>
.order{
    padding:0.5rem;
    background:#fff;
    min-height:100%;
}
.table{
    font-size:0.35rem;
}
.desk{
    text-align:center;
}
.desk-title{
    font-size:0.7rem;
    line-height:1.4rem;
    font-weight:bold;
}
.thumb{
    border-radius:0.1rem;
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
    width:4rem;
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
    padding-top:0.5rem;
    line-height:0.8rem;
    text-align:center;
    font-size:0.5rem;
    font-weight:bold;
    color:#f00;
}
.status.making{
    color:#f00;
}
.success{
    color:green;
    font-weight:bold;
}
</style>
