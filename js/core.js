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
             *�����������ݵ����� 
             */
            createContainer:function(){
                DATA.box=$('<div id="markpage" class="markpage"></div>').appendTo($('body'));
            },
            /**
             *Ԥ�赱ǰҳ��Ŀ�� 
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
             *��ȡ���� 
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
             *����ҳ���� 
             */
            setPageWidth:function(width){
                DATA.width=width;
                //������Ϣ
                Notify.notify('pageWidthChange',width);
            },
            /**
             *����ҳ�������URL 
             */
            setPageCharacter:function(chara){
                DATA.charaterUrl=chara;
            },
            /**
             *��ȡ��ǰUrl�� ����ֵ
             */
            getCharacter:function(){
                var url=window.location,
                    domain=url.hostname,
                    //port=url.port,
                    path=url.pathname;
                //detailҳ��Ҫ���⴦��
                if(/detail(?:\-test)?\.china\.alibaba\.com(?::\d+)?\/offer\/\d+\.html/.test(url)){
                    return 'detail.china.alibaba.com/offer/detail.html';
                }    
                return character=domain+path;
            },
            /**
             *��ȡ��ǰԪ�ص�·�� 
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
                //����jquery����
                if(el instanceof $){
                    el=el[0];
                }
                //�����id����
                if(el.id){
                    return '#'+el.id;
                }
                path=el.nodeName;
                //�����������
                temp=el.className;
                if(temp){
                    temp=temp.trim();
                    index=temp.indexOf(' ');
                    if(index>-1){
                        temp=temp.substr(0,index);
                    } 
                    path=path+'.'+temp;
                }else if(isParent){
                    //�����ȡ���ڵ�ģ�û�����ֱ������
                    return this.getPathByElement(el.parentNode,true);
                }
                temp=$(path);
                //��������ܹ�����
                if(temp.length>1){
                    path=this.getPathByElement(el.parentNode,true)+' '+path;
                }else if(temp.length==0){
                    path=this.getPathByElement(el.parentNode,true);
                }
                
                //����Ǹ����ڵ�
                if(isParent){
                
                }else{//����Ǳ���ڵ�
                    //�����ֹһ��
                    temp=$(path);
                    if(temp.length>1){
                        path=path+':eq('+temp.index(el)+')';
                    }
                }
                return path;
            },
            /**
             *�����ȡ��ʵ����ƫ��
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
             *����ҳ�����ˮƽλ�û�õ�ǰҳ�������λ��
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
             *��ȡԪ�ص���Ծ���λ�� 
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
   //��ʼ��ִ��һ��
   Core.init();
   
   Util.Core=Core; 
})(Util,jQuery);
