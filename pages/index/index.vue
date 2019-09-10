<template>
	<view class="content">
		<view>基本用法</view>
		<view>
			<view>scroll-view(横向)</view>
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="20">
				<view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
				<view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
				<view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
			</scroll-view>
			<view>scroll-view(纵向)</view>
			<scroll-view class="scroll-view_Y" scroll-y="true" scroll-left="20">
				<view id="demo1" class="scroll-view-item-Y uni-bg-red">A</view>
				<view id="demo2" class="scroll-view-item-Y uni-bg-green">B</view>
				<view id="demo3" class="scroll-view-item-Y uni-bg-blue">C</view>
			</scroll-view>
		</view>
		
		<view class="swiper">
			<view>轮播</view>
			<swiper indicator-dots="true" 
					autoplay="true"
					current=0
					interval=5000
					circular="true"
					indicator-color="rgba(0, 0, 0, .3)" 
					indicator-active-color="#000000">
				<swiper-item>
					<img src="../../static/img/tiem.jpg" alt="">
				</swiper-item>
				<swiper-item>
					<img src="../../static/img/tiem2.jpg" alt="">
				</swiper-item>
				<swiper-item>
					<img src="../../static/img/tiem3.jpg" alt="">
				</swiper-item>
			</swiper>
		</view>
		
		<view>
			<view>富文本</view>
			<view>
				<!-- 相当于v-html -->
				<rich-text :nodes="strings"></rich-text>
			</view>
		</view>
		
		<view>
			<view>进度条</view>
			<view>
				<progress percent="80" show-info="true" stroke-width="5"></progress>
			</view>
		</view>
		
		<view>
			<view>button</view>
			<view>
				<button>submit</button>
				<button type="primary" plain>submit</button>
			</view>
		</view>
		
		<view>
			<view>富文本框</view>
			<view>
				<editor id="editor" :placeholder="placeholder"  @ready="onEditorReady"></editor>
			</view>
		</view>
		
		
		
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				strings:'<div style="text-align:center;"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></div>',
				placeholder: '开始输入...'
			}
		},
		onLoad() {
			
		},
		methods: {
			onEditorReady() {
			                uni.createSelectorQuery().select('#editor').context((res) => {
			                    this.editorCtx = res.context
			                }).exec()
			            },
		}
	}
</script>

<style>
	.scroll-view_H{
	    white-space: nowrap;
	    /* width: 100%; */
	}
	.scroll-view-item_H{
			width: 150px;
		    height: 128px;
		    line-height: 128px;
		    text-align: center;
		    font-size: 15px;
			display: inline-block; /*转换行内标签*/
	}
	.scroll-view_Y{
		height: 200px;
		width: 100%;
	}
	.scroll-view-item-Y {
		width: 100%;
		height: 128px;
		line-height: 128px;
		text-align: center;
		font-size: 15px;
	}
	.uni-bg-red {
	    background: #f76260;
	    color: #fff;
	}
	.uni-bg-green {
	    background: #09bb07;
	    color: #fff;
	}
	.uni-bg-blue {
	    background: #007aff;
	    color: #fff;
	}
	#editor {
	        width: 100%;
	        height: 100px;
	        background-color: #CCCCCC;
	    }
	
</style>
