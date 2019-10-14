<template>
    <div class="app" id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App',
    mounted(){
        if(localStorage.getItem('reg_info')) {
            this.$router.replace('/Register')
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
