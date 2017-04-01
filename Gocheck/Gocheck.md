# samllleona
My web development projects
<h3>Gocheck-form-v0.1 表单验证插件</h3>
<h5>插件具有完善的报错信息，如您为开发者，不推荐使用min</h5>
<ol>
 <li>Gocheck-form-v0.1.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--开发者版本</li>
 <li>Gocheck-form-v0.1-min.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--min版本</li>
 <li>onlyCheck.html &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--统一点击提交时一步验证演示文档</li>
 <li>stepCheck.html &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--分步验证演示文档</li>
 <li>详细使用文档.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--详细参数接口使用说明文档</li>
</ol>
<h4>功能简介：</h4>
  1、对定义的表单信息进行前台验证<br/>
  2、提供前台验证后数据接口，用于与后端ajax数据交互<br/>
  3、支持两种验证表单方式：分步式验证和点击按钮后统一触发验证
 <h4>使用方法：</h4>
 1、html布局
 <pre>
&lt;ul id=&quot;test&quot;&gt;
  &lt;li&gt;&lt;label&gt;用户名：&lt;/label&gt;&lt;input type=&quot;text&quot; inCheck=&quot;user&quot; /&gt;&lt;/li&gt;
  &lt;li&gt;&lt;label&gt;真实姓名：&lt;/label&gt;&lt;input type=&quot;text&quot; inCheck=&quot;name&quot; /&gt;&lt;/li&gt;
  &lt;li&gt;&lt;label&gt;登陆密码：&lt;/label&gt;&lt;input type=&quot;password&quot; inCheck=&quot;password&quot; /&gt;&lt;/li&gt;
  &lt;li&gt;&lt;label&gt;确认密码：&lt;/label&gt;&lt;input type=&quot;password&quot; inCheck=&quot;againpw&quot; /&gt;&lt;/li&gt;
  &lt;li&gt;&lt;label&gt;E-mail：&lt;/label&gt;&lt;input type=&quot;text&quot; inCheck=&quot;email&quot; /&gt;&lt;/li&gt;
  &lt;li&gt;&lt;label&gt;手机号码：&lt;/label&gt;&lt;input type=&quot;text&quot; inCheck=&quot;phone&quot; /&gt;&lt;/li&gt;
  &lt;li class=&quot;vcode&quot;&gt;&lt;label&gt;验证码：&lt;/label&gt;&lt;p&gt;&lt;input type=&quot;text&quot; inCheck=&quot;vercode&quot; /&gt;&lt;img src=&quot;&quot; alt=&quot;8855&quot;&gt;&lt;/span&gt;&lt;/p&gt;&lt;/li&gt;
  &lt;li class=&quot;submit&quot;&gt;&lt;input type=&quot;button&quot; inCheck=&quot;submit2&quot; value=&quot;注册&quot; /&gt;&lt;/li&gt;
&lt;/ul&gt;
 </pre>
 
 2、Js使用
 <pre>
//example1：一次验证（适用于弹窗）
var test=new Gocheck({
	el:"test",
	popError:function (input,text) {
		// body... 
	},
	ajaxMethods:fuction(){
	   //返回结果为通过：[true,null]
	   //返回结果为失败：[false,"失败信息"]
	}
})
test.bindCheck();
 </pre>
 <pre>
 //example2：分步验证（适用于定位每个出错信息输出位置）
var test=new Gocheck({
	el:"test",
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
	}
})
test.bindCheck();
 </pre>
  <h4>插件详细信息：</h4>
  实例化后，可以通过以下代码进一步查看插件详细信息：
  <pre>
  test.version       //检测插件版本号
  test.developer     //检测插件开发者
  test.checkMethods  //查看插件有哪些验证API
  test.bindCheck     //开始执行检测
  </pre>
