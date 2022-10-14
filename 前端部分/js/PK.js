// 常驻功能区
// 1，回合控制
// 轮次标识
let flag = 0;
let players = ["A","B"];
let player;
let useAI = [0,0];
if($("title").text() === "PVN"){
    useAI=[0,1];
    $(".B > .avatar").css(
        "background-image","url(https://img.js.design/assets/img/6335a7e190e635c199af0e22.png#09c6156ed72fe1798e7674b2dba98648)"
    );
    $(".B > .name > span").text("机器人");
} else {
    $("#giveUp").css("display","none");
    $("#AI").css("display","none");
}
// 提示文本
let tips = ["你的回合，请投掷骰子","对方回合，请等待..."];

function startRound(){
    // 1，调用计时器
    value = 60;
    init();
    console.log(flag);
    // 2，判别玩家
    player = players[flag];
    // 3，初始化双方提示文本
    $(".A > .tip span").text(tips[flag]);
    $(".B > .tip span").text(tips[1 - flag]);
    // 4，若为托管状态则进入此代码块
    if(useAI[flag]){
        setTimeout(ai, 200);
    }
}
// 2，掷骰
// 双方棋盘内点数值
let points = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]];
// 骰子点数对应样式
let pointArr = [
    "./img/1.png",
    "./img/2.png",
    "./img/3.png",
    "./img/4.png",
    "./img/5.png",
    "./img/6.png",
];
// 当前掷出点数
let CurrPoint = null;
let ind = -1;
let CurrMove = null;

$("#aButton").click(function (){
    // 合法性检测
    if(flag !== 0 || CurrPoint !== null){return;}
    // 随机数生成本轮骰子点数
    ind = Math.floor(Math.random()*6);
    CurrPoint = pointArr[ind];
    // 展示区改变样例
    $("#aShow").css({
        "background-image": "url("+CurrPoint+")",
        "background-size":"100% 100%"
    })
    $(".A > .tip span").text("投掷点数为"+(ind+1)+",请选择落子位置！");
})

$("#bButton").click(function (){
    // 合法性检测
    if(flag !== 1 || CurrPoint !== null){return;}
    // 随机数生成本轮骰子点数
    ind = Math.floor(Math.random()*6);
    CurrPoint = pointArr[ind];
    // 展示区改变样例
    $("#bShow").css({
        "background-image": "url("+CurrPoint+")",
        "background-size":"100% 100%"
    })
    $(".B > .tip span").text("投掷点数为"+(ind+1)+",请选择落子位置！");
})
// 3，落子
$("li").click(function (){
    // 判断点击对象落子合法性
    let targetName = $(this).attr("id");
    if(player !== targetName[0]){ return;} // 控制权检验
    let col = parseInt(targetName[1]) - 1;
    let hasValue = points[flag][col] !== 0;
    let hasFront = false;
    for(let i = col-1; i >= Math.floor(col/3)*3; i--){
        if(points[flag][i] === 0){
            hasFront = true;
            break;
        }
    }
    if(hasValue || hasFront){ return;} // 次序检验
    // 若已掷骰完毕且未放置，进入该逻辑块
    if (CurrPoint != null){
        // 1，在指定区域显示骰子
        $(this).css({
            "background-image":"url("+CurrPoint+")",
            "background-size":"70% 70%",
            "background-repeat":"no-repeat",
            "background-position":"center center"
        })
        // 2，获取信息并更改相关值
        let line = "";
        if (col < 3){ // 提示文本值
            line = "K";
        } else if (col < 6){
            line = "E";
        } else{
            line = "X";
        }
        points[flag][col] = ind+1; // 点数数组内值
        console.log(points);       // 向控制台输出更新的点数信息
        $(this).attr("value",ind+1); // 改变选中li的value
        CurrMove = col;  // 将落点提供给全局变量以便进行吃子操作(0~8)
        // 3，修改提示文本
        $("." + player + " > .tip span").text("落子于"+line+"线，回合结束！");
        // 4，将展示区骰子置空
        $("#"+player.toString().toLowerCase()+"Show").css({
            "background-image":"none",
        })
        // 5，落子结束后判断对对方棋盘有无影响，有则消除
        eat();
        // 6，判断当前落子对对局的影响，若已无剩余位置，则结束对局
        if(!points[flag].includes(0)){
            gameOver();
            return ;
        }
        // 7，把当前骰子属性置空，防止落子多处
        CurrPoint = null;
        ind = -1;
        // 8，交换回合标记
        flag = 1 - flag;
        // 9，交换回合控制权并提前告知计时器终止
        window.clearInterval(timer);
        startRound();
    }
})
// 4，吃子
function eat(){
    let enemy = "B";
    if (flag%2){ enemy = "A";}
    let begin;
    if(CurrMove < 3){
        begin = 1;
    } else if(CurrMove < 6){
        begin = 4;
    } else{
        begin = 7;
    }
    console.log("目标清除区间及我方实际点数："+enemy+'('+begin+'~'+(begin+2)+'),'+(ind+1));
    for(let i = begin; i < begin + 3; i++){
        let target = $("#"+enemy+i);
        console.log("当前目标："+enemy+i+",其属性值为："+target.attr("value"));
        if(target.attr("value") == ind+1 ){
            console.log("发现敌方相同目标，立即进行击杀！");
            target.css({
                "background-image":"none"
            })
            points[1-flag][i-1] = 0;
            target.attr("value",0);
        }
    }
}
// 5，计时系统
let value;
var timer;

function init(){
    cutdowns("timeValue",value);
}
function cutdowns(divId,value){
    timer = window.setInterval(function(){
        value--;
        let s=parseInt(value);
        document.getElementById(divId).innerHTML=myFormat(s);

        if(value === 0){
            window.clearInterval(timer);
            // 强制为当前回合玩家随机落子
        }
    },1000);
}
function myFormat(sec){
    if(sec<10){
        sec="0"+sec;
    }
    return sec;
}
// 6，选择高亮
$("li").hover(function(){
    let targetName = $(this).attr("id");
    if(player !== targetName[0]){ return;}
    let col = parseInt(targetName[1]) - 1;
    let hasValue = points[flag][col] !== 0;
    let hasFront = false;
    for(let i = col-1; i >= Math.floor(col/3)*3; i--){
        if(points[flag][i] === 0){
            hasFront = true;
            break;
        }
    }
    if(hasValue || hasFront){ return;}
    $(this).css("box-shadow","0 0 100px gold");
},function(){
    $(this).css("box-shadow","none");
});


// 7，对局结束处理
function gameOver(){
    setTimeout(function(){
        $(".PK").css("display","none");
        $("#countScore").fadeIn(500);
    },500)
    let aPoint = myCount(points[0]);
    let bPoint = myCount(points[1]);
    let states = ["win","draw","lose"];
    let aState;
    let bState;
    $(".A > .score").text("得分："+aPoint);
    $(".B > .score").text("得分："+bPoint);
    if( aPoint < bPoint){
        aState = states[2];
        bState = states[0];
    } else if( aPoint === bPoint){
        aState = states[1];
        bState = states[1];
    } else {
        aState = states[0];
        bState = states[2];
    }
    $("#countScore > .A > .state").text(aState);
    $("#countScore > .B > .state").text(bState);
    $("#countScore > .A > .state").css(
        "color", "rgba(29, 5, 250, 1)"
    )
    $("#countScore > .B > .state").css(
        "color", "rgb(239, 11, 11)"
    )
}
// 8，得分计算函数
function myCount(arr){
    let SUM = 0;
    for(let i = 0; i < 3; i++){
        let same = [0,0,0,0,0,0,0];
        for(let j=3*i;j<3*i+3;j++){
            same[arr[j]] += 1;
        }
        for(let index in same){
            SUM += index*(same[index]**2);
        }
    }
    return SUM;
}
// 9，弹窗
$(function(){
    $("#giveUp").click(function(){
        $(".PK").css("opacity","0.5")
        setTimeout(function(){
            $(".exit").slideDown(500);
        },500)
    })
    $("#cancel").click(function(){
        $(".exit").slideUp("fast");
        $(".PK").css("opacity","1")
    })
    $(".close").click(function(){
        $(".exit").slideUp("fast");
        $(".PK").css("opacity","1")
    })
})
// 10，托管
let oriAvatar = [
    "https://img.js.design/assets/img/63354e177ca7bb9a4f82f202.png#6df6a382683443fe2c7aad02f9ef8857",
    "https://img.js.design/assets/img/6337e10090e635c199f7dcdb.png#99da28dcb3436e45aec23bffcfa82c02"
]
let oriName = [
    "小黑子滚呐",
    "没赢就摆烂"
]
$(function (){
    $("#AI").click(function (){
        if($("#AI").text() === "一键托管"){
            // 更换头像
            $("."+player+" > .avatar").css(
                "background-image","url(https://img.js.design/assets/img/6335a7e190e635c199af0e22.png#09c6156ed72fe1798e7674b2dba98648)"
            )
            // 更改昵称
            $("."+player+" > .name > span").text("托管中...");
            // 更改托管按钮样式
            $("#AI").text("取消托管");
            // 更新全局变量
            useAI[flag] = 1;
            setTimeout(ai,1000);
        } else {
            // 更换头像
            $(".A > .avatar").css(
                "background-image","url("+oriAvatar[flag]+")"
            )
            // 更改昵称
            $(".A > .name > span").text(oriName[flag])
            // 更改托管按钮样式
            $("#AI").text("一键托管");
            // 更新全局变量
            useAI[flag] = 0;
        }

    })
})
// 11，AI代打
function ai(){
    let tipSelector = "."+player+" > .tip span";
    let showSelector = "#"+player.toString().toLowerCase()+"Show";
    // 休眠函数
    // const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    // 1，模拟投掷骰子
    ind = Math.floor(Math.random()*6);
    CurrPoint = pointArr[ind];
    // 展示区改变样例
    $(showSelector).css({
        "background-image": "url("+CurrPoint+")",
        "background-size":"100% 100%",
        "background-repeat":"no-repeat"
    })
    $(tipSelector).text("投掷点数为"+(ind+1)+",请选择落子位置！");

    // 2，决策落子
    let goal = choose();
    // 3，在指定区域显示骰子
    $("#"+player+goal).css({
        "background-image":"url("+CurrPoint+")",
        "background-size":"70% 70%",
        "background-repeat":"no-repeat",
        "background-position":"center center"
    })
    // 4，获取信息并更改相关值
    let line = "";
    if (goal <= 3){ // 提示文本值
        line = "K";
    } else if (goal <= 6){
        line = "E";
    } else{
        line = "X";
    }
    points[flag][goal-1] = ind+1; // 点数数组内值
    console.log(points);       // 向控制台输出更新的点数信息
    $("#"+player+goal).attr("value",ind+1); // 改变选中li的value
    CurrMove = goal-1;  // 将落点提供给全局变量以便进行吃子操作(0~8)
    // 5，修改提示文本
    $(tipSelector).text("落子于"+line+"线，回合结束！");
    // 6，将展示区骰子置空
    $(showSelector).css({
        "background-image":"none",
    })
    // 7，落子结束后判断对对方棋盘有无影响，有则消除
    eat();
    // 8，判断当前落子对对局的影响，若已无剩余位置，则结束对局
    if(!points[flag].includes(0)){
        gameOver();
        return;
    }
    // 9，把当前骰子属性置空，防止落子多处
    CurrPoint = null;
    ind = -1;
    // 10，交换回合标记
    flag = 1 - flag;
    // 11，交换回合控制权并提前告知计时器终止
    window.clearInterval(timer);
    setTimeout(startRound, 200);
}
// 1~9
function choose(){
    let num = ind+1;
    let bestRow = 0;
    let bestCol = 0;
    let MAX = -200;
    let myBoard = points[flag];
    let rest = [0,0,0];
    rest[0] = myBoard.slice(0,3).filter(function (x){
        return x === 0;
    }).length;
    rest[1] = myBoard.slice(3,6).filter(function (x){
        return x === 0;
    }).length;
    rest[2] = myBoard.slice(6,9).filter(function (x){
        return x === 0;
    }).length;
    console.log(rest);
    // 遍历计算落子于某线后分值差异
    for(let row = 0; row < 3; row++){
        // 1，判断落子可行性
        for(let col = 0; col < 3; col++){
            let hisBoard = points[1-flag].slice(0,9); //由于涉及吃子操作，需要每次重置
            if(myBoard[row*3+col] === 0){
                // 2，计算落子于此后己方分值
                myBoard[row*3+col] = num;
                let myScore = myCount(myBoard);
                myBoard[row*3+col] = 0; // 复原
                // 3，模拟吃对方子，并计算对方分值
                for(let i = row*3; i < row*3+3; i++){
                    if(hisBoard[i] === num){
                        hisBoard[i] = 0;
                    }
                }
                let hisScore = myCount(hisBoard);
                let diff = myScore - hisScore;
                if(diff > MAX){
                    MAX = diff;
                    bestRow = row;
                    bestCol = col;
                } else if(diff === MAX && rest[row] > rest[bestRow]){
                    MAX = diff;
                    bestRow = row;
                    bestCol = col;
                }
                break;
            }
        }
    }
    // 得到最佳分差后，返回落子决策
    console.log("决定落子位置为第"+(bestRow*3 + bestCol + 1)+"格");
    return bestRow*3 + bestCol + 1;
}
