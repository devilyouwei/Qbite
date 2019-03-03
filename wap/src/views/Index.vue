<template>
    <div>
        <!--分類-->
        <div class="left">
            <van-list>
                <van-cell v-for="(item,index) in items" :key="index" :title="item.title" :class="activeIndex==index?'active':''" @click="activeIndex=index"/>
            </van-list>
        </div>

        <div class="right">
            <div class="item-label" v-if="items.length">
                {{items[activeIndex].title}}
            </div>
            <div class="replace" v-if="replace">
                暫無菜品
            </div>
            <div class="table" v-if="list.length">
                <div class="row" v-for="(item,index) in list" :key="index">
                    <div class="cell" style="width:2.2rem;text-align:right;">
                        <img v-lazy="item.thumb" class="thumb" alt="">
                    </div>
                    <div class="cell relative">
                        <div class="title text-left">{{item.title}}</div>
                        <div class="price text-right">{{item.price}} MOP$</div>
                        <div class="plus">
                            <i class="iconfont icon-jia"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="shop">
                <i class="iconfont icon-gouwuche"></i>
            </div>
        </div>
    </div>
</template>
<style scoped>
.van-cell.active{
    background:#f00;
    color:#fff;
}
.left{
    border-right:solid 1px #909090;
    height:100%;
    position:absolute;
    width:3rem;
    bottom:0;
    top:0;
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
    top:0;
    bottom:0;
    overflow-y:scroll;
}
.shop{
    background:#f00;
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
.shop .iconfont{
    font-size:1rem;
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
.price{
    color:#f00;
    font-size:0.4rem;
    padding:0.3rem 0.2rem;
    font-weight:600;
}
.plus{
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
}
.plus .iconfont{
    line-height:0.55rem;
    font-size:0.45rem;
}
.table .row .cell{
    padding:0.1rem 0;
}
.item-label{
    font-size:0.45rem;
    padding:0.3rem 0.2rem;
    border-bottom:solid 1px #ccc;
}
</style>
<script>
import $ from '../tool.js'
import { List,Cell} from 'vant'
export default{
    name:"Index",
    components: {
        'van-list': List,
        'van-cell': Cell
    },
    data(){
        return{
            items: [],
            activeIndex: 0,
            activeId: 1,
            replace: false,
            list:[]
        }
    },
    mounted(){
        this.loadData()
    },
    methods:{
        async loadData(){
            let res = await $.post('Wap','listType')
            if(res.status==1 && res.data.length){
                this.items=res.data
                this.activeIndex = 0
                this.getItemFood(this.activeIndex)
            }
        },
        async getItemFood(index){
            this.list = []
            this.replace = false
            let id = this.items[index].id
            let res = await $.post('Wap','listFood',{id:id})
            if(res.status == 1 && res.data.length){
                this.list = res.data
            }else{
                this.replace = true
            }
        }
    },
    watch:{
        activeIndex(i){
            this.getItemFood(i)
        }
    }

}
</script>
