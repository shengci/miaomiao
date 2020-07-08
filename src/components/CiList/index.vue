<template>
  <div class="cinema_body">
    <Loading v-if="isLoading"/>
	  <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
    <ul>
      <!-- <li>
						<div>
							<span>大地影院(澳东世纪店)</span>
							<span class="q"><span class="price">22.9</span> 元起</span>
						</div>
						<div class="address">
							<span>金州区大连经济技术开发区澳东世纪3层</span>
							<span>1763.5km</span>
						</div>
						<div class="card">
                			<div>小吃</div>
                			<div>折扣卡</div>
       					</div>
      </li>-->
	<li class="pullDown">{{pullDownMsg}}</li>
      <li v-for="item in cinemaList" :key="item.cinemaId">
        <div>
          <span>{{item.name}}</span>
          <span class="q">
            <span class="price">{{item.lowPrice}}</span> 元起
          </span>
        </div>
        <div class="address">
          <span>{{item.address}}</span>
          <span>{{item.lowPrice}}m</span>
        </div>
        <div class="card">
          <div v-for="(num,key) in item" v-if="num==1" :key="key" :class="key | classCard">{{key | formatCard}}</div>
        </div>
      </li>
    </ul>
	  </Scroller>
  </div>
</template>

<script>
export default {
	name:'CiList',
	data(){
		return{
      cinemaList:[],
      pullDownMsg: "",
      isLoading:true,
      prevCityId:-1
		};
	},
	activated(){
    var cityId=this.$store.state.city.id;
		if(this.prevCityId==cityId){return;}
		this.isLoading=true;
		return this.axios({
			url:'https://m.maizuo.com/gateway?cityId='+cityId+'&ticketFlag=1&k=4239372',
			headers:{
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1593655949562627830874114","bc":"110100"}',
				'X-Host': 'mall.film-ticket.cinema.list'
			}
		}).then((res)=>{
			var msg=res.data.msg;
			if(msg=='ok'){
        this.isLoading=false;	
        this.cinemaList=res.data.data.cinemas;
        this.prevCityId=cityId;
			}
		});
	},
	filters:{
		formatCard(key){
			var card=[
				{key : 'eTicketFlag' ,value : '折扣卡'},
				{key : 'seatFlag' ,value : '小吃'},
			];
			for(var i=0 ; i< card.length ; i++){
				if(card[i].key==key){
					return card[i].value;
				}
			}
			return '';
		},
		classCard(key){
			var card=[
				{key : 'eTicketFlag' ,value : 'bl'},
				{key : 'seatFlag' ,value : 'or'},
			];
			for(var i=0 ; i< card.length ; i++){
				if(card[i].key==key){
					return card[i].value;
				}
			}
			return '';	
		}
	},
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
        return this.axios({
			url:'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=4239372',
			headers:{
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1593655949562627830874114","bc":"110100"}',
				'X-Host': 'mall.film-ticket.cinema.list'
			}
		}).then(res => {
            var msg=res.data.msg;	//axios获取的数据修改成自己的
            if (msg=='ok') {		//axios获取的数据修改成自己的
              this.pullDownMsg = "更新成功";
              setTimeout(() => {
                this.cinemaList=res.data.data.cinemas;	//axios获取的数据修改成自己的
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
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>