<template>
  <div class="page">
    <head-container></head-container>
    <div class="content">
      <div class="row justify-between box">
        <div></div>
        <input-box></input-box>
      </div>
      <div class="cart-main f12">
        <div class="cart-table-th row items-center" ref="tableref">
          <div class="select-all row items-center justify-center relative-position">
            <input
              type="checkbox"
              class="checkbox"
              :checked="checkAll"
              v-model="checkAll"
              @change="handleCheckAllChange"
              id="c1"
            />
            <label for="c1"></label>
            <span>全选</span>
          </div>
          <div class="th-item">商品信息</div>
          <div class="th-info"></div>
          <div class="th-price">单价</div>
          <div class="th-amount">数量</div>
          <div class="th-sum">金额</div>
          <div class="th-operation">操作</div>
        </div>
        <div class="bundle" v-for="(cart,index1) in cartList" :key="index1">
          <div class="store row items-center relative-position">
            <span class="row items-center justify-center">
              <input
                type="checkbox"
                class="checkbox q-mr-sm"
                :checked="cart.checked"
                v-model="cart.checked"
                @change="handleCheckChange(index1)"
                :id="`store-${index1}`"
              />
              <label :for="`store-${index1}`"></label>
              店铺：{{cart.storeName}}
            </span>
            <span class="relative-position q-ml-sm kefu-box row">
              <img src="@/assets/cart/kefu.png" class="kefu absolute" />
            </span>
            <!-- 优惠券 -->
            <div
              class="coupon-info relative-position row items-center justify-center pointer"
              @click="searchCoupon(index1)"
              v-show="cart.couponList&&cart.couponList.length!==0"
            >
              <span class="absolute trinangle-coupon"></span>
              <span class="row items-center justify-center">
                <em>优惠券</em>
                <i class="material-icons" v-show="!cart.couponShow">keyboard_arrow_down</i>
                <i class="material-icons" v-show="cart.couponShow">keyboard_arrow_up</i>
              </span>
              <!-- 气泡三角形 -->
              <span class="absolute trinangle-tips" v-show="cart.couponShow">
                <em></em>
              </span>
              <!-- 气泡 -->
              <div class="cart-tips bcf absolute column" v-show="cart.couponShow">
                <div class="coupon-summary relative-position c6">
                  <em>已领取{{cart.couponList&&countCounpon(index1)}}张优惠券</em>
                  <i
                    class="material-icons clear absolute f18"
                    @click.stop="cart.couponShow=false"
                  >clear</i>
                </div>
                <ul class="coupon-list" v-for="(coupon,index2) in cart.couponList" :key="index2">
                  <li class="row f12">
                    <div class="coupon-bg row items-center justify-center f14">
                      <span class="coupon-rmb text-bold">￥</span>
                      {{coupon.sumOfMoney}}
                    </div>
                    <div class="coupon-desc">
                      <p class="coupon-title">{{coupon.title}}</p>
                      <p class="coupon-time">{{coupon.time}}</p>
                    </div>
                    <div
                      class="coupon-rece-butt c6"
                      :class="{'coupon-receive':coupon.isReceive}"
                      @click.stop="!coupon.isReceive && receiveCoupon(index1,index2,coupon.id)"
                    >{{coupon.isReceive?"领取成功":"领取"}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="item-content">
            <div class="item-hd relative-position" v-show="cart.remarks">
              <span class="hd-title">{{cart.remarks}}</span>
              <span class="hd-pro">{{cart.pro}}</span>
              <span class="absolute trinangle-hd">
                <em></em>
              </span>
            </div>
            <ul class="row justify-start" v-for="(item,index3) in cart.carts" :key="index3">
              <li class="td td-checkbox td-inner relative-position" onselectstart="return false">
                <input
                  type="checkbox"
                  class="checkbox"
                  :checked="item.checked"
                  v-model="item.checked"
                  @change="handleCheckChange(index1,index3)"
                  :id="`item-${index1}${index3}`"
                />
                <label :for="`item-${index1}${index3}`"></label>
              </li>
              <li class="td td-item row no-wrap td-inner">
                <div class="item-pic row justify-center">
                  <a href :title="item.goodsName">
                    <img src="@/assets/cart/1.jpg" alt />
                  </a>
                </div>
                <a href class="item-desc">{{item.goodsName}}</a>
              </li>
              <li class="td td-info">
                <div class="item-prop relative-position">
                  <span class="edict absolute">
                    <span class="update cf pointer" @click="item.edict=true">修改</span>
                    <i class="material-icons create-icon cf">create</i>
                  </span>
                  <p class="sku-line">颜色分类:{{item.color}}</p>
                  <p class="sku-line relative-position"><span>尺码：{{item.size}}</span>
                  </p>
                  <div class="absolute sku-edict row" v-show="item.edict">
                    <span class="absolute sku-edict-triangle">
                      <em></em>
                    </span>
                    <div class="sku-pros-select column justify-center">
                      <dl class="row no-wrap">
                        <dt>尺 码</dt>
                        <dd class="row">
                          <ul class="row wrap">
                            <li class="prop-block">
                              <a href="#">34</a>
                            </li>
                            <li class="prop-block">
                              <a href="#">34</a>
                            </li>
                            <li class="prop-block">
                              <a href="#">34</a>
                            </li>
                            <li class="prop-block">
                              <a href="#">34</a>
                            </li>
                            <li class="prop-block">
                              <a href="#">34</a>
                            </li>
                          </ul>
                        </dd>
                      </dl>
                      <dl class="row no-wrap">
                        <dt>尺 码</dt>
                        <dd class="row">
                          <ul class="row wrap">
                            <li class="prop-block" :class="{'img-mode':true}">
                              <a href="#">34</a>
                            </li>
                            <li class="prop-block" :class="{'img-mode':true}">
                              <a href="#">34</a>
                            </li>
                            <li class="prop-block" :class="{'img-mode':true}">
                              <a href="#">34</a>
                            </li>
                            <li class="prop-block" :class="{'img-mode':true}">
                              <a href="#">34</a>
                            </li>
                            <li class="prop-block" :class="{'img-mode':true}">
                              <a href="#">34</a>
                            </li>
                          </ul>
                        </dd>
                      </dl>
                      <p class="sku-op">
                        <span class="cf" @click="item.edict=false">确定</span>
                        <a href="javascript:;" @click="item.edict=false">取消</a>
                      </p>
                    </div>
                    <div class="cart-item-pic row items-center justify-center">
                      <a href="#">
                        <img src="@/assets/cart/example.jpg" alt />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li class="td td-price td-inner">
                <div class="price-content">
                  <p>￥{{item.oldPrice}}</p>
                  <p>￥{{item.price}}</p>
                </div>
              </li>
              <li class="td td-amount td-inner">
                <div class="amount-content row items-center">
                  <span
                    :class="{'available':item.number<=item.limit && item.number>1}"
                    @click="item.number<=item.limit && item.number>=1 && handelRemove(index1,index3,item.id)"
                  >
                    <i
                      class="material-icons"
                      v-show="item.number<=item.limit && item.number>1"
                    >remove</i>
                  </span>
                  <input
                    type="text"
                    v-model="item.number"
                    @input="updateNumber(index1,index3)"
                    :ref="`amount-${index1}-${index3}`"
                  />
                  <span
                    :class="{'available':item.number<item.limit}"
                    @click="item.number<item.limit&&handelAdd(index1,index3,item.id)"
                  >
                    <i class="material-icons" v-show="item.number<item.limit">add</i>
                  </span>
                </div>
              </li>
              <li class="td td-sum td-inner">
                <span class="sum">￥{{Number(item.price*item.number).toFixed(2)}}</span>
              </li>
              <li class="td td-operation td-inner">
                <a class="operation" @click="moveToFavorite(item.id)">移入收藏夹</a>
                <a class="operation">删除</a>
              </li>
            </ul>
          </div>
        </div>
        <footer class="row items-center invisible" ref="fixref1"></footer>
        <footer class="cart-bottom row items-center" :class="{'floatBar':floatBar}">
          <span class="row items-center fo-check-all pointer">
            <input
              type="checkbox"
              class="checkbox q-mr-sm"
              :checked="checkAll"
              v-model="checkAll"
              @change="handleCheckAllChange"
              id="check-inp"
            />
            <label for="check-inp"></label>全选
          </span>
          <a href="#" class="fo-item">删除</a>
          <a href="#" class="fo-item">移入收藏夹</a>
          <a href="#" class="fo-item">分享</a>
          <div class="bar-right row items-baseline">
            <span class="pointer item-amount">
              已选商品
              <em class="text-red f18">{{amount}}</em>件
            </span>
            <span>
              合计（不含运费）：
              <span class="text-red" v-show="Number(totalPrice).toFixed(2)!=='0.00'">￥</span>
              <em class="text-red f22">{{Number(totalPrice).toFixed(2)}}</em>
            </span>
            <div
              class="submit-btn f20 cf"
              :class="{'disable':Number(totalPrice).toFixed(2)==='0.00'}"
              :disabled="Number(totalPrice).toFixed(2)==='0.00'"
            >结算</div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import headContainer from "@/components/header";
import inputBox from "@/components/search/inputBox";
import foo from "@/components/foot";
import { accAdd, accSub } from "@/utils/count";
import { setTimeout } from "timers";

export default {
  components: { headContainer, inputBox, foo },
  data() {
    return {
      cartList: [
        {
          id: 1,
          storeName: "ONLY旗舰店",
          remarks: "两件包邮",
          pro: "满2件",
          couponList: [
            {
              id: 1,
              sumOfMoney: 3,
              title: "七月优惠券，满99减3",
              time: "2019.07.01-2019.07.31"
            },
            {
              id: 2,
              sumOfMoney: 10,
              title: "七月优惠券，满199减10",
              time: "2019.07.01-2019.07.31"
            },
            {
              id: 3,
              sumOfMoney: 15,
              title: "七月优惠券，满250减15",
              time: "2019.07.01-2019.07.31"
            }
          ],
          carts: [
            {
              id: 1,
              picUrl: "",
              goodsName:
                "ONLY2019秋季新款chic气质拼色假两件收腰连衣裙女|119207563",
              price: 222.05,
              oldPrice: 222,
              number: 1,
              size: "165/84A/S",
              color: "C12 浅褐色Light Taupe",
              limit: 10
            }
          ]
        },
        {
          id: 2,
          storeName: "ONLY旗舰店",
          remarks: "两件包邮",
          pro: "满2件",
          couponList: [
            {
              id: 1,
              sumOfMoney: 3,
              title: "七月优惠券，满99减3",
              time: "2019.07.01-2019.07.31"
            },
            {
              id: 2,
              sumOfMoney: 10,
              title: "七月优惠券，满199减10",
              time: "2019.07.01-2019.07.31"
            },
            {
              id: 3,
              sumOfMoney: 15,
              title: "七月优惠券，满250减15",
              time: "2019.07.01-2019.07.31"
            }
          ],
          carts: [
            {
              id: 1,
              picUrl: "",
              goodsName:
                "ONLY2019秋季新款chic气质拼色假两件收腰连衣裙女|119207563",
              price: 222.05,
              oldPrice: 222,
              number: 1,
              size: "165/84A/S",
              color: "C12 浅褐色Light Taupe",
              limit: 10
            }
          ]
        },
        {
          id: 3,
          storeName: "ONLY旗舰店",
          carts: [
            {
              id: 1,
              picUrl: "",
              goodsName:
                "ONLY2019秋季新款chic气质拼色假两件收腰连衣裙女|119207563",
              price: 222,
              oldPrice: 222,
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
              oldPrice: 222,
              number: 1,
              size: "S",
              color: "蓝色",
              limit: 10
            }
          ]
        }
      ],
      floatBar: true,
      checkAll: false,
      totalPrice: 0,
      amount: 0,
      preNumber: 1
    };
  },
  methods: {
    dealCartList() {
      for (const i of this.cartList) {
        this.$set(i, "couponShow", false);
        this.$set(i, "checked", false);
        if (i.couponList) {
          for (const j of i.couponList) {
            this.$set(j, "isReceive", false);
          }
        }
        for (const j of i.carts) {
          this.$set(j, "checked", false);
          this.$set(j, "edict", false);
        }
      }
    },
    searchCoupon(index) {
      if (this.cartList[index].couponShow) {
        this.cartList[index].couponShow = false;
        return;
      } else {
        this.cartList[index].couponShow = true;
      }
    },
    countCounpon(index) {
      const arr = this.cartList[index].couponList.filter(i => {
        return i.isReceive;
      });
      return arr.length;
    },
    receiveCoupon(index1, index2, id) {
      this.cartList[index1].couponList[index2].isReceive = true;
    },
    handelRemove(index1, index3, id) {
      const number = this.cartList[index1].carts[index3].number;
      if (number - 1 >= 1) {
        this.cartList[index1].carts[index3].number--;
        const price = this.cartList[index1].carts[index3].price;
        if (this.cartList[index1].carts[index3].checked) {
          this.totalPrice = accSub(this.totalPrice, price);
          this.amount--;
        }
      }
    },
    handelAdd(index1, index3, id) {
      const number = this.cartList[index1].carts[index3].number;
      if (number + 1 <= this.cartList[index1].carts[index3].limit) {
        this.cartList[index1].carts[index3].number++;
        const price = this.cartList[index1].carts[index3].price;
        if (this.cartList[index1].carts[index3].checked) {
          this.amount++;
          this.totalPrice = accAdd(this.totalPrice, price);
        }
      }
    },
    scroll() {
      const browserHeight = document.documentElement.clientHeight;
      const eleHeight = this.$refs.fixref1.offsetTop;
      // 元素高度 738 屏幕高度 625
      const scrollHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // eleHeight-browserHeight需要滚动的高度
      if (
        eleHeight > scrollHeight &&
        scrollHeight >= eleHeight - browserHeight + 50
      ) {
        this.floatBar = false;
      } else {
        this.floatBar = true;
      }
    },
    // 移入收藏夹
    moveToFavorite(id) {},
    handleCheckAllChange() {
      if (this.checkAll) {
        this.count(true);
      } else {
        this.count(false);
      }
    },
    count(tag) {
      for (const i of this.cartList) {
        i.checked = tag;
        for (const j of i.carts) {
          j.checked = tag;
        }
      }
      let total = 0;
      let amount = 0;
      // 取消
      if (!tag) {
        this.totalPrice = total;
        this.amount = amount;
        this.$emit("countAmount", this.amount);
        return;
      }
      for (const i of this.cartList) {
        let storeTotal = 0;
        for (const j of i.carts) {
          amount += j.number;
          const price = j.number * j.price;
          storeTotal = accAdd(storeTotal, price);
        }
        total = accAdd(total, storeTotal);
      }
      this.totalPrice = total;
      this.amount = amount;
    },
    handleCheckChange(index1, index3) {
      //店铺选中或取消
      if (index3 === undefined) {
        console.log("dian");
        // 选中
        if (this.cartList[index1].checked) {
          let total = 0;
          let amount = 0;
          for (let j of this.cartList[index1].carts) {
            amount += j.number;
            total = accAdd(total, j.number * j.price);
            j.checked = true;
          }
          this.totalPrice = accAdd(total, this.totalPrice);
          this.amount += amount;
        } else {
          // 取消
          let total = 0;
          let amount = 0;
          for (let j of this.cartList[index1].carts) {
            amount += j.number;
            total = accAdd(total, j.number * j.price);
            j.checked = false;
          }
          this.totalPrice = accSub(this.totalPrice, total);
          this.amount -= amount;
        }
      } else {
        // 单个商品的选中
        const price = this.cartList[index1].carts[index3].price;
        const amount = this.cartList[index1].carts[index3].number;
        if (this.cartList[index1].carts[index3].checked) {
          const checked = this.cartList[index1].carts.every(i => {
            return i.checked === true;
          });
          checked
            ? (this.cartList[index1].checked = true)
            : (this.cartList[index1].checked = false);
          this.amount += amount;
          this.totalPrice = accAdd(this.totalPrice, price * amount);
        } else {
          // 店铺选中状态修改
          if (this.cartList[index1].checked) {
            this.cartList[index1].checked = false;
          }
          this.amount -= amount;
          this.totalPrice = accSub(this.totalPrice, price * amount);
        }
      }
    },
    updateNumber(index1, index3) {
      const number = this.cartList[index1].carts[index3].number;
      if (number === "" || number === undefined) {
        this.cartList[index1].carts[index3].number = 1;
      }
      const value = parseInt(String(number));
      if (isNaN(value)) {
        this.cartList[index1].carts[index3].number = 1;
      } else if (
        value >= 1 &&
        value <= this.cartList[index1].carts[index3].limit
      ) {
        this.cartList[index1].carts[index3].number = value;
      } else if (value < 1) {
        this.cartList[index1].carts[index3].number = 1;
      } else if (value > this.cartList[index1].carts[index3].limit) {
        this.cartList[index1].carts[index3].number = this.cartList[
          index1
        ].carts[index3].limit;
      }
      setTimeout(() => {
        this.$refs[`amount-${index1}-${index3}`][0].blur();
      }, 1000);
    }
  },
  created() {
    this.dealCartList();
  },
  mounted() {
    this.scroll();
    window.addEventListener("scroll", this.scroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scroll);
  }
};
</script>

<style scoped>
input[type="checkbox"] {
  visibility: hidden;
  position: absolute;
  z-index: 0;
  left: -20px;
  top: -20px;
}
label {
  cursor: pointer;
}
input[type="checkbox"] + label:before {
  border: 1px solid #ccc;
  content: "\00a0";
  display: inline-block;
  font: 15px/1em sans-serif;
  height: 15px;
  margin: 0 0.25em 0 0;
  padding: 0;
  vertical-align: top;
  width: 15px;
  background: white;
}
input[type="checkbox"]:checked + label:before {
  background: #fff;
  color: red;
  content: "\2714";
  text-align: center;
}
input[type="checkbox"]:checked + label:after {
  font-weight: bold;
}
.checkbox {
  width: 15px;
  height: 15px;
}
.content {
  width: 990px;
  margin: 0 auto;
  padding-top: 48px;
}
.bb {
  background: red !important;
}
.cart-main {
  margin-top: 48px;
  margin-bottom: 50px;
}
.cart-table-th {
  border: 1px solid #ccc;
  height: 50px;
}
.select-all {
  width: 47px;
  margin-left: 15px;
}
.th-item {
  width: 294px;
}
.td-item {
  width: 302px;
}
.th-info,
.td-info {
  width: 172px;
  padding-right: 20px;
  box-sizing: content-box;
}
.th-price,
.th-amount,
.td-price,
.td-amount {
  width: 120px;
  text-align: left;
}
.th-price,
.th-amount {
  padding-left: 10px;
}
.th-amount {
  padding-left: 15px;
}
.th-sum,
.td-sum {
  width: 105px;
  text-align: left;
}
.th-operation,
.td-operation {
  width: 84px;
  padding: 0 0 0 15px;
}
.bundle {
  margin-top: 15px;
}
.store {
  height: 38px;
  padding-left: 15px;
}
.kefu-box {
  width: 20px;
  height: 20px;
}
.kefu {
  height: 20px;
  animation: kefu 1s infinite;
}
@keyframes kefu {
  0%,
  100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(2px);
  }
  30% {
    transform: translateY(2px);
  }
  50% {
    transform: translateY(2px);
    transform: scaleX(1.1);
  }
  80% {
    transform: translateY(1px);
  }
}
em {
  font-style: normal;
}
.coupon-info {
  margin-left: 10px;
  width: 68px;
  height: 25px;
  border: 1px dashed #815999;
  padding-left: 7px;
}
.trinangle-coupon {
  border-left: 7px solid #815999;
  border-top: 12.5px solid transparent;
  border-bottom: 12.5px solid transparent;
  left: -1px;
}
.cart-tips {
  padding: 5px 8px;
  top: 30px;
  left: 0px;
  color: #9c9c9c;
  border-radius: 1px;
  z-index: 3000;
  border: 1px solid #815999;
}
.coupon-list {
  width: 320px;
}
.coupon-rmb {
  padding-right: 2px;
}
.coupon-summary {
  padding: 11px 10px 6px;
  border-bottom: 1px solid #efefef;
  color: black;
  text-align: left;
}
.clear {
  top: 0px;
  right: 0px;
  color: #3c3c3c;
}
.trinangle-tips {
  top: 24px;
  border-bottom: 7px solid #815999;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  z-index: 5000;
}
.trinangle-tips em {
  position: absolute;
  top: 1px;
  left: -5px;
  border-bottom: 8px solid white;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  z-index: 5000;
}
.coupon-list li {
  overflow: hidden;
  margin: 15px 20px 20px 18px;
}
.coupon-bg {
  width: 50px;
  height: 25px;
  border: 1px dashed pink;
  background: pink;
}
.coupon-desc {
  width: 166px;
}
p {
  margin: 0px;
}
.coupon-title {
  color: #6d6d6d;
}
.coupon-rece-butt {
  height: 25px;
  padding-left: 12px;
  padding-right: 12px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 25px;
}
.coupon-receive {
  border: none !important;
  color: #ccc;
  padding: 0px;
}
.item-content {
  border: 1px solid #ccc;
}
.item-content ul {
  background: #fcfcfc;
}
.td {
  min-height: 119px;
}
.td-inner {
  padding-top: 20px;
}
.td-checkbox {
  margin-right: 10px;
  width: 45px;
}
.td-item {
  width: 302px;
}
.item-pic {
  border: 1px solid #ccc;
  width: 80px;
  height: 80px;
  overflow: hidden;
  flex: none;
  margin-right: 7px;
}
.item-pic img {
  max-width: 80px;
  max-height: 80px;
}
a {
  color: #3c3c3c;
}
.item-desc {
  text-align: left;
  text-decoration: none;
  max-height: 36px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-desc:hover {
  color: red;
}
.sku-line {
  margin: 0 5px 0 15px;
  color: #9c9c9c;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.sku-edict {
  width: 432px;
  background: #fff;
  border: 1px solid #ccc;
  min-height: 180px;
  box-sizing: content-box;
  z-index: 7000;
  left: 0px;
}
.sku-edict-triangle {
  z-index: 8000;
  border-bottom: 9px solid #ccc;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  left: 35px;
  top: -9px;
}
.sku-edict-triangle em {
  position: absolute;
  z-index: 9000;
  border-bottom: 8px solid white;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  top: 1px;
  left: -8px;
}
.sku-pros-select {
  padding: 20px 10px;
  min-height: 140px;
  text-align: left;
  color: #a0a0a0;
  width: 250px;
  box-sizing: border-box;
}
.sku-pros-select dl {
  margin-bottom: 15px;
}
dl,
dd {
  margin: 0px;
}
.sku-pros-select dt {
  width: 60px;
  flex: none;
}
dd {
  display: inline-block;
}
li.prop-block {
  border: 1px solid #d1d1d1;
  background-color: #fff;
  line-height: 20px;
  margin: 0 7px 4px 0;
}
.prop-block a {
  display: block;
  padding: 0 9px;
  line-height: 18px;
  height: 18px;
  border: 1px solid #fff;
  white-space: nowrap;
}
.img-mode a {
  display: block;
  height: 30px;
  min-width: 32px;
  line-height: 30px;
  padding: 0px;
}
.sku-op {
  text-align: center;
  line-height: 21px;
}
.sku-op > span {
  display: inline-block;
  width: 55px;
  height: 21px;
  background: red;
  margin-right: 12px;
}
.sku-op > a {
  color: gay;
}
.cart-item-pic {
  width: 180px;
  border-left: 1px solid #ccc;
}
.cart-item-pic img {
  max-width: 160px;
  max-height: 160px;
}
.item-content ul:hover .item-prop {
  border: 1px dashed #dbcbfe;
}
.item-hd {
  height: 38px;
  padding-top: 9px;
  border-bottom: 1px solid #e8e8e8;
  padding-left: 45px;
  color: #6c6c6c;
  line-height: 22px;
  text-align: left;
}
.trinangle-hd {
  top: 32px;
  left: 70px;
  border-bottom: 6px solid #e8e8e8;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  z-index: 5000;
}
.trinangle-hd em {
  position: absolute;
  top: 2px;
  left: -4px;
  border-bottom: 6px solid #fcfcfc;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  z-index: 5000;
}
.hd-title {
  display: inline-block;
  height: 22px;
  margin-right: 15px;
  padding: 0 8px;
  background: #e7e7e7;
}
.item-prop {
  padding: 16px 0px;
  min-height: 84px;
  border: 1px dashed #fcfcfc;
}
.edict {
  width: 30px;
  height: 18px;
  top: 0px;
  right: 0px;
  display: inline-block;
}
.item-content ul:hover .create-icon {
  display: block;
}
.create-icon {
  font-size: 17px;
  display: none;
  background: #ccc;
  width: 18px;
  height: 18px;
  margin-top: 0px;
  margin-left: auto;
}
.update {
  font-size: 12px;
  display: block;
  display: none;
  background: #815999;
}
.item-content ul:hover .td-info:hover .create-icon {
  display: none;
}
.item-content ul:hover .td-info:hover .update {
  display: block;
}
.item-content ul:hover .item-prop:hover {
  border: 1px dashed #815999;
}
.td-price.td-inner {
  padding-top: 12px;
}
.price-content {
  padding: 8px 0 0 10px;
  color: #9c9c9c;
}
.price-content p:first-child {
  text-decoration: line-through;
}
.amount-content > span {
  display: inline-block;
  width: 19px;
  height: 25px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 25px;
  cursor: default;
}
.amount-content input {
  width: 41px;
  height: 25px;
  text-align: center;
}
.available:hover {
  border-color: #815999;
  cursor: pointer;
  color: #815999;
}
.td-sum .sum {
  color: red;
  font-weight: bold;
}
.td-operation {
  text-align: left;
}
.td-operation a:hover,
.cart-bottom a:hover {
  color: red;
  text-decoration: underline;
}
.cart-bottom {
  height: 50px;
  background: #e5e5e5;
  width: 990px;
  color: #3c3c3c;
  margin-top: 15px;
}
.floatBar {
  bottom: 0px;
  z-index: 7000;
  position: fixed;
}
.cart-bottom a {
  text-decoration: none;
  cursor: pointer;
}
.fo-check-all {
  width: 55px;
  padding-left: 5px;
}
.fo-item {
  margin-left: 25px;
}
.visible {
  visibility: visible;
}
.invisible {
  visibility: hidden;
}
.bar-right {
  margin-left: auto;
}
.submit-btn {
  background: red;
  text-align: center;
  line-height: 50px;
  width: 120px;
  margin-left: 5px;
}
.disable {
  background: #b0b0b0;
}
.item-amount {
  margin-right: 50px;
}
</style>