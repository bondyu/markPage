/************************
 *对话框组件 
 */
(function(Tool,$){
    var html=Tool.Template.dialog,
        DialogList=[],
        //从3000开始计算
        zindex=2999;
    var Dialog=function(isDrag,resizable){
        this.dom=$(html).appendTo($('body')).css('z-index',++zindex);
        this.eventFun={};
        this.isDrag=isDrag;
        this.resizable=resizable;
        isDrag&&this.dom.addClass('dialog-drag');
        this.bind();
        //存储起来
        this.id=DialogList.length;
        DialogList.push(this);
    };
    Dialog.prototype={
        /**
         *设置对话框模版 
         * @param {Object} title
         * @param {Object} body
         */
        setTemplate:function(title,body,foot){
           'string' === typeof title && this.dom.find('h2.header').html(title);
           'string' === typeof body && this.dom.find('div.content').html(body);
           'string' === typeof foot && this.dom.find('div.footer div.panel').html(foot);
            return this;
        },
        setCenter:function(){
            var self=this,
                win=$(window),
                dom=self.dom;
            dom.css({
                left: (win.width() - dom.width()) / 2,
                top: (win.height() - dom.height()) / 2
            });
            return self;
        },
        /**
         *重新设置位置，各种情况导致的 
         */
        resetPosition:function(params){
            var self=(params && params.data)||this;
            self.setCenter();
        },
        show:function(){
            this.dom.show();
            $(window).on('resize',this,this.resetPosition);
            return this;
        },
        hide:function(){
            this.dom.hide();
            $(window).off('resize',this.resetPosition);
            return this;
        },
        setEvent:function(evenName,fun){
            this.eventFun[evenName]=fun;
            return this;
        },
        getDialogPosition:function(){
            return Tool.Core.getElementPosition(this.dom);  
        },
        setPosition:function(pos){
            this.dom.css(pos);
            return this;
        },
        getMousePosition:function(e){
          return {
              left:e.pageX,
              top:e.pageY
          };  
        },
        mouseUp:function(params){
            var self=params.data,
                dom=self.dom,
                doc=$(document);
            dom.removeClass('move');
            doc.unbind('mousemove',self.mouseMove)
                .unbind('mouseup',self.mouseUp)
                .unbind('selectstart',self.disableSelect); ;
            self.eventFun['dragend']&&self.eventFun['dragend']();
        },
        mouseMove:function(params){
            var self=params.data,
                dom=self.dom,
                
                pos=self.getMousePosition(params),
                last=self.__mousepoint__,
                now=dom.offset();
            dom.css({
                    left:now.left+(pos.left-last.left),
                    top:now.top+pos.top-last.top
                });
            
           self.__mousepoint__=pos; 
           self.eventFun['dragging']&&self.eventFun['draging']();
        },
        mouseDown:function(params){
            var self=params.data,
                dom=self.dom,
                //timer=dom.data('timer'),
                doc=$(document);
            //if(timer){
            //    clearTimeout(timer);
           // }
            //timer=setTimeout(function(){
                if(dom.css('z-index')-0<zindex){
                    dom.css('z-index',++zindex);
                }
                if(!self.isDrag){
                    return;
                }
                dom.addClass('move')
                //记录当前点击下的位置
                self.__mousepoint__=self.getMousePosition(params);
                doc.bind('mousemove',self,self.mouseMove) 
                   .bind('mouseup',self,self.mouseUp)
                   .bind('selectstart',self.disableSelect);  
                self.eventFun['dragstart']&&self.eventFun['dragstart']();
           // },500);
            
        },
        resizeStart:function(params){
            //阻止事件冒泡到title上面去
            params.preventDefault();
            
            var self=params.data,
                dom=self.dom,
                doc=$(document);
            if(!self.resizable){
                return false;
            }
            //记录当前点击下的位置
            self.__mousepoint__=self.getMousePosition(params);
            doc.bind('mousemove',self,self.resize) 
               .bind('mouseup',self,self.resizeEnd)
               .bind('selectstart',self.disableSelect);  
            self.eventFun['resizestart']&&self.eventFun['resizestart']();
            return false;
        },
        resize:function(params){
            var self=params.data,
                dom=self.dom,
                pos=self.getMousePosition(params),
                last=self.__mousepoint__,
                nowWidth=dom.width(),
                nowHeight=dom.height(),
                _width,_height;
            _width=nowWidth+(pos.left-last.left);
            _height=nowHeight+pos.top-last.top;
            //最小值
            _width=_width<160?160:_width;
            _height=_height<30?30:_height;
            self.setSize({
                    width:_width,
                    height:_height
                });
           self.__mousepoint__=pos; 
           self.eventFun['resizing']&&self.eventFun['resizing']();
        },
        resizeEnd:function(params){
            var self=params.data,
                dom=self.dom,
                doc=$(document);
            doc.unbind('mousemove',self.resize)
                .unbind('mouseup',self.resizeEnd)
                .unbind('selectstart',self.disableSelect); ;
            self.eventFun['resizeend']&&self.eventFun['resizeend']();
        },
        setSize:function(size){
            this.dom.width(size.width);
            this.dom.height(size.height);
        },
        disableSelect:function(e){
            e.preventDefault();
            return false;
        },
        bind:function(){
            var self=this;
            this.dom.on('click','[data-button]',function(e){
                e.preventDefault();
                var type=$(this).data('button');
                self.eventFun[type]&&self.eventFun[type]();
            })
            //拖拽功能
            .on('mousedown','h2.header',self,self.mouseDown)
            .on('mousedown','.resize-bar',self,self.resizeStart);
            
        },
        /**
         *销毁对话框 
         */
        destroy:function(){
            var self=this;
            this.dom.off('click')
                    .off('mousedown','h2.header');
            this.eventFun={};
            this.isDrag=null;
            DialogList.splice(DialogList.indexOf(this),1);
            this.id=null;
            this.dom.remove();
        }
    };
  Tool.Dialog=Dialog;
})(Util,jQuery);
