(function(Tool,$){
    var Dialog=Tool.Dialog,
        Core=Tool.Core,
        Data=Tool.Data,
        Template=Tool.Template;
     function Tag(param){
         Dialog.call(this,true,true);
         this.setTemplate(Template.defaultTitle,Template.normalTag, Template.tagOpbar);
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
                 data=this.getData();
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
                 self.setTemplate(undefined,Template.newEventTag, Template.defaultOpbar);
             })
             self.setEvent('confirm',function(){
                 self.setTemplate(undefined,Template.normalTag, Template.tagOpbar);
             })
             .setEvent('cancel',function(){
                 self.setTemplate(undefined,Template.normalTag, Template.tagOpbar);
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
                 width:'auto',
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
