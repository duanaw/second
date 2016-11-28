var Dialog = function (obj) {
    var wrapperDom;
    if(obj.target){
        wrapperDom = typeof obj.target== 'string' ? document.querySelector(obj.target):obj.target;
    }else{
        wrapperDom = document.body
    }

    if(!wrapperDom.querySelector('.mask-layer')){
        var dom = document.createElement('div');
        dom.className= 'mask-layer';
        wrapperDom.appendChild(dom);
        this.maskDom = dom;
    }else{
        this.maskDom =wrapperDom.querySelector('.mask-layer')
    }



    this.wrapper = wrapperDom;
    this.tpl = obj.tpl || '';
};

Dialog.prototype={
    show:function () {

        this.render();
        this.bindEvent();
        this.wrapper.querySelector('.dialog-wrap').className+=' show';
        this.maskDom.className+=' show';
    },
    hide:function () {
        var dw = this.wrapper.querySelector('.dialog-wrap');
        var ml = this.maskDom;
        dw.className = dw.className.replace(' show','');
        ml.className = ml.className.replace(' show','');
    },
    render:function () {
        var wrap = document.createElement('div');
        wrap.className = 'dialog-wrap';
        wrap.innerHTML = this.tpl;
        this.wrapper.appendChild(wrap);
        wrap.querySelector('.dialog-content').innerHTML = this.msg;
    },
    bindEvent:function () {
        var dom = this.wrapper;
        dom.querySelector('.certain').addEventListener('click',function () {
            this.hide();
            this.callback && this.callback()
        }.bind(this),false);
        if(dom.querySelector('.cancel')){
            dom.querySelector('.cancel').addEventListener('click',function () {
                this.hide();
            }.bind(this),false);
        }

    },
    confirm:function (msg,callback) {
        if(callback){
            this.callback = callback
        }
        if(msg){
            this.msg = msg
        }
        this.show();
    },
    alert:function (msg,callback) {
        if(callback){
            this.callback = callback
        }
        if(msg){
            this.msg = msg
        }
        this.show();
    }
};