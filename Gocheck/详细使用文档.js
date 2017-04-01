//包含所有需要验证的input和提交按钮的父级元素id字符串（必传）
el："test" 

//传入验证后输出错误信息的窗口方法（必传）
popError：function(input,text){
        //....
}

//对前台验证后返回的数据做ajax交互处理，并返回处理结果数组（必传）
ajaxMethods:fuction(){
   //返回结果为通过：[true,null]
   //返回结果为失败：[false,"失败信息"]
}

//分部验证，用于分部验证时对前台验证后返回数据做ajax交互处理，并返回结果数组（必传）
ajaxStepCheck:{
	user：fuction(){
   		//返回结果为通过：[true,null]
   		//返回结果为失败：[false,"失败信息"]
	}，
	name：fuction(){
   		//返回结果为通过：[true,null]
   		//返回结果为失败：[false,"失败信息"]
	}，
	.
	.
	.
	.
	.
	.
}

//定义执行对应检测的input属性名，默认为“inCheck”（可选）         
definAttr："inCheck"

//定义检测用户输入的正则，部分已存在现有正则，可根据自身需求重新定义(可选)
reg:{
	user：{r:/正则内容/,t:"验证错误提示信息"}，
	name：{r:/正则内容/,t:"验证错误提示信息"}，
	password：{r:/正则内容/,t:"验证错误提示信息"}，
	.
	.
	.
	.
	.
	.
}

//example1：一次验证（适用于弹窗）
var test=new Gocheck({
	el:"",
	popError:function (input,text) {
		// body... 
	},
	ajaxMethods:fuction(){
	   //返回结果为通过：[true,null]
	   //返回结果为失败：[false,"失败信息"]
	}
})
test.bindCheck();

//example2：分步验证（适用于定位每个出错信息输出位置）
var test=new Gocheck({
	el:"",
	popError:function (input,text) {
		// body... 
	},
	ajaxMethods:fuction(){
	   //返回结果为通过：[true,null]
	   //返回结果为失败：[false,"失败信息"]
	}，
	ajaxStepCheck:{
		user：fuction(){
	   		//返回结果为通过：[true,null]
	   		//返回结果为失败：[false,"失败信息"]
		}，
		name：fuction(){
	   		//返回结果为通过：[true,null]
	   		//返回结果为失败：[false,"失败信息"]
		}，
		.
		.
		.
		.
		.
		.
	}
})
test.bindCheck();

//上述举例中，实例化后，可以通过以下代码进一步查看插件详细信息


/*
 *插件具有完善的报错信息
 *如您为开发者，建议使用开发者版本
 */

