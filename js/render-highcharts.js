$(function () {
    //运用websocket使数据实时同步（未完待续。。。。。。。。。。。。。。。。。）
    /*var sock=io.connect('ws://localhost:8081');

    //接收数据
    sock.on('msg2',function(){

    });*/

    //设置时间
    var timer=null,
        newDate={
            getDate:function(){
                var nowDate=new Date();

                var year=nowDate.getFullYear(),
                    mouth=nowDate.getMonth()+1,
                    date=nowDate.getDate(),

                    hour=nowDate.getHours(),
                    minute=nowDate.getMinutes(),
                    second=nowDate.getSeconds();

                return {
                    date: year+'年'+COMMON_ACTION.format(mouth)+'月'+COMMON_ACTION.format(date)+'日',
                    time: hour+':'+COMMON_ACTION.format(minute)+':'+COMMON_ACTION.format(second)
                };
            }
        };
    $('.title p').html(newDate.getDate().date+' '+newDate.getDate().time);
    clearInterval(timer);
    timer=setInterval(function(){
        $('.title p').html(newDate.getDate().date+' '+newDate.getDate().time);
    },1000);

    //渲染图表
    var xAxisArr=[];
    for(var i=0; i<25; i++){
        xAxisArr.push(i);
    }

    //获取实时PV，eg:123456 -> 123.456
    function getNowPv(pageType){
        var nowPV=PV_DATE[pageType].today[COMMON_ACTION.getNowHour()-1]+'0000';
        nowPV=COMMON_ACTION.formatNum(nowPV);
        return nowPV;
    }
    //获取上一分钟PV与今日累计UV
    function getPVData(pageType,pvType){
        var PV_DATA=PV_DATE[pageType][pvType];
        PV_DATA=COMMON_ACTION.formatNum(PV_DATA);
        return PV_DATA;
    }

    Highcharts.setOptions({
        //所有语言文字相关配置都设置在 lang 里
        lang:{                                                      // Highcharts中的文字可以通过Highcharts.setOptions.lang来设定，lang属于全局配置，对当前页面的所有图表有效
            //下载菜单
            contextButtonTitle:"图表导出菜单",                      // 图表导出菜单title
            downloadJPEG:"下载JPEG图片",
            downloadPDF:"下载PDF文件",
            downloadPNG:"下载PNG文件",
            downloadSVG:"下载SVG文件",
            printChart:"打印图表",
            drillUpText:"返回 {series.name}",

            //提示信息
            loading:"加载中",
            noData:"没有数据",

            //小数点、千分号、公制前缀
            decimalPoint:".",                                        // 小数点号，例如 12.50
            thousandsSep:",",                                        // 千分号，例如 12,000
            numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],  // 公制前缀，通过设置为null不显示12k，1.2M这种形式

            weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期天"],
            months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
            shortMonths: [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],

            //重置缩放比例按钮
            resetZoom: '重置',                                     // 按钮文字
            resetZoomTitle: '重置缩放比例'                         // 按钮Title
        },
        //时区
        global: {
            timezoneOffset: -8 * 60  // +8 时区修正方法
        }

        //小数点、千分号、公制前缀
        /*
         decimalPoint:".",                                        // 小数点号，例如 12.50
         thousandsSep:",",                                        // 千分号，例如 12,000
         numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],  // 公制前缀，通过设置为null不显示12k，1.2M这种形式
         */
    });
    //首页实时流量
    var maxY1=0;
    $('#container1').highcharts({
        //全局定义
        chart: {
            backgroundColor: 'none',
            type: 'line'
        },

        //标题
        title: {
            text: '首页实时流量',
            align:'left',         //文字水平对齐方式，有left、center、right可选
            x: 0,
            y:15,
            style: {                //可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
                color: '#b48a40',
                fontSize: "20px",
                fontWeight: "bold",
                fontStyle:'italic ',
                fontFamily: "微软雅黑"
            }
        },
        subtitle: {
            useHTML:true,
            text:'<span class="subtitle"><em>今日累计PV</em><b>'+getNowPv('home')+'</b></span><span class="subtitle2"><span><em>上一分钟PV：</em><i>'+getPVData('home','lastMinPV')+'</i></span><span><em>今日累计UV：</em><i>'+getPVData('home','todayTotalUV')+'</i></span></span>',
            align:'left',         //文字水平对齐方式，有left、center、right可选
            x: 10,
            y:40,
            style:{
                color:'#ebeafa',
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "微软雅黑"
            }
        },

        //坐标
        xAxis: {
            categories: xAxisArr,
            min: 0,                        // x轴坐标最少显示0个
            max: 24,                       // x轴坐标最多显示24个
            lineColor:'#2b3033',           //设置坐标轴本身的颜色

            //坐标邮标签（分类）
            labels:{
                //align: 'left',
                //x: -16,

                //坐标轴标签—文字样式
                style: {                //可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
                    color: '#c0c5c1',
                    fontSize: "12px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑"
                }
            },

            //坐标轴刻度
            tickLength:5,                  // 刻度线的长度，默认情况下x轴刻度高(tickLength属性)为5px，宽为1px；y轴宽为0px(也就是不显示刻度)
            tickWidth:1,                   // 刻度线的宽度
            tickColor:'#2b3033',           // 刻度线的颜色
            tickmarkPlacement:'between',   // 刻度线对齐方式，有between和on可选，默认是between
            tickInterval:1                 // 刻度间隔，是让坐标轴间隔多少个才显示刻度，Lables.step，是让坐标轴间隔多少个才显示刻度标签

        },
        yAxis: {
            lineWidth: 1,                  // y坐标轴默认lineWidth=0
            lineColor:'#2b3033',           // 设置坐标轴本身的颜色
            title: {
                text: null
            },

            //tickPositions:[0, 50, 100, 150, 200],        // Highcharts设置Y轴刻度
            labels:{
                //格式化Y轴刻度值
                formatter:function(){
                    if(this.value==0){                   // Y轴的0刻度不显示
                        return null;
                    }
                    return this.value+'万';
                },
                //坐标轴标签—文字样式
                style: {                // 可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
                    color: '#c0c5c1',
                    fontSize: "12px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑"
                }
            },

            //坐标轴刻度
            tickLength:5,                  // 刻度线的长度，默认情况下x轴刻度高(tickLength属性)为5px，宽为1px；y轴宽为0px(也就是不显示刻度)
            tickWidth:1,                   // 刻度线的宽度
            tickColor:'#2b3033',           // 刻度线的颜色
            //tickInterval:2,

            //坐标轴网格线
            gridLineWidth:0                // 网格线宽度，x轴默认为0，y轴默认为1px
        },

        //数据提示框
        tooltip: {
            //valueSuffix: '万',         // 后缀
            useHTML: true,
            headerFormat: '<table><tr><td>{series.name} {point.x}时</td></tr>',
            pointFormat: '<tr><td><b>{point.y}万</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },

        //图例
        legend: {
            //useHTML:true,
            //text:'<span class="legend"><span><em></em><i>今日</i></span><span><em></em><i>昨日</i></span></span>',            //怎么不起作用？？？
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0,
            reversed:true,              // 图例内容是否倒序
            y:90,

            //图例—文字样式
            itemStyle:{
                color: '#fff',
                fontSize: "12px",
                fontWeight: "normal",
                fontFamily: "微软雅黑"
            }
        },

        //版权信息
        credits:{
            enabled:false
        },

        //图表选项
        plotOptions: {
            line: {
                lineWidth: 3
            }
        },

        //数据列颜色
        colors: [ '#256aad','#fef23c'],

        //数据列
        series: [{
            name: '昨日',
            data: PV_DATE.home.yesterday
        },{
            name: '今日',
            data: PV_DATE.home.today.slice(0,COMMON_ACTION.getNowHour()+1),
            dataLabels: {                    // 数据标签（格式化）
                enabled: true,
                color:'#fff',
                allowOverlap:true,          // 允许重叠
                formatter: function() {     // 现在时间数据、今日最高
                    console.log('PV_DATE.home.today:'+PV_DATE.home.today);

                    if(this.x==COMMON_ACTION.getNowHour()){
                        this.y=this.y+'0000';
                    }else if( this.x==COMMON_ACTION.getArrMax(PV_DATE.home.today) ){
                        this.y=this.y+'0000';
                    }else{
                        this.y='';
                    }
                    return COMMON_ACTION.formatNum(this.y);
                }
            }
        }]
    });
    //列表页实时流量
    $('#container2').highcharts({
        //全局定义
        chart: {
            backgroundColor: 'none',
            type: 'line'
        },

        //标题
        title: {
            text: '列表页实时流量',
            align:'left',         //文字水平对齐方式，有left、center、right可选
            x: 0,
            y:15,
            style: {                //可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
                color: '#23b47b',
                fontSize: "20px",
                fontWeight: "bold",
                fontStyle:'italic ',
                fontFamily: "微软雅黑"
            }
        },
        subtitle: {
            useHTML:true,
            text:'<span class="subtitle"><em>今日累计PV</em><b>'+ getNowPv('list')+'</b></span><span class="subtitle2"><span><em>上一分钟PV：</em><i>'+getPVData('list','lastMinPV')+'</i></span><span><em>今日累计UV：</em><i>'+getPVData('list','todayTotalUV')+'</i></span></span>',
            align:'left',         //文字水平对齐方式，有left、center、right可选
            x: 10,
            y:40,
            style:{
                color:'#ebeafa',
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "微软雅黑"
            }
        },

        //坐标
        xAxis: {
            categories: xAxisArr,
            min: 0,                        // x轴坐标最少显示0个
            max: 24,                       // x轴坐标最多显示24个
            lineColor:'#2b3033',           //设置坐标轴本身的颜色

            //坐标邮标签（分类）
            labels:{
                //align: 'left',
                //x: -16,

                //坐标轴标签—文字样式
                style: {                //可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
                    color: '#c0c5c1',
                    fontSize: "12px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑"
                }
            },

            //坐标轴刻度
            tickLength:5,                  // 刻度线的长度，默认情况下x轴刻度高(tickLength属性)为5px，宽为1px；y轴宽为0px(也就是不显示刻度)
            tickWidth:1,                   // 刻度线的宽度
            tickColor:'#2b3033',           // 刻度线的颜色
            tickmarkPlacement:'between',   // 刻度线对齐方式，有between和on可选，默认是between
            tickInterval:1                 // 刻度间隔，是让坐标轴间隔多少个才显示刻度，Lables.step，是让坐标轴间隔多少个才显示刻度标签

        },
        yAxis: {
            lineWidth: 1,                  // y坐标轴默认lineWidth=0
            lineColor:'#2b3033',           // 设置坐标轴本身的颜色
            title: {
                text: null
            },

            //tickPositions:[0, 50, 100, 150, 200],        // Highcharts设置Y轴刻度
            labels:{
                //格式化Y轴刻度值
                formatter:function(){
                    if(this.value==0){                   // Y轴的0刻度不显示
                        return null;
                    }
                    return this.value+'万';
                },
                //坐标轴标签—文字样式
                style: {                // 可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
                    color: '#c0c5c1',
                    fontSize: "12px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑"
                }
            },

            //坐标轴刻度
            tickLength:5,                  // 刻度线的长度，默认情况下x轴刻度高(tickLength属性)为5px，宽为1px；y轴宽为0px(也就是不显示刻度)
            tickWidth:1,                   // 刻度线的宽度
            tickColor:'#2b3033',           // 刻度线的颜色
            //tickInterval:2,

            //坐标轴网格线
            gridLineWidth:0                // 网格线宽度，x轴默认为0，y轴默认为1px


        },

        //数据提示框
        tooltip: {
            //valueSuffix: '万',         // 后缀
            useHTML: true,
            headerFormat: '<table><tr><td>{series.name} {point.x}时</td></tr>',
            pointFormat: '<tr><td><b>{point.y}万</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },

        //图例
        legend: {
            //useHTML:true,
            //text:'<span class="legend"><span><em></em><i>今日</i></span><span><em></em><i>昨日</i></span></span>',            //怎么不起作用？？？
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0,
            reversed:true,              // 图例内容是否倒序
            y:90,

            //图例—文字样式
            itemStyle:{
                color: '#fff',
                fontSize: "12px",
                fontWeight: "normal",
                fontFamily: "微软雅黑"
            }
        },

        //版权信息
        credits:{
            enabled:false
        },

        //图表选项
        plotOptions: {
            line: {
                lineWidth: 3
            }
        },
        //数据列颜色
        colors: [ '#256aad','#23b47b'],
        //数据列
        series: [{
            name: '昨日',
            data: PV_DATE.list.yesterday
        },{
            name: '今日',
            data: PV_DATE.list.today.slice(0,COMMON_ACTION.getNowHour()+1),
            dataLabels: {                    // 数据标签（格式化）
                enabled: true,
                color:'#fff',
                allowOverlap:true,          // 允许重叠
                formatter: function() {     // 现在时间数据、今日最高
                    console.log('PV_DATE.list.today:'+PV_DATE.list.today);

                    if(this.x==COMMON_ACTION.getNowHour()){
                        this.y=this.y+'0000';
                    }else if( this.x==COMMON_ACTION.getArrMax(PV_DATE.list.today) ){
                        this.y=this.y+'0000';
                    }else{
                        this.y='';
                    }
                    return COMMON_ACTION.formatNum(this.y);
                }
            }
        }]
    });
    //首页 列表页 内容页综合数据
    $('#container3').highcharts({
        //全局定义
        chart: {
            backgroundColor: 'rgba(6,25,68,0.18)',
            type: 'area'
        },

        //标题
        title: {
            text: '首页 列表页 内容页综合数据',
            align:'left',         //文字水平对齐方式，有left、center、right可选
            x: 0,
            y:15,
            style: {                //可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
                color: '#fde948',
                fontSize: "20px",
                fontWeight: "bold",
                fontStyle:'italic ',
                fontFamily: "微软雅黑"
            }
        },
        subtitle: {
            useHTML:true,
            text:'<span class="subtitle"><em>今日累计PV</em><b>'+getNowPv('total')+'</b></span>',
            align:'left',         //文字水平对齐方式，有left、center、right可选
            x: 10,
            y:55,
            style:{
                color:'#ebeafa',
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "微软雅黑"
            }
        },

        //坐标
        xAxis: {
            categories: xAxisArr,
            min: 0,                        // x轴坐标最少显示0个
            max: 24,                       // x轴坐标最多显示24个
            lineColor:'#2b3033',           //设置坐标轴本身的颜色

            //坐标邮标签（分类）
            labels:{
                //align: 'left',
                //x: -16,

                //坐标轴标签—文字样式
                style: {                //可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
                    color: '#c0c5c1',
                    fontSize: "12px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑"
                }
            },

            //坐标轴刻度
            tickLength:5,                  // 刻度线的长度，默认情况下x轴刻度高(tickLength属性)为5px，宽为1px；y轴宽为0px(也就是不显示刻度)
            tickWidth:1,                   // 刻度线的宽度
            tickColor:'#2b3033',           // 刻度线的颜色
            tickmarkPlacement:'between',   // 刻度线对齐方式，有between和on可选，默认是between
            tickInterval:1                 // 刻度间隔，是让坐标轴间隔多少个才显示刻度，Lables.step，是让坐标轴间隔多少个才显示刻度标签
        },
        yAxis: {
            lineWidth: 1,                  // y坐标轴默认lineWidth=0
            lineColor:'#2b3033',           // 设置坐标轴本身的颜色
            title: {
                text: null
            },

            tickPositions:[0,100, 200, 300, 400, 500,600,700,800,900],        // Highcharts设置Y轴刻度
            labels:{
                //格式化Y轴刻度值
                formatter:function(){
                    if(this.value==0){                   // Y轴的0刻度不显示
                        return null;
                    }
                    return this.value+'万';
                },
                //坐标轴标签—文字样式
                style: {                // 可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
                    color: '#c0c5c1',
                    fontSize: "12px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑"
                }
            },

            //坐标轴刻度
            tickLength:5,                  // 刻度线的长度，默认情况下x轴刻度高(tickLength属性)为5px，宽为1px；y轴宽为0px(也就是不显示刻度)
            tickWidth:1,                   // 刻度线的宽度
            tickColor:'#2b3033',           // 刻度线的颜色
            //tickInterval:2,

            //坐标轴网格线
            gridLineWidth:0                // 网格线宽度，x轴默认为0，y轴默认为1px
        },

        //数据提示框
        tooltip: {
            //valueSuffix: '万',         // 后缀
            useHTML: true,
            headerFormat: '<table><tr><td>{series.name} {point.x}时</td></tr>',
            pointFormat: '<tr><td><b>{point.y}万</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },

        //图例
        legend: {
            //useHTML:true,
            //text:'<span class="legend"><span><em></em><i>今日</i></span><span><em></em><i>昨日</i></span></span>',            //怎么不起作用？？？
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0,
            reversed:true,              // 图例内容是否倒序
            y:90,

            //图例—文字样式
            itemStyle:{
                color: '#fff',
                fontSize: "12px",
                fontWeight: "normal",
                fontFamily: "微软雅黑"
            }
        },

        //版权信息
        credits:{
            enabled:false
        },

        //图表选项
        plotOptions: {
            area: {
                /*fillColor: {
                     linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                     stops: [
                         [0, '#fe28ae'],
                         [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                     ]
                 },*/
                lineWidth: 3,
                marker: {
                    enabled: true
                },
                threshold: null
            }
        },
        //数据列颜色
        colors: [ '#256aad','#fe28ae'],
        //数据列
        series: [{
            name: '昨日',
            data: PV_DATE.total.yesterday,
            fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                    [0, '#1f5a92'],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            }
        },{
            name: '今日',
            data: PV_DATE.total.today.slice(0,COMMON_ACTION.getNowHour()+1),
            fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                    [0, '#ce228e'],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            },
            dataLabels: {                    // 数据标签（格式化）
                enabled: true,
                color:'#fff',
                allowOverlap:true,          // 允许重叠
                formatter: function() {     // 现在时间数据、今日最高
                    console.log('PV_DATE.total.today:'+PV_DATE.total.today);

                    if(this.x==COMMON_ACTION.getNowHour()){
                        this.y=this.y+'0000';
                    }else if( this.x==COMMON_ACTION.getArrMax(PV_DATE.total.today) ){
                        this.y=this.y+'0000';
                    }else{
                        this.y='';
                    }
                    return COMMON_ACTION.formatNum(this.y);
                }
            }
        }]
    });
    //内容页实时流量
    $('#container4').highcharts({
        //全局定义
        chart: {
            backgroundColor: 'none',
            type: 'line'
        },

        //标题
        title: {
            text: '内容页实时流量',
            align:'left',         //文字水平对齐方式，有left、center、right可选
            x: 0,
            y:15,
            style: {                //可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
                color: '#fb395e',
                fontSize: "20px",
                fontWeight: "bold",
                fontStyle:'italic ',
                fontFamily: "微软雅黑"
            }
        },
        subtitle: {
            useHTML:true,
            text:'<span class="subtitle"><em>今日累计PV</em><b>'+getNowPv('item')+'</b></span><span class="subtitle2"><span><em>上一分钟PV：</em><i>'+getPVData('item','lastMinPV')+'</i></span><span><em>今日累计UV：</em><i>'+getPVData('item','todayTotalUV')+'</i></span></span>',
            align:'left',         //文字水平对齐方式，有left、center、right可选
            x: 10,
            y:40,
            style:{
                color:'#ebeafa',
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "微软雅黑"
            }
        },

        //坐标
        xAxis: {
            categories: xAxisArr,
            min: 0,                        // x轴坐标最少显示0个
            max: 24,                       // x轴坐标最多显示24个
            lineColor:'#2b3033',           //设置坐标轴本身的颜色

            //坐标邮标签（分类）
            labels:{
                //align: 'left',
                //x: -16,

                //坐标轴标签—文字样式
                style: {                //可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
                    color: '#c0c5c1',
                    fontSize: "12px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑"
                }
            },

            //坐标轴刻度
            tickLength:5,                  // 刻度线的长度，默认情况下x轴刻度高(tickLength属性)为5px，宽为1px；y轴宽为0px(也就是不显示刻度)
            tickWidth:1,                   // 刻度线的宽度
            tickColor:'#2b3033',           // 刻度线的颜色
            tickmarkPlacement:'between',   // 刻度线对齐方式，有between和on可选，默认是between
            tickInterval:1                 // 刻度间隔，是让坐标轴间隔多少个才显示刻度，Lables.step，是让坐标轴间隔多少个才显示刻度标签

        },
        yAxis: {
            lineWidth: 1,                  // y坐标轴默认lineWidth=0
            lineColor:'#2b3033',           // 设置坐标轴本身的颜色
            title: {
                text: null
            },

            //tickPositions:[0, 50, 100, 150, 200],        // Highcharts设置Y轴刻度
            labels:{
                //格式化Y轴刻度值
                formatter:function(){
                    if(this.value==0){                   // Y轴的0刻度不显示
                        return null;
                    }
                    return this.value+'万';
                },
                //坐标轴标签—文字样式
                style: {                // 可以设置文字颜色、字体、字号，注意和css有略微的不同，例如font-size用fontSize、font-family用fontFamily表示
                    color: '#c0c5c1',
                    fontSize: "12px",
                    fontWeight: "normal",
                    fontFamily: "微软雅黑"
                }
            },

            //坐标轴刻度
            tickLength:5,                  // 刻度线的长度，默认情况下x轴刻度高(tickLength属性)为5px，宽为1px；y轴宽为0px(也就是不显示刻度)
            tickWidth:1,                   // 刻度线的宽度
            tickColor:'#2b3033',           // 刻度线的颜色
            //tickInterval:2,

            //坐标轴网格线
            gridLineWidth:0                // 网格线宽度，x轴默认为0，y轴默认为1px


        },

        //数据提示框
        tooltip: {
            //valueSuffix: '万',         // 后缀
            useHTML: true,
            headerFormat: '<table><tr><td>{series.name} {point.x}时</td></tr>',
            pointFormat: '<tr><td><b>{point.y}万</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },

        //图例
        legend: {
            //useHTML:true,
            //text:'<span class="legend"><span><em></em><i>今日</i></span><span><em></em><i>昨日</i></span></span>',            //怎么不起作用？？？
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0,
            reversed:true,              // 图例内容是否倒序
            y:90,

            //图例—文字样式
            itemStyle:{
                color: '#fff',
                fontSize: "12px",
                fontWeight: "normal",
                fontFamily: "微软雅黑"
            }
        },

        //版权信息
        credits:{
            enabled:false
        },

        //图表选项
        plotOptions: {
            line: {
                lineWidth: 3
            }
        },
        //数据列颜色
        colors: [ '#256aad','#fb395e'],
        //数据列
        series: [{
            name: '昨日',
            data: PV_DATE.item.yesterday
        },{
            name: '今日',
            data: PV_DATE.item.today.slice(0,COMMON_ACTION.getNowHour()+1),
            dataLabels: {                    // 数据标签（格式化）
                enabled: true,
                color:'#fff',
                allowOverlap:true,          // 是否允许数据标签重叠(当数据标签比较长，或比较多的时候，highchart会根据label的长度和点的个数来决定自动隐藏，如果将它设置成true，则允许数据标签重叠，即强制让它显示出来)
                formatter: function() {     // 现在时间数据、今日最高
                    if(this.x==COMMON_ACTION.getNowHour()){
                        this.y=this.y+'0000';
                    }else if( this.x==COMMON_ACTION.getArrMax(PV_DATE.item.today) ){
                        this.y=this.y+'0000';
                    }else{
                        this.y='';
                    }

                    return COMMON_ACTION.formatNum(this.y);
                }
            }
        }]
    });
});


