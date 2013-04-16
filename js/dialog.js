/************************
 *对话框组件 
 */
(function(Tool,$){
    var html=Tool.Template.dialog,
        shim=Tool.Template.shim,
        $body=$('body'),
        DialogList=[],
        //从3000开始计算
        zindex=2999;
    var Dialog=function(config){
        var config=config||{};
        this.shim=config.isShim?$(shim).appendTo($body).css('z-index',++zindex):null;
        this.dom=$(html).appendTo($body).css('z-index',++zindex);
        this.eventFun={};
        this.isDrag=config.isDrag;
        this.isCenter=config.isCenter;
        this.resizable=config.resizable;
        this.isShim=config.isShim; //是否用遮罩
        config.isDrag&&this.dom.addClass('pmdialog-drag');
        this.bind();
        this.bindInput();
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
                top: $body.scrollTop() + (win.height() - dom.height()) / 2
            });
            return self;
        },
        /**
         *重新设置位置，各种情况导致的 
         */
        resetPosition:function(params){
            var self=(params && params.data)||this;
            self.isCenter && self.setCenter();
        },
        show:function(){
            this.isShim&&this.shim.show();
            this.dom.show();
            $(window).on('resize scroll',this,this.resetPosition);
            return this;
        },
        hide:function(){
            this.dom.hide();
            this.isShim&&this.shim.hide();
            $(window).off('resize scroll',this.resetPosition);
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
                .unbind('selectstart',self.disableSelect);
            if($.now()-dom.data('timer')>150){
                self.eventFun['dragend']&&self.eventFun['dragend']();
            }
        },
        /**
         *移动偏差距离 
         */
        moveOffset:function(scale){
            var now=this.dom.offset();
            this.setPosition({
                    left:now.left+scale.x,
                    top:now.top+scale.y
                });
           return this;
        },
        mouseMove:function(params){
            var self=params.data,
                pos=self.getMousePosition(params),
                last=self.__mousepoint__;
                
            self.moveOffset({
                x:pos.left-last.left,
                y:pos.top-last.top
            });
           self.__mousepoint__=pos; 
           self.eventFun['dragging']&&self.eventFun['draging']();
        },
        mouseDown:function(params){
            var self=params.data,
                dom=self.dom,
                timer=dom.data('timer',$.now()),
                doc=$(document);
                //置顶操作
                self.setTop();
                //如果不支持拖拽
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
        },
        /**
         *调整大小偏移 
         */
        resizeOffset:function(scale){
            var dom=this.dom,
                nowWidth=dom.width(),
                nowHeight=dom.height(),
                 _width,_height;
            _width=nowWidth+scale.x;
            _height=nowHeight+scale.y;
            
            _width=_width<160?160:_width;
            _height=_height<30?30:_height;
            this.setSize({
                    width:_width,
                    height:_height
                });
            return this;
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
                pos=self.getMousePosition(params),
                last=self.__mousepoint__;
                
            self.resizeOffset({
                x:pos.left-last.left,
                y:pos.top-last.top
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
           size.width && this.dom.width(size.width);
           size.height && this.dom.height(size.height);
        },
        /**
         *置顶 
         */
        setTop:function(){
            var dom=this.dom;
            if(dom.css('z-index')-0<zindex){
                dom.css('z-index',++zindex);
            }
            return this; 
        },
        disableSelect:function(e){
            e.preventDefault();
            return false;
        },
        serializeInput:function(){
            var inputs=this.dom.find('.tag-key'),
                datas={};
            inputs.each(function(){
                var $this=$(this),
                    key=$this.data('key');
                datas[key]=$this.hasClass('input-text')?$this.val():$this.html();
            });
            return datas;
        },
        /**
         *设置序列化的值 
         */
        setSerializeData:function(data){
             var $key;
             if(!data){
                 return;
             }
             $key=this.dom.find('.tag-key');
             $key.each(function(){
                 var $this=$(this),
                     key=$this.data('key'),
                     //根据情况来设定展示形式
                     fun=$(this).hasClass('input-text')?$this['val']:$this['html'];
                 if(data[key]!==undefined){
                    fun.call($this,data[key]);   
                 }
             });
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
          *给单行文本增加多行效果 
          */
         bindInput:function(){
             this.dom.on('focus','input.input-expandable',function(){
                var $this=$(this),
                    $parent=$this.parent(),
                    $instead=$parent.find('textarea.input-expandable');
                 $this.hide();
                 if($instead.length<1){
                     $instead=$('<textarea class="input-textarea input-expandable"></textarea>').appendTo($parent);
                 }
                 $instead.val($this.val());
                 $instead.show().focus();
             })
             .on('blur','textarea.input-expandable',function(){
                var $this=$(this),
                    _val=$this.val(),
                    $parent=$this.parent(),
                    $instead=$parent.find('input.input-expandable');
                 $this.hide();
                 $instead.val(_val);
                 $instead.attr('title',_val);
                 $instead.show();
             });
         },
        /**
         *销毁对话框 
         */
        destroy:function(){
            var self=this;
            this.dom.off('click')
                    .off('mousedown','h2.header');
            this.eventFun=null;
            this.isDrag=null;
            DialogList.splice(DialogList.indexOf(this),1);
            this.id=null;
            this.dom.remove();
        }
    };
  Tool.Dialog=Dialog;
})(Util,jQuery);
