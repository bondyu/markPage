(function(tool,$){
    var width,
        box,
        Core={
            /**
             *创建所有内容的容器 
             */
            createContainer:function(){
                if(box){
                    return box;
                }
                box=$('<div id="markpage" class="markpage"></div>').appendTo($('body'));
                return box;
            },
            /**
             *获取当前页面的宽度 
             */
            getPageWidth:function(){
                var checklist=[
                        '#content',
                        '#screen',
                        'div.alibar-container'
                    ],
                    widthlist=[952,960,990],
                    doc,
                    _width;
                
                if(width){
                    return width;   
                }
                for(var i=0,len=checklist.length;i<len;i++){
                    doc=$(checklist[i]).eq(0);
                    _width=doc.width();
                    if(widthlist.indexOf(_width)>-1){
                        return width=_width;
                    }
                }
                return null;
            },
            /**
             *获取当前元素的路径 
             */
            getElementPath:function(el,isParent){
                var jel,
                    path,
                    temp,
                    index,
                    self=this;
                if(!el){
                    return '';
                }
                //处理jquery对象
                if(el instanceof $){
                    el=el[0];
                }
                //如果有id命名
                if(el.id){
                    return '#'+el.id;
                }
                path=el.nodeName;
                //如果有类命名
                temp=el.className;
                if(temp){
                    temp=temp.trim();
                    index=temp.indexOf(' ');
                    if(index>-1){
                        temp=temp.substr(0,index);
                    } 
                    path=path+'.'+temp;
                }else if(isParent){
                    //如果是取父节点的，没有类的直接跳过
                    return Core.getElementPath(el.parentNode,true);
                }
                temp=$(path);
                //如果还不能够限制
                if(temp.length>1){
                    path=Core.getElementPath(el.parentNode,true)+' '+path;
                }else if(temp.length==0){
                    path=Core.getElementPath(el.parentNode,true);
                }
                
                //如果是父级节点
                if(isParent){
                
                }else{//如果是本身节点
                    //如果不止一个
                    temp=$(path);
                    if(temp.length>1){
                        path=path+':eq('+temp.index(el)+')';
                    }
                }
                return path;
            }
        };
    
    Util.Elements={
        box:Core.createContainer(),
        pageWidth:Core.getPageWidth(),
        getPathByElement:Core.getElementPath
    };
})(Util,jQuery);
