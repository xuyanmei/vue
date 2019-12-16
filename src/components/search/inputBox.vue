<template>
  <div class="box row">
    <el-input v-model="keyword" placeholder="请输入关键字" @keyup.enter.native="search"></el-input>
    <div class="append-btn bc cf row items-center justify-center q-px-md">搜索</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    }
  },
  methods: {
    search() {
      this.$emit('search',this.keyword)
    }
  },
};
</script>

<style scoped>
.box {
  width: 400px;
}
.append-btn {
  height: 35px;
}
</style>
<style>
.box .el-input {
  width: 300px;
}
.box .el-input__inner {
  border: 1px solid #815999;
  border-right: none;
  border-radius: 0%;
  height: 35px;
}
</style>