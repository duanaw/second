;(function($){

	$.dialog=function(opt){
		return new Dialog(opt);
	}
	function Dialog(opt){

		var opt=({
				title:"标题文字",
				conten:"确定删除吗？",
				btn:["删除","取消"],
				callback:null
		},opt);
		//功能创建遮罩级dialog弹框
		var thml="<div class='mark'></div><div class='dialog'><a class='title'>"+opt.title+"</a><span class='cuo'>X</span><h2>"+opt.conten+"</h2><p></p></div>";
		node=$(thml);
		
		node.prependTo($("body"));//添加到body前面
		$.each(opt.btn,function(index,val){
			$("<button>"+val+"</button>").appendTo(".dialog p")
		})
		$(".mark").css("height",$(document).height());
		//动态写按钮
		//为点击事件绑定事件
		var btns=$(".dialog").find("button");
		//取消
		btns.eq(1).on("click",close)//这样的调用不需要写（）
		//确定
		btns.eq(0).on("click",function(){
			opt.callback && opt.callback();
			close();
		})
		$(".dialog .cuo").on("click",function(){
			close();
		});


		//删除节点
		function close(){
			$(".mark").remove();
			$(".dialog").remove();
		}


	}











})(jQuery)