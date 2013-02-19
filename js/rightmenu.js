(function(tool,$){
    var menu,
        currentElement;
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

Util.Menu.addMenu('��ʾ��ǰѡ����',function(e){
    e.preventDefault();
    alert(Util.Elements.getPathByElement(Util.Menu.getCurrentElement()));
})
.addMenu('��ʾ��ǰҳ�������URL',function(e){
    e.preventDefault();
    alert(Util.Url.getCharacter());
});