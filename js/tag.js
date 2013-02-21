(function(Tool,$){
    var Dialog=Tool.Dialog,
        Core=Tool.Core,
        Data=Tool.Data,
        Template=Tool.Template;
     function Tag(param){
         Dialog.call(this,true);
         this.setTemplate('标签<a href="#" class="button" data-button="expand">展开</a>',Template.normalTag, Template.tagOpbar);
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
             //隐藏
             this.setEvent('fold',function(){
                 dom.addClass('dialog-tag-fold');
             })
             //展开
             .setEvent('expand',function(){
                 dom.removeClass('dialog-tag-fold');
             })
             //删除
             .setEvent('delete',function(){
                 self.hide();
                 self.deleteTag();
             })
             //编辑
             .setEvent('edit',function(){
                 self.setTemplate('标签',Template.newEventTag, Template.defaultOpbar);
             })
             self.setEvent('confirm',function(){
                 self.setTemplate('标签',Template.normalTag, Template.tagOpbar);
             })
             .setEvent('cancel',function(){
                 self.setTemplate('标签',Template.normalTag, Template.tagOpbar);
             });
         },
         getData:function(){
             return this.data;
         },
         setData:function(data){
           $.extend(this.data,{
               isEvent:false
           },data);  
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
         }
     });
     Tool.Tag=Tag;    
})(Util,jQuery);
