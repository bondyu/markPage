(function(Tool,$){
    var Core=Tool.Core,
        Notify=Tool.Notify,
        Config=Util.Configs,
        Tag=Tool.Tag,
        app={
            init:function(){
                this.attach();
            },
            loadTags:function(datas){
                var self=this;
                $.ajax({
                    url:Config.serverUrl+'/webapp/AjaxQueryLableList.do',
                    data:{
                      query:JSON.stringify(datas)  
                    },
                    dataType:'jsonp',
                    success:function(o){
                        var list,i,len,tag;
                        if(o&&o.success&&o.result){
                            list=o.result;
                            for(i=0,len=list.length;i<len;i++){
                                tag=new Tag(self.processData(list[i]));
                                tag.fold().show();
                            }
                        }
                    }
                });   
            },
            processData:function(from){
                var output;
                output={
                    tagId:from.id,
                    title:from.functionName,
                    isEvent:from.labelType==2,
                    pos:from.pos,
                    size:from.size,
                    css:from.css,
                    selector:from.featureSenior,
                    dataSource:from.dataSource,
                    rule:from.rule,
                    serviceName:from.serviceAppName,
                    methodName:from.methodName,
                    interfaceName:from.ifName,
                    testCase:from.tc,
                    bugs:from.dangerousArea,
                    coder:from.owner,
                    eventType:from.eventName,
                    character:from.feature
                   
                };
                return output;
            },
            hideAllTags:function(){
                $('div.mark-tag').hide();
            },
            showAllTags:function(){
                $('div.mark-tag').show();
            },
            attach:function(){
              var self=this;
              Notify.attach('loadTags',function(data){
                  self.loadTags(data);
              });  
            },
            unload:function(){
                $('div.mark-tag').remove();
            }
        };
  Tool.PageTag=app;
  app.init();
})(Util,jQuery);
