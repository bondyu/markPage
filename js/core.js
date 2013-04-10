(function(Tool,$){
    var DATA=Tool.Data.page,
        Notify=Tool.Notify,
        Configs=Tool.Configs,
        URL=Tool.Url;
    
    var Core={
            init:function(){
                this.createContainer();
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
             *初始化页面信息 
             */
            initPageParams:function(){
                var self=this,
                    router=URL.getCommands('hash'),
                    isFromUrl=/pagemark=/i.test(router); //是否是从后来过来的，携带查询条件的
                if(isFromUrl){
                   isFromUrl=URL.parseObject('hash')['pagemark'];
                }else{
                   isFromUrl={};
                }
                isFromUrl['comUrl']='1688.com';
                DATA.width=self.valuatePageWidth();
                
                $.ajax({
                    url:Configs.serverUrl+'/webapp/AjaxQueryPageList.do',
                    dataType:'jsonp',
                    data:{
                        query:JSON.stringify({
                                comUrl:self.getPageCharacter()
                              })
                    },
                    success:function(o){
                        var re;
                        if(o.success&&o.result&&o.result.length>0){
                            re=o.result[0];
                            DATA.width=re['pagewidth'];
                            //如果页面存在特征值，有多个标签的情况下
                            if(re['featrue']){
                                //要先选择哪个特征值
                                Notify.notify('choosePageCharact',function(feature){
                                    isFromUrl['feature']=feature;
                                    Notify.notify('loadTags',isFromUrl);
                                });
                            }else{
                                Notify.notify('loadTags',isFromUrl);
                            }
                        }
                    }
                });
            },
            /**
             *设置页面宽度 
             */
            setPageWidth:function(width){
                DATA.width=width;
                var self=this,
                    data={
                        pageWidth:width,
                        comUrl:this.getPageCharacter(),
                        totalUrl:location.href, //全部url
                        feature:'a,b,c',//多tab的特征值
                        appearCondition:'fslfs',//出现条件
                        name:document.title//页面名称
                    };
                //发送消息
                $.ajax({
                    url:'http://alibaba-62762.hz.ali.com:8083/webapp/AjaxCreatePage.do',
                    dataType:'jsonp',
                    data:{
                        query:JSON.stringify(data)
                    },
                    success:function(o){
                        
                    }
                });
                //发送消息重新渲染tag的排列
                Notify.notify('reflowTags');
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
