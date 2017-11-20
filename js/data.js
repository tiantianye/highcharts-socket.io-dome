/**
 * Created by zengping1 on 2016/7/4.
 */
/*const http=require('http');
const fs=require('fs');
const socketIo=require('socket.io');

var httpServer=http.createServer(function(req,res){
    fs.readFile(req.url.substring(1),function(err,data){
        if(err){
            res.write('404');
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    });
}).listen(8081);

var ws=socketIo.listen(httpServer);
var socketArr=[];
ws.on('connection',function(sock){
    console.log('有人来了');
    socketArr.push(sock);

    sock.on('msg',function(data){
        for(var i=0; i<sockArr.length; i++){
            if(sockArr[i]==sock)continue;
            sockArr[i].emit('msg2',data);
        }
    });
});*/

//获取图表数据
var PV_DATE={
    home:{
        'yesterday':[0,47,35,30,25,23,21,25,27,28,35,95,135,141,128,95,132,135,145,136,115,75,65,80,85,78,65,60],
        'today':    [0,47,35,30,25,23,21,25,27,28,35,95,135,141,128,72,120,129,130,125],
        'lastMinPV':15975,
        'todayTotalUV':4874501
    },
    list:{
        'yesterday':[0, 25, 10, 5, 3, 2, 1, 2, 3, 4, 10,35,60,74,78,75,55,58,75,80,83,75,43,45,58,68,60,38],
        'today':[0, 25, 10, 5, 3, 2, 1, 2, 3, 4, 10,35,60,72,74,34,32,30],
        'lastMinPV':8831,
        'todayTotalUV':725443
    },
    item:{
        'yesterday':[0, 150, 90, 80, 70, 60, 65, 75, 95, 250, 460,560,540,400,450,550,580,590,480,350,340,370,380,400,320,300,210,200],
        'today':[0, 150, 90, 80, 70, 60, 65, 75, 95, 250,450,550,530,300,280,270,260,255],
        'lastMinPV':'',
        'todayTotalUV':''
    },
    total:{
        'yesterday':[],
        'today':[]
    }
};

//计算总数据
for(var i=0; i<PV_DATE.home.yesterday.length; i++){
    var newYesItem,
        newTodItem,
        nowHour=COMMON_ACTION.getNowHour()+1;        //0-23时

    //今日—总数据
    if(i<nowHour){
        newTodItem=PV_DATE.home.today[i]+PV_DATE.list.today[i]+PV_DATE.item.today[i];
        PV_DATE.total.today.push(newTodItem);
    }
    //昨日—总数据
    newYesItem=PV_DATE.home.yesterday[i]+PV_DATE.list.yesterday[i]+PV_DATE.item.yesterday[i];
    PV_DATE.total.yesterday.push(newYesItem);
}
