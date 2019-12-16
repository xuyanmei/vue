<template>
    <div class="column q-pb-md item pointer">
      <img class="item-pic" src="@/assets/home/10.jpg" alt />
      <div class="row justify-between q-mt-sm q-mb-md">
        <div class="q-px-sm">
          <span class="cred text-bold f12">￥</span>
          <span class="cred text-bold f24">{{item.price}}</span>
          <span class="c7 f15 text-bold q-ml-sm old-price">￥{{item.oldPrice}}</span>
        </div>
        <span class="f16 c6 q-mr-sm">{{item.collected}} 收藏</span>
      </div>
      <div class="describe q-px-sm">
        <span class="cred">{{item.discount}}</span>
        {{item.describe}}
      </div>
      <div class="comments row items-center justify-center q-mt-lg q-mb-xs q-mx-sm" v-show="comment">
        <div>
          <img src="@/assets/home/14555134984020.jpg" alt />
        </div>
        <p class="q-ma-none ca">
          "挺不错的，主要是方便"
          <br />共有2736评论，好评率98%
        </p>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    item: { type: Object },
    comment:{type:Boolean}
  }
};
</script>

<style scoped>
.item {
  width: 286px;
}
.item-pic {
  height: 269px;
}
.old-price {
  text-decoration: line-through;
}
.describe {
  text-align: left;
}
.comments {
  border-radius: 25px;
  background: #fffcdb;
}
.comments img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
</style>