(function(Tool,$){
    var Dialog=Tool.Dialog,
        Core=Tool.Core,
        Data=Tool.Data,
        Template=Tool.Template;
     function Tag(param){
         Dialog.call(this,true);
         this.setTemplate('标签',Template.normalTag, Template.tagOpbar);
         this.dom.addClass('mark-tag');
         this.init();
     } 
     Tag.prototype=new Dialog(true);
     $.extend(Tag.prototype,{
         init:function(){
             var self=this;
             //隐藏
             this.setEvent('close',function(){
                 self.hide();
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
