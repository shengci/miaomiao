//滑动效果，事件点击监听，下滑刷新效果,首字母导航（城市首字母选择）组件封装

<!--使用说明：
1.项目中安装better-scroll，并在main.js中注册全局组件
cnpm i -S better-scroll

import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller);
2.在div下面插入组件
<Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
</Scroller>	//要包裹住整个页面

//刷新的上面插入li,才能显示刷新成功
<li class="pullDown">{{pullDownMsg}}</li>
3.在方法中配置组件
  methods: {
    handleToDetail() {
      console.log("执行了");
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新中";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios.get("url地址").then(res => {
            var msg = res.data.coming;	//axios获取的数据修改成自己的
            if (!msg == 0) {		//axios获取的数据修改成自己的
              this.pullDownMsg = "更新成功";
              setTimeout(() => {
                this.coming = res.data.coming;	//axios获取的数据修改成自己的
                this.pullDownMsg = "";
              }, 1000);
            }
         });
      }
    }
  }
4.在data中添加data(){
	pullDownMsg: ""
    ｝
 -->

<!--首字母导航（城市首字母选择）
1.<Scroller ref="city_list"></Scroller>
2.methods方法中添加
handleToIndex(index) {
      var h2 = this.$refs.city_sort.getElementsByTagName("h2");
	    this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
}
 -->


<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroller",
  props:{
      handleToScroll:{
          type:Function,
          default:function(){}
      },
      handleToTouchEnd:{
          type:Function,
          default:function(){}
      }
  },
  mounted() {
    var scroll = new BScroll(this.$refs.wrapper, {
      tap: true,
      probeType: 1
    });

    this.scroll=scroll;

    scroll.on('scroll',(pos)=>{
        this.handleToScroll(pos);
    });

    scroll.on('touchEnd',(pos)=>{
        this.handleToTouchEnd(pos);
    });
  },
  methods:{
    toScrollTop(y){
      this.scroll.scrollTo(0,y);
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>