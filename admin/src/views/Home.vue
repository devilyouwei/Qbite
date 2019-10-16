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
        <div class="banner">
            <div class="content">
                <h1>McDonald's® (Croydon Park)</h1>
                <p>$ • American • Burger • Fast Food</p>
                <p>184-188 Georges River Road, CROYDON PARK, NSW 2133</p>
            </div>
        </div>
        <div id="navbar" class="row restaurant-nav">
            <div class="menu col-sm-9">
                <ul>
                    <li><a href="#popular">Most Popular</a></li>
                    <li><a href="#beverages">Beverages</a></li>
                    <li><a href="#lunch">Lunch</a></li>
                    <li><a href="#dinner">Dinner</a></li>
                </ul>
            </div>
            <div class="search-box col-sm-3">
                <div class="search">
                    <el-input placeholder="Search Food"></el-input>
                    <span><i class="fa fa-search"></i></span>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="content">
                <div id="popular">
                    <h1>Most Popular</h1>
                    <div class="row">
                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                    </div>
                </div>
                <div id="beverages">
                    <h1>Beverages</h1>
                    <div class="row">
                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->
                    </div>
                </div>
                <div id="lunch">
                    <h1>Lunch</h1>
                    <div class="row">
                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->
                    </div>
                </div>
                <div id="dinner">
                    <h1>Dinner</h1>
                    <div class="row">
                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->

                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->
                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->
                        <!-- Gallery item -->
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-4 menu-item">
                            <div class="bg-white rounded shadow-sm"><img src="https://www.thespruceeats.com/thmb/Cb9GjSvGjfSTAUmiPGC6ahd8Q7I=/450x0/filters:no_upscale():max_bytes(150000):strip_icc()/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg" alt="" class="img-fluid card-img-top">
                                <div class="p-1">
                                    <div class="d-flex">
                                        <h4> <a href="#" class="text-dark">Quarter Pounder</a></h4>
                                        <h4 class="ml-auto">$12.99</h4>
                                    </div>
                                    <p class="small text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                                    <div class="d-flex align-items-center justify-content-between py-1">
                                        <input class="input-box" type="number" name="quantity" step="1" min="1" max="10" value="1">
                                        <button class="add-btn ml-auto">Add To Order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End -->
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
    document.addEventListener("DOMContentLoaded", function(event) {
        // When the user scrolls the page, execute myFunction
        window.onscroll = function() {stickyMenuEffect()};

        // Get the navbar
        var navbar = document.getElementById("navbar");

        // Get the offset position of the navbar
        var sticky = navbar.offsetTop;

        // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
        function stickyMenuEffect() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky")
            } else {
                navbar.classList.remove("sticky");
            }
        }
    });



    export default {
        name: 'Home',
    }
</script>

<style lang="scss">
    /***********Header************/
    .head {
        padding: 0.4rem 0.5rem;
        .logo {
            color: #409eff;
            font-size: 0.38rem;
            font-weight: bold;
            cursor: pointer;
            padding-left: 2.5rem;
            .icon-letter-q {
                font-size: 0.9rem;

            }
        }
        .sign-in {
            text-align: left;
            font-size: 0.32rem;
        }
        .cart{
            font-size: 0.5rem;
            &:hover{
                color: #409EFF;
            }
        }
    }

    /***********Content*************/
    .container .content h1{
        text-align: left;
    }

    /************Banner***********/
    .banner {
        height: 7rem;
        background-image: url("../assets/home-banner.jpg");
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        background-color: #464646;
        display: flex;
        align-items: center;

        /*************Content**************/
        .content{
            padding: 0.5rem;
            background-color: white;
            margin: 0.5rem 0;
            width: 60%;
            h1{
                font-size: 0.65rem;
            }
            p{
                font-size: 0.4rem;
                margin-bottom: 5px;
            }
        }
    }

    /********** MENU ***********/
    .restaurant-nav.sticky {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 99;
        background-color: white;
        margin:0 auto;
    }

    .row.restaurant-nav{
        margin-right: 0;
        margin-left: 0;
    }
    .restaurant-nav{
        display: flex;
        align-items: center;
        margin: 0.3rem 0;
        .menu {
            ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
            li {
                float: left;
                a {
                    font-size: 0.3rem;
                    display: block;
                    color: rgb(82, 82, 82);
                    text-align: center;
                    padding: 14px 16px;
                    text-decoration: none;
                &:hover {
                        color: rgb(0, 0, 0);
                    }
                }
            }
        }
    }

    /*************Search************/
    .search {
        position: relative;
        .fa-search {
            position: absolute;
            top: 14px;
            right: 10px;
            color: #c4c4c4;
        }
    }

    /*****************Container*************/
    .container .content h1{
        font-size: 0.5rem;
    }

    /*************Menu Items***********/
    .menu-item{
        h4{
            font-size: 0.3rem;
            margin-bottom: 0.2rem;
        }
        p{
            margin-bottom: 0;
        }
        .add-btn{
            display: inline-block;
            color: #212529;
            text-align: center;
            vertical-align: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            border: 1px solid transparent;
            padding: 0.15rem 0.3rem;
            border-radius: 0.25rem;
            -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
            background-color: #409EFF;
            &:hover {
                background-color: #409EFF;
                color: white;
            }
        }
        .input-box{
            display: block;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            padding: 0.15rem 0.2rem;
            -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
            transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {

            opacity: 1;

        }
    }


</style>
