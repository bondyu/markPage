(function(Tool,$){
    var DATA=Tool.Data.page,
        Notify=Tool.Notify;
    
    var Core={
            init:function(){
                this.createContainer();
                this.setPageWidth(this.valuatePageWidth());
                this.setPageCharacter(this.getCharacter());
            },
            /**
             *创建所有内容的容器 
             */
            createContainer:function(){
                DATA.box=$('<div id="markpage" class="markpage"></div>').appendTo($('body'));
            },
            /**
             *预设当前页面的宽度 
             */
            valuatePageWidth:function(){
                var checklist=[
                        '#content',
                        '#screen',
                        'div.alibar-container'
                    ],
                    widthlist=[952,960,990],
                    doc,
                    _width;
                
                for(var i=0,len=checklist.length;i<len;i++){
                    doc=$(checklist[i]).eq(0);
                    _width=doc.width();
                    if(widthlist.indexOf(_width)>-1){
                        return _width;
                    }
                }
                return 952;
            },
            /**
             *获取容器 
             */
            getContainer:function(){
               return DATA.box;  
            },
            getPageWidth:function(){
              return DATA.width;  
            },
            getPageCharacter:function(){
              return DATA.charaterUrl;  
            },
            /**
             *设置页面宽度 
             */
            setPageWidth:function(width){
                DATA.width=width;
                //发送消息
                Notify.notify('pageWidthChange',width);
            },
            /**
             *设置页面的特征URL 
             */
            setPageCharacter:function(chara){
                DATA.charaterUrl=chara;
            },
            /**
             *获取当前Url的 特征值
             */
            getCharacter:function(){
                var url=window.location,
                    domain=url.hostname,
                    //port=url.port,
                    path=url.pathname;
                //detail页需要特殊处理
                if(/detail(?:\-test)?\.china\.alibaba\.com(?::\d+)?\/offer\/\d+\.html/.test(url)){
                    return 'detail.china.alibaba.com/offer/detail.html';
                }    
                return character=domain+path;
            },
            /**
             *获取当前元素的路径 
             */
            getPathByElement:function(el,isParent){
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
                    return this.getPathByElement(el.parentNode,true);
                }
                temp=$(path);
                //如果还不能够限制
                if(temp.length>1){
                    path=this.getPathByElement(el.parentNode,true)+' '+path;
                }else if(temp.length==0){
                    path=this.getPathByElement(el.parentNode,true);
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
            },
            /**
             *处理获取真实的左偏移
             */
            processLeft:function(currentLeft){
                var left,
                    screenWidth=document.body.clientWidth,
                    _width=this.getPageWidth();
                if(_width<screenWidth){
                    left=(currentLeft-(screenWidth-_width)/2).toFixed(0)-0;
                }else{
                    left=currentLeft;
                }
                return left;
            },
            /**
             *根据页面相对水平位置获得当前页面的真是位置
             */
            originLeft:function(currentLeft){
                var _width=this.getPageWidth(),
                    screenWidth=document.body.clientWidth,
                    left;
                if(_width<screenWidth){
                    left=(currentLeft+(screenWidth-_width)/2).toFixed(0)-0;
                }else{
                    left=currentLeft;
                }
                return left;    
            },
            /**
             *获取元素的相对居中位置 
            * @param {jQuery} el
             */
            getElementPosition:function(el){
                var el=$(el),
                    pos=el.offset(),
                    result={};
                result.top=pos.top;
                result.left=this.processLeft(pos.left);
                return result;
            }
        };
   //初始化执行一下
   Core.init();
   
   Util.Core=Core; 
})(Util,jQuery);
