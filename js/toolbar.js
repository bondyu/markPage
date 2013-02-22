(function(Tool,$){
    var bar,
        dialog,
        Template=Tool.Template;
    var Toolbar={
        init:function(){
            this.createBar();
            this.bind();
        },
        /**
         *�½������� 
         */
        createBar:function(){
            var box=Tool.Core.getContainer(),
                html;
            if(bar){
                return bar;
            }
            html=Template.toolbar;
            return bar=$(html).prependTo(box);
        },
        /**
         *��ȡ���öԻ��� 
         */
        getSettingDialog:function(){
            var html,
                self=this;
            if(dialog){
               return dialog;
            }
            dialog=new Tool.Dialog();
            html=Template.pageSettingDialog;
            dialog.setTemplate('����ҳ�����',html);
            dialog.setEvent('confirm',function(){
               var dom= dialog.dom,
                   width= dom.find('input.page-width').val();
                if(/\d{3,}/.test(width)){
                    Tool.Core.setPageWidth(width);
                }
                dialog.hide();
            })
            .setEvent('close',function(){
                dialog.hide();
            });
            return dialog;
        },
        /**
         *���¼� 
         */
        bind:function(){
            var self=this;
            //����ҳ������
            bar.on('click','a.set-page-paras',function(e){
                e.preventDefault();
                var thedialog=self.getSettingDialog(),
                    dom=thedialog.dom;
                thedialog.show().setCenter().setTop();
                dom.find('input.character-url').val(Tool.Core.getCharacter());
                dom.find('input.page-width').val(Tool.Core.getPageWidth());
            })
            .on('click','a.initmarks',function(e){
                e.preventDefault();
                $('div.mark-tag').show();
            })
            .on('click','a.hidemarks',function(e){
                e.preventDefault();
                $('div.mark-tag').hide();
            });
        }
    };
   Toolbar.init();
})(Util,jQuery);