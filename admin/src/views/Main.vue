<template class="d-flex flex-column h-100">
    <div class="main d-flex flex-column h-100">
        <header class="head container-fluid">
            <!-- Image and text -->
            <nav class="navbar navbar-light ">
                <a class="navbar-brand" href="#">
                    <div class="logo pl-1" @click="toIndex"><i class="iconfont icon-letter-q"></i><b>uick Bite</b></div>
                </a>
                <form class="form-inline">
                    <b-dropdown size="sm" id="lang-dropdown" text="EN" class="">
                        <b-dropdown-item-button class="">
                            <a href="#" @click="setLocale('en')">
                                <flag iso="us"></flag>
                            </a>
                            <span class="lang-text">EN</span>
                        </b-dropdown-item-button>
                        <b-dropdown-item-button>
                            <a href="#" @click="setLocale('zh')">
                                <flag iso="cn">CN</flag>
                            </a>
                            <span class="lang-text">CN</span>
                        </b-dropdown-item-button>
                    </b-dropdown>

                    <button class="btn mr-1" type="button">
                        <router-link to="/login">{{$t('signIn')}}</router-link>
                    </button>

                </form>
            </nav>
            <div class="d-flex flex-column ">
                <div class="d-flex flex-column align-items-center">
                    <span class="banner-title"><b>{{$t('bannerTitle')}}</b></span>
                </div>
                <div class="d-flex flex-column">
                    <div class="d-flex flex-row">
                        <div >
                            <el-input v-model="search" :placeholder="$t('bannerSearchBox')"></el-input>
                        </div>
                        <div>
                            <el-button class="search-btn">{{$t('bannerSearchButton')}}</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <!--            <div class="banner table">-->
            <!--                <div class="banner-align">-->
            <!--                    <div class="title-align">-->
            <!--                        <h1 class="banner-title">{{$t('bannerTitle')}}</h1>-->
            <!--                    </div>-->
            <!--                    <div class="search-align">-->
            <!--                        <div class="banner-search-box">-->
            <!--                            <el-input v-model="search" :placeholder="$t('bannerSearchBox')"></el-input>-->
            <!--                        </div>-->
            <!--                        <div>-->
            <!--                            <el-button class="search-btn">{{$t('bannerSearchButton')}}</el-button>-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->

        </header>

    </div>
</template>

<script>
    import $ from '../tool.js'

    export default {
        name: 'Main',
        data() {
            return {
                search: '',
                list: [],
                list2: []
            }
        },
        methods: {
            toIndex() {
                location.replace('/')
            },
            async loadData() {
                let res = await $.post('Main', 'foodList')
                let res2 = await $.post('Main', 'shopList')
                if (res.status == 1) {
                    this.list = res.data
                    this.list2 = res2.data
                }
            },
            setLocale(locale) {
                this.$root.$i18n.locale = locale
            }
        },
        mounted() {
            this.loadData();
        }
    }
</script>

<style>
    header.head {
        min-height: 8rem;
        background-image: url("../assets/banner.jpg");
        background-size: cover;
        text-align: center;
        margin: 0 auto;
        background-blend-mode: lighten;

    }

    nav.navbar {
        padding: unset;
    }

    div.logo {
        color: #409eff;
        font-size: 0.5rem;
    }

    .icon-letter-q {
        font-size: 0.8rem;

    }

    button.btn {
        font-size: 0.4rem;
        padding: 0.3rem;

    }

    .btn:focus {
        box-shadow: unset;
        outline: 0;
    }

    #lang-dropdown > button {
        padding: 0.3rem;
        color: unset;
        background-color: transparent !important;
        border-color: unset;
        border: unset;
        font-size: 0.4rem;

    }

    .dropdown-menu {
        font-size: 0.4rem !important;
        min-width: unset !important;
        padding: 0.05rem 0.15rem !important;
    }

    .dropdown-item {
        padding-left: unset !important;
        padding-right: unset !important;
        /*!*padding-top: unset !important;*!*/
        /*!*padding-bottom: unset !important;*!*/


    }

    span.lang-text {
        padding-left: 0.15rem;
    }

    span.banner-title {
        font-size: .7rem;
    }

</style>
