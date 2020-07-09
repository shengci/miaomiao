<template>
    <div class="movie_body">
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
					</li> -->

					<li class="pullDown">{{pullDownMsg}}</li>
					<li v-for="item in coming" :key="item.id">
						<div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img | setWH('128.180')"></div>
						<div class="info_list">
							<h2 @tap="handleToDetail(item.id)">{{item.nm}}<img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
							<p><span class="person">{{item.wish}}</span> 人想看</p>
							<p>主演: {{item.star}}</p>
							<p>{{item.rt}}上映</p>
						</div>
						<div class="btn_pre">
							预售
						</div>
					</li> 
				</ul>
	</Scroller>
	</div>
</template>

<script>
export default {
	name:'comingSoon',
	data(){
		return{
			coming:[],
			pullDownMsg: "",
			isLoading:true,
			prevCityId:-1
		};
	},
	activated(){
		var optimus_code=this.$store.state.city.id;
		if(this.prevCityId==optimus_code){return;}
		this.isLoading=true;
		console.log(123);
		this.axios.get('/ajax/comingList?ci=10&token=&limit=10&optimus_uuid=92ACFAD0BC1011EAAD390FB34C2BDB36E5138F6941C3497E8ECDF99267C966FC&optimus_risk_level=71&optimus_code='+optimus_code).then((res)=>{
			var coming=res.data.coming;
			if(!coming==0){
				this.coming=res.data.coming;
				this.isLoading=false;
				this.prevCityId=optimus_code;
			}
		});
	},
	methods: {
    handleToDetail(movieId) {
	//   console.log("执行了");
	this.$router.push('/movie/detail/2/'+movieId);
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新中";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios.get('/ajax/comingList?ci=10&token=&limit=10&optimus_uuid=92ACFAD0BC1011EAAD390FB34C2BDB36E5138F6941C3497E8ECDF99267C966FC&optimus_risk_level=71&optimus_code=10').then(res => {
            var coming=res.data.coming;
            if (!coming==0) {
              this.pullDownMsg = "更新成功";
              setTimeout(() => {
                this.coming = res.data.coming;
                this.pullDownMsg = "";
              }, 1000);
            }
         });
      }
	}
  }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>