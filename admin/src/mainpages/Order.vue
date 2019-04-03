<template>
    <div class="order">
        <!--已完成訂單詳情-->
        <el-dialog :visible.sync="dialogTableVisible2" style="" :close-on-click-modal="false">
            <div class="title">訂單號：{{content.id}}<br>餐桌：{{content.title}}</div>
            <div class="table fixed" v-for="(item,index) in content.content" :key="index">
                <div class="cell">{{item.id}}</div>
                <div class="cell">{{item.title}}</div>
                <div class="cell">{{item.price}} × {{item.count}}</div>
            </div>
            <el-row class="price">{{content.price}} {{PRICE_SIGN}}</el-row>
        </el-dialog>

        <!--未完成訂單詳情-->
        <el-dialog v-if="selectDesk" :title="selectDesk.title+'未結算訂單'" :visible.sync="dialogTableVisible" style="height:10rem;" :close-on-click-modal="false">
            <el-collapse accordion>
                <el-collapse-item v-for="(item,index) in orders" :key="index" :title="'訂單號：'+item.id" :name="item.id" style="font-weight:bold">
                    <span class="span" v-for="(item2,index2) in item.content" :key="index2">
                        <span class="span-del" @click="delFood(index,index2)">×</span>
                        {{item2.title}} × {{item2.count}} × {{item2.price}}
                    </span>
                    <div class="table">
                        <div class="cell text-left" style="color:#f00;font-size:0.3rem;line-height:0.8rem;">合計：{{item.price}}</div>
                        <div class="cell text-right">
                            <el-button size="mini" type="primary" @click="paid(item)">已結算</el-button>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-dialog>

        <div class="replace" v-if="replace">
            暫無數據
        </div>
        <div class="tip">
            點擊餐桌查看訂單詳細
        </div>
        <el-row :gutter="12" v-if="list.length">
            <el-col :span="8" v-for="(item,index) in list" :key="index">
                <el-card shadow="hover" class="card" :class="item.orderNum>0?'lock':''">
                    <div>{{item.title}}</div>
                    <div style="font-size:0.3rem;padding-top:0.2rem;">
                        <div @click="showOrder(item),selectDesk=item">訂單：{{item.orderNum}}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!--歷史訂單-->
        <el-collapse accordion style="margin-top:1rem;">
            <el-collapse-item>
                <template slot="title">
                    <i class="iconfont icon-iconset0203">&nbsp;</i>歷史訂單
                </template>
                <el-row>
                    <el-table :data="orders2.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))" style="width:100%">
                        <el-table-column prop="id" label="編號" width="180"></el-table-column>
                        <el-table-column prop="num" label="人數"></el-table-column>
                        <el-table-column prop="price" label="總價" width="180"></el-table-column>
                        <el-table-column prop="title" label="桌號" width="180"></el-table-column>
                        <el-table-column prop="createtime" label="開始時間" width="180"></el-table-column>
                        <el-table-column prop="endtime" label="結束時間" width="180"></el-table-column>
                        <el-table-column label="訂單內容" fixed="right" width="100">
                            <template slot-scope="scope">
                                <el-button @click="showContent(scope.row)" type="text" size="small">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import $ from '../tool.js'
export default{
    data(){
        return{
            list: [],
            orders:[],// 未完成訂單
            orders2:[],// 歷史訂單（已完成）
            content: [],
            selectDesk:null,
            search: '',
            replace:false,
            PRICE_SIGN:$.PRICE_SIGN,
            dialogTableVisible:false,
            dialogTableVisible2:false
        }
    },
    mounted(){
        this.loadData()
    },
    methods:{
        async loadData(){
            let res = await $.post('Admin','deskList',{},true)
            if(res.status==1){
                this.list = res.data
                this.list.length==0?this.replace=true:this.replace=false
            }else this.$message.error(res.msg)

            res = await $.post('Admin','orderHistoryList',{},true)
            if(res.status==1){
                for(let i in res.data){
                    res.data[i].createtime = $.formatDate($.stamp2date(res.data[i].createtime),'yyyy-MM-dd hh:mm:ss')
                    res.data[i].endtime = $.formatDate($.stamp2date(res.data[i].endtime),'yyyy-MM-dd hh:mm:ss')
                }
                this.orders2 = res.data
            }else this.$message.error(res.msg)
        },
        async showOrder(item){
            if(item.orderNum==0) return
            let res = await $.post('Admin','orderList',{id:item.id})
            if(res.status==1){
                this.orders = res.data
                this.dialogTableVisible = true
            }
        },
        paid(order){
            this.$confirm('確定用戶已經結賬？訂單號：' + order.id, '結賬', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await $.post('Admin','pay',{id:order.id,content:JSON.stringify(order.content)},true)
                if(res.status==1) this.$message({message: res.msg, type: 'success'})
                else this.$message.error(res.msg)
                this.loadData()
                this.showOrder(this.selectDesk)
            })
        },
        showContent(content){
            this.dialogTableVisible2 = true
            this.content = content
        },
        async delFood(order_i,content_i){
            this.orders[order_i].price = parseFloat(this.orders[order_i].price)
            this.orders[order_i].price-=parseFloat(this.orders[order_i].content[content_i].price)
            this.orders[order_i].price = this.orders[order_i].price.toFixed(2)
            if(this.orders[order_i].content[content_i].count>1) this.orders[order_i].content[content_i].count--
            else this.orders[order_i].content.splice(content_i,1)
        }
    }
}
</script>
<style scoped>
.order{
    padding:0.5rem;
}
.tip{
    text-align:center;
    color:#409EFF;
    font-size:0.3rem;
}
.card{
    width:200px;
    margin:0.5rem auto;
    text-align:center;
    font-size:25px;
    font-weight:bold;
    background:#fff;
    color:#ccc;
}
.card.lock{
    background:#409EFF;
    color:#fff;
}
.span{
    display:inline-block;
    padding:0.1rem;
    border:solid 1px #409EFF;
    border-radius:0.1rem;
    color:#409EFF;
    margin:0.15rem;
    position:relative;
}
.span-del{
    position:absolute;
    display:inline-block;
    width:0.3rem;
    height:0.3rem;
    line-height:0.3rem;
    text-align:center;
    font-size:0.1rem;
    right:-0.1rem;
    top:-0.15rem;
    cursor:pointer;
    z-index:9;
    background:red;
    color:#fff;
    padding:0.01rem;
    border-radius:100%;
}
.title{
    text-align:center;
    font-size:0.5rem;
    line-height:0.65rem;
    padding-bottom:0.5rem;
}
.content{
    font-size:0.3rem;
    line-height:0.5rem;
}
.price{
    padding:0.5rem 0;
    font-size:0.5rem;
    color:#ff0000;
}
</style>
