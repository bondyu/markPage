(function(Tool){
    Tool.Template={
        //��ͨ�Ի���Ļ���ģ��
        dialog:'<div class="dialog">\
                <h2 class="header">Ĭ�ϱ���</h2>\
                <div class="content">Ĭ������</div>\
                <div class="footer fd-clr">\
                    <div class="fd-right panel">\
                        <a href="#" class="button" data-button="confirm">ȷ��</a>\
                        <a href="#" class="button" data-button="close">ȡ��</a>\
                    </div>\
                </div>\
             </div>',
        //��������ģ��
        toolbar:'<div class="toolbar">\
                    <div class="op-panel">\
                        <a class="button initmarks" href="#">չʾ���б�ǩ</a>\
                        <a class="button hidemarks" href="#">�������б�ǩ</a>\
                        <a class="button set-page-paras" href="#">����ҳ�����</a>\
                    </div>\
                 </div>',
        //ҳ�����öԻ���ģ��
        pageSettingDialog:'<div class="setting-list">\
                    <dl class="fd-clr"><dt>ҳ������Url:</dt><dd><input type="text" readonly="readonly" class="input-text character-url"/></dd></dl>\
                    <dl class="fd-clr"><dt>ҳ����:</dt><dd><input type="text" class="input-text page-width"/>&nbsp;px</dd></dl>\
                  </div>',
        //�����ͨ��ǩ�Ի���ģ��
        newNormalTag:'<div class="setting-list normal-tag-setting">\
                    <input type="hidden" data-key="isEvent" class="tag-key" value="false"/>\
                    <dl class="fd-clr"><dt>��ǩ����:</dt><dd><input type="text" data-key="title"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>Ԫ��ѡ����:</dt><dd><input type="text"   data-key="selector" class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>����Դ:</dt><dd><input type="text"  data-key="dataSource"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>����:</dt><dd><input type="text"  data-key="rule"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>service:</dt><dd><input type="text"  data-key="service"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>��������:</dt><dd><input type="text"  data-key="testCase"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>����:</dt><dd><input type="text"  data-key="bugs"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>����&���Ը�����:</dt><dd><input type="text"  data-key="coder"  class="input-text tag-key"/></dd></dl>\
                  </div>',
        //�����ͨ��ǩ�Ի���ģ��
        newEventTag:'<div class="setting-list event-tag-setting">\
                    <input type="hidden" data-key="isEvent" class="tag-key" value="true"/>\
                    <dl class="fd-clr"><dt>��ǩ����:</dt><dd><input type="text"  data-key="title"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>����������ʶ:</dt><dd><input type="text"   data-key="charater" class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>��ǰԪ��ѡ����:</dt><dd><input type="text"  data-key="selector"  class="input-text tag-key"/></dd></dl>\
                    <dl class="fd-clr"><dt>�¼�����:</dt><dd><input type="text"   data-key="eventType" class="input-text tag-key"/></dd></dl>\
                  </div>',
        //�¼���ǩ
        eventTag:'<div class="setting-list event-tag-detail">\
                    <dl class="fd-clr"><dt>��ǩ����:</dt><dd><span class="tag-key"  data-key="title"></span></dd></dl>\
                    <dl class="fd-clr"><dt>����������ʶ:</dt><dd><span class="tag-key"  data-key="charater"></span></dd></dl>\
                    <dl class="fd-clr"><dt>��ǰԪ��ѡ����:</dt><dd><span class="tag-key"  data-key="selector"></span></dd></dl>\
                    <dl class="fd-clr"><dt>�¼�����:</dt><dd><span class="tag-key"  data-key="eventType"></span></dd></dl>\
                  </div>',
        //��ͨ��ǩ
        normalTag:'<div class="setting-list normal-tag-setting">\
                    <dl class="fd-clr"><dt>��ǩ����:</dt><dd><span class="tag-key" data-key="title"></span></dd></dl>\
                    <dl class="fd-clr"><dt>Ԫ��ѡ����:</dt><dd><span class="tag-key"  data-key="selector"></span></dd></dl>\
                    <dl class="fd-clr"><dt>����Դ:</dt><dd><span class="tag-key"  data-key="dataSource"></span></dd></dl>\
                    <dl class="fd-clr"><dt>����:</dt><dd><span class="tag-key"  data-key="rule"></span></dd></dl>\
                    <dl class="fd-clr"><dt>service:</dt><dd><span class="tag-key"  data-key="service"></span></dd></dl>\
                    <dl class="fd-clr"><dt>��������:</dt><dd><span class="tag-key"  data-key="testCase"></span></dd></dl>\
                    <dl class="fd-clr"><dt>����:</dt><dd><span class="tag-key"  data-key="bugs"></span></dd></dl>\
                    <dl class="fd-clr"><dt>����&���Ը�����:</dt><dd><span class="tag-key"  data-key="coder"></span></dd></dl>\
                  </div>',
        //Ĭ�ϱ���
        defaultTitle:'<span class="title tag-key" data-key="title">��ǩ</span>\
                      <a href="#" class="button" data-button="expand">չ��</a>\
                      <a href="#" class="button" data-button="delete">ɾ��</a>\
                      <span href="#" class="resize-bar">&#47;&#47;</span>',
        //Ĭ�ϲ�����
        defaultOpbar:'<a href="#" class="button" data-button="confirm">ȷ��</a>\
                      <a href="#" class="button" data-button="cancel">ȡ��</a>',
        //��ǩ������
        tagOpbar:'<a href="#" class="button" data-button="edit">�༭</a>\
                  <a href="#" class="button" data-button="delete">ɾ��</a>\
                  <a href="#" class="button" data-button="fold">����</a>'
    };
})(Util);
