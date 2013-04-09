(function(Tool,$){
    var Core=Tool.Core,
        Tag=Tool.Tag,
        app={
            init:function(){
                this.loadTags();
            },
            loadTags:function(){
                var params={
                    url:Core.getPageCharacter()
                };
                $.ajax({
                    url:'http://wd.alibaba-inc.com/jsonp/54473/3',
                    dataType:'jsonp',
                    success:function(o){
                        var list,i,len,tag;
                        if(o&&o.success&&o.result){
                            list=o.result;
                            for(i=0,len=list.length;i<len;i++){
                                tag=new Tag(list[i]);
                                tag.fold().show();
                            }
                        }
                    }
                });   
            },
            hideAllTags:function(){
                $('div.mark-tag').hide();
            },
            showAllTags:function(){
                $('div.mark-tag').show();
            },
            unload:function(){
                $('div.mark-tag').remove();
            }
        };
  Tool.PageTag=app;
})(Util,jQuery);
