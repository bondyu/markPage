(function(Tool,$){
    var Dialog=Tool.Dialog,
        Core=Tool.Core,
        Data=Tool.Data,
        Template=Tool.Template;
     function Tag(param){
         Dialog.call(this,true);
         this.setTemplate('��ǩ<a href="#" class="button" data-button="expand">չ��</a>',Template.normalTag, Template.tagOpbar);
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
              *�����¼���ǩ��ʽ 
              */
             if(data.isEvent){
                 dom.addClass('dialog-tag-event');
             }
             //����
             this.setEvent('fold',function(){
                 dom.addClass('dialog-tag-fold');
             })
             //չ��
             .setEvent('expand',function(){
                 dom.removeClass('dialog-tag-fold');
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
         getData:function(){
             return this.data;
         },
         setData:function(data){
           $.extend(this.data,{
               isEvent:false
           },data);  
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
