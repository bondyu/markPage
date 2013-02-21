(function(Tool){
    Tool.Template={
        //普通对话框的基本模版
        dialog:'<div class="dialog">\
                <h2 class="header">默认标题</h2>\
                <div class="content">默认内容</div>\
                <div class="footer fd-clr">\
                    <div class="fd-right panel">\
                        <a href="#" class="button" data-button="confirm">确定</a>\
                        <a href="#" class="button" data-button="close">取消</a>\
                    </div>\
                </div>\
             </div>',
        //工具条的模版
        toolbar:'<div class="toolbar">\
                    <div class="op-panel">\
                        <a class="button initmarks" href="#">展示所有标签</a>\
                        <a class="button hidemarks" href="#">隐藏所有标签</a>\
                        <a class="button set-page-paras" href="#">设置页面参数</a>\
                    </div>\
                 </div>',
        //页面设置对话框模版
        pageSettingDialog:'<div class="setting-list">\
                    <dl class="fd-clr"><dt>页面特征Url:</dt><dd><input type="text" readonly="readonly" class="input-text character-url"/></dd></dl>\
                    <dl class="fd-clr"><dt>页面宽度:</dt><dd><input type="text" class="input-text page-width"/>&nbsp;px</dd></dl>\
                  </div>',
        //添加普通标签对话框模版
        newNormalTag:'<div class="setting-list">\
                    <dl class="fd-clr"><dt>页面特征Url:</dt><dd><input type="text"  class="input-text character-url"/></dd></dl>\
                    <dl class="fd-clr"><dt>页面特征Url:</dt><dd><input type="text"  class="input-text character-url"/></dd></dl>\
                    <dl class="fd-clr"><dt>页面特征Url:</dt><dd><input type="text"  class="input-text character-url"/></dd></dl>\
                    <dl class="fd-clr"><dt>页面特征Url:</dt><dd><input type="text"  class="input-text character-url"/></dd></dl>\
                    <dl class="fd-clr"><dt>页面宽度:</dt><dd><input type="text" class="input-text page-width"/>&nbsp;px</dd></dl>\
                  </div>',
        //添加普通标签对话框模版
        newEventTag:'<div class="setting-list">\
                    <dl class="fd-clr"><dt>页面特征Url:</dt><dd><input type="text"  class="input-text page-width"/></dd></dl>\
                    <dl class="fd-clr"><dt>页面特征Url:</dt><dd><input type="text"  class="input-text page-width"/></dd></dl>\
                    <dl class="fd-clr"><dt>页面特征Url:</dt><dd><input type="text"  class="input-text page-width"/></dd></dl>\
                    <dl class="fd-clr"><dt>页面特征Url:</dt><dd><input type="text"  class="input-text page-width"/></dd></dl>\
                    <dl class="fd-clr"><dt>页面宽度:</dt><dd><input type="text" class="input-text page-width"/>&nbsp;px</dd></dl>\
                  </div>',
        //普通标签
        normalTag:'<div class="setting-list">\
                    <dl class="fd-clr"><dt>页面特征Url:</dt><dd>我不告诉你的一切的了</dd></dl>\
                    <dl class="fd-clr"><dt>页面宽度:</dt><dd>990&nbsp;px</dd></dl>\
                  </div>',
        //默认标题
        defaultTitle:'<span class="title">标签</span>\
                      <a href="#" class="button" data-button="expand">展开</a>\
                      <a href="#" class="button" data-button="delete">删除</a>\
                      <span href="#" class="resize-bar"></span>',
        //默认操作栏
        defaultOpbar:'<a href="#" class="button" data-button="confirm">确定</a>\
                      <a href="#" class="button" data-button="cancel">取消</a>',
        //标签操作栏
        tagOpbar:'<a href="#" class="button" data-button="edit">编辑</a>\
                  <a href="#" class="button" data-button="delete">删除</a>\
                  <a href="#" class="button" data-button="fold">收起</a>'
    };
})(Util);
