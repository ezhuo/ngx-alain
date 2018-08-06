'use strict';

(function () {
    'use strict';

    var LodopFuncs = (function () {

        function LodopFuncs(config) {
            var self = this;
            self.CreatedOKLodop7766 = null;

            return load_needCLodop();
            //----------------------------

            function load_needCLodop() {
                //====页面引用CLodop云打印必须的JS文件：====
                if (self.needCLodop()) {
                    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
                    var oscript = document.createElement("script");
                    oscript.src = "http://localhost:8000/CLodopfuncs.js?priority=1";
                    head.insertBefore(oscript, head.firstChild);

                    //引用双端口(8000和18000）避免其中某个被占用：
                    oscript = document.createElement("script");
                    oscript.src = "http://localhost:18000/CLodopfuncs.js?priority=0";
                    head.insertBefore(oscript, head.firstChild);
                }
                return null;
            }
        }

        //====判断是否需要安装CLodop云打印服务器:====
        LodopFuncs.prototype.needCLodop = function () {

            try {
                var ua = navigator.userAgent;
                if (ua.match(/Windows\sPhone/i) != null) return true;
                if (ua.match(/iPhone|iPod/i) != null) return true;
                if (ua.match(/Android/i) != null) return true;
                if (ua.match(/Edge\D?\d+/i) != null) return true;

                var verTrident = ua.match(/Trident\D?\d+/i);
                var verIE = ua.match(/MSIE\D?\d+/i);
                var verOPR = ua.match(/OPR\D?\d+/i);
                var verFF = ua.match(/Firefox\D?\d+/i);
                var x64 = ua.match(/x64/i);
                if ((verTrident == null) && (verIE == null) && (x64 !== null))
                    return true; else if (verFF !== null) {
                    verFF = verFF[0].match(/\d+/);
                    if ((verFF[0] >= 42) || (x64 !== null)) return true;
                } else if (verOPR !== null) {
                    verOPR = verOPR[0].match(/\d+/);
                    if (verOPR[0] >= 32) return true;
                } else if ((verTrident == null) && (verIE == null)) {
                    var verChrome = ua.match(/Chrome\D?\d+/i);
                    if (verChrome !== null) {
                        verChrome = verChrome[0].match(/\d+/);
                        if (verChrome[0] >= 42) return true;
                    }
                    ;
                }
                ;
                return false;
            } catch (err) {
                return true;
            }
        }

        //设置config
        LodopFuncs.prototype.config = function (config) {
            var self = this;
            config = config || {};
            self.dialog = config.dialog;
            if (!self.dialog.warning) {
                self.dialog.warning = function (str) {
                    return alert(str);
                }
            }
        };

        //====获取LODOP对象的主过程：====
        LodopFuncs.prototype.getLodop = function (oOBJECT, oEMBED) {
            var self = this;
            var down_url = "assets/soft/";
            var strHtmInstall = "<br><font color='#FF00FF'>打印控件未安装!<br/><br/>点击这里 <a href='" + down_url + "install_lodop32.exe' target='_self'>执行安装</a>&nbsp;&nbsp;,安装后请刷新页面或重新进入。</font>";
            var strHtmUpdate = "<br><font color='#FF00FF'>打印控件需要升级!<br/><br/>点击这里&nbsp;&nbsp;<a href='" + down_url + "install_lodop32.exe' target='_self'>执行升级</a>&nbsp;&nbsp;,升级后请重新进入。</font>";
            var strHtm64_Install = "<br><font color='#FF00FF'>打印控件未安装!<br/><br/>点击这里&nbsp;&nbsp;<br/><br/><a href='" + down_url + "install_lodop64.exe' target='_self'>执行安装</a>&nbsp;&nbsp;,安装后请刷新页面或重新进入。</font>";
            var strHtm64_Update = "<br><font color='#FF00FF'>打印控件需要升级!<br/><br/>点击这里&nbsp;&nbsp;<br/><br/><a href='" + down_url + "install_lodop64.exe' target='_self'>执行升级</a>&nbsp;&nbsp;,升级后请重新进入。</font>";
            var strHtmFireFox = "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
            var strHtmChrome = "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
            var strCLodopInstall = "<br><font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!<br/><br/>点击这里<a href='" + down_url + "CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>&nbsp;&nbsp;,安装后请刷新页面。</font>";
            var strCLodopUpdate = "<br><font color='#FF00FF'>CLodop云打印服务需升级!点击这里&nbsp;&nbsp;<br/><br/><a href='" + down_url + "CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>&nbsp;&nbsp;,升级后请刷新页面。</font>";
            var LODOP;
            var str_html = document.documentElement.innerHTML;
            str_html = "";

            try {
                var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
                if (self.needCLodop()) {
                    try {
                        LODOP = getCLodop();
                    } catch (err) {
                        //
                    }
                    if (!LODOP && document.readyState !== "complete") {
                        dialog_show("C-Lodop没准备好，请稍后再试！");
                        return;
                    }
                    if (!LODOP) {
                        if (isIE)
                            dialog_show(strCLodopInstall);
                        else
                            dialog_show(strCLodopInstall + str_html);
                        return;
                    } else {
                        if (CLODOP.CVERSION < "2.1.6.3") {
                            if (isIE)
                                dialog_show(strCLodopUpdate);
                            else
                                dialog_show(strCLodopUpdate + str_html);
                        }
                        if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
                        if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
                    }
                } else {
                    var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
                    //=====如果页面有Lodop就直接使用，没有则新建:==========
                    if (oOBJECT != undefined || oEMBED != undefined) {
                        if (isIE) LODOP = oOBJECT; else LODOP = oEMBED;
                    } else if (self.CreatedOKLodop7766 == null) {
                        LODOP = document.createElement("object");
                        LODOP.setAttribute("width", 0);
                        LODOP.setAttribute("height", 0);
                        LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                        if (isIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                        else LODOP.setAttribute("type", "application/x-print-lodop");
                        document.documentElement.appendChild(LODOP);
                        self.CreatedOKLodop7766 = LODOP;
                    } else {
                        LODOP = self.CreatedOKLodop7766;
                    }
                    //=====Lodop插件未安装时提示下载地址:==========
                    if ((LODOP == null) || (typeof (LODOP.VERSION) == "undefined")) {
                        if (navigator.userAgent.indexOf('Chrome') >= 0)
                            dialog_show(strHtmChrome + str_html);
                        if (navigator.userAgent.indexOf('Firefox') >= 0)
                            dialog_show(strHtmFireFox + str_html);
                        if (is64IE)
                            dialog_show(strHtm64_Install);
                        else if (isIE)
                            dialog_show(strHtmInstall);
                        else
                            dialog_show(strHtmInstall + str_html);
                        return LODOP;
                    }
                }
                if (LODOP.VERSION < "6.2.1.8") {
                    if (!self.needCLodop()) {
                        if (is64IE)
                            dialog_show(strHtm64_Update);
                        else if (isIE)
                            dialog_show(strHtmUpdate);
                        else
                            dialog_show(strHtmUpdate + str_html);
                    }
                    return LODOP;
                }
                //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
                LODOP.SET_LICENSES("郑州大象通信信息技术有限公司", "864567677838688778794958093190", "", "");
                //===========================================================
                return LODOP;
            } catch (err) {
                dialog_show("getLodop出错:" + err);
            }

            function dialog_show(msg_str) {
                self.dialog.warning(msg_str, 10000);
            }

        };

        /**
         * 检查是否已安装
         */
        LodopFuncs.prototype.CheckIsInstall = function () {
            var self = this;
            try {
                var LODOP = self.getLodop();
                if (LODOP.VERSION) {
                    if (LODOP.CVERSION)
                        alert("当前有C-Lodop云打印可用!\n C-Lodop版本:" + LODOP.CVERSION + "(内含Lodop" + LODOP.VERSION + ")");
                    else
                        alert("本机已成功安装了Lodop控件！\n 版本号:" + LODOP.VERSION);

                }
            } catch (err) {
            }
        }

        //数据打印
        LodopFuncs.prototype.data_print = function (data) {

            var self = this;
            data = data || {};
            data.intOrient = data.intOrient || 1;
            data.prt_table = data.prt_table || 0;
            var print_html = data.html;
            var print_Top = (data.top || "10" ) + 'mm';
            var print_Left = (data.left || "10" ) + 'mm';
            var print_Right = ( data.right || "10" ) + 'mm';
            var print_bottom = ( data.bottom || "10" ) + 'mm';

            var get_lodop = self.getLodop();
            if (!get_lodop) {
                return false;
            }
            get_lodop.PRINT_INIT(data.title);

            if (data.intOrient == '1') {
                //纵向打印
                get_lodop.SET_PRINT_PAGESIZE(data.intOrient, '210mm', '297mm', '');
            } else if (data.intOrient == '2') {
                //横向打印
                get_lodop.SET_PRINT_PAGESIZE(data.intOrient, '210mm', '297mm', '');
            } else {
                get_lodop.SET_PRINT_PAGESIZE(data.intOrient, '210mm', '5mm', '');
            }

            if (data.prt_table == '1') {
                get_lodop.ADD_PRINT_TABLE(print_Top, print_Left, 'RightMargin:' + print_Right, 'BottomMargin:' + print_bottom, print_html);
            } else {
                get_lodop.ADD_PRINT_HTM(print_Top, print_Left, 'RightMargin:' + print_Right, 'BottomMargin:' + print_bottom, print_html);
            }

            return get_lodop.PREVIEW();

        };

        return LodopFuncs;

    })();

    this.LodopFuncs = LodopFuncs;

    //this.Lodop_Funcs_Obj = new LodopFuncs();

}).call(this);