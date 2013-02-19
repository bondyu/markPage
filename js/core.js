(function(tool,$){
    var width,
        box,
        Core={
            /**
             *�����������ݵ����� 
             */
            createContainer:function(){
                if(box){
                    return box;
                }
                box=$('<div id="markpage" class="markpage"></div>').appendTo($('body'));
                return box;
            },
            /**
             *��ȡ��ǰҳ��Ŀ�� 
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
             *��ȡ��ǰԪ�ص�·�� 
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
                    return Core.getElementPath(el.parentNode,true);
                }
                temp=$(path);
                //��������ܹ�����
                if(temp.length>1){
                    path=Core.getElementPath(el.parentNode,true)+' '+path;
                }else if(temp.length==0){
                    path=Core.getElementPath(el.parentNode,true);
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
            }
        };
    
    Util.Elements={
        box:Core.createContainer(),
        pageWidth:Core.getPageWidth(),
        getPathByElement:Core.getElementPath
    };
})(Util,jQuery);
