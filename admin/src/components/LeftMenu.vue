<template>
    <div class="left-menu">
        <el-menu default-active="1" background-color="#409eff" text-color="#fff" active-text-color="#fff" @select="menuSelect" style="height:100%;">
            <el-submenu index="110" v-if="user.admin">
                <template slot="title">
                    <i class="iconfont icon-menu">&nbsp;</i>
                    <span style="color:red">超級管理</span>
                </template>
                <el-menu-item index="1101">
                    <span slot="title" style="color:red">店铺管理</span>
                </el-menu-item>
                <el-menu-item index="1102">
                    <span slot="title" style="color:red">支付配置</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="1">
                <i class="iconfont icon-home">&nbsp;</i>
                <span slot="title">主要信息</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="iconfont icon-menu">&nbsp;</i>
                    <span>菜單</span>
                </template>
                <el-menu-item index="21">
                    <span slot="title">類別</span>
                </el-menu-item>
                <el-menu-item index="22">
                    <span slot="title">菜品</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
                <i class="iconfont icon-dingdan">&nbsp;</i>
                <span slot="title">訂單</span>
            </el-menu-item>
            <el-menu-item index="4" v-if="user.pid==1">
                <i class="iconfont icon-shezhi">&nbsp;</i>
                <span slot="title">配置</span>
            </el-menu-item>
            <el-menu-item index="5">
                <i class="iconfont icon-tuichu">&nbsp;</i>
                <span slot="title">登出</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import $ from '../tool.js'
export default {
    name: 'LeftMenu',
    props: {
        active: String
    },
    data(){
        return{
            user:$.getUserInfo()
        }
    },
    methods: {
        menuSelect: function(i){
            if(i==5){
                return $.logout()
            }
            this.$emit('select',i)
        }
    }
}
</script>
<style>
.left-menu .el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    min-width: 0!important;
}
.left-menu .el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    min-width: 0!important;
}
.left-menu .el-submenu__icon-arrow .el-icon-arrow-down{
    color:#fff!important;
}
.left-menu .el-submenu__title i {
    color: #fff!important;
}
</style>
<style scoped>
.left-menu{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    width:15%;
    height:100%;
}
.left-menu .iconfont{
    font-size:0.3rem;
    color:#fff;
}
</style>
