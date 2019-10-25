<template>
    <div>
        <div class="header" v-if="shop" :style="shop.background?'background-image:url('+shop.background+')':''">
            <div class="text-center">
                <div class="logo text-center">
                    <img :src="shop.img">
                </div>
                <div class="shop-title">
                    {{shop.title}}
                </div>
                <div class="shop-intro">
                    “{{shop.description}}”
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
            <!--
                <div class="item-label" v-if="type.length">
                {{type[activeIndex].title}}
                </div>
            -->
            <div class="replace" v-if="replace">
                None
            </div>
            <div class="table" v-if="list.length">
                <div class="row" v-for="(item,index) in list" :key="index" v-show="type[activeIndex].id==item.tid">
                    <div class="cell" style="width:2.2rem;text-align:right;">
                        <img v-lazy="item.thumb" class="thumb" alt="" @click="showIndex=index,showDesc=true">
                    </div>
                    <div class="cell relative">
                        <div class="title text-left">{{item.title}}</div>
                        <div class="price text-left">{{item.price}} {{priceSign}}</div>
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
        </div>
        <div class="foot">
            <div class="table" @click="shopped>0?showPopup=true:showPopup=false">
                <div class="cell review" :class="shopped>0?'active':''">
                    <i class="iconfont icon-gouwuche"></i>
                    <span class="shopped" v-if="shopped">{{shopped}}</span>
                    <span v-if="price" style="margin-left:1rem;">{{price.toFixed(2)}} {{priceSign}}</span>
                </div>
                <div class="cell pay">Place order</div>
            </div>
        </div>

        <van-popup v-model="showDesc" :overlay="true" class="descPop">
            <div class="img-box"><img :src="list[showIndex].thumb" alt=""></div>
            <div class="title">{{list[showIndex].title}}</div>
            <div class="desc">{{list[showIndex].intro}}</div>
            <div class="price">${{list[showIndex].price}}</div>
        </van-popup>

        <van-popup v-model="showPopup" position="bottom" style="padding:0.5rem 0;">
            <div class="shopping table">
                <div class="row" v-for="(item,index) in list" :key="index" v-show="item.count>0">
                    <div class="cell img" style="padding-left:0.5rem;">
                        <img v-lazy="item.thumb">
                    </div>
                    <div class="cell title">
                        {{item.title}}
                    </div>
                    <div class="cell price" style="text-align:left;">
                        {{(parseFloat(item.price)*item.count).toFixed(2)}} {{priceSign}}
                    </div>
                    <div class="cell count" style="padding-right:0.1rem;width:1.8rem;text-align:right">
                        <div class="count" v-if="item.count" style="width:1.8rem;">
                            <i class="iconfont icon-jian" @click="minus(index)"></i>
                            <span style="width: 0.45rem;line-height:0.5rem;display: inline-block;text-align: center;">{{item.count}}</span>
                            <i class="iconfont icon-jia" @click="add(index)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="all-price text-center">
                {{price.toFixed(2)}} {{priceSign}}
            </div>
            <div class="table btn-box text-center" v-show="showPopup">
                <div class="cell">
                    <van-button type="default" @click="showPopup=false" size="small"><i class="iconfont icon-error">&nbsp;</i>close</van-button>
                </div>
                <div class="cell">
                    <van-button type="danger" @click="submit" size="small"><i class="iconfont icon-zhengque">&nbsp;</i>Place Order</van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>
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
            showIndex:0,
            showDesc:false,
            shopped: 0,
            priceSign:$.PRICE_SIGN,
            replace: false
        }
    },
    mounted(){
        let did = $.getParams()['did'] // 桌號ID
        if(did){
            localStorage.setItem('did',did)
        }
        let oid = localStorage.getItem('oid')
        if(oid) return this.$router.replace('/Order')
        this.loadData()
    },
    methods:{
        async loadData(){
            let res = await $.post('Wap','index',{},true)
            if(res.status==1 && res.data.type.length){
                let save =  JSON.parse(localStorage.getItem('save_list'))
                // 增加字段，計數下單菜的數目
                for(let i in res.data.food){
                    res.data.food[i].count = 0
                    for(let j in save){ // 遍历查找是否有相应的点过菜
                        if(save[j].id == res.data.food[i].id) res.data.food[i].count = save[j].count
                    }
                    if(res.data.food[i].count>0){
                        this.price+=parseFloat(res.data.food[i].price*res.data.food[i].count)
                        this.shopped+=res.data.food[i].count
                    }
                }
                this.type = res.data.type
                this.list = res.data.food
                this.shop = res.data.shop
                localStorage.setItem('shop',JSON.stringify(this.shop))
            } else this.alert('提示',res.msg)
        },
        add(index){
            this.shopped++
            this.list[index].count++
            this.price+=parseFloat(this.list[index].price)
            localStorage.setItem('save_list',JSON.stringify(this.list)) // 缓存用户点餐信息
        },
        minus(index){
            this.shopped--
            if(this.list[index].count>0) this.list[index].count--
            this.price-=parseFloat(this.list[index].price)
            localStorage.setItem('save_list',JSON.stringify(this.list)) // 缓存用户点餐信息
        },
        submit(){
            for(let i in this.list){
                if(this.list[i].count>0){
                    this.order.push(this.list[i])
                }
            }
            localStorage.setItem('order',JSON.stringify(this.order))
            this.order = []
            localStorage.removeItem('save_list')
            this.$router.push('/Order')
        }
    },
    watch:{
        shopped(v){
            if(v==0) this.showPopup=false
        }
    }
}
</script>
<style scoped>
.foot{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    color:#fff;
    text-align:center;
}
.pay{
    background:rgb(255,165,8);
    padding:0.3rem 0;
}
.review{
    text-align:left;
    background:#ccc;
    width:80%;
    font-size:0.6rem;
    padding:0.2rem 0;
}
.review.active{
    background: -webkit-linear-gradient(left,rgb(248,81,88), rgb(208,11,35));
}
.van-cell{
    overflow: hidden;
    background:#f2f2f2;
    color:#000;
}
.left .van-list .van-cell{
    font-size:0.35rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    line-height:0.7rem;
}
.van-cell.active{
    background:#fff;
    color:#000;
}
.header{
    height:2.3rem;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    overflow:visible;
}
.header .table{
    height:3.6rem;
}
.header .logo{
    padding:0.2rem 0;
    padding-top:1rem;
}
.header .logo img{
    object-fit:cover;
    width:1.8rem;
    height:1.8rem;
    vertical-align:middle;
    border-radius:100%;
}
.header .shop-title{
    font-size:0.45rem;
    font-weight:bold;
    line-height:0.6rem;
}
.header .shop-intro{
    color:#969799;
    line-height:0.5rem;
    font-size:0.35rem;
    padding-top:0.3rem;
}
.left{
    background:#f2f2f2;
    position:absolute;
    width:3rem;
    bottom:0;
    top:5rem;
    left:0;
    overflow-y:scroll;
}
.right{
    padding:0.5rem 0;
    position:absolute;
    left:3rem;
    right:0;
    top:5rem;
    bottom:0;
    padding-bottom:1.5rem;
    overflow-y:scroll;
}
.shop{
    background:#ccc;
    position:fixed;
    width:1.6rem;
    height:1.6rem;
    border-radius:100%;
    color:#fff;
    left:0.5rem;
    bottom:0.3rem;
    z-index:9;
    text-align:center;
    line-height:1.8rem;
}
.shop.active{
    background: -webkit-linear-gradient(rgb(208,11,35),rgb(248,81,88));
}
.review .iconfont{
    margin-left:0.5rem;
    font-size:0.8rem;
}
.review .shopped{
    font-size:0.4rem;
}
.thumb{
    border-radius:0.1rem;
    width:1.8rem;
    height:1.8rem;
    object-fit:cover;
}
.right .title{
    font-weight:600;
    font-size:0.33rem;
    padding:0.2rem 0.2rem;
    width:3.5rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.right .price{
    color:#f00;
    font-size:0.35rem;
    line-height:0.4rem;
    padding:0.2rem 0.2rem;
    font-weight:600;
}
.right .plus,.right .count{
    position:absolute;
    right:0.2rem;
    bottom:0.6rem;
    background:#2d78f4;
    color:#fff;
    padding:0.05rem;
    border-radius:100rem;
    height:0.5rem;
    width:0.5rem;
    text-align:center;
    font-size:0.4rem;
    line-height:0.5rem;
}
.plus .iconfont{
    line-height:0.55rem;
    font-size:0.45rem;
}
.right .count{
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
.right .count span{
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
    font-size:0.35rem;
}
.shopping img{
    width:1.3rem;
    height:1.3rem;
    object-fit:cover;
}
.btn-box{
    padding:0.5rem 0;
}
.btn-box .van-button{
    border:none;
    font-size:0.35rem;
}
.all-price{
    text-align:center;
    color:#f00;
    font-size:0.6rem;
    font-weight:bold;
    line-height:2rem;
}
.shopping .img{
    width:1.6rem;
}
.shopping .title{
    vertical-align:middle;
    text-align:left;
    width:3rem;
}
.shopping .price{
    width:1.5rem;
    color:#f00;
    text-align:right;
}
.shopping .count{
    font-size:0.4rem;
    text-align:right;
    width:1rem;
}
.descPop{
    width:70%;
    border:none;
}
.descPop .title{
    font-size:0.6rem;
    line-height:0.85rem;
    font-weight:bold;
    line-height:0.85rem;
    padding:0 0.5rem;
}
.descPop .img-box{
    width:100%;
}
.descPop .img-box img{
    width:100%;
    height:5rem;
    object-fit:cover;
}
.descPop .desc{
    font-size:0.5rem;
    line-height:0.85rem;
    padding:0 0.5rem;
}
.descPop .price{
    color:#f00;
    font-size:0.5rem;
    font-weight:bold;
    text-align:right;
    padding:0.5rem;
}

</style>
