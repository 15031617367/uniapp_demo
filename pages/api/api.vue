<template>
	<view>
		<h1>导航设置</h1>
		<view>
			<view>更改题目</view>
			<button @click="romtitle">更改题目</button>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(){
			
		},
		//下拉刷新监听行为
		onPullDownRefresh(){
			this.getNews()
		},
		//下拉加载更多
		onReachBottom(){
			console.log("567")
		},
		
		methods: {
			romtitle(){
				uni.setNavigationBarTitle({
					title:"更改题目"
				})
			},
			//下拉刷新
			getNews(){
				uni.request({
					url:'http://demo.hcoder.net/index.php?user=hcoder&pwd=hcoder&m=list1&page=1',
					success(res){
						console.log(JSON.stringify(res));
						uni.stopPullDownRefresh()
					}
				})
			}
			
		}
	}
</script>

<style>

</style>
