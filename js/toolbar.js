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
         *新建工具栏 
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
         *获取设置对话框 
         */
        getSettingDialog:function(){
            var html,
                self=this;
            if(dialog){
               return dialog;
            }
            dialog=new Tool.Dialog();
            html=Template.pageSettingDialog;
            dialog.setTemplate('设置页面参数',html);
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
         *绑定事件 
         */
        bind:function(){
            var self=this;
            //设置页面内容
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