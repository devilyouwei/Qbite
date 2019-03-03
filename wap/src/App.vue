<template>
    <div class="app">
        <router-view/>
    </div>
</template>

<script>
import $ from './tool.js'
export default {
    name: 'App',
    mounted: function(){
        let sid = $.getParams()['sid']
        let did = $.getParams()['did']
        localStorage.setItem('sid',sid)
        localStorage.setItem('did',did)
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    width:100%;
    display:block;
}
</style>
