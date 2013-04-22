(function(Tool){
    Tool.Template={
        //普通对话框的基本模版
        dialog:'<div class="pmdialog">\
                <h2 class="header">默认标题</h2>\
                <div class="content">默认内容</div>\
                <div class="footer fd-clr">\
                    <div class="fd-right panel">\
                        <a href="#" class="button" data-button="confirm">确定</a>\
                        <a href="#" class="button" data-button="close">取消</a>\
                    </div>\
                </div>\
             </div>',
        shim:'<div class="pmshim"></div>',
        //工具条的模版
        toolbar:'<div class="toolbar">\
                    <div class="op-panel">\
                        <a class="button initmarks" href="#">展示标签</a>\
                        <a class="button hidemarks" href="#">隐藏所有标签</a>\
                        <a class="button set-page-paras" href="#">设置页面参数</a>\
                    </div>\
                 </div>',
        //页面设置对话框模版
        pageSettingDialog:'<div class="setting-list">\
                    <dl class="fd-clr"><dt>页面名称:</dt><dd><input type="text" value="" data-key="title" class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>页面特征Url:</dt><dd><input type="text"  data-key="charater"  readonly="readonly" class="input-text tag-key character-url"/></dd></dl>\
                    <dl class="fd-clr"><dt>页面宽度:</dt><dd><input type="text" data-key="width" class="input-text tag-key"/>&nbsp;px</dd></dl>\
                    <dl class="fd-clr"><dt>页面Tab特征值:</dt><dd><input type="text" placeholder="如果有多tab的时候填写，用,分割" data-key="feature"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>页面出现条件:</dt><dd><input type="text" data-key="condition" class="input-text tag-key"/></dd></dl>\
                  </div>',
        //添加普通标签对话框模版
                 
        newNormalTag:'<div class="setting-list normal-tag-setting" style="width:350px;">\
                    <input type="hidden" data-key="isEvent" class="input-text tag-key" value="false"/>\
                    <dl class="fd-clr"><dt>标签名称:</dt><dd><input type="text" data-key="title"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>数据源:</dt><dd><input type="text"  data-key="dataSource"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>规则:</dt><dd><input type="text"  data-key="rule"  class="input-text tag-key input-expandable"/></dd></dl>\
                    <dl class="fd-clr"><dt>服务化名称:</dt><dd><input type="text"  data-key="serviceName"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>方法名称:</dt><dd><input type="text"  data-key="methodName"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>接口名称:</dt><dd><input type="text"  data-key="interfaceName"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>测试用例:</dt><dd><input type="text"  data-key="testCase"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>雷区:</dt><dd><input type="text"  data-key="bugs"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>开发&测试负责人:</dt><dd><input type="text"  data-key="coder"  class="input-text tag-key"/></dd></dl>\
                  </div>',
        //添加普通标签对话框模版
        newEventTag:'<div class="setting-list event-tag-setting"  style="width:350px;">\
                    <input type="hidden" data-key="isEvent" class="input-text tag-key" value="true"/>\
                    <dl class="fd-clr"><dt>标签名称:</dt><dd><input type="text"  data-key="title"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>当前元素选择器:</dt><dd><input type="text"  data-key="selector"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>事件类型:</dt><dd><input type="text"   data-key="eventType" class="input-text tag-key"/></dd></dl>\
                  </div>',
        //事件标签
        eventTag:'<div class="setting-list tag-detail event-tag-detail">\
                    <dl class="fd-clr"><dt>标签名称:</dt><dd><span class="tag-key"  data-key="title"></span></dd></dl>\
                    <dl class="fd-clr"><dt>当前元素选择器:</dt><dd><span class="tag-key"  data-key="selector"></span></dd></dl>\
                    <dl class="fd-clr"><dt>事件类型:</dt><dd><span class="tag-key"  data-key="eventType"></span></dd></dl>\
                  </div>',
        //普通标签
        normalTag:'<div class="setting-list tag-detail normal-tag-detail">\
                    <dl class="fd-clr"><dt>标签名称:</dt><dd><span class="tag-key" data-key="title"></span></dd></dl>\
                    <dl class="fd-clr"><dt>数据源:</dt><dd><span class="tag-key"  data-key="dataSource"></span></dd></dl>\
                    <dl class="fd-clr"><dt>规则:</dt><dd><span class="tag-key"  data-key="rule"></span></dd></dl>\
                    <dl class="fd-clr"><dt>服务化名称:</dt><dd><span class="tag-key"  data-key="serviceName"></span></dd></dl>\
                    <dl class="fd-clr"><dt>方法名称:</dt><dd><span class="tag-key"  data-key="methodName"></span></dd></dl>\
                    <dl class="fd-clr"><dt>接口名称:</dt><dd><span class="tag-key"  data-key="interfaceName"></span></dd></dl>\
                    <dl class="fd-clr"><dt>测试用例:</dt><dd><span class="tag-key"  data-key="testCase"></span></dd></dl>\
                    <dl class="fd-clr"><dt>雷区:</dt><dd><span class="tag-key"  data-key="bugs"></span></dd></dl>\
                    <dl class="fd-clr"><dt>开发&测试负责人:</dt><dd><span class="tag-key"  data-key="coder"></span></dd></dl>\
                  </div>',
        //默认标题
        defaultTitle:'<span class="title tag-key" data-key="title">标签</span>\
                      <a href="#" class="button" data-button="expand">展开</a>\
                      <a href="#" class="button" data-button="delete">删除</a>\
                      <span href="#" class="resize-bar">&#47;&#47;</span>',
        //默认操作栏
        defaultOpbar:'<a href="#" class="button" data-button="confirm">确定</a>\
                      <a href="#" class="button" data-button="cancel">取消</a>',
        //标签操作栏
        tagOpbar:'<a href="#" class="button" data-button="edit">编辑</a>\
                  <a href="#" class="button" data-button="delete">删除</a>\
                  <a href="#" class="button" data-button="fold">收起</a>',
        //选择tab特征值
        featureDialog:'<div class="setting-list choose-tab-feature">\
                        <dl class="fd-clr"><dt>选择Tab特征值:</dt><dd><select class="tab-features"></select></dd></dl>\
                      </div>'
    };
})(Util);
