<template>
  <div class="page">
    <head-container></head-container>
    <search :showAmount="true" :amount="amount"></search>
    <div class="relative-position">
      <nav-container></nav-container>
    </div>
    <section>
      <div class="head-hidden"></div>
      <div class="content-t-box row no-wrap">
        <div class="content-t row no-wrap">
          <div class="goods-pic">
            <div
              class="main-pic relative-position"
              ref="box"
              @mouseenter="isScale=true"
              @mouseleave="isScale=false"
              @mousemove="move"
            >
              <img
                src="https://img.alicdn.com/imgextra/i2/1123492339/O1CN01fttxab1T9Iw7cA7iL_!!0-item_pic.jpg_430x430q90.jpg"
                alt
              />
              <span class="absolute zoom-icon">
                <i class="material-icons">search</i>
              </span>
              <!-- 放大mask -->
              <div ref="mask" class="mask absolute" v-show="isScale" :style="getMaskStyle()"></div>
            </div>
            <ul class="row items-pic no-wrap">
              <li class="pic-selected">
                <img src="@/assets/detail/test.jpg" alt />
              </li>
              <li>
                <img src="@/assets/detail/test.jpg" alt />
              </li>
              <li>
                <img src="@/assets/detail/test.jpg" alt />
              </li>
              <li>
                <img src="@/assets/detail/test.jpg" alt />
              </li>
            </ul>
            <!-- 大图 -->
            <div class="big-pic-box" v-show="isScale">
              <img ref="bigPic" src="@/assets/detail/big.jpg" :style="getScaleStyle()" alt />
            </div>
          </div>

          <div class="good-info column f12">
            <div class="t-detail">
              <h1 class="f16 q-ma-none text-bold">{{info.desc}}</h1>
              <p class="detail-hd">{{info.proper}}</p>
            </div>
            <div class="price-panel">
              <dl class="price-panel row items-center">
                <dt class="small-title">价格</dt>
                <dd class="f12 oldPrice f14">
                  <span class="f12">￥</span>
                  {{info.price}}
                </dd>
              </dl>
              <dl class="price-panel row items-center">
                <dt class="small-title">促销价</dt>
                <dd class="f18 text-red">
                  ￥
                  <span class="currentPrice text-bold">{{info.price}}</span>
                </dd>
              </dl>
            </div>
            <div class="fare-panel">
              <span class="small-title">运费</span>
              <span></span>
            </div>
            <ul class="cdata-panel row justify-between">
              <li>
                <span class="small-title">月销量</span>
                <span class="text-red">{{info.monthlySales}}</span>
              </li>
              <li>
                <span class="small-title">累计评价</span>
                <span class="text-red">{{info.accEvaluation}}</span>
              </li>
            </ul>
            <div class="goods-key">
              <dl class="sku-panel row no-wrap">
                <dt class="small-title">{{info.sku.name}}</dt>
                <dd>
                  <ul class="row wrap">
                    <li
                      v-for="(item,index1) in info.sku.list"
                      :key="index1"
                      @click="setSeleSku(index1)"
                    >
                      <a :class="{'sku-select':item.selected}">{{item.value}}</a>
                    </li>
                  </ul>
                </dd>
              </dl>
              <dl class="amount-panel row items-center">
                <dt class="small-title">数量</dt>
                <dd class="row items-center">
                  <input type="text" ref="amount" v-model="info.amount" @input="updateNumber" />
                  <span class="column justify-between">
                    <i class="material-icons f12" @click="add">expand_less</i>
                    <i class="material-icons f12" @click="reduce">expand_more</i>
                  </span>
                  <span>件</span>
                  <span class="stock">库存{{info.limit}}件</span>
                </dd>
              </dl>
              <p class="submit-btn row items-center f16 relative-position">
                <span class="pointer">立即购买</span>

                <span
                  class="cf pointer"
                  ref="addToCart"
                  @click="addToCart"
                  onselectstart="return false"
                >加入购物车</span>
              </p>
            </div>
            <div class="service-panel">
              <dl class="row no-wrap">
                <dt class="small-title">服务承诺</dt>
                <dd>
                  <ul class="row wrap">
                    <li class="c6" v-for="(item,index) in info.service" :key="index">{{item.value}}</li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="content-t-r">
          <div class="top-title relative-position f12">
            <s class="absolute"></s>
            <span class="absolute">看了又看</span>
          </div>
          <div>
            <div class="prom-container relative-position">
              <ul class="prom column items-center absolute" ref="promList">
                <li>
                  <a href class="relative-position">
                    <img src="@/assets/detail/prom.jpg" alt />
                    <span class="absolute">￥24.1</span>
                  </a>
                </li>
                <li>
                  <a href class="relative-position">
                    <img src="@/assets/detail/prom.jpg" alt />
                    <span class="absolute">￥24.2</span>
                  </a>
                </li>
                <li>
                  <a href class="relative-position">
                    <img src="@/assets/detail/prom.jpg" alt />
                    <span class="absolute">￥24.3</span>
                  </a>
                </li>
                <li>
                  <a href class="relative-position">
                    <img src="@/assets/detail/prom.jpg" alt />
                    <span class="absolute">￥24.4</span>
                  </a>
                </li>
                <li>
                  <a href class="relative-position">
                    <img src="@/assets/detail/prom.jpg" alt />
                    <span class="absolute">￥24.5</span>
                  </a>
                </li>
                <li>
                  <a href class="relative-position">
                    <img src="@/assets/detail/prom.jpg" alt />
                    <span class="absolute">￥24.6</span>
                  </a>
                </li>
                <li>
                  <a href class="relative-position">
                    <img src="@/assets/detail/prom.jpg" alt />
                    <span class="absolute">￥24.7</span>
                  </a>
                </li>
                <li>
                  <a href class="relative-position">
                    <img src="@/assets/detail/prom.jpg" alt />
                    <span class="absolute">￥24.8</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="row justify-center prom-expand">
              <i class="material-icons pointer" @click="back">expand_less</i>
              <i class="material-icons pointer" @click="next">expand_more</i>
            </div>
          </div>
        </div>
      </div>
    </section>
    <foo></foo>
    <side @countAmount="countAmount" ref="aside"></side>
    <!-- 加入购入车按钮的小球动画实现 -->
    <div class="ball-container relative-position">
      <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:after-leave="afterLeave"
        name="drop"
        v-for="(litterBall,indexBall) in balls"
        :key="indexBall"
      >
        <div v-show="litterBall.show" class="ball" :style="getBallHeigth()">
          <div class="inner" :class="indexBall"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import foo from "@/components/foot";
import headContainer from "@/components/header";
import navContainer from "@/components/nav";
import search from "@/components/search";
import side from "@/components/aside";
import Velocity from "velocity-animate";
export default {
  components: { foo, headContainer, navContainer, side, search },

  data() {
    return {
      amount: 0,
      info: {
        name: "洗颜专科超微米洁颜乳",
        desc: "[日本.你身边的“洁面专家”]Shiseido资生堂 洗颜专科超微米洁颜乳",
        proper: "持续控油 净化黑头 清爽舒适",
        price: "45",
        amount: 1,
        limit: 10,
        monthlySales: 21,
        accEvaluation: 53,
        sku: {
          id: 1,
          name: "化妆品净含量",
          list: [
            { id: 1, value: "100g/mL" },
            { id: 2, value: "100g/mL" },
            { id: 3, value: "100g/mL" },
            { id: 4, value: "100g/mL" },
            { id: 5, value: "100g/mL" },
            { id: 6, value: "100g/mL" },
            { id: 7, value: "100g/mL" }
          ]
        },
        service: [
          { id: 1, value: "过敏包退" },
          { id: 2, value: "破损包退" },
          { id: 3, value: "正品保证" },
          { id: 4, value: "极速退款" },
          { id: 5, value: "赠运费险" },
          { id: 6, value: "七天无理由退换" }
        ]
      },
      address: "杭州",
      isScale: false,
      top: 0,
      left: 0,
      scaleX: 0,
      scaleY: 0,
      balls: [
        //小球
        { show: false, index: 0 },
        { show: false, index: 1 },
        { show: false, index: 2 },
        { show: false, index: 3 },
        { show: false, index: 4 },
        { show: false, index: 5 },
        { show: false, index: 6 },
        { show: false, index: 7 },
        { show: false, index: 8 },
        { show: false, index: 9 },
        { show: false, index: 10 },
        { show: false, index: 11 }
      ],
      dropBall: [],
      ballTop: 0,
      pindex: 0
    };
  },
  methods: {
    search(e) {},
    countAmount(e) {
      this.amount = e;
    },
    setSeleSku(index) {
      if (index === undefined) {
        this.info.sku.list.map(i => {
          this.$set(i, "selected", false);
        });
        if (this.info.sku.list.length === 1) {
          this.info.sku.list[1].selected = true;
        }
      } else {
        this.info.sku.list.map(i => {
          i.selected = false;
        });
        this.info.sku.list[index].selected = true;
      }
    },
    move(event) {
      const pageX = event.pageX;
      const pageY = event.pageY;
      const maskw = this.$refs.mask.offsetWidth;
      const maskh = this.$refs.mask.offsetHeight;
      const boxX = this.$refs.box.offsetLeft;
      const boxY = this.$refs.box.offsetTop;
      const boxw = this.$refs.box.offsetWidth;
      const boxh = this.$refs.box.offsetHeight;
      // 以mask的中心为原点(起始点) 鼠标距离body左边的距离-容器距离左边的距离=鼠标在容器内距离容器左边的距离 判断是否移动了mask的一半，小于则不动，大于则移动该移动的距离
      let x = pageX - boxX - maskw / 2;
      let y = pageY - boxY - maskh / 2;
      if (x < 0) {
        x = 0;
      }
      if (x > boxw - maskw) {
        x = boxw - maskw;
      }
      if (y < 0) {
        y = 0;
      }
      if (y > boxh - maskh) {
        y = boxh - maskh;
      }
      this.top = y;
      this.left = x;
      const bigPicw = this.$refs.bigPic.offsetWidth;
      const bigPich = this.$refs.bigPic.offsetHeight;
      this.scaleX = bigPicw / boxw;
      this.scaleY = bigPich / boxh;
    },
    getScaleStyle() {
      return {
        marginTop: -this.top * this.scaleY + "px",
        marginLeft: -this.left * this.scaleX + "px"
      };
    },
    getMaskStyle() {
      return { top: this.top + "px", left: this.left + "px" };
    },
    reduce() {
      const amount = this.info.amount;
      if (amount - 1 > 0) {
        this.info.amount--;
      }
    },
    add() {
      let amount = this.info.amount;
      if (amount + 1 <= this.info.limit) {
        this.info.amount++;
      }
    },
    addToCart(event) {
      //购物车数量变动;
      this.$refs.aside.drop(this.info.amount);

      const item = this.balls.find(i => {
        return !i.show;
      });
      item.show = true;
      this.dropBall.push(item);
    },
    beforeEnter(els) {
      //加入购物车按钮rect
      const cartButRect = this.$refs.addToCart.getBoundingClientRect();
      //数量红点的rect
      const ballPosition = this.$refs.aside.getRect();
      //纵轴移动距离
      const y = cartButRect.y - ballPosition.y - 16;
      // 横轴移动距离
      const x = ballPosition.x - (cartButRect.x + cartButRect.width / 2);
      els.style.opacity = 1;
      els.style.webkitTransform = `translate3d(0,${y}px,0)`;
      els.style.transform = `translate3d(0,${y}px,0)`; //外层做纵轴运动

      //内层做横轴运动
      let inner = els.getElementsByClassName("inner")[0];
      inner.style.webkitTransform = `translate3d(${-x}px,0,0)`;
      inner.style.transform = `translate3d(${-x}px,0,0)`;
    },
    enter(els, done) {
      var _this = this;
      let hh = els.offsetHeight; //手动获取这个值，触发浏览器重绘
      _this.$nextTick(function() {
        //内层做横轴运动
        // els.style.opacity = "0";
        let inner = els.getElementsByClassName("inner")[0];

        Velocity(els, { transform: "translate3d(0,0,0)" }, { duration: 600 });
        Velocity(
          inner,
          { transform: "translate3d(0,0,0)" },
          {
            duration: 600,
            complete: function() {
              done();
            }
          }
        );
      });
    },
    afterEnter(els) {
      let ball = this.dropBall.shift();
      if (ball) {
        ball.show = false;
      }
      els.style.display = "none"; //这个很重要
      els.style.opacity = 0;
    },
    afterLeave(els) {},
    updateNumber() {
      const number = this.info.amount;
      if (number === "" || number === undefined) {
        this.info.amount = 1;
      }
      const value = parseInt(String(number));
      if (isNaN(value)) {
        this.info.amount = 1;
      } else if (value >= 1 && value <= this.info.limit) {
        this.info.amount = value;
      } else if (value < 1) {
        this.info.amount = 1;
      } else if (value > this.info.limit) {
        this.info.amount = this.info.limit;
      }
      setTimeout(() => {
        this.$refs.amount.blur();
      }, 1000);
    },
    getBallHeigth() {
      let height;
      if (this.$refs.aside) {
        height = this.$refs.aside.getRect();
      }
      return {
        top: (height ? height.y : 0) + "px"
      };
    },
    back() {
      const el = this.$refs.promList;
      if (this.pindex - 1 >= 0) {
        this.pindex--;
        el.style.top = -160 * 3 * this.pindex + "px";
      }
    },
    next() {
      const el = this.$refs.promList;
      if (this.pindex + 1 <= 2) {
        this.pindex++;
        el.style.top = -160 * 3 * this.pindex + "px";
      }
    }
  },
  mounted() {},
  created() {
    this.setSeleSku();
  }
};
</script>

<style  scoped>
section {
  width: 89vw;
  display: table;
  margin: 0 auto;
}
dl {
  margin: 0;
}
.head-hidden {
  height: 100px;
}
.main-pic {
  width: 418px;
  height: 418px;
  text-align: center;
  border: 1px solid #ccc;
  margin-right: 15px;
  z-index: 3000;
}
.main-pic .zoom-icon {
  display: block;
  width: 30px;
  height: 30px;
  bottom: 0px;
  right: 0px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 22px;
  color: #666;
  visibility: visible;
}
.main-pic:hover .zoom-icon {
  visibility: hidden;
}
.mask {
  width: 208px;
  height: 208px;
  background: rgba(255, 255, 0, 0.4);
  opacity: 0.8;
  z-index: 1000;
  cursor: move;
  right: 0px;
  bottom: 0px;
}
.big-pic-box {
  width: 418px;
  height: 418px;
  position: absolute;
  left: 500.5px;
  top: 338px;
  border: 1px solid #ccc;
  overflow: hidden;
  z-index: 2000;
}
.main-pic > img {
  width: 100%;
  height: 100%;
}
.items-pic {
  padding-left: 20px;
  padding-top: 22px;
  max-width: 420px;
  overflow: hidden;
}
.items-pic li {
  margin-left: 16px;
  width: 56px;
  height: 56px;
  overflow: hidden;
}
.items-pic li img {
  max-width: 60px;
  min-height: 60px;
}
.items-pic li:hover img {
  position: relative;
  left: -2px;
  top: -2px;
}
.items-pic li:hover {
  border: 2px solid #000;
}
.pic-selected {
  border: 2px solid #000;
}
.detail-hd {
  color: red;
}
.content-t {
  padding-top: 20px;
  border-right: 1px solid #ccc;
  min-height: 600px;
}
.good-info {
  width: 572px;
  text-align: left;
}
.t-detail {
  margin-bottom: 15px;
}
.t-detail h1 {
  line-height: 1;
  text-align: left;
  padding-bottom: 3px;
}
.price-panel {
  background-color: #e9e9e9;
  margin-right: 20px;
}
.price-panel span.small-title {
  display: inline-block;
  width: 60px;
}
.small-title {
  margin-left: 7px;
  color: #999;
  flex: none;
}
.fare span.small-title {
  display: inline-block;
  width: 50px;
}
.oldPrice {
  color: #333;
  text-decoration: line-through;
}
.currentPrice {
  font-size: 30px;
}
.fare-panel {
  padding: 15px 0px;
}
.cdata-panel {
  border: 1px dotted #c9c9c9;
  padding: 10px 0px;
  border-width: 1px 0;
  margin-right: 20px;
}
.cdata-panel li {
  flex: auto;
  text-align: center;
}
.cdata-panel li:nth-of-type(1) {
  border-right: 1px solid #ccc;
}
.cdata-panel li span:nth-of-type(2) {
  margin-left: 2px;
}
.goods-key {
  padding-bottom: 50px;
}
.sku-panel {
  padding: 15px 0px;
}
.sku-panel dt {
  width: 66px;
  flex: none;
}
.sku-panel dd {
  flex: auto;
  margin: 0px;
  margin-right: 20px;
}
.sku-panel .small-title,
.amount-panel .small-title {
  color: #838383 !important;
}
.sku-panel dd li {
  white-space: nowrap;
  width: auto !important;
  min-width: 10px;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
  margin: 0 4px 4px 0;
}
.sku-panel dd li a {
  padding: 0 9px;
  border: 1px solid #ccc;
  display: block;
}
.sku-panel dd li:hover a {
  border-color: #ff0036 !important;
  border-width: 2px !important;
  margin: -1px;
}
.sku-select {
  border-color: #ff0036 !important;
  border-width: 2px !important;
  margin: -1px;
}
.amount-panel dd input {
  padding: 3px 2px 0 3px;
  line-height: 26px;
  text-align: center;
  color: #666;
  width: 36px;
  height: 26px;
  box-sizing: content-box;
  margin-right: 5px;
}
.amount-panel dd span:nth-of-type(1) {
  height: 33px;
  margin-right: 5px;
}
.amount-panel dd span:nth-of-type(1) i {
  width: 18px;
  height: 14px;
  display: block;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 14px;
  cursor: pointer;
}
.amount-panel .stock {
  margin-left: 15px;
}
.submit-btn {
  height: 38px;
  line-height: 38px;
  text-align: center;
  padding-left: 70px;
  margin-top: 20px;
}
.submit-btn span:first-of-type {
  background-color: #ffeded;
  margin-right: 10px;
  border: 1px solid #ff0036;
  display: inline-block;
  width: 178px;
  color: #ff0036;
}
.submit-btn span:nth-of-type(2) {
  background: #ff0036;
  display: inline-block;
  width: 178px;
  border: 1px solid #ff0036;
}
.service-panel {
  margin: 0 20px;
}
.service-panel .small-title {
  margin-left: 0;
}
.service-panel dl {
  margin-right: 67px;
}
.service-panel dd li {
  padding-right: 20px;
  padding-bottom: 5px;
}
.content-t-r {
  width: 200px;
}
.top-title {
  margin-top: 5px;
  height: 15px;
}
.top-title s {
  top: 10px;
  left: 30px;
  width: 140px;
  height: 0;
  border-top: 1px #c9c9c9 dotted;
}
.top-title span {
  top: 0px;
  left: 50%;
  background: white;
  transform: translateX(-50%);
  width: 6em;
  display: block;
}
.prom-container {
  height: 480px;
  padding: 10px 12px 2px 13px;
  overflow: hidden;
}
.prom {
  left: 50%;
  transform: translateX(-50%);
  transition: 0.3s linear
}
.prom li {
  height: 160px;
  position: relative;
}
.prom li a {
  display: block;
  width: 140px;
  height: 140px;
  text-align: center;
  cursor: pointer;
}
.prom li img {
  max-width: 140px;
  max-height: 140px;
}
.prom li span {
  bottom: 0px;
  display: block;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  line-height: 20px;
  width: 100%;
}
.ball-container .ball {
  position: fixed;
  right: 13px;
  z-index: 10000;
  transform: translate3d(0, 0, 0); /* cubic-bezier(0, 0.57, 0.09, 1.1) */
  transition: all 0.6s cubic-bezier(0, 0.39, 0.37, 0.9);
}
.ball .inner {
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background: #ff0036;
  transition: all 0.6s linear;
  transform: translate3d(0, 0, 0);
}
.prom-expand i {
  font-size: 45px;
  color: #999;
}
</style>