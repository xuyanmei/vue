<template>
  <div>
    <nav class="head row justify-end q-py-xl">
      <div class="search q-mr-xl row">
        <input-box></input-box>
        <div class="hot c row f14">
          <span>口红</span>
          <span>日系美妆</span>
          <span>化妆水</span>
          <span>底妆</span>
          <span>乳霜</span>
          <span>洁面</span>
          <span>防晒</span>
        </div>
      </div>
      <div class="cart q-mr-md row items-center relative-position pointer">
        <img src="@/assets/home/ghc.jpg" class="q-mx-sm" alt />
        <span class="q-pa-none" @click="$router.push({path:'/shoppingCart'})">我的购物车</span>
        <i class="material-icons q-mx-sm f28 cb">keyboard_arrow_right</i>
        <div class="amount absolute bg-red row items-center justify-center cf f12" v-show="showAmount">{{amount}}</div>
      </div>
    </nav>
  </div>
</template>

<script>
import inputBox from './inputBox'
export default {
  components:{inputBox},
  props:{
    showAmount:{default:false,type:Boolean},
    amount:{type:Number,default:0}
  },
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    search() {
      this.$emit('search',this.keyword)
    }
  }
};
</script>

<style scoped>
.search {
  width: 400px;
}
.hot span {
  margin-right: 10px;
  cursor: pointer;
}

.cart {
  background: #f2f2f2;
  height: 36px;
  border: 1px solid #dadada;
  margin-right: 60px;
}
.amount {
  border-radius: 50%;
  width: 22px;
  height: 22px;
  right: 26px;
  top: -12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
