import random
import time
import copy
#后续要改进的点：
#只要赢的话，不用追求高分，只要比对手高就行，要让对手难以翻盘
# 1.预留空位给大点数配对（自己）
# 2.对方大点数结对的行最好预留空位以便消除 （坑对手）
# 3.决策时在保障自己分数高于对手，不消除小点数，让对手小点数卡场（坑对手）
def maxdiff_ai_choose(num,myboard,hisboard):
    '''该方法是基于使分数差值最大化（max(my_score-his_score)）的基准
    我们落子其实只有三种决策：1，2，3行
    只要遍历一下这三种决策，找到使分数差值变得更大的就行了'''
    #配对决策
    bestrow=0
    maxdiff=-999#这里不能设0，否则如果落后的话，diff<0,永远不会执行之后的if更新语句
    col_when_best=0
    chioce=[]
    for row in range(3):#遍历这三种情况
        c_myboard = copy.deepcopy(myboard)
        c_hisboard = copy.deepcopy(hisboard)
        if 0 in c_myboard[row]:#如果该行有空
            col=c_myboard[row].index(0)
            #改变棋盘的值
            c_myboard[row][col]=num
            #消除对方棋盘（如果有的话）
            for i in range(3):
                if c_hisboard[row][i]==num:
                    c_hisboard[row][i]=0
            #计算决策后的分差
            diff=score_dif(c_myboard,c_hisboard)
            #更新
            if(diff>maxdiff):
                maxdiff=diff
                bestrow=row
                col_when_best=col
            elif(diff==maxdiff):#相同就随机
                chioce.append([row,col])
    chioce.append([bestrow,col_when_best])
    if(len(chioce)>1):
        r=random.randint(0,len(chioce)-1)
        bestrow=chioce[r][0]
        col_when_best=chioce[r][1]
    return bestrow,col_when_best
def score_dif(myboard,hisboard):#分数差
    my_score = score(myboard)
    his_score = score(hisboard)
    score_dif = my_score - his_score
    return score_dif


def improved(num,myboard,hisboard):
    return 0

def foolish_ai_random_choose(board):
    full=1
    column = -1
    row=random.randint(1,3)
    if 0 in board[row-1]:
        full = 0
        column = board[row-1].index(0)
    #该行满了，在嵌套生成一个随机行
    if(full==1):
        return foolish_ai_random_choose(board)
    else:
        return row-1, column

def throw_dice():
    num=random.randint(1,6)
    return num

#判断哪个玩家的回合，并返回该玩家的棋盘号，以便进行操作
def judge_player(round):
    global WhoIsFirst
    if ((round+WhoIsFirst) % 2 == 0):
        return 'board1'
    else:
        return 'board2'

def if_end(round):
    board = judge_player(round)
    for i in range(3):
        for j in range(3):
            if(eval(board)[i][j]==0):
                return False
    return True


def remove(row,num,round):
    #对对方的棋盘操作，所以加1
    f=0
    board=judge_player(round+1)
    for i in range(3):
        if(eval(board)[row][i]==num):
            f=f+1
            eval(board)[row][i]=0

def round_action():
    global record
    num=throw_dice()
    board=judge_player(round)#判断该回合是哪个玩家的回合，返回他的棋盘
    if board=='board1':#玩家1使用
        row, column = maxdiff_ai_choose(num,board1,board2)
    else:#玩家2使用random决策
        row, column = foolish_ai_random_choose(board2)
        #row, column = maxdiff_ai_choose(num, board2, board1)
    eval(board)[row][column] = num#改变棋盘中的值
    #record.append([row+1,num])
    remove(row, num, round)
    #print_board()
    if(if_end(round)):
        return 0
    return 1

def print_choices_in_one_game(no):
    global total_record
    global WhoIsFirst
    print("第{}局游戏开始！玩家{}先手！".format(no,WhoIsFirst))
    for i in range(len(total_record[no-1])):
        playerNo=2 if (WhoIsFirst+i)%2==0 else 1
        print('第{}回合，玩家{}的点数是{}，置于第{}行'.format(i+1,playerNo,total_record[no-1][i][1],total_record[no-1][i][0]))
    print("第{}局游戏结束!".format(no))

def print_board():
    global board1
    global board2
    global round
    b=judge_player(round)
    print('\n第{}回合\t{}行动'.format(round,b))
    print("一号棋盘\t\t二号棋盘")
    for i in range(3):
        print(board1[i][:],end='')
        print('\t',board2[i][:])

def score(board):
    score=0
    for i in range(3):
        dic={}
        for j in range(3):
            if board[i][j] in dic.keys():
                dic[board[i][j]] += 1
            else:
                dic[board[i][j]] = 1
        for key in dic.keys():
            score=score+key*dic[key]**2
    return score


if __name__=="__main__":
    #total是总对局数
    total=1000
    #1是play1先手，2是player2先手
    WhoIsFirst=1
    player1_win = 0
    player2_win = 0
    total_record = []
    for t in range(total):
        # 对局开始，初始化参数
        record = []
        i=1
        board1=[[0,0,0] for i in range(3)]
        board2=[[0,0,0] for i in range(3)]
        round=0

        # 进行对局
        start = time.time()
        while(i!=0):
            round=round+1
            i=round_action()
        end=time.time()

        # 输出部分局过程
        #total_record.append(record)
        print('第{}局游戏结束！'.format(t+1),end='')
        score1=score(board1)
        score2=score(board2)
        print('player1_score={},  player2_score={},\t'.format(score1,score2),end='')
        if(score1<score2):
            print('player2 win! 耗时:',end-start)
            player2_win+=1
        elif(score1==score2):
            print('end in a draw! 耗时:',end-start)
        else:
            print('player1 win! 耗时:',end-start)
            player1_win += 1
    print("player1的胜率为{},player2的胜率为{}，共平局{}次".
          format(player1_win/(player1_win+player2_win),player2_win/(player1_win+player2_win),total-player1_win-player2_win))

    #print_choices_in_one_game(1)