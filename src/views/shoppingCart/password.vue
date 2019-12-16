<template>
  <div class="page">
    <div id="payPwd" class>
      <div class="payTit">
        支付密码
        <input ref="pwd" type="password" maxlength="6" v-model="pwdMsg" class="inputPwd" />
      </div>
      <ul class="pwd-wrap relative-position" @click="focus">
        <li>
          <i class="item" v-if="msgLength > 0"></i>
        </li>
        <li>
          <i class="item" v-if="msgLength > 1"></i>
        </li>
        <li>
          <i class="item" v-if="msgLength > 2"></i>
        </li>
        <li>
          <i class="item" v-if="msgLength > 3"></i>
        </li>
        <li>
          <i class="item" v-if="msgLength > 4"></i>
        </li>
        <li>
          <i class="item" v-if="msgLength > 5"></i>
        </li>
        <li class="line absolute" ref="line" :class="{'active':start}" :style="active()"></li>
      </ul>
      <div class="forgetPwd">忘记密码？</div>
    </div>
  </div>
</template>

<script>
import { setInterval } from "timers";
export default {
  data() {
    return {
      pwdMsg: "", //支付密码
      msgLength: 0,
      left: 19,
      start: false
    };
  },
  methods: {
    focus() {
      this.$refs.pwd.focus();
      this.start = true;
    },
    active() {
      if (this.msgLength === 6) {
        return { left: this.left + "px", display: "none" };
      } else {
        return { left: this.left + 38 * this.msgLength + "px" };
      }
    }
  },
  watch: {
    pwdMsg(curVal) {
      if (/[^\d]/g.test(curVal)) {
        this.pwdMsg = this.pwdMsg.replace(/[^\d]/g, "");
      } else {
        this.msgLength = curVal.length;
      }
    }
  }
};
</script>

<style  scoped>
.inputPwd {
  opacity: 0;
}
#payPwd {
  display: flex;
  justify-content: flex-end;
}
.payTit {
  width: 80px;
  line-height: 30px;
  height: 30px;
  text-align: left;
}
.forgetPwd {
  width: 80px;
  line-height: 30px;
  height: 30px;
  text-align: right;
  font-size: 14px;
  color: #f00;
  cursor: pointer;
}
.pwd-wrap {
  width: 230px;
  height: 30px;
  background: #fff;
  border: 1px solid #888;
  display: flex;
  cursor: pointer;
}
.pwd-wrap li {
  list-style-type: none;
  text-align: center;
  line-height: 30px;
  -webkit-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  border-right: 1px solid #888;
}
.pwd-wrap li:last-child {
  border-right: 0;
}
.pwd-wrap li i.item {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #000;
  display: inline-block;
}
.line {
  height: 20px;
  width: 1px;
  background: black;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
}
.active {
  animation: twinkle 0.6s infinite ease-in
}
@keyframes twinkle {
   0%{opacity: 1;}

   50%{opacity: 0;}

   100%{opacity: 1;}
}
</style>