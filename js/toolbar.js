(function(Tool,$){
    var bar,
        dialog,
        featureDialog,
        Template=Tool.Template,
        PageTag=Tool.PageTag,
        Notify=Tool.Notify;
    var Toolbar={
        init:function(){
            this.createBar();
            this.attach();
            this.bind();
        },
        /**
         *卸载工具 
         */
        unload:function(){
            if(!bar){
                return;
            }
            bar.remove();
            bar=null;
        },
        /**
         *创建工具条
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
         *打开工具条对话框
         */
        getSettingDialog:function(){
            var html,
                self=this;
            if(dialog){
               return dialog;
            }
            dialog=new Tool.Dialog({
                isCenter:true,
                isShim:true
            });
            html=Template.pageSettingDialog;
            dialog.setTemplate('设置页面参数',html);
            dialog.setEvent('confirm',function(){
               var data= dialog.serializeInput();
                if(!/\d{3,}/.test(data.width)){
                    return;
                }
                Tool.Core.updatePageParams(data,function(){
                    if(data.feature){//如果存在特征值
                        Notify.notify('choosePageCharact',data.feature,function(feature){
                            Tool.Core.choosePageCharact(feature);
                            Notify.notify('unloadTags');
                            Notify.notify('loadTags',{
                                comurl:data.charater,
                                feature:feature
                            });
                        });
                    }else{
                       //如果没有特征值，直接就加载标签？
                        Notify.notify('unloadTags');
                        Notify.notify('loadTags',{
                            comurl:data.charater
                        }); 
                    }
                });
                dialog.hide();
            })
            .setEvent('close',function(){
                dialog.hide();
            });
            return dialog;
        },
        /**
         *打开工具条对话框
         */
        getChooseFeatureDialog:function(){
            var html,
                self=this;
            if(featureDialog){
               return featureDialog;
            }
            featureDialog=new Tool.Dialog({
                isShim:true,
                isCenter:true
            });
            html=Template.featureDialog;
            featureDialog.setTemplate('选择Tab特征参数',html);
            featureDialog.setEvent('close',function(){
                featureDialog.hide();
            });
            return featureDialog;
        },
        /**
         *绑定事件 
         */
        bind:function(){
            var self=this;
            //设置页面内容
            bar.on('click.toolbar','a.set-page-paras',function(e){
                e.preventDefault();
                var thedialog=self.getSettingDialog();
                thedialog.setSerializeData(Tool.Core.getPageData());
                thedialog.show().setCenter().setTop();
            })
            .on('click.toolbar','a.initmarks',function(e){
                e.preventDefault();
                myCondition = Util.Data.page.condition;
                if (myCondition !=null &&myCondition !=""){
                	window.open(myCondition);
                }
                if (Util.Data.page.appname == null){
                	 Notify.notify('showPageSetting');
                }else {
                	PageTag.showAllTags();
                }
               /* PageTag.showAllTags();*/
            })
            .on('click.toolbar','a.hidemarks',function(e){
                e.preventDefault();
                PageTag.hideAllTags();
            });
        },
        attach:function(){
            var self=this;
            Notify.attach('choosePageCharact',function(featurelist,callback){
                  var fd=self.getChooseFeatureDialog(),
                      flist=featurelist.split(','),
                      _html=[],
                      $select=fd.dom.find('select.tab-features');
                  for(var i=0,len=flist.length;i<len;i++){
                      _html.push('<option value="'+flist[i]+'">'+flist[i]+'</option>');
                  }
                  $select.html(_html.join(''));
                  fd.setEvent('confirm',function(){
                       var feature= $select.val();
                        fd.hide();
                        callback&&callback(feature);
                  });
                  fd.show().setCenter().setTop();
            })
            .attach('showPageSetting',function(){
                bar.find('a.set-page-paras').click();
            });
        }
    };
   Tool.Toolbar=Toolbar;
})(Util,jQuery);