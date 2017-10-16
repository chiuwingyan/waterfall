/*
* @Author: lenovo
* @Date:   2017-08-14 18:02:39
* @Last Modified by:   lenovo
* @Last Modified time: 2017-08-15 13:59:27
*/

$.fn.extend({
	waterfall:function(){
		var $_this=this;
		//大盒子宽度
		var totalwidth=$_this.width();
		//子元素宽度
		var itemwidth=$_this.children('.item').width();
		//每一行元素的个数
		var count=Math.floor(totalwidth/itemwidth);
		//子元素之间的间距
		var margin=(totalwidth-itemwidth*count)/(count-1);
		//初始化高度数组
		var heightarr=[];
		for(var i=0;i<count;i++){
			heightarr[i]=margin;
		}
		//jq中遍历数组的方法,index是下标，element是数组值
		$_this.children('.item').each(function(index,element){
			var currentheight=$(element).height();

			//计算元素摆放的位置，找出高度最小的，放到里面
			var minindex=0;
			var minHeight=heightarr[0];
			for(var i=0;i<heightarr.length;i++){
				if(heightarr[i]<minHeight){
					minindex=i;
					minHeight=heightarr[i];
				}
			}
			//给元素定位
			
			$(element).css({
				top:minHeight,
				left:minindex*margin+minindex*itemwidth

			});
			//改变当前元素高度
			minHeight+=currentheight;
			minHeight+=margin;
			heightarr[minindex]=minHeight;


		});
		//获取元素的最大的长度，设置为父盒子长度
		var maxHeight=heightarr[0];
		for(var i=0;i<heightarr.length;i++){
			if(heightarr[i]>maxHeight){
				maxHeight=heightarr[i];
			}
		}
		$_this.height(maxHeight);
	}

})
