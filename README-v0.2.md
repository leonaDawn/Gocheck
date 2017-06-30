# Gocheck
My web development projects
<h3>Gocheck-form-v0.2 表单验证插件</h3>
<h4>功能简介：</h4>
  1、对定义的表单信息进行前端js验证<br/>
  2、提供常用的正则相关验证
<h4>使用方法：</h4>
  1、html布局
<pre>
 <ul id="testInput">
	<li><label>用户名：</label><input type="text" inCheck="user" /></li>
	<li><label>真实姓名：</label><input type="text" inCheck="name" /></li>
	<li><label>登陆密码：</label><input type="password" inCheck="password" /></li>
	<li><label>确认密码：</label><input type="password" inCheck="againpw" /></li>
	<li><label>E-mail：</label><input type="text" inCheck="email" /></li>
	<li><label>手机号码：</label><input type="text" inCheck="phone" /></li>
	<li class="vcode"><label>验证码：</label><p><input type="text" inCheck="vercode" /><img src="" alt="8855"></span></p></li>
	<li class="submit"><input type="button" value="注册" onclick="check()" /></li>
 </ul>
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
 
 
  
