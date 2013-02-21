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
              *�����¼���ǩ��ʽ 
              */
             if(data.isEvent){
                 dom.addClass('dialog-tag-event');
             }
             //�趨λ��
             if(data.pos){
                 this.setPosition({
                     left:Core.originLeft(data.pos.left),
                     top:data.pos.top
                 });
             }
             //�趨��С
             if(data.size){
                 this.setSize(data.size);
             }
             //������Ĭ��
             this.fold();
             //����
             this.setEvent('fold',function(){
                 self.fold();
             })
             //չ��
             .setEvent('expand',function(){
                 self.expand();
             })
             //ɾ��
             .setEvent('delete',function(){
                 self.hide();
                 self.deleteTag();
             })
             //�༭
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
          *���� 
          */
         fold:function(){
             this.dom.addClass('dialog-tag-fold');
             this.resetSize();
             return this;
         },
         /**
          *չ�� 
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
          *����ñ�ǩ��������
          */
         saveTag:function(){
             
         },
         /**
          *ɾ����ǩ 
          */
         deleteTag:function(){
            this.destroy();   
         },
         /**
          *�������ô�С 
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
          *���ص���λ�� 
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
