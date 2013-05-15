(function(Tool,$){
    var Dialog=Tool.Dialog,
        Core=Tool.Core,
        Data=Core.getPageData(),
        Template=Tool.Template,
        Configs=Tool.Configs;
     function Tag(param){
         Dialog.call(this,{
             isDrag:true,
             isCenter:false,
             isShim:false,
             resizable:true
         });
         this.dom.addClass('mark-tag');
         this.data={};
         this.setData(param);
         this.init();
     } 
     Tag.prototype=new Dialog();
     $.extend(Tag.prototype,{
         init:function(){
             var self=this,
                 dom=self.dom,
                 data=this.getData(),
                 html,
                 tagDetailHtml,
                 tagEditHtml;
             //设置模版内容
             switch(data.labelType-0){
                case 3:
                    tagDetailHtml = Template.simpleTag;
                    tagEditHtml = Template.newSimpleTag;
                    dom.addClass('pmdialog-tag-simple');
                    break;
                
                case 2:
                    tagDetailHtml = Template.eventTag;
                    tagEditHtml = Template.newEventTag;
                    dom.addClass('pmdialog-tag-event');
                    break;
                default:
                    tagDetailHtml = Template.normalTag;
                    tagEditHtml = Template.newNormalTag;
                    break;
                
             }
             this.setTemplate(Template.defaultTitle,tagDetailHtml, Template.tagOpbar);
             //设定位置
             if(data.pos){
                 this.setPosition({
                     left:Core.originLeft(data.pos.left),
                     top:data.pos.top
                 });
             }
             //设定大小
             if(data.size){
                 this.setSize(data.size);
             }
             
             //收起来默认
             this.fold();
             //设置标题
             this.updateTitle();
             //填充内容
             this.showTagDetail();
             //隐藏
             this.setEvent('fold',function(){
                 self.fold();
             })
             //展开
             .setEvent('expand',function(){
                 self.expand();
             })
             //删除
             .setEvent('delete',function(){
                 self.deleteTag();
             })
             //编辑
             .setEvent('edit',function(){
                 self.setTemplate(undefined,tagEditHtml, Template.defaultOpbar);
                 self.showTagDetail();
             })
             self.setEvent('confirm',function(){
                 var _DATA=self.serializeInput();
                 self.setData(_DATA);
                 self.saveTag();
                 self.setTemplate(undefined,tagDetailHtml, Template.tagOpbar);
                 self.showTagDetail();
             })
             .setEvent('cancel',function(){
                 self.setTemplate(undefined,tagDetailHtml, Template.tagOpbar);
                 self.showTagDetail();
             })
             .setEvent('dragend',function(){
                 var pos=Tool.Core.getElementPosition(dom);
                 self.setData({pos:pos});
                 self.saveTag();
             })
             .setEvent('resizeend',function(){
                 var size={
                     width:dom.width(),
                     height:dom.height()
                 };
                 self.setData({
                     size:size
                 });
                 self.saveTag();
             });
         },
         updateTitle:function(){
             var title=this.getData().title;
             title && this.dom.find('h2.header span.title').html(title);
         },
          //判断是否需要加上tab特征值选择
        checkTabFeature:function(){
            var _data=this.getData(),
                isEdit,
                _html,flist,i,len,isSelected;
              
          //页面是否有特征值
          if(Data.feature){
              flist=Data.feature.split(',');
              _html=[];
              isEdit=this.dom.find('div.tag-detail').length<1,
              _html.push('<dl class="fd-clr"><dt>所属Tab特征参数:</dt><dd>');
              if(isEdit){
                  _html.push('<select data-key="character"  class="input-text tag-key">');
                  for(i=0,len=flist.length;i<len;i++){
                      if(_data.character==flist[i]){
                          isSelected='selected="selected"';
                      }else{
                          isSelected='';
                      }
                      _html.push('<option value="'+flist[i]+'" '+isSelected+'>'+flist[i]+'</option>');
                  }
                  _html.push('</select>');
              }else{
                _html.push('<span class="tag-key"  data-key="character">'+_data.character+'</span>');
              }
              _html.push('</dd></dl>');
              this.dom.find('div.setting-list').prepend(_html.join(''));
          }
          return this;  
        },
         /**
          *收缩 
          */
         fold:function(){
             this.dom.addClass('pmdialog-tag-fold');
             this.resetSize();
             return this;
         },
         /**
          *展开 
          */
         expand:function(){
             this.dom.removeClass('pmdialog-tag-fold');
             this.setSize({
                 height:'auto',
                 width:'auto'
             });
             return this;
         },
         getData:function(){
             return this.data;
         },
         setData:function(data){
           $.extend(this.data,data);
           return this;  
         },
         showTagDetail:function(){
             var data=this.getData();
             this.setSerializeData(data);
              //判断特征值
             this.checkTabFeature();
             return this;
         },
         /**
          *保存该标签到服务器
          */
         saveTag:function(callback){
             var _data=this.getData(),
                url=Configs.serverUrl+(_data.tagId?'/webapp/AjaxUpdateLable.do':'/webapp/AjaxCreateLable.do');
             function processData(putin){
                 var putout;
                 if(putin.size&&putin.size.width){
                    putin.size.width-=54;
                 }
                 putout={
                    id:putin.tagId,
                    functionName:putin.title,
                    lableType:putin.labelType,
                    pos:putin.pos,
                    size:putin.size,
                    css:putin.css,
                    featureSenior:putin.selector,
                    dataSource:putin.dataSource,
                    rule:putin.rule,
                    serviceAppName:putin.serviceName,
                    methodName:putin.methodName,
                    ifName:putin.interfaceName,
                    tc:putin.testCase,
                    dangerousArea:putin.bugs,
                    owner:putin.coder,
                    eventName:putin.eventType,
                    feature:putin.character,
                    comurl:putin.commonUrl,
                    simplecontent:putin.simpleContent
                 };
                 putout["totalUrl"]=Data.totalurl;
                 putout["appname"]=Data.appname;
                 putout["pagename"]=Data.title;
                 return putout;
             }
             $.ajax({
                url:url,
                dataType:'jsonp',
                data:{
                    query:JSON.stringify(processData(_data))
                },
                success:function(o){
                    if(o&&o.success){
                        callback&&callback(o.result);
                    }
                }
            });   
         },
         /**
          *删除标签 
          */
         deleteTag:function(){
            var _this=this,
                _data=_this.getData(),
                url=Configs.serverUrl+'/webapp/AjaxDeleteLable.do'; 
            $.ajax({
                url:url,
                dataType:'jsonp',
                data:{
                    query:JSON.stringify({
                        id:_data.tagId
                    })
                },
                success:function(o){
                    if(o&&o.success){
                        _this.destroyTag();   
                    }
                }
            });   
            
         },
         destroyTag:function(){
             this.hide();
             this.data=null;
             this.destroy();
         },
         /**
          *重新设置大小 
          */
         resetSize:function(params){
             var self=(params && params.data)||this,
                data=self.getData();
            data.size && self.setSize({
                     width:data.size.width,
                     height:data.size.height
                 });
         },
         /**
          *重载resize拖动偏移函数 
          */
         resizeOffset:function(scale){
             var title=this.dom.find('h2.header span.title'), 
                nowWidth=title.width(),
                nowHeight=title.height(),
                 _width,_height;
            _width=nowWidth+scale.x;
            _height=nowHeight+scale.y;
            
            _width=_width<40?40:_width;
            _height=_height<26?26:_height;
            this.setSize({
                    width:_width,
                    height:_height
                });
            return this;
         },
         /**
          *重载dialog的resize变为对标题的设置 
          */
         setSize:function(size){
           var title=this.dom.find('h2.header span.title');
           size.width &&  title.width(size.width);
           size.height && title.height(size.height);
           return this;
         },
         /**
          *重载调整位置 
          */
         resetPosition:function(params){
            var self=(params && params.data)||this,
                data=self.getData();
            self.setPosition({
                     left:Core.originLeft(data.pos.left),
                     top:data.pos.top
                 });
            return self;
         }
     });
     Tool.Tag=Tag;    
})(Util,jQuery);
