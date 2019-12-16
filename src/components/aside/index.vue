<template>
  <div class="fixed side row">
    <div class="sidebar column items-center justify-center relative-position">
      <div class="sidebar-inner column items-center cf">
        <div
          class="column cart-area items-center justify-center cf"
          @click="showCartInfo=!showCartInfo"
        >
          <span class="line"></span>
          <img class="cart-img margin-distance" src="@/assets/cart.png" alt ref="cartImg" />
          <div class="f14">
            购
            <br />物
            <br />车
          </div>
          <div ref="amount" class="amount bg-red row items-center justify-center cf">{{amount}}</div>
        </div>
        <span class="line"></span>
        <div
          class="focus-area relative-position row items-center justify-center"
          @mouseenter="showCouponTip=true"
          @mouseleave="showCouponTip=false"
        >
          <img class="money-img" src="@/assets/money.png" alt />
          <div class="absolute tip row justify-center" v-show="showCouponTip">
            <div class="row justify-center items-center cf relative-position fit">
              <span class="pointer">我的优惠券</span>
              <div class="absolute person-private-triangle triangle"></div>
            </div>
          </div>
        </div>
        <div
          class="focus-area row relative-position items-center justify-center"
          @mouseenter="showCollTip=true"
          @mouseleave="showCollTip=false"
        >
          <img class="heart-img" src="@/assets/heart.png" alt />
          <div class="absolute tip row justify-center" v-show="showCollTip">
            <div class="row justify-center items-center cf fit relative-position">
              <span class="pointer">我的收藏</span>
              <div class="absolute person-private-triangle triangle"></div>
            </div>
          </div>
        </div>
      </div>
      <img class="qrcode-img absolute" src="@/assets/qrcode.png" alt />
      <div class="code absolute column items-center">
        <img src="@/assets/cod_da.png" alt />
        <span class="q-mt-sm">到手机一购</span>
      </div>
      <div class="code-triangle triangle absolute"></div>
      <div class="absolute gotop pointer" @click="goTop" v-show="showScroller">
        <img src="@/assets/gotop.png" alt />
      </div>
      <!-- 我的收藏 -->
    </div>
    <div class="cartInfo column items-center relative-position" v-show="showCartInfo">
      <div class="head fixed row justify-between items-center c6 f12">
        <div class="row items-center">
          <input
            class="checkbox"
            type="checkbox"
            :checked="checkAll"
            v-model="checkAll"
            @change="handleCheckAllChange"
          />
          <span class="q-ml-xs">全选</span>
        </div>
        <span class="q-mr-xs pointer" @click="$router.push({path:'/shoppingCart'})">查看全部</span>
      </div>
      <img
        class="absolute cart-empty"
        src="@/assets/cart_mini_empty.png"
        alt
        v-show="amount===0 && !productList"
      />
      <main class v-show="productList">
        <ul v-for="(store,index1) in productList" :key="index1">
          <li class="bcf">
            <div class="store row items-center f12">
              <input
                class="checkbox"
                type="checkbox"
                :checked="store.deleted"
                v-model="store.deleted"
                @change="handleCheckChange(index1)"
              />
              <div class="row store-info justify-between">
                <span>{{store.storeName}}</span>
                <span class="c6">￥{{Number(store.storeTotalPrice).toFixed(2)}}</span>
              </div>
            </div>
            <div class="remarks">
              <span>{{store.remarks}}</span>
            </div>
            <div
              class="detail row items-center f12"
              v-for="(info,index2) in store.carts"
              :key="index2"
            >
              <input
                class="checkbox"
                type="checkbox"
                v-model="info.deleted"
                :checked="info.deleted"
                @change="handleCheckChange(index1,index2)"
              />
              <div class="column pro-info">
                <div class="row items-center relative-position">
                  <div class="goods-pic">
                    <img src="@/assets/example.jpg" class="pointer" alt :title="info.goodsName" />
                  </div>
                  <div class="goods-sku">
                    <p :title="`颜色分类:${info.color}`">{{info.color}}</p>
                    <p :title="`尺码:${info.size}`">{{info.size}}</p>
                  </div>
                  <div class="goods-amount row no-wrap items-center justify-center">
                    <div
                      class="reduce relative-position"
                      :disabled="info.number===1"
                      :class="{'available':info.number!==1}"
                      @click="info.number!==1 && handleReduce(index1,index2)"
                    >
                      <span class="absolute ca f18">-</span>
                    </div>
                    <span class="q-mx-xs f12">{{info.number}}</span>
                    <div
                      class="add ca relative-position"
                      @click="handleAdd(index1,index2)"
                      :class="{'available':true}"
                    >
                      <span class="absolute ca f18">+</span>
                    </div>
                  </div>
                  <div class="goods-cost">
                    <span>￥{{Number(info.price*info.number).toFixed(2)}}</span>
                  </div>
                  <div class="absolute delete ca">
                    <div class="relative-position delete-inner">
                      <span class="f7 absolute">x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </main>
      <footer class="fixed">
        <div class="foot-inner">
          <div class="c6 f12 row">
            共{{amount}}件商品，共计
            <span class="text-red">￥{{totalPrice}}</span>
          </div>
          <div
            class="bg-red cf f16 butt row items-center justify-center"
            :class="{'bg-empty-cart':amount===0}"
          >去购买</div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { accAdd, accSub } from "@/utils/count";
export default {
  data() {
    return {
      amount: 0,
      totalPrice: "0.00",
      showCouponTip: false,
      showCollTip: false,
      showScroller: false,
      showCartInfo: false,
      checkAll: true,
      productList: [
        {
          id: 1,
          storeName: "ONLY旗舰店",
          remarks: "满两件包邮",
          carts: [
            {
              id: 1,
              picUrl: "",
              goodsName:
                "ONLY2019秋季新款chic气质拼色假两件收腰连衣裙女|119207563",
              price: 222.05,
              number: 1,
              size: "S",
              color: "蓝色",
              limit: 10
            }
          ]
        },
        {
          id: 2,
          storeName: "ONLY旗舰店",
          remarks: "满两件包邮",
          carts: [
            {
              id: 1,
              picUrl: "",
              goodsName:
                "ONLY2019秋季新款chic气质拼色假两件收腰连衣裙女|119207563",
              price: 222,
              number: 1,
              size: "S",
              color: "蓝色",
              limit: 10
            },
            {
              id: 2,
              picUrl: "",
              goodsName:
                "ONLY2019秋季新款chic气质拼色假两件收腰连衣裙女|119207563",
              price: 222,
              number: 1,
              size: "S",
              color: "蓝色",
              limit: 10
            }
          ]
        }
      ],
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
      dropBall: []
    };
  },
  methods: {
    goTop() {
      const timer = setInterval(function() {
        let osTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 30);
    },
    scrollToTop() {
      const browserHeight = document.documentElement.clientHeight;
      const scrollHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollHeight > browserHeight) {
        this.showScroller = true;
      } else {
        this.showScroller = false;
      }
    },
    //num演示加入购物车数量的增加
    count(tag, num) {
      let total = 0;
      let amount = 0;
      for (const i of this.productList) {
        i.deleted = tag;
        for (const j of i.carts) {
          j.deleted = tag;
        }
      }
      // 取消
      if (!tag) {
        this.totalPrice = total;
        this.amount = amount;
        this.$emit("countAmount", this.amount);
        return;
      }
      for (const i of this.productList) {
        let storeTotal = 0;
        for (const j of i.carts) {
          amount += j.number;
          const price = j.number * j.price;
          storeTotal = accAdd(storeTotal, price);
        }
        i.storeTotalPrice = storeTotal;
        total = accAdd(total, i.storeTotalPrice);
      }
      this.totalPrice = total;
      if (num) {
        this.amount = amount + num;
      } else {
        this.amount = amount;
      }
      this.$emit("countAmount", this.amount);
    },
    handleCheckAllChange() {
      if (this.checkAll) {
        this.count(true);
      } else {
        this.count(false);
      }
    },
    handleCheckChange(index1, index2) {
      //店铺选中或取消
      if (index2 === undefined) {
        console.log("dian");
        // 选中
        if (this.productList[index1].deleted) {
          let total = 0;
          let amount = 0;
          for (let j of this.productList[index1].carts) {
            amount += j.number;
            total = accAdd(total, j.number * j.price);
            j.deleted = true;
          }
          this.productList[index1].storeTotalPrice = total;
          this.totalPrice = accAdd(
            this.productList[index1].storeTotalPrice,
            this.totalPrice
          );
          this.amount += amount;
        } else {
          // 取消
          let total = 0;
          let amount = 0;
          for (let j of this.productList[index1].carts) {
            amount += j.number;
            total = accAdd(total, j.number * j.price);
            j.deleted = false;
          }
          this.productList[index1].storeTotalPrice = 0;

          this.totalPrice = accSub(this.totalPrice, total);
          this.amount -= amount;
        }
      } else {
        // 单个商品的选中
        const price = this.productList[index1].carts[index2].price;
        const amount = this.productList[index1].carts[index2].number;
        if (this.productList[index1].carts[index2].deleted) {
          const deleted = this.productList[index1].carts.every(i => {
            return i.deleted === false;
          });
          !deleted ? (this.productList[index1].deleted = true) : "";
          // 选中
          this.productList[index1].storeTotalPrice = accAdd(
            this.productList[index1].storeTotalPrice,
            price * amount
          );
          this.amount += amount;
          this.totalPrice = accAdd(this.totalPrice, price * amount);
        } else {
          if (this.productList[index1].deleted) {
            this.productList[index1].deleted = false;
          }
          this.productList[index1].storeTotalPrice = accSub(
            this.productList[index1].storeTotalPrice,
            price * amount
          );
          this.amount -= amount;
          this.totalPrice = accSub(this.totalPrice, price * amount);
        }
      }
      this.$emit("countAmount", this.amount);
    },
    handleAdd(index1, index2) {
      const number = this.productList[index1].carts[index2].number;
      if (number + 1 <= this.productList[index1].carts[index2].limit) {
        this.productList[index1].carts[index2].number++;
        const price = this.productList[index1].carts[index2].price;
        if (this.productList[index1].carts[index2].deleted) {
          this.productList[index1].storeTotalPrice = accAdd(
            this.productList[index1].storeTotalPrice,
            price
          );
          this.amount++;
          this.totalPrice = accAdd(this.totalPrice, price);
          this.$emit("countAmount", this.amount);
        }
      }
    },
    handleReduce(index1, index2) {
      const number = this.productList[index1].carts[index2].number;
      if (number - 1 >= 1) {
        this.productList[index1].carts[index2].number--;
        const price = this.productList[index1].carts[index2].price;
        if (this.productList[index1].carts[index2].deleted) {
          this.productList[index1].storeTotalPrice = accSub(
            this.productList[index1].storeTotalPrice,
            price
          );
          this.amount--;
          this.totalPrice = accSub(this.totalPrice, price);
          this.$emit("countAmount", this.amount);
        }
      }
    },
    //加入购物车
    drop(amount) {
      this.count(true, Number(amount));

    },
    getRect() {
      return this.$refs.cartImg.getBoundingClientRect();
    },
 
  },
  created() {
    this.count(true);
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  }
};
</script>

<style  scoped>
.side {
  right: 0px;
  top: 0px;
  height: 100%;
  z-index: 5000;
}
.sidebar {
  width: 45px;
  background: #333333;
  height: 100%;
}
.sidebar-inner {
  height: 65vh;
}
.line {
  width: 30px;
  height: 1px;
  background: #c6c6c6;
}
.margin-distance {
  margin-top: 8px;
  margin-bottom: 8px;
}
.amount {
  border-radius: 50%;
  width: 22px;
  height: 22px;
  margin-top: 8px;
}
.second-area {
  margin-top: 30px;
}
.cart-area {
  width: 45px;
  padding-bottom: 30px;
}
.focus-area {
  width: 45px;
  height: 42px;
  margin-top: 15px;
}
.focus-area:hover,
.cart-area:hover {
  background: #e34755;
}
.tip {
  width: 101px;
  height: 42px;
  background-color: #666666;
  right: 45px;
}
.money-img,
.heart-img {
  height: 21px;
  width: 21px;
}
.qrcode-img {
  bottom: 70px;
}
.code {
  background: transparent;
  right: 48px;
  bottom: 70px;
}
.triangle {
  border-width: 5px 6px;
  border-style: solid;
}
.code-triangle {
  right: 33px;
  bottom: 80px;
  border-color: transparent transparent transparent #fff;
}
.person-private-triangle {
  right: -12px;
  border-color: transparent transparent transparent #666666;
}
.gotop {
  bottom: 10px;
}
.gotop img {
  width: 50px;
  height: 50px;
}
.cartInfo {
  width: 280px;
  background: #e6e6e6;
}
footer {
  bottom: 0px;
  right: 0px;
  width: 280px;
  padding-left: 7px;
  padding-right: 7px;
  padding-bottom: 30px;
}
.foot-inner {
  padding: 20px 10px 0px 10px;
}
.butt {
  width: auto;
  height: 30px;
}
.cart-empty {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -70%);
}
.bg-empty-cart {
  background: #666 !important;
}
main {
  overflow: auto;
  width: 280px;
  height: calc(100vh - 127px);
  padding-top: 10px;
  margin-top: 16px;
}
main li {
  margin-bottom: 16px;
}
.head {
  width: 280px;
  height: 27px;
  top: 0px;
  right: 0px;
}
.checkbox {
  margin-left: 10px;
}
.store {
  margin-bottom: 5px;
  height: 29px;
}
.store-info {
  flex: auto;
  margin-left: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid#c6c6c6;
  margin-right: 5px;
}
.remarks {
  text-align: left;
  margin-bottom: 5px;
}
.remarks span {
  padding-left: 5px;
  margin-left: 33px;
}
.goods-pic {
  width: 50px;
  height: 50px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.goods-pic img {
  width: 100%;
  height: 100%;
}
.goods-sku {
  width: 54px;
  padding-top: 10px;
}
.goods-sku p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0px;
}
.goods-amount {
  width: 60px;
  overflow: hidden;
  white-space: nowrap;
}
.goods-amount img {
  width: 16px;
  height: 16px;
}
.reduce,
.add {
  border: 1.2px solid #c6c6c6;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  flex: none;
  display: none;
}
.add span,
.reduce span {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.reduce span:hover,
.add span:hover,
.delete-inner span:hover {
  color: white;
}
.goods-cost {
  width: 61px;
  overflow: hidden;
  white-space: nowrap;
}
.delete {
  top: 3px;
  right: 5px;
  display: none;
  width: 17px;
  height: 17px;
  border-radius: 17px;
  box-sizing: border-box;
}
.delete-inner {
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background: #f5f5f5;
  border: 1px solid #c6c6c6;
}
.delete span {
  top: 50%;
  left: 50%;
  transform: translate(-45%, -50%);
}
.detail {
  cursor: default;
}
.detail:hover .delete,
.detail:hover .reduce,
.detail:hover .add {
  display: inline-block;
}
.available {
  background: #f5f5f5;
}
.reduce:hover,
.add:hover,
.delete-inner:hover {
  background: #ddd;
}

</style>