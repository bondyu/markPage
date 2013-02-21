(function(Tool,$){
    var menu,
        currentElement,
        currentPos,
        currentRealPos;
    var Core=Tool.Core,
        Tag=Tool.Tag;
    var Menu={
            /***
             *�����Ҽ��˵� 
             */
            createRightMenu:function(){
                var list;
                if(menu){
                    return menu;
                }
                menu=$('<div class="rightmenu"><ul class="menulist"></ul></div>').appendTo($('body'));
                return menu;
            },
            /***
             *��ȡ��ǰ��Ԫ�� 
             */
            getCurrentElement:function(){
                return currentElement;
            },
            /***
             *��ȡ��ǰ��Ԫ�� 
             */
            getCurrentPosition:function(){
                return currentPos;
            },
            getCurrentRealPosition:function(){
                return currentRealPos;  
            },
            /**
             *ע������Ҽ��¼� 
             */
            registerRightMouse:function(){
                var menu=this.createRightMenu();
                $('body').bind('contextmenu',function(e){
                    e.preventDefault();
                    var from=$(e.target);
                    menu.css({
                        left:e.pageX,
                        top:e.pageY
                    })
                    .show();
                    currentElement=from;
                    currentPos={
                        top:e.pageY,
                        left:Core.processLeft(e.pageX)
                    };
                    currentRealPos={
                        top:e.pageY,
                        left:e.pageX
                    };
                })
                .bind('click',function(e){
                    menu.hide();
                });
            },
            /**
             *ͨ���ı����Ҳ˵��� 
             */
            findMenuByText:function(text){
                var menu=this.createRightMenu(),
                    lis=menu.find('li.menuitem'),
                    temp;
                for(var i=0,len=lis.length;i<len;i++){
                    temp=lis.eq(i);
                    if(temp.text().trim()==text.trim()){
                        return temp;
                    }
                }
                return null;
            },
            /**
             *��Ӳ˵� 
             */
            addMenu:function(text,callback){
                var menu=this.createRightMenu(),
                    list=menu.find('ul.menulist'),
                    theli=this.findMenuByText(text);
                //����Ѿ����˾Ͳ������
                if(theli && theli.length>0){
                    return;
                }
                theli=$('<li class="menuitem"><a href="#" class="item">'+text+'</a></li>');
                theli.on('click','a.item',callback);
                list.append(theli);
                return this;
            }
        };
   Menu.registerRightMouse();
   
   Util.Menu=Menu;
})(Util,jQuery);


(function(Tool,$){
    var Dialog=Tool.Dialog,
        Tag=Tool.Tag,
        dialog;
    function getNewDialog(){
        if(dialog){
            return dialog;
        }
        dialog=new Dialog(true);
        dialog.setEvent('close',function(){
                  dialog.hide();
          });
        return dialog;
    }
    Util.Menu.addMenu('��ʾ��ǰѡ����',function(e){
        e.preventDefault();
        alert(Util.Core.getPathByElement(Util.Menu.getCurrentElement()));
    })
    .addMenu('��ʾ��ǰԪ�ص�����',function(e){
        e.preventDefault();
        var pos=Util.Core.getElementPosition(Util.Menu.getCurrentElement());
        alert('x:'+pos.left+';y:'+pos.top);
    })
    .addMenu('��ʾ��ǰ���������',function(e){
        e.preventDefault();
        var pos=Util.Menu.getCurrentPosition();
        alert('x:'+pos.left+';y:'+pos.top);
    })
    .addMenu('��ʾ��ǰҳ�������URL',function(e){
        e.preventDefault();
        alert(Util.Url.getCharacter());
    })
    .addMenu('�½���ͨ��ǩ',function(e){
        e.preventDefault();
        getNewDialog().setTemplate('�½���ͨ��ǩ',Tool.Template.newNormalTag)
                      .setEvent('confirm',function(){
                          var tag=new Tag();
                          tag.show()
                             .setPosition(Tool.Menu.getCurrentRealPosition());
                          getNewDialog().hide();
                      })
                      .setPosition(Tool.Menu.getCurrentRealPosition())
                      .show();
        
    })
    .addMenu('�½��¼���ǩ',function(e){
        e.preventDefault();
        getNewDialog().setTemplate('�½��¼���ǩ',Tool.Template.newEventTag)
                      .setEvent('confirm',function(){
                          var tag=new Tag({
                              isEvent:true
                          });
                          tag.show()
                             .setPosition(Tool.Menu.getCurrentRealPosition());
                          getNewDialog().hide();
                      })
                      .setPosition(Tool.Menu.getCurrentRealPosition())
                      .show();
        
    });
    
})(Util,jQuery);
