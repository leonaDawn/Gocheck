/*
 *验证机制 leona 2017/3/30
 *版本号：Gocheck-v0.1
 */
function Gocheck(arg) {
    //传入包裹元素id
    this.elemId = arg.el;
    if(this.elemId==undefined) {
        throw new Error("'elemId' is not defined");
    }

    //传入弹出错误信息窗口
    this.err = arg.popError;
    if(this.err==undefined) {
        throw new Error("'popError' is not defined");
    }

    //定义执行对应检测的input属性名，默认为inCheck
    this.definAttr = (arg.attr == undefined) ? "inCheck" : arg.attr;

    //ajax上传数据，返回结果方法
    this.ajaxMethods=arg.ajaxMethods;
    if (this.ajaxMethods == undefined) {
        throw new Error("'ajaxMethods' is not defined");
    }

    //分部验证ajax
    this.ajaxStepCheck = arg.ajaxStepCheck;
    this.existAjaxSC = function (stepName) {
             if (this.ajaxStepCheck) {
                 if (this.ajaxStepCheck[stepName]) {
                     return true;//存在
                 } else {
                     return false;//不存在
                 }
             }
         };

    //检测正则定义
    var definReg = arg.reg,
        existDefinReg = function (regName) {
            if (definReg) {
                if (definReg[regName]) {
                    if (definReg[regName].r && definReg[regName].t) {
                        return { r: definReg[regName].r, t: definReg[regName].t };
                    } else {
                        throw new Error("'" + regName + "' define the error，please define r（RegExp）and t（Error message）");
                    }
                } else {
                    throw new Error("'" + regName + "' is not defined");
                }
            } else {
                return undefined;
            }
        };
    this.reg = {
        user: existDefinReg("user") == undefined ? { r: (/^[a-zA-Z][a-zA-Z0-9]{5,15}$/), t: "帐号为6-16位字符长度的数字和字母组合,首位必须为字母,不能有空格" } : existDefinReg("user"),
        name: existDefinReg("name") == undefined ? { r: (/^[\u4e00-\u9fa5]+$/), t: "真实姓名只能为中文" } : existDefinReg("name"),
        password: existDefinReg("password"),
        vercode: existDefinReg("vercode"),
        email: existDefinReg("email") == undefined ? { r: (/^[a-zA-Z0-9_-]{1,}@[a-zA-Z0-9_-]{1,}(\.[a-zA-Z]{2,}){1,2}$/), t: "您输入的E-mail地址不合法" } : existDefinReg("email"),
        phone: existDefinReg("phone") == undefined ? { r: (/^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/), t: "请输入正确的手机号" } : existDefinReg("phone"),
        other: /^submit[1|2]{1}$/,
        trueResult:/^[A-z][\s\S]*/,
        mesSubmit1:/that\.err\(inp, m\);/
    };

    //储存检测结果
    this.result = "";

    this.version = "Gocheck-v0.1";

    this.developer = "leona";
};
Gocheck.prototype = {
    //返回指定ID元素下所有的input，button子元素数组对象
    findChildEl: function (parentElId) {
        var parentEl = document.getElementById(parentElId);
        var input = parentEl.getElementsByTagName("input");
        var button = parentEl.getElementsByTagName("button");
        return [input, button];
    },

    //返回所有拥有指定属性的元素数组对象
    findAttr: function (attr) {
        var findEl = this.elemId,
        inputBox = this.findChildEl(findEl),
        findIC = [];
        for (var i in inputBox) {
            var temi = i;
            for (var j in inputBox[temi]) {
                var temj = j,
                inp = inputBox[temi][temj];
                if (typeof inp == "object") {
                    var inCheck = inp.getAttribute(attr);
                    if (inCheck) {
                        if (this.checkMethods[inCheck]) {
                            findIC.push({ attr: inCheck, input: inp });
                        } else {
                            throw new Error("'" + inCheck + "' This property does not exist");
                        }
                    }
                }
            }
        }
        return findIC;
    },

    //检测submi唯一性
    onlySubmit: function () {
        var attr = this.definAttr,
        intend = this.findAttr(attr),
        intendAttr = [];
        for (var i = 0; i < intend.length; i++) {
            intendAttr.push(intend[i].attr);
        }
        var regSub = this.reg.other,
        regCheck = intendAttr.filter(function (val) {
            return regSub.test(val);
        });
        if (regCheck.length == 0) {
            throw new Error("'sumit1' or 'submit2' is not defined");
        } else if (regCheck.length > 1) {
            throw new Error("'sumit1' or 'sumit2' should be the only one");
        } else {
            return regCheck[0];
        }
    },

    //上传数据
    upload: function (data ) { 
        var sentData=function() {
            var format="{"+data.substring(0,data.length-1)+"}";
            var dataObj=eval("("+format+")");
            return dataObj;
        }();
        this.ajaxMethods(sentData);
    },

    //验证检测内容方法
    checkMethods: {
        user: function (v, that, mes) {
            if (v == "") {
                mes("帐号不能为空");
                return;
            }
            if (!that.reg.user.r.test(v)) {
                mes(that.reg.user.t);
                return;
            }
            if (that.existAjaxSC("user")) {
                var ajaxResult = that.ajaxStepCheck.user(v);
                if (!ajaxResult[0]) {
                    mes(ajaxResult[1]);
                    return;
                }
            }  
            if(that.reg.mesSubmit1.test(String(mes))){
                mes("");
            }
            that.result += "user:\""+v+"\",";
        },
        name: function (v, that, mes) {
            if (v == "") {
                mes("请输入真实姓名");
                return;
            }
            if (!that.reg.name.r.test(v)) {
                mes(that.reg.name.t);
                return;
            }
            if (that.existAjaxSC("name")) {
                var ajaxResult = that.ajaxStepCheck.name(v);
                if (!ajaxResult[0]) {
                    mes(ajaxResult[1]);
                    return;
                }
            }
            if(that.reg.mesSubmit1.test(String(mes))){
                mes("");
            }
            that.result+="name:\""+v+"\",";
        },
        password: function (v, that, mes) {
            if (v == "") {
                mes("请输入登录密码");
                return;
            }
            if (v.length < 6) {
                mes("密码长度至少为6位");
                return;
            }
            if (that.reg.password != undefined) {
                if (!that.reg.password.r.test(v)) {
                    mes(that.reg.password.t);
                    return;
                }
            }
            if (that.existAjaxSC("password")) {
                var ajaxResult = that.ajaxStepCheck.password(v);
                if (!ajaxResult[0]) {
                    mes(ajaxResult[1]);
                    return;
                }
            }
            if(that.reg.mesSubmit1.test(String(mes))){
                mes("");
            }
            that.result += "password:\"" + v + "\",";
        },
        againpw: function (v, inpB, that, mes) {
            var b = inpB.value;
            if (v == "") {
                mes("请确认您的密码");
                return;
            }
            if (v != b) {
                mes("两次输入的密码不一致");
                return;
            }
            if (that.existAjaxSC("againpw")) {
                var ajaxResult = that.ajaxStepCheck.againpw(v);
                if (!ajaxResult[0]) {
                    mes(ajaxResult[1]);
                    return;
                }
            }
            if(that.reg.mesSubmit1.test(String(mes))){
                mes("");
            }
            that.result += "againpw:\"" + v + "\",";
        },
        vercode: function (v, that, mes) {
            if (v == "") {
                mes("请输入验证码");
                return;
            }
            if (that.reg.vercode != undefined) {
                if (!that.reg.vercode.r.test(v)) {
                    mes(that.reg.vercode.t);
                    return;
                }
            }
            if (that.existAjaxSC("vercode")) {
                var ajaxResult = that.ajaxStepCheck.vercode(v);
                if (!ajaxResult[0]) {
                    mes(ajaxResult[1]);
                    return;
                }
            }
            if(that.reg.mesSubmit1.test(String(mes))){
                mes("");
            }
            that.result+="vercode:\""+v+"\",";
        },
        email:function(v, that, mes){
            if(!that.reg.email.r.test(v) && v!=""){
                mes(that.reg.email.t);
                return;
            }
            if (that.existAjaxSC("email")) {
                var ajaxResult = that.ajaxStepCheck.email(v);
                if (!ajaxResult[0]) {
                    mes(ajaxResult[1]);
                    return;
                }
            }
            if(that.reg.mesSubmit1.test(String(mes))){
                mes("");
            }
            that.result += "email:\"" + v + "\",";

        },
        phone:function(v, that, mes){
            if(!that.reg.phone.r.test(v) && v!=""){
                mes(that.reg.phone.t);
                return;
            }
            if (that.existAjaxSC("phone")) {
                var ajaxResult = that.ajaxStepCheck.phone(v);
                if (!ajaxResult[0]) {
                    mes(ajaxResult[1]);
                    return;
                }
            }
            if(that.reg.mesSubmit1.test(String(mes))){
                mes("");
            }
            that.result += "phone:\"" + v + "\",";
        },
        //验证机制一：分部验证
        submit1: function (input, index, that, clearResult) {
            function clearForm() {
                for(var i=0;i<input.length-1;i++){
                    if(!that.reg.other.test(input[i].attr)){
                        input[i].input.value="";
                    }
                } 
            }
           
            if (that.result != "") {
                var result = that.result.substring(0,that.result.length-1).split(",");
                console.log(result);
                if (result.length == input.length-1) {
                    that.upload(that.result);
                } else {
                    that.err(input, "您输入的信息有误，请检查");
                    clearForm();
                }
            } else {
                that.err(input, "您没有填写任何信息");
                clearForm();
            }
              clearResult();
        },
        //验证机制二：一次验证
        submit2: function (input, index, that, clearResult) {
            function checkAll(checkRes) {
                function mes(m) {
                    that.result+=m+",";
                }
                for (var i in input) {
                    var att = input[i].attr;
                    var inp = input[i].input;
                    if (att == "againpw") {
                        // again password
                        inp2 = input[i - 1].input;
                        that.checkMethods[att](inp.value, inp2, that, mes);
                    } else if (att != "submit2") {
                        // normal input
                        that.checkMethods[att](inp.value, that, mes);
                    }
                }
                checkRes();
            }
            function Res() {
                var errmes = "";
                var result=that.result.substring(0,that.result.length-1).split(",");
                for (var i = 0; i < result.length; i++) {
                    if (!that.reg.trueResult.test(result[i])){
                        errmes += result[i] + "!!!  ";
                    }
                }
                if (errmes) {
                    var e = errmes.split("  ");
                    if (e.length >= input.length) {
                        that.err(input, "您输入的信息有误，请检查!!!");
                    } else {
                        that.err(input, errmes);
                    }
                } else {
                    that.upload(that.result);
                }
            }
            checkAll(Res);
            clearResult();   
        }
    },

    //绑定dom事件
    bindEvent: function (event, index, input, indexB) {
        var checkFun = this.checkMethods,
        that = this,
        inp = input[index].input,
        attr = input[index].attr;
        function mes(m) {
            that.err(inp, m);
        }
        //again password
        if (!isNaN(indexB)) {
            inp2 = input[indexB].input;
            inp.addEventListener(event, function () {
                checkFun[attr](inp.value, inp2, that, mes);
            }, false)
        } else {
            inp.addEventListener(event, function () {
                // submit
                if (event == "click") {
                    that.data = checkFun[attr](input, index, that, function(){
                        that.result="";
                    });
                }
                // normal input
                if (event == "blur") {
                    checkFun[attr](inp.value, that, mes);
                }
            }, false)
        }
    },

    //绑定对应检测方法
    bindCheck: function () {
        var that = this,
        attr = that.definAttr,
        intend = that.findAttr(attr),
        sub = that.onlySubmit();
        for (var i = 0; i < intend.length; i++) {
            var att = intend[i].attr;
            // 检测确认密码前是否是密码
            if (att == "againpw" && intend[i - 1].attr != "password") {
                throw new Error("The password should be a before enter the password again(输入密码应在再次输入密码的前一个)");
            }
            // submit
            if (that.reg.other.test(att)) {
                that.bindEvent("click", i, intend);
            } else if (sub == "submit1") {
                if (that.ajaxStepCheck == undefined) {
                    throw new Error("'ajaxStepCheck' is not defined(ajax分部验证没有定义)");
                } else {
                    if (att == "againpw") {
                        // again password
                        that.bindEvent("blur", i, intend, i - 1);
                    } else {
                        // normal input
                        that.bindEvent("blur", i, intend);
                    }
                }
            }
        }
    }

}

