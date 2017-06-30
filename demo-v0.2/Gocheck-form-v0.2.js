/*
 *验证机制 leona 2017/6/29
 *版本号：Gocheck-v0.2
 */
function Gocheck (arg) {
    if (!arg) throw new Error('"elemId" is not defined')

    this.elemId = function () {
        if (typeof arg === 'string') return arg
        if (typeof arg === 'object') return arg.el
    }()

    this.setAttr = (arg.attr === undefined) ? 'inCheck' : arg.attr

    this.canNull = arg.canNull
    if (this.canNull && !(this.canNull instanceof Array)) throw new Error('"canNull" should be an array')

    this.reg = {
        user: ['帐号', {r: (/^[a-zA-Z][a-zA-Z0-9]{5,15}$/), t: '为6-16位字符长度的数字和字母组合,首位必须为字母,不能有空格'}],
        name: ['真实姓名', {r: (/^[\u4e00-\u9fa5]+$/), t: '只能为中文'}],
        password: ['密码', {r :(/^\S{5,16}$/), t : '应为6~16位字符'}],
        vercode: ['验证码', {r :(/^\S{5,6}$/), t : '错误'}],
        email: ['E-mail', {r: (/^[a-zA-Z0-9_-]{1,}@[a-zA-Z0-9_-]{1,}(\.[a-zA-Z]{2,}){1,2}$/), t: '地址不合法' }],
        phone: ['手机号', {r: (/^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/), t: '不符合常理' }]
    }

    this.version = 'Gocheck-v0.2'

    this.developer = 'leona'

    this.PassInfo = new Object()

    this.ErrorInfo = this.checkStart()
}
Gocheck.prototype = {
    //返回所有拥有指定属性的元素数组对象
    checkStart: function () {
        var input = document.getElementById(this.elemId).getElementsByTagName('input')
        var Pval = this.PassInfo
        for (var i = 0; i < input.length; i++) {
            var nowInput = input[i]
            var inCheck = nowInput.getAttribute(this.setAttr)
            if (inCheck) {
                if (this.reg[inCheck] || inCheck === 'againpw') {
                    var Cval = nowInput.value
                    if (Cval === undefined || Cval === '') {
                        if (!this.canNull || this.canNull.indexOf(inCheck) === -1) {
                            if (inCheck === 'againpw') {
                                return '请再次确认您的密码'
                            } else {
                                return this.reg[inCheck][0] + '不能为空'
                            }
                        }
                    } else if (Cval !== undefined) {
                        var pw
                        if (inCheck === 'password') pw = Cval
                        if (this.reg[inCheck]) {
                            var nowReg = this.reg[inCheck][1].r
                            if (!nowReg.test(Cval)) {
                                return this.reg[inCheck][0] + this.reg[inCheck][1].t
                            } else {
                                Pval[inCheck] = Cval
                            }
                        } else if (inCheck === 'againpw' && pw !== Cval) {
                            return '两次输入的密码不一致'
                        } else {
                             Pval[inCheck] = Cval
                        }
                    }
                } else {
                    throw new Error("'" + inCheck + "' This property does not exist");
                }
            }
        }
    }
}
