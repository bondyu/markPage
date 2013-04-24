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
                    title:from.functionname,
                    labletype:from.labletype,
                    pos:from.pos?JSON.parse(from.pos):null,
                    size:from.size?JSON.parse(from.size):null,
                    css:from.css?JSON.parse(from.css):null,
                    selector:from.featuresenior,
                    dataSource:from.datasource,
                    rule:from.rule,
                    serviceName:from.serviceappName,
                    methodName:from.methodname,
                    interfaceName:from.ifname,
                    testCase:from.tc,
                    bugs:from.dangerousarea,
                    coder:from.owner,
                    eventType:from.eventname,
                    character:from.feature,
                    commonUrl:from.comurl                   
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
              //加载所有标签
              Notify.attach('loadTags',function(data){
                  self.loadTags(data);
              })
              //卸载标签
              .attach('unloadTags',function(data){
                  self.unload();
              });  
            },
            unload:function(){
                $('div.mark-tag').remove();
            }
        };
  Tool.PageTag=app;
  app.init();
})(Util,jQuery);
