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
        newNormalTag:'<div class="setting-list">\
                    <dl class="fd-clr"><dt>ҳ������Url:</dt><dd><input type="text"  class="input-text character-url"/></dd></dl>\
                    <dl class="fd-clr"><dt>ҳ������Url:</dt><dd><input type="text"  class="input-text character-url"/></dd></dl>\
                    <dl class="fd-clr"><dt>ҳ������Url:</dt><dd><input type="text"  class="input-text character-url"/></dd></dl>\
                    <dl class="fd-clr"><dt>ҳ������Url:</dt><dd><input type="text"  class="input-text character-url"/></dd></dl>\
                    <dl class="fd-clr"><dt>ҳ����:</dt><dd><input type="text" class="input-text page-width"/>&nbsp;px</dd></dl>\
                  </div>',
        //�����ͨ��ǩ�Ի���ģ��
        newEventTag:'<div class="setting-list">\
                    <dl class="fd-clr"><dt>ҳ������Url:</dt><dd><input type="text"  class="input-text page-width"/></dd></dl>\
                    <dl class="fd-clr"><dt>ҳ������Url:</dt><dd><input type="text"  class="input-text page-width"/></dd></dl>\
                    <dl class="fd-clr"><dt>ҳ������Url:</dt><dd><input type="text"  class="input-text page-width"/></dd></dl>\
                    <dl class="fd-clr"><dt>ҳ������Url:</dt><dd><input type="text"  class="input-text page-width"/></dd></dl>\
                    <dl class="fd-clr"><dt>ҳ����:</dt><dd><input type="text" class="input-text page-width"/>&nbsp;px</dd></dl>\
                  </div>',
        //��ͨ��ǩ
        normalTag:'<div class="setting-list">\
                    <dl class="fd-clr"><dt>ҳ������Url:</dt><dd>�Ҳ��������һ�е���</dd></dl>\
                    <dl class="fd-clr"><dt>ҳ����:</dt><dd>990&nbsp;px</dd></dl>\
                  </div>',
        //Ĭ�ϲ�����
        defaultOpbar:'<a href="#" class="button" data-button="confirm">ȷ��</a>\
                      <a href="#" class="button" data-button="cancel">ȡ��</a>',
        //��ǩ������
        tagOpbar:'<a href="#" class="button" data-button="edit">�༭</a>\
                  <a href="#" class="button" data-button="delete">ɾ��</a>\
                  <a href="#" class="button" data-button="fold">����</a>'
    };
})(Util);
