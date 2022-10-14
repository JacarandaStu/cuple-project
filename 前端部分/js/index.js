// 1，规则弹窗
$(function(){
    $("#rule").click(function(){
        $("#index").css("opacity","0.5");
        setTimeout(function(){
            $("#ruleWindow").slideDown(200);
        },500)
    })
    $("#ruleWindow .close").click(function(){
        $("#ruleWindow").slideUp("fast");
        $("#index").css("opacity","1")
    })
})
// 2，头像选择弹窗
$(function(){
    $(".avatar").click(function(){
        $("#index").css("opacity","0.5")
        setTimeout(function(){
            $("#avatarWindow").slideDown(200);
        },500)
    })
    $("#avatarWindow .close").click(function(){
        $("#avatarWindow .show").css(
            "background", $("#index .avatar").css("background")
        );
        $("#avatarWindow").slideUp("fast");
        $("#index").css("opacity","1");
    });
    $("#avatarWindow li").click(function (){
        $("#avatarWindow .show").css(
            "background", $(this).css("background")
        );
    });
    $("#confirm").click(function(){
        let choice = $("#avatarWindow .show").css("background");
        $("#index .avatar").css("background",choice);
        $("#avatarWindow").slideUp("fast");
        $("#index").css("opacity","1");
    })
    $("#cancel").click(function(){
        $("#avatarWindow .show").css(
            "background", $("#index .avatar").css("background")
        );
        $("#avatarWindow").slideUp("fast");
        $("#index").css("opacity","1");
    })
})
// 3，更改昵称弹窗
$(function(){
    $(".name").click(function(){
        $("#index").css("opacity","0.5")
        setTimeout(function(){
            $("#rename").fadeIn(200);
        },500)
    })
    let nameSelector = $("input[name='username']");
    $("#rename .close").click(function(){
        $("#rename").fadeOut("fast");
        $("#index").css("opacity","1")
    })
    $("#submit").click(function(){
        console.log(nameSelector.val());
        $(".name").text(nameSelector.val())
        $("#rename").fadeOut("fast");
        $("#index").css("opacity","1")
    })
    $("#reset").click(function(){
        nameSelector.val("");
    })
})
// 4，骰子商店弹窗
$(function(){
    $("#touzi-shop").click(function(){
        $("#index").css("opacity","0.5")
        setTimeout(function(){
            $(".moreDice").slideDown("fast");
        },500)
    })
    $(".moreDice li").click(function (){
        $(".moreDice .show").css(
            "background", $(this).css("background")
        );
    });
    $(".moreDice .close").click(function(){
        $(".moreDice .show").css(
            "background", $("#index #one .s").css("background")
        );
        $(".moreDice").slideUp("fast");
        $("#index").css("opacity","1")
    })
    $("#confirm-two").click(function(){
        let choice = $(".moreDice .show").css("background");
        $("#index #one .s").css("background",choice);
        $(".moreDice").slideUp("fast");
        $("#index").css("opacity","1")
    })
    $("#cancel-two").click(function(){
        $(".moreDice .show").css(
            "background", $("#index #one .s").css("background")
        );
        $(".moreDice").slideUp("fast");
        $("#index").css("opacity","1")
    })
})
// 5，棋盘商店弹窗
$(function(){
    $("#brode-shop").click(function(){
        $("#index").css("opacity","0.5")
        setTimeout(function(){
            $(".moreBrode").slideDown("fast");
        },500)
    })
    $(".moreBrode li").click(function (){
        $(".moreBrode .show").css(
            "background", $(this).css("background")
        );
    });
    $(".moreBrode .close").click(function(){
        $(".moreBrode .show").css(
            "background", $(".show-brode .brode").css("background")
        );
        $(".moreBrode").slideUp("fast");
        $("#index").css("opacity","1")
    })
    $("#confirm-three").click(function(){
        let choice = $(".moreBrode .show").css("background");
        $(".show-brode .brode").css("background",choice);
        $(".moreBrode").slideUp("fast");
        $("#index").css("opacity","1")
    })
    $("#cancel-three").click(function(){
        $(".moreBrode .show").css(
            "background", $(".show-brode .brode").css("background")
        );
        $(".moreBrode").slideUp("fast");
        $("#index").css("opacity","1")
    })
})
// 6，退出弹窗
$(function(){
    $("div[class='button;exit']").click(function(){
        $("#index").css("opacity","0.5");
        setTimeout(function(){
            $(".exit").slideDown("fast");
        },200)
    })
    $(".close").click(function(){
        $(".exit").slideUp("fast");
        $("#index").css("opacity","1")
    })
    $("#cancel-four").click(function(){
        $(".exit").slideUp("fast");
        $("#index").css("opacity","1")
    })
    $("#confirm-four").click(function (){
        exit();
    })
})