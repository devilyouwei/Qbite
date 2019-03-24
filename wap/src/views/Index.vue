<template>
    <div>
        <div class="header" v-if="shop">
            <div class="table">
                <div class="cell logo">
                    <img :src="shop.img">
                </div>
                <div class="cell shop-title">
                    {{shop.title}}
                </div>
            </div>
        </div>
        <!--分類-->
        <div class="left">
            <van-list>
                <van-cell v-for="(item,index) in type" :key="index" :title="item.title" :class="activeIndex==index?'active':''" @click="activeIndex=index"/>
            </van-list>
        </div>

        <div class="right">
            <div class="item-label" v-if="type.length">
                {{type[activeIndex].title}}
            </div>
            <div class="replace" v-if="replace">
                暫無菜品
            </div>
            <div class="table" v-if="list.length">
                <div class="row" v-for="(item,index) in list" :key="index" v-show="type[activeIndex].id==item.tid">
                    <div class="cell" style="width:2.2rem;text-align:right;">
                        <img v-lazy="item.thumb" class="thumb" alt="">
                    </div>
                    <div class="cell relative">
                        <div class="title text-left">{{item.title}}</div>
                        <div class="price text-right">{{item.price}} {{priceSign}}</div>
                        <div class="count" v-if="item.count">
                            <i class="iconfont icon-jian" @click="minus(index)"></i>
                            <span>{{item.count}}</span>
                            <i class="iconfont icon-jia" @click="add(index)"></i>
                        </div>
                        <div class="plus" v-else>
                            <i class="iconfont icon-jia" @click="add(index)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="shop" :class="shopped>0?'active':''" @click="shopped>0?showPopup=true:showPopup=false">
                <i class="iconfont icon-gouwuche"></i>
                <span class="shopped" v-if="shopped">{{shopped}}</span>
            </div>
            <van-popup v-model="showPopup" position="top">
                <div class="shopping table">
                    <div class="row" v-for="(item,index) in list" :key="index" v-show="item.count>0">
                        <div class="cell" style="width:2.3rem;">
                            <img v-lazy="item.thumb">
                        </div>
                        <div class="cell price" style="width:3rem;">
                            {{(parseFloat(item.price)*item.count).toFixed(2)}} {{priceSign}}
                        </div>
                        <div class="cell title">
                            {{item.title}}
                        </div>
                        <div class="cell">
                            ×{{item.count}}
                        </div>
                    </div>
                </div>
                <div class="all-price text-center">
                    {{price.toFixed(2)}} {{priceSign}}
                </div>
                <div class="table btn-box text-center" v-show="showPopup">
                    <div class="cell">
                        <van-button type="default" @click="showPopup=false"><i class="iconfont icon-error">&nbsp;</i>關閉</van-button>
                    </div>
                    <div class="cell">
                        <van-button type="danger" @click="submit"><i class="iconfont icon-zhengque">&nbsp;</i>下單</van-button>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>
<style scoped>
.van-cell{
background:#f2f2f2;
color:#000;
}
.van-cell.active{
    background:#fff;
    color:#000;
}
.header{
    height:3rem;
}
.header .table{
    height:3rem;
}
.header .logo{
    vertical-align:middle;
    width:3rem;
}
.header .logo img{
    object-fit:cover;
    width:1.5rem;
    height:1.5rem;
    vertical-align:middle;
    border-radius:100%;
    margin-left:0.5rem;
}
.header .shop-title{
    font-size:1rem;
    font-weight:bold;
}
.left{
    background:#f2f2f2;
    position:absolute;
    width:3rem;
    bottom:0;
    top:3rem;
    left:0;
    overflow-y:scroll;
}
.left .van-list .van-cell{
    font-size:0.45rem;
}
.right{
    position:absolute;
    left:3rem;
    right:0;
    top:3rem;
    bottom:0;
    overflow-y:scroll;
}
.shop{
    background:#ccc;
    position:fixed;
    width:1.8rem;
    height:1.8rem;
    border-radius:99rem;
    color:#fff;
    right:0.5rem;
    bottom:1rem;
    text-align:center;
    line-height:1.8rem;
}
.shop.active{
    background:#f00;
}
.shop .iconfont{
    font-size:1rem;
}
.shop .shopped{
    font-size:0.4rem;
}
.thumb{
    border-radius:0.1rem;
    width:2rem;
    height:2rem;
    object-fit:cover;
}
.title{
    font-weight:600;
    font-size:0.5rem;
    padding:0.3rem 0.2rem;
}
.right .price{
    color:#f00;
    font-size:0.4rem;
    padding:0.3rem 0.2rem;
    font-weight:600;
}
.plus,.count{
    position:absolute;
    right:0.3rem;
    top:0.6rem;
    background:#2d78f4;
    color:#fff;
    padding:0.05rem;
    border-radius:100rem;
    height:0.5rem;
    width:0.5rem;
    text-align:center;
    font-size:0.4rem;
}
.plus .iconfont{
    line-height:0.55rem;
    font-size:0.45rem;
}
.count{
    width:1.8rem;
    background:none;
    color:#000;
}
.count .iconfont.icon-jian{
    display:inline-block;
    height:0.5rem;
    width:0.5rem;
    color:#2d78f4;
    background:#fff;
    border-radius:100rem;
    border:solid 1px #2d78f4;
    text-align:center;
    vertical-align:middle;
}
.count .iconfont.icon-jia{
    display:inline-block;
    height:0.5rem;
    width:0.5rem;
    padding:0.05rem;
    color:#fff;
    background:#2d78f4;
    border-radius:100rem;
    text-align:center;
    vertical-align:middle;
}
.count span{
    display:inline-block;
    width:0.5rem;
    line-height:0.5rem;
    height:0.5rem;
}
.table .row .cell{
    padding:0.1rem 0;
}
.item-label{
    font-size:0.5rem;
    font-weight:bold;
    padding:0.5rem 0.2rem;
    text-align:center;
}
.shopping{
    font-size:0.5rem;
}
.shopping img{
    width:2rem;
    height:2rem;
    object-fit:cover;
}
.btn-box{
    padding:0.5rem 0;
}
.btn-box .van-button{
    border:none;
    font-size:0.5rem;
}
.all-price{
    text-align:center;
    color:#f00;
    font-size:0.8rem;
    font-weight:bold;
    line-height:2rem;
}
</style>
<script>
import $ from '../tool.js'
import { List,Cell,Popup,Button} from 'vant'
export default{
    name:"Index",
    components: {
        'van-list': List,
        'van-cell': Cell,
        'van-popup': Popup,
        'van-button': Button
    },
    data(){
        return{
            shop:null,
            type: [],
            list:[],
            order:[],
            activeIndex: 0,
            activeId: 1,
            price: 0,
            showPopup: false,
            shopped: 0,
            priceSign:$.PRICE_SIGN,
            replace: false
        }
    },
    mounted(){
        let sid = $.getParams()['sid'] // 店鋪ID
        let did = $.getParams()['did'] // 桌號ID
        if(sid && did){
            localStorage.setItem('sid',sid)
            localStorage.setItem('did',did)
        }
        let oid = localStorage.getItem('oid')
        if(oid) return this.$router.replace('/Order')
        this.loadData()
    },
    methods:{
        async loadData(){
            let res = await $.post('Wap','index')
            if(res.status==1 && res.data.type.length){
                // 增加字段，計數下單菜的數目
                for(let i in res.data.food){
                    res.data.food[i].count = 0
                }
                this.type = res.data.type
                this.list = res.data.food
                this.shop = res.data.shop
            }
        },
        add(index){
            this.shopped++
            this.list[index].count++
            this.price+=parseFloat(this.list[index].price)
        },
        minus(index){
            this.shopped--
            if(this.list[index].count>0) this.list[index].count--
            this.price-=parseFloat(this.list[index].price)
        },
        submit(){
            for(let i in this.list){
                if(this.list[i].count>0){
                    this.order.push(this.list[i])
                }
            }
            localStorage.setItem('order',JSON.stringify(this.order))
            this.order = []
            this.$router.push('/Order')
        }
    }
}
</script>
