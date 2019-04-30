<template>
    <div class="order">
        <!--已完成訂單詳情-->
        <el-dialog :visible.sync="dialogTableVisible2" style="" :close-on-click-modal="false">
            <div class="title">訂單號：{{content.id}}</div>
            <div class="title">{{content.title}}</div>
            <div class="table fixed" v-for="(item,index) in content.content" :key="index">
                <div class="cell"><img :src="item.thumb" style="width:1.2rem;"></div>
                <div class="cell">{{item.id}}</div>
                <div class="cell">{{item.title}}</div>
                <div class="cell">{{item.price}} × {{item.count}}</div>
            </div>
            <el-row class="price">總計：{{content.price}} {{PRICE_SIGN}}</el-row>
            <div style="font-weight:bold;font-size:0.3rem;line-height:0.8rem;">支付方式</div>
            <div class="table">
                <div class="cell" v-for="(item,index) in content.pay" v-if="item.value>0">{{item.title}}&nbsp;{{item.currency}}&nbsp;<span style="color:#ff0000">{{item.value}}</span></div>
            </div>
        </el-dialog>

        <!--未完成訂單詳情-->
        <el-dialog v-if="selectDesk" :title="selectDesk.title+'未結算訂單'" :visible.sync="dialogTableVisible" style="height:10rem;" :close-on-click-modal="false">
            <el-collapse accordion @change="collapse">
                <el-collapse-item v-for="(item,index) in orders" :key="index" :title="'訂單號：'+item.id" :name="item.id" style="font-weight:bold">
                    <span class="span" v-for="(item2,index2) in item.content" :key="index2">
                        <span class="span-del" @click="delFood(index,index2)">×</span>
                        {{item2.title}} × {{item2.count}} × {{item2.price}}
                        <span v-if="item2.count>item2.cooked" style="color:red">(未完成)</span>
                        <span v-else style="color:green">(完成)</span>
                    </span>
                    <div class="table">
                        <div class="row text-left" style="color:#f00;font-size:0.3rem;line-height:0.8rem;">合計：{{item.price}}</div>
                        <div class="row">
                            <div class="cell">
                                <el-input placeholder="金額" v-model.float="payJson[index3].value" v-for="(item3,index3) in pay" :key="index3" style="margin:0.05rem 0;">
                                    <span slot="prepend" style="width:3rem;">{{item3.title}}</span>
                                    <el-select v-model.number="payJson[index3].cid" slot="append">
                                        <el-option v-for="(item4,index4) in currency" :key="index4" :label="item4.title+' '+item4.unit" :value="item4.id"></el-option>
                                    </el-select>
                                </el-input>
                            </div>
                            <div class="cell text-right">
                                <el-button size="normal" type="primary" @click="paid(item)">結算</el-button>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-dialog>

        <div class="replace" v-if="replace">
            暫無餐桌數據
        </div>
        <!--桌號-->
        <div v-if="list.length">
            <div class="tip">
                點擊餐桌查看訂單詳細
            </div>
            <el-row :gutter="12">
                <el-col :span="8" v-for="(item,index) in list" :key="index">
                    <el-card shadow="hover" class="card" :class="item.orderNum>0?'lock':''">
                        <div @click="showOrder(item),selectDesk=item">{{item.title}}</div>
                        <div style="font-size:0.3rem;padding-top:0.2rem;">
                            <div>訂單：{{item.orderNum}}</div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div style="margin-top:1rem;">
            <el-collapse accordion>
                <el-collapse-item>
                    <template slot="title">
                        <i class="iconfont icon-iconset0203">&nbsp;</i>歷史訂單
                    </template>
                    <el-row>
                        <el-table :data="orders2.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))" style="width:100%">
                            <el-table-column prop="id" label="編號" width="180"></el-table-column>
                            <el-table-column prop="num" label="菜數"></el-table-column>
                            <el-table-column prop="price" label="總價" width="180"></el-table-column>
                            <el-table-column prop="title" label="桌號" width="100"></el-table-column>
                            <el-table-column prop="createtime" label="開始時間" width="180"></el-table-column>
                            <el-table-column prop="endtime" label="結束時間" width="180"></el-table-column>
                            <el-table-column label="訂單內容" fixed="right" width="100">
                                <template slot-scope="scope">
                                    <el-button @click="showContent(scope.row)" type="text" size="small">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination class="page" background layout="prev, pager, next" :current-page="currentPage" :page-size="pageSize" :page-count="totalPage" @current-change="pageChange">
                        </el-pagination>
                    </el-row>
                </el-collapse-item>
            </el-collapse>
        </div>
        <!--歷史訂單-->
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
            pay:[],
            currency:[],
            payJson:[],
            selectDesk:null,
            search: '',
            totalPage: 1,
            currentPage: 1,
            pageSize:0,
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
            this.payJson = []
            this.pay = []
            this.currency = []
            let res = await $.post('Admin','deskList')
            if(res.status==1){
                this.list = res.data
                this.list.length==0?this.replace=true:this.replace=false
            }else this.$message.error(res.msg)

            res = await $.post('Admin','orderHistoryList',{currentPage:this.currentPage},true)
            if(res.status==1){
                this.currentPage = res.page.currentPage
                this.totalPage = res.page.totalPage
                this.pageSize = res.page.pageSize
                for(let i in res.data){
                    res.data[i].createtime = $.formatDate($.stamp2date(res.data[i].createtime),'yyyy-MM-dd hh:mm:ss')
                    res.data[i].endtime = $.formatDate($.stamp2date(res.data[i].endtime),'yyyy-MM-dd hh:mm:ss')
                    if(res.data[i].is_del) res.data[i].title='已刪除'
                }
                this.orders2 = res.data
            } else this.$message.error(res.msg)
        },
        async showOrder(item){
            if(item.orderNum==0) return
            let res = await $.post('Admin','orderListByDesk',{id:item.id},true)
            if(res.status==1){
                this.payJson = []
                for(let i in res.data.pays){
                    this.payJson.push({
                        pid:res.data.pays[i].id, //支付方式ID
                        cid:res.data.currency[0].id, // 貨幣ID
                        value:0, // 支付值
                        title:res.data.pays[i].title, // 支付方式名稱
                        currency:'' // 支付貨幣名稱
                    })
                }
                this.orders = res.data.orders
                this.pay = res.data.pays
                this.currency = res.data.currency
                this.dialogTableVisible = true
            }
        },
        paid(order){
            for(let i in this.payJson){
                if(this.payJson[i]['value']!=0) this.payJson[i]['value'] = parseFloat(this.payJson[i]['value']).toFixed(2)
                for(let j in this.currency){
                    if(this.payJson[i].cid == this.currency[j].id) {
                        this.payJson[i].currency = this.currency[j].title
                        break;
                    }
                }
            }
            this.$confirm('確定用戶已經結賬？訂單號：' + order.id, '結賬', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await $.post('Admin','pay',{id:order.id,content:JSON.stringify(order.content),pay:JSON.stringify(this.payJson)},true)
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
        },
        collapse(){
            for(let i in this.payJson){
                this.payJson[i].value=0
                this.payJson[i].cid=this.currency[0].id
            }
        },
        pageChange(p){
            this.currentPage = p
            this.loadData()
        }
    }
}
</script>
<style>
.order .el-input-group{
    width:4rem;
}
.order .el-input>.el-input__inner{
    width:3rem;
    text-align:center;
}
.order .el-input>.el-input-group__append {
    background-color: #fff;
}
</style>
<style scoped>
.card{
    cursor:pointer;
}
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
    font-weight:bold;
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
.page {
    padding:0.5rem 0;
    text-align:right;
}
</style>
