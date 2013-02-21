(function(Tool,$){
    var Dialog=Tool.Dialog,
        Core=Tool.Core,
        Data=Tool.Data,
        Template=Tool.Template;
     function Tag(param){
         Dialog.call(this,true);
         this.setTemplate('��ǩ',Template.normalTag, Template.tagOpbar);
         this.dom.addClass('mark-tag');
         this.init();
     } 
     Tag.prototype=new Dialog(true);
     $.extend(Tag.prototype,{
         init:function(){
             var self=this;
             //����
             this.setEvent('close',function(){
                 self.hide();
             })
             //ɾ��
             .setEvent('delete',function(){
                 self.hide();
                 self.deleteTag();
             })
             //�༭
             .setEvent('edit',function(){
                 self.setTemplate('��ǩ',Template.newEventTag, Template.defaultOpbar);
             })
             self.setEvent('confirm',function(){
                 self.setTemplate('��ǩ',Template.normalTag, Template.tagOpbar);
             })
             .setEvent('cancel',function(){
                 self.setTemplate('��ǩ',Template.normalTag, Template.tagOpbar);
             });
         },
         /**
          *����ñ�ǩ��������
          */
         saveTag:function(){
             
         },
         /**
          *ɾ����ǩ 
          */
         deleteTag:function(){
            this.destroy();   
         }
     });
     Tool.Tag=Tag;    
})(Util,jQuery);
