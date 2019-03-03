<template>
    <div class="left-menu">
        <el-menu default-active="1" background-color="#fff" @select="menuSelect" style="height:100%;">
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
            <el-menu-item index="4">
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
}
</style>
