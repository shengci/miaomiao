<template>
  <div class="movie_body" ref="movie_body">
	  <Loading v-if="isLoading"/>
    <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <!-- <li>
						<div class="pic_show"><img src="/images/movie_1.jpg"></div>
						<div class="info_list">
							<h2>无名之辈</h2>
							<p><span class="person">17746</span> 人想看</p>
							<p>主演: 陈建斌,任素汐,潘斌龙</p>
							<p>2018-11-30上映</p>
						</div>
						<div class="btn_pre">
							预售
						</div>
        </li>-->

        <li class="pullDown">{{pullDownMsg}}</li>
        <li v-for="item in subjects" :key="item.id">
          <div class="pic_show" @tap="handleToDetail(item.id)">
            <img :src="item.cover" />
          </div>
          <div class="info_list">
            <h2 @tap="handleToDetail(item.id)">
              {{item.title}}
              <img src="@/assets/maxs.png" alt />
            </h2>
            <p>
              <span class="grade">{{item.cover_y}}万人想看</span>
            </p>
            <p>主演: 陈建斌,任素汐,潘斌龙</p>
            <p>豆瓣评分：<span class="grade">{{item.rate}}</span></p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
/**/
// import BScroll from "better-scroll";
export default {
  name: "NowPlaying",
  data() {
    return {
    subjects: [],
	  pullDownMsg: "",
    isLoading:true,
    prevCityId:-1
    };
  },
  activated() {
   
    var maizuoCityId=this.$store.state.city.id;
    if(this.prevCityId==maizuoCityId){return;}
    this.isLoading=true;
    console.log(123);
    this.axios
      .get(
        '/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0&maizuoCityId='+maizuoCityId
      )
      .then(res => {
        var msg = res.data.subjects;
        if (!msg == 0) {
		  this.subjects = res.data.subjects;
      this.isLoading=false;
      this.prevCityId=maizuoCityId;
          //   this.$nextTick(() => {
          //     var scroll=new BScroll(this.$refs.movie_body, {
          // 		// tap:true,
          // 		probeType:1
          // 	});

          // 	scroll.on('scroll',(pos)=>{
          // 		// console.log("滚动被触发了");
          // 		if(pos.y>30){
          // 			this.pullDownMsg='正在更新中';
          // 		}
          // 	});
          // 	scroll.on('touchEnd',(pos)=>{
          // 		// console.log("滚动结束后被触发了");
          // 		if(pos.y>30){
          // 			this.axios.get("/ajax/mostExpected?ci=10&limit=10&offset=0&token=&optimus_uuid=92ACFAD0BC1011EAAD390FB34C2BDB36E5138F6941C3497E8ECDF99267C966FC&optimus_risk_level=71&optimus_code=10").then((res)=>{
          // 				var msg = res.data.coming;
          // 				if (!msg == 0) {
          // 					this.pullDownMsg='更新成功';
          // 					  setTimeout(() => {
          // 						  this.coming = res.data.coming;
          // 						  this.pullDownMsg='';
          // 					  }, 1000);
          // 				}
          // 			});
          // 		}
          // 	});
          //   });
        }
      });
  },
  methods: {
    handleToDetail(movieId) {
      // console.log(movieId);
      this.$router.push('/movie/detail/1/'+movieId);
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新中";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios
          .get(
            "/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0"
          )
          .then(res => {
            var msg = res.data.subjects;
            if (!msg == 0) {
              this.pullDownMsg = "更新成功";
              setTimeout(() => {
                this.subjects = res.data.subjects;
                this.pullDownMsg = "";
              }, 1000);
            }
          });
      }
    }
  }
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDown {
  margin: 0;
  padding: 0;
  border: none;
}
</style>