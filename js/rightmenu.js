(function(Tool,$){
    var menu,
        currentElement,
        currentPos,
        currentRealPos,
        dialog;
        
    var Core=Tool.Core,
        Tag=Tool.Tag,
        Dialog=Tool.Dialog;
        
    function getNewDialog(){
        if(dialog){
            return dialog;
        }
        dialog=new Dialog({
            isDrag:true
        });
        dialog.setEvent('close',function(){
                  dialog.hide();
          })
          .setEvent('confirm',function(){
              var tagData=dialog.serializeInput(),
                  pos=dialog.getDialogPosition();
              $.extend(tagData,{
                 commonUrl:Core.getCharacter(),
                 pos: pos
              });
              var tag=new Tag(tagData);
              tag.saveTag(function(tagId){
                  tag.setData({tagId:tagId});
                  tag.show();
                  dialog.hide();
              });
          });
        return dialog;
    }
    var Menu={
            init:function(){
                this.registerRightMouse();
                this.initialMenus();
            },
            getNewDialog:function(){
              return getNewDialog();
            },
            //判断是否需要加上tab特征值选择
            checkTabFeature:function(){
                var _dialog=this.getNewDialog(),
                  data=Core.getPageData(),
                  _html,flist,i,len,isSelected;
                  
              //是否有特征值
              if(data.feature){
                      flist=data.feature.split(',');
                      _html=[];
                  _html.push('<dl class="fd-clr"><dt>所属Tab特征参数:</dt><dd><select data-key="character"  class="input-text tag-key">');
                  for(i=0,len=flist.length;i<len;i++){
                      if(data.tabFeature==flist[i]){
                          isSelected='selected="selected"';
                      }else{
                          isSelected='';
                      }
                      _html.push('<option value="'+flist[i]+'" '+isSelected+'>'+flist[i]+'</option>');
                  }
                  _html.push('</select></dd></dl>');
                  _dialog.dom.find('div.setting-list').prepend(_html.join(''));
              }
              return _dialog;  
            },
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
                $('body').bind('contextmenu.pagemark-rightmenu',function(e){
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
            },
            initialMenus:function(){
                var self=this;
                self.addMenu('显示当前选择器',function(e){
                    e.preventDefault();
                    alert(Core.getPathByElement(self.getCurrentElement()));
                })
                .addMenu('显示当前元素的坐标',function(e){
                    e.preventDefault();
                    var pos=Core.getElementPosition(self.getCurrentElement());
                    alert('x:'+pos.left+';y:'+pos.top);
                })
                .addMenu('显示当前点击的坐标',function(e){
                    e.preventDefault();
                    var pos=self.getCurrentPosition();
                    alert('x:'+pos.left+';y:'+pos.top);
                })
                .addMenu('显示当前页面的特征URL',function(e){
                    e.preventDefault();
                    alert(Util.Url.getCharacter());
                })
                .addMenu('新建普通标签',function(e){
                    e.preventDefault();
                    var _dialog=self.getNewDialog();
                    _dialog.setTemplate('新建普通标签',Tool.Template.newNormalTag)
                          .setPosition(self.getCurrentRealPosition())
                          .show();
                    self.checkTabFeature();
                    
                })
                .addMenu('新建简单标签',function(e){
                    e.preventDefault();
                    var _dialog=self.getNewDialog();
                    _dialog.setTemplate('新建简单标签',Tool.Template.newSimpleTag)
                          .setPosition(self.getCurrentRealPosition())
                          .show();
                    self.checkTabFeature();
                    
                })
                .addMenu('新建事件标签',function(e){
                    e.preventDefault();
                    var _dialog=self.getNewDialog();
                    _dialog.setTemplate('新建事件标签',Tool.Template.newEventTag)
                          .setPosition(self.getCurrentRealPosition())
                          .show();
                   self.checkTabFeature();
                });  
            },
            /**
             *卸载 
             */
            unload:function(){
                if(!menu){
                    return;
                }
                $('body').unbind('.pagemark-rightmenu');
                menu.remove();
                menu=null;
            }
        };
   Util.Menu=Menu;
})(Util,jQuery);


