(function(tool,$){
    var menu,
        currentElement;
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

Util.Menu.addMenu('显示当前选择器',function(e){
    e.preventDefault();
    alert(Util.Elements.getPathByElement(Util.Menu.getCurrentElement()));
})
.addMenu('显示当前页面的特征URL',function(e){
    e.preventDefault();
    alert(Util.Url.getCharacter());
});