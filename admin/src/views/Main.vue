<template>
    <div class="main">
        <div class="head">
            <div class="table">
                <div class="cell logo" @click="toIndex"><i class="iconfont icon-letter-q"></i>uick Bite</div>
                <div class="cell"></div>
                <div class="cell text-right">Sign In</div>
            </div>
        </div>
        <div class="banner">
            <h1 class="banner-title">Search The Food, Find The Restaurant</h1>
            <div class="banner-search-box">
                <el-input v-model="search" placeholder="请输入内容"></el-input>
            </div>
        </div>
        <div class="food list">
            <div class="list-title">TOP FOOD</div>
            <div class="list-content">
                <ul class="avg-4">
                    <li v-for="(item,index) in list" :key="index">
                        <div class="box">
                            <div class="thumb"><img :src="item.thumb"></div>
                            <div class="title">
                                {{item.title}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="shops list">
            <div class="list-title">OUR PARTNER RESTAURANTS</div>
            <div class="list-content">
                <ul class="avg-4">
                    <li v-for="(item,index) in list2" :key="index">
                        <div class="box">
                            <div class="img"><img :src="item.img"></div>
                            <div class="title">
                                {{item.title}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer">
        </div>
    </div>
</template>

<script>
import $ from '../tool.js'
export default{
    name: 'Main',
    data(){
        return {
            search:'',
            list:[],
            list2:[]
        }
    },
    methods:{
        toIndex(){
            location.replace('/')
        },
        async loadData(){
            let res = await $.post('Main','foodList')
            let res2 = await $.post('Main','shopList')
            if(res.status==1){
                this.list = res.data
                this.list2 = res2.data
            }
        }
    },
    mounted(){
        this.loadData();
    }
}
</script>

<style scoped>
.head{
    padding:0.4rem 0.5rem;
}
.head .logo{
    color:#409eff;
    font-size:0.38rem;
    font-weight:bold;
    cursor:pointer;
}
.head .logo .icon-letter-q{
    font-size:0.55rem;
}
.banner{
    text-align:center;
    padding:1rem 0;
}
.banner .banner-title{
    font-size:0.5rem;
    padding-bottom:0.5rem;
}
.banner .banner-search-box{
    width:9rem;
    margin:0 auto;
}
.list {
    padding:0.5rem 1.5rem;
}
.list .list-title{
    font-size:0.35rem;
    padding:0.5rem 0;
}
.footer {
    background-color: #f7fbfd;
    width: 100%;
    padding: 40px 150px;
    box-sizing: border-box;
}
.list .list-content .img{
    text-align:center;
}
.list .list-content .img img{
    width:3rem;
    height:3rem;
    object-fit:cover;
    margin: 0 auto;
}
.list .list-content .thumb{
    text-align:center;
}
.list .list-content .thumb img{
    width:5rem;
    height:3rem;
    object-fit:cover;
    margin: 0 auto;
}

.list .list-content .title{
    text-align:center;
    font-size:0.25rem;
    line-height:0.4rem;
    padding:0.1rem 0;
}
.list .list-content .box{
    padding-bottom:0.5rem;
}
</style>
