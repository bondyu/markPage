(function(Tool,$){
    var menu,
        currentElement,
        currentPos,
        currentRealPos;
    var Core=Tool.Core,
        Tag=Tool.Tag;
    var Menu={
            /***
             *创建右键菜单 
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
             *获取当前的元素 
             */
            getCurrentElement:function(){
                return currentElement;
            },
            /***
             *获取当前的元素 
             */
            getCurrentPosition:function(){
                return currentPos;
            },
            getCurrentRealPosition:function(){
                return currentRealPos;  
            },
            /**
             *注册鼠标右键事件 
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
             *通过文本查找菜单项 
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
             *添加菜单 
             */
            addMenu:function(text,callback){
                var menu=this.createRightMenu(),
                    list=menu.find('ul.menulist'),
                    theli=this.findMenuByText(text);
                //如果已经有了就不添加了
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
    Util.Menu.addMenu('显示当前选择器',function(e){
        e.preventDefault();
        alert(Util.Core.getPathByElement(Util.Menu.getCurrentElement()));
    })
    .addMenu('显示当前元素的坐标',function(e){
        e.preventDefault();
        var pos=Util.Core.getElementPosition(Util.Menu.getCurrentElement());
        alert('x:'+pos.left+';y:'+pos.top);
    })
    .addMenu('显示当前点击的坐标',function(e){
        e.preventDefault();
        var pos=Util.Menu.getCurrentPosition();
        alert('x:'+pos.left+';y:'+pos.top);
    })
    .addMenu('显示当前页面的特征URL',function(e){
        e.preventDefault();
        alert(Util.Url.getCharacter());
    })
    .addMenu('新建普通标签',function(e){
        e.preventDefault();
        getNewDialog().setTemplate('新建普通标签',Tool.Template.newNormalTag)
                      .setEvent('confirm',function(){
                          var dialog=getNewDialog(),
                              tagData=dialog.serializeInput();
                          var tag=new Tag(tagData);
                          tag.show()
                             .setPosition(Tool.Menu.getCurrentRealPosition());
                          getNewDialog().hide();
                      })
                      .setPosition(Tool.Menu.getCurrentRealPosition())
                      .show();
        
    })
    .addMenu('新建事件标签',function(e){
        e.preventDefault();
        getNewDialog().setTemplate('新建事件标签',Tool.Template.newEventTag)
                      .setEvent('confirm',function(){
                          var dialog=getNewDialog(),
                              tagData=dialog.serializeInput();
                          var tag=new Tag(tagData);
                          tag.show()
                             .setPosition(Tool.Menu.getCurrentRealPosition());
                          getNewDialog().hide();
                      })
                      .setPosition(Tool.Menu.getCurrentRealPosition())
                      .show();
        
    });
    
})(Util,jQuery);
