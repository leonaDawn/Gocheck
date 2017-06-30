# Gocheck
My web development projects
<h3>Gocheck-form-v0.2 表单验证插件</h3>
<h4>功能简介：</h4>
  1、对定义的表单信息进行前端js验证<br/>
  2、提供常用的正则相关验证
<h4>使用方法：</h4>
  1、html布局
<pre>
 &lt;ul id=&quot;testInput&quot;&gt;
	&lt;li&gt;&lt;label&gt;用户名：&lt;/label&gt;&lt;input type=&quot;text&quot; inCheck=&quot;user&quot; /&gt;&lt;/li&gt;
	&lt;li&gt;&lt;label&gt;真实姓名：&lt;/label&gt;&lt;input type=&quot;text&quot; inCheck=&quot;name&quot; /&gt;&lt;/li&gt;
	&lt;li&gt;&lt;label&gt;登陆密码：&lt;/label&gt;&lt;input type=&quot;password&quot; inCheck=&quot;password&quot; /&gt;&lt;/li&gt;
	&lt;li&gt;&lt;label&gt;确认密码：&lt;/label&gt;&lt;input type=&quot;password&quot; inCheck=&quot;againpw&quot; /&gt;&lt;/li&gt;
	&lt;li&gt;&lt;label&gt;E-mail：&lt;/label&gt;&lt;input type=&quot;text&quot; inCheck=&quot;email&quot; /&gt;&lt;/li&gt;
	&lt;li&gt;&lt;label&gt;手机号码：&lt;/label&gt;&lt;input type=&quot;text&quot; inCheck=&quot;phone&quot; /&gt;&lt;/li&gt;
	&lt;li class=&quot;vcode&quot;&gt;&lt;label&gt;验证码：&lt;/label&gt;&lt;p&gt;&lt;input type=&quot;text&quot; inCheck=&quot;vercode&quot; /&gt;&lt;img src=&quot;&quot; alt=&quot;8855&quot;&gt;&lt;/span&gt;&lt;/p&gt;&lt;/li&gt;
	&lt;li class=&quot;submit&quot;&gt;&lt;input type=&quot;button&quot; value=&quot;注册&quot; onclick=&quot;check()&quot; /&gt;&lt;/li&gt;
 &lt;/ul&gt;
</pre>

2、Js使用

 <pre>
//example：（default）
    var test = new Gocheck("testInput")
	function check () {
		var result = test.ErrorInfo // 获取错误信息
		if (result) {
			alert(result)
		} else {
			var info = test.PassInfo // 获取通过信息
		}
	}
 </pre>
 
 <pre>
//example：（custom）
    var test = new Gocheck({
      el： "testInput"  // 字符串类型，外层包裹元素id，必传
      attr： "checkVal" // 字符串类型，需要检查项使用的html属性名，默认为 ‘inCheck’
      canNull: ['phone','email'] // 数组类型，允许留空的项，默认为 ‘null’
    })

    function check () {
	var result = test.ErrorInfo // 获取错误信息
	if (result) {
		alert(result)
	} else {
		var info = test.PassInfo // 获取通过信息
	}
    }
 </pre>
 
<h4>插件详细信息：</h4>
实例化后，可以通过以下代码进一步查看插件详细信息：
<pre>
  test.version       // 查看插件版本号
  test.developer     // 查看插件开发者
  test.reg           // 查看验证正则
  test.PassInfo      // 获取验证通过的信息
  test.ErrorInfo     // 获取验证失败后返回的错误信息
</pre>
 
 
  
