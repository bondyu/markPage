/******************************
 *存储所有的数据 
 **********************/
(function(Tool){
    Tool.Data={
        //页面级参数
        page:{
            box:null,   //容器
            width:960,  //页面宽度
            charater:'',  //页面特征Url
            feature:'',//如果存在tab的话
            tabFeature:'',//当前选中的特征值
            condition:'',//页面出现条件
            title:''//页面名称
        },
        //事件标签
        eventTags:[],
        //普通标签
        normalTags:[]
    };
})(Util);
