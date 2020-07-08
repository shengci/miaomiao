<template>
    <div id="main" >
        <Header title="喵喵电影" />
        <div id="content">
            <div class="movie_menu">
				<router-link tag="div" to="/movie/city" class="city_name">
					<span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link tag="div" to="/movie/city">
				<div class="hot_swtich">
					<router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
					<router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
				</div>
				<router-link tag="div" to="/movie/search" class="search_entry">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
            </div>
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
        <TagBar />
    </div>
</template>

<script>
import Header from '@/components/Header';
import TagBar from '@/components/TagBar';
import {messageBox} from '@/components/JS'

export default {
    name:'Movie',
    components:{
        Header,
        TagBar
    },
    mounted(){

        setTimeout(() => {
         this.axios.get('/geoip/').then((res)=>{
            // console.log(res.data);
            var msg=res.data;
            if(!msg==0){
                var nm=res.data.city;
                // var id=110100;
                var cityid=this.$store.state.city.id;
                // console.log(mmt);
                if(this.$store.state.city.nm==nm){return;}
            messageBox({
                title:'定位',
                content: nm,
                cancel:'取消',
                ok:'切换定位',
                handleOK(){
                    window.localStorage.setItem('nowNm',nm);
                    window.localStorage.setItem('nowId',cityid);
                    window.location.reload();
                }
        });
            }
        });
        }, 3000);

        // messageBox({
        //     title:'定位',
        //     content:'沈阳',
        //     cancel:'取消',
        //     ok:'切换定位',
        //     handleCancel(){
        //         console.log(1);
        //     },
        //     handleOK(){
        //         console.log(2);
        //     }
        // });
    }
}
</script>

<style scoped>
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>