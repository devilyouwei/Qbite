<template class="h-100">
    <div class="main">
        <div class="head">
            <div class="i-table">
                <div class="i-cell logo"><i class="iconfont icon-letter-q"></i>uick Bite</div>
                <div class="i-cell">
                    <a href="#" @click="setLocale('en')"><flag iso="us"></flag></a>
                    <a href="#" @click="setLocale('zh')"><flag iso="cn"></flag></a>
                </div>
                <div class="i-cell sign-in"><router-link to="/login">{{$t('signIn')}}</router-link></div>
                <div class="i-cell"><router-link to="/cart"><span class="cart"><i class="fas fa-shopping-bag"></i></span></router-link></div>
            </div>
        </div>
        <div class="px-4 px-lg-0">
            <div class="pb-5">
                <div class="container">
                    <h1>Current Order</h1>
                    <div class="row">
                        <div class="col-lg-12 bg-white mb-1">

                            <!-- Shopping cart table -->
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="border-0 bg-light">
                                                <div class="p-2 px-3 text-uppercase">Item</div>
                                            </th>
                                            <th scope="col" class="border-0 bg-light">
                                                <div class="py-2 text-uppercase">Price</div>
                                            </th>
                                            <th scope="col" class="border-0 bg-light">
                                                <div class="py-2 text-uppercase">Quantity</div>
                                            </th>
                                            <th scope="col" class="border-0 bg-light">
                                                <div class="py-2 text-uppercase">Remove</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" class="border-0">
                                                <div class="p-2">
                                                    <img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" width="70" class="img-fluid rounded shadow-sm">
                                                    <div class="ml-3 d-inline-block align-middle">
                                                        <p class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">Quarter Pounder</a></p><span class="text-muted font-weight-normal font-italic d-block">Category: Most Popular</span>
                                                    </div>
                                                </div>
                                            </th>
                                            <td class="border-0 align-middle"><strong>$12.99</strong></td>
                                            <td class="border-0 align-middle"><strong>1</strong></td>
                                            <td class="border-0 align-middle"><a href="#" class="text-dark"><i class="fa fa-trash"></i></a></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <div class="p-2">
                                                    <img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" width="70" class="img-fluid rounded shadow-sm">
                                                    <div class="ml-3 d-inline-block align-middle">
                                                        <p class="mb-0"><a href="#" class="text-dark d-inline-block">Quarter Pounder</a></p><span class="text-muted font-weight-normal font-italic">Category: Dinner</span>
                                                    </div>
                                                </div>
                                            </th>
                                            <td class="align-middle"><strong>$12.99</strong></td>
                                            <td class="align-middle"><strong>1</strong></td>
                                            <td class="align-middle"><a href="#" class="text-dark"><i class="fa fa-trash"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <div class="p-2">
                                                    <img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" width="70" class="img-fluid rounded shadow-sm">
                                                    <div class="ml-3 d-inline-block align-middle">
                                                        <p class="mb-0"> <a href="#" class="text-dark d-inline-block">Quarter Pounder</a></p><span class="text-muted font-weight-normal font-italic">Category: Lunch</span>
                                                    </div>
                                                </div>
                                            </th>
                                            <td class="align-middle"><strong>$12.99</strong></td>
                                            <td class="align-middle"><strong>1</strong></td>
                                            <td class="align-middle"><a href="#" class="text-dark"><i class="fa fa-trash"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- End -->
                        </div>
                    </div>

                    <div class="row bg-white">
                        <div class="col-lg-6 bottom-content">
                            <div class="bg-light px-4 py-1 text-uppercase font-weight-bold">Coupon code</div>
                            <div class="p-4 apply-coupon">
                                <p class="font-italic">If you have a coupon code, please enter it in the box below</p>
                                <div class="input-group mb-4 border p-2">
                                    <input type="text" placeholder="Coupon Code" aria-describedby="button-addon3" class="form-control">
                                    <div class="input-group-append border-0">
                                        <button id="button-addon3" type="button" class="btn btn-dark px-1"><i class="fa fa-gift mr-2"></i>Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 bottom-content">
                            <div class="bg-light px-4 py-1 text-uppercase font-weight-bold">Order summary </div>
                            <div class="p-4">
                                <p class="font-italic">Additional costs are calculated based on values you have entered.</p>
                                <ul class="list-unstyled mb-1">
                                    <li class="d-flex justify-content-between py-1 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>$38.97</strong></li>
                                    <li class="d-flex justify-content-between py-1 border-bottom"><strong class="text-muted">Tax</strong><strong>$0.00</strong></li>
                                    <li class="d-flex justify-content-between py-1 border-bottom"><strong class="text-muted">Total</strong>
                                        <h4 class="font-weight-bold">$38.97</h4>
                                    </li>
                                </ul><a href="#" class="btn btn-dark py-1 btn-block">Procceed to checkout <i class="fas fa-long-arrow-alt-right" style="margin-left: 0.2rem"></i></a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="footer d-flex flex-column justify-content-center align-items-center">
            <span> &copy;Copyright NullTech 2019</span>
        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
    name: 'Cart',
    data(){
        return {

        }
    },
    mounted(){

    }
}
</script>

<style lang="scss">
#app{
    h1{
        font-size: 0.5rem;
    }
    .table {
        th, td{
            padding: 0 0.75rem;
        }
    }
    .bottom-content{
        p{
            margin: 0;
        }
        h4{
            font-size: 0.5rem;
        }
    }
    .apply-coupon{
        .form-control{
            font-size: inherit;
            padding: 0.15rem 0.3rem;
            width: 100%;
            height: auto;
            border-radius: 0;
        }
        .input-group-append{
            width: 100%;
        }
        button{
            border-radius: 0;
            margin-top: 0.1rem;
            width: 100%;
            font-size: 0.3rem;
        }
        .input-group{
            margin-top: 0.2rem;
        }
    }
}
</style>
