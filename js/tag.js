(function(Tool,$){
    var Dialog=Tool.Dialog,
        Core=Tool.Core,
        Data=Tool.Data,
        Template=Tool.Template;
     function Tag(param){
         Dialog.call(this,true,true);
         this.dom.addClass('mark-tag');
         this.data={};
         this.setData(param);
         this.init();
     } 
     Tag.prototype=new Dialog(true);
     $.extend(Tag.prototype,{
         init:function(){
             var self=this,
                 dom=self.dom,
                 data=this.getData(),
                 html;
             //设置模版内容
             tagDetailHtml=data.isEvent? Template.eventTag:Template.normalTag;   
             tagEditHtml=data.isEvent? Template.newEventTag:Template.newNormalTag;   
             this.setTemplate(Template.defaultTitle,tagDetailHtml, Template.tagOpbar);
             /**
              *增加事件标签样式 
              */
             if(data.isEvent){
                 dom.addClass('dialog-tag-event');
             }
             //设定位置
             if(data.pos){
                 this.setPosition({
                     left:Core.originLeft(data.pos.left),
                     top:data.pos.top
                 });
             }
             //设定大小
             if(data.size){
                 this.setSize(data.size);
             }
             
             //收起来默认
             this.fold();
             //设置标题
             this.updateTitle();
             //填充内容
             this.showTagDetail();
             //隐藏
             this.setEvent('fold',function(){
                 self.fold();
             })
             //展开
             .setEvent('expand',function(){
                 self.expand();
             })
             //删除
             .setEvent('delete',function(){
                 self.hide();
                 self.deleteTag();
             })
             //编辑
             .setEvent('edit',function(){
                 self.setTemplate(undefined,tagEditHtml, Template.defaultOpbar);
                 self.showTagDetail();
             })
             self.setEvent('confirm',function(){
                 var _DATA=self.serializeInput();
                 self.setData(_DATA);
                 self.setTemplate(undefined,tagDetailHtml, Template.tagOpbar);
                 self.showTagDetail();
             })
             .setEvent('cancel',function(){
                 self.setTemplate(undefined,tagDetailHtml, Template.tagOpbar);
                 self.showTagDetail();
             })
             .setEvent('resizeend',function(){
                 var size={
                     width:dom.width(),
                     height:dom.height()
                 };
                 self.setData({
                     size:size
                 });
             });
         },
         updateTitle:function(){
             var title=this.getData().title;
             title && this.dom.find('h2.header span.title').html(title);
         },
         /**
          *收缩 
          */
         fold:function(){
             this.dom.addClass('dialog-tag-fold');
             this.resetSize();
             return this;
         },
         /**
          *展开 
          */
         expand:function(){
             this.dom.removeClass('dialog-tag-fold');
             this.setSize({
                 height:'auto'
             });
             return this;
         },
         getData:function(){
             return this.data;
         },
         setData:function(data){
           $.extend(this.data,{
               isEvent:false
           },data);
           return this;  
         },
         showTagDetail:function(){
             var data=this.getData(),
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
             return this;
         },
         /**
          *保存该标签到服务器
          */
         saveTag:function(){
             
         },
         /**
          *删除标签 
          */
         deleteTag:function(){
            this.destroy();   
         },
         /**
          *重新设置大小 
          */
         resetSize:function(params){
             var self=(params && params.data)||this,
                data=self.getData();
            data.size && self.setSize({
                     width:data.size.width,
                     height:data.size.height
                 });
         },
         /**
          *重载resize拖动偏移函数 
          */
         resizeOffset:function(scale){
             var title=this.dom.find('h2.header span.title'), 
                nowWidth=title.width(),
                nowHeight=title.height(),
                 _width,_height;
            _width=nowWidth+scale.x;
            _height=nowHeight+scale.y;
            
            _width=_width<40?40:_width;
            _height=_height<26?26:_height;
            this.setSize({
                    width:_width,
                    height:_height
                });
            return this;
         },
         /**
          *重载dialog的resize变为对标题的设置 
          */
         setSize:function(size){
           var title=this.dom.find('h2.header span.title');
           size.width &&  title.width(size.width);
           size.height && title.height(size.height);
         },
         /**
          *重载调整位置 
          */
         resetPosition:function(params){
            var self=(params && params.data)||this,
                data=self.getData();
            self.setPosition({
                     left:Core.originLeft(data.pos.left),
                     top:data.pos.top
                 });
         }
         
     });
     Tool.Tag=Tag;    
})(Util,jQuery);
