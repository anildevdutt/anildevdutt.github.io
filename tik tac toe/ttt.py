import pyautogui
from time import sleep
import cv2
import numpy as np

SCREEN_X = 120
SCREEN_Y = 145
SCREEN_W = 422
SCREEN_H = 672
START_DELAY = 0.4
P = ''
O = ''


def getScreen():
    img = pyautogui.screenshot(region=(SCREEN_X,SCREEN_Y,SCREEN_W,SCREEN_H))
    img = np.array(img)
    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    return img

def gmStarted():
    while True:
        gm = getScreen()
        points = [[142,177], [282,177], [142,317], [282,317]]
        pointcol = [230, 244, 172]            
        flag = True
        for point in points:                    
            compare = (gm[point[1]][point[0]] == pointcol)
            if compare.all() == False:
                flag = False
        if flag == True:
            return True 
    return False   


def chkXOTurn():
    sleep(START_DELAY)
    gm = getScreen()
    points = [[229, 11], [314, 11], [42, 514], [341, 514]]
    pointcol = [84, 1, 243]
    t = 0
    s = []
    m = ''
    for point in points:
        compare = (gm[point[1], point[0]] == pointcol)
        s.append(compare.all())            
    
    print(s)
    if s[0] == True and s[1] == True:
        t = 1
    elif s[0] == True and s[1] == False:
        t = 2

    if t != 0:
        if s[2] == True:
            if t == 1:
                m = 'X'
            else:
                m = 'O'
        else:
            if t == 1:
                m = 'O'
            else:
                m = 'X'

    return t, m

def waitForTurn(m):
    points = [[42, 514], [341, 514]]
    pointcol = [84, 1, 243]

    while True:
        gm = getScreen()
        if m == 'X':
            compare = (gm[points[0][1], points[0][0]] == pointcol)
            if compare.all():
                return
        if m == 'O':
            compare = (gm[points[1][1], points[1][0]] == pointcol)
            if compare.all():
                return


def getGameState():
    gmat = [[' ' for i in range(3)] for j in range(3)]
    xPoints = [
        [72, 103], [213, 103], [355, 103], 
        [72, 245], [213, 245], [355, 245],
        [72, 387], [213, 387], [355, 387]
    ]
    xcol = [156, 188, 24]

    oPoints = [
        [29, 103], [171, 103], [313, 103],
        [29, 245], [171, 245], [313, 245],
        [29, 387], [171, 387], [313, 387]
    ]
    ocol = [80, 62, 44]

    gm = getScreen()

    idx = 0
    for xp in xPoints:
        # compare = (gm[xp[1]][xp[0]] == xcol)
        # if compare.all():
        if gm[xp[1]][xp[0]][0] < 220 and gm[xp[1]][xp[0]][1] < 220 and gm[xp[1]][xp[0]][2] < 220:
            gmat[int(idx / 3)][int(idx % 3)] = 'X'
        idx += 1

    idx = 0
    for op in oPoints:
        # compare = (gm[op[1]][op[0]] == ocol)
        # if compare.all():
        if gm[op[1]][op[0]][0] < 220 and gm[op[1]][op[0]][1] < 220 and gm[op[1]][op[0]][2] < 220:
            gmat[int(idx / 3)][int(idx % 3)] = 'O'
        idx += 1

    return gmat

def makemove(m, n):
    sx = 0
    sy = 0

    if m == 0:
        sy = 248
    elif m == 1:
        sy = 389
    else:
        sy = 532

    if n == 0:
        sx = 190    
    elif n == 1:
        sx = 329
    else:
        sx = 476

    pyautogui.moveTo(sx, sy)
    sleep(0.2)
    pyautogui.click(x=sx, y=sy)
    sleep(0.2)
    pyautogui.moveTo(10, 10)


def gameStat(gmat, m):
    
    # rows
    for i in range(0, 3):
        if gmat[i][0] == 'X' and gmat[i][1] == 'X' and gmat[i][2] == 'X':
            if m == 'X':
                return 1
            else:
                return -1

        if gmat[i][0] == 'O' and gmat[i][1] == 'O' and gmat[i][2] == 'O':
            if m == 'O':
                return 1
            else:
                return -1
    # cols
    for i in range(0, 3):
        if gmat[0][i] == 'X' and gmat[1][i] == 'X' and gmat[2][i] == 'X':
            if m == 'X':
                return 1
            else:
                return -1

        if gmat[0][i] == 'O' and gmat[1][i] == 'O' and gmat[2][i] == 'O':
            if m == 'O':
                return 1
            else:
                return -1
    # dgnl
    if gmat[0][0] == 'X' and gmat[1][1] == 'X' and gmat[2][2] == 'X':
        if m == 'X':
            return 1
        else:
            return -1

    if gmat[0][0] == 'O' and gmat[1][1] == 'O' and gmat[2][2] == 'O':
        if m == 'O':
            return 1
        else:
            return -1
    # dgnlother dgnl
    if gmat[0][2] == 'X' and gmat[1][1] == 'X' and gmat[2][0] == 'X':
        if m == 'X':
            return 1
        else:
            return -1

    if gmat[0][2] == 'O' and gmat[1][1] == 'O' and gmat[2][0] == 'O':
        if m == 'O':
            return 1
        else:
            return -1
    for r in gmat:
        for c in r:
            if c == ' ':
                return -2

    return 0

def findAllMoves(gm):
    mv = []
    for i in range(0, 3):
        for j in range(0, 3):
            if gm[i][j] == ' ':
                mv.append([i, j])
    return mv


def minimax(gm, isMax):
    # global P
    # global O
    
    s = gameStat(gm, P)
    
    if s != -2:        
        return s
    
    if isMax == True:
        bestScore = -1000000
        moves = findAllMoves(gm)
        for move in moves:
            gm[move[0]][move[1]] = P
            score = minimax(gm, False)
            bestScore = max(score, bestScore)            
            gm[move[0]][move[1]] =  ' '
                  
        return bestScore
    else:
        bestScore = 1000000
        moves = findAllMoves(gm)
        for move in moves:
            gm[move[0]][move[1]] = O
            score = minimax(gm, True)
            bestScore = min(score, bestScore)
            gm[move[0]][move[1]] =  ' '
                 
        return bestScore




def play(m):
    global P
    global O
    if m == 'X':
        P = 'X'
        O = 'O'
    else:        
        P = 'O'
        O = 'X'

    while True:        
        sleep(1.5)
        gm = getGameState()       
        print(gm)
        moves = findAllMoves(gm)
        print(moves)
        bestscore = -1000000
        bestmove = []
        for move in moves:
            gm[move[0]][move[1]] = P
            score = minimax(gm, False)        
            print(score)    
            gm[move[0]][move[1]] = ' '
            if score > bestscore:
                bestscore = score
                bestmove = move
        makemove(bestmove[0], bestmove[1])
        gm[bestmove[0]][bestmove[1]] = P        
        if len(moves) < 3 or gameStat(gm, P) != -2:
            return
        sleep(1)
        waitForTurn(m)       
        # break 

def main():    
    count = 0
    while True:
        
        if gmStarted():
            print("Game started")        
            t, m = chkXOTurn()           
            print(t, m)
            if t == 1: 
                sleep(1)
                makemove(0, 0)
                waitForTurn(m)       
                play(m)
            else:
                waitForTurn(m)
                play(m)
            count += 1
            print('Game completed: ' + str(count))
            
            sleep(30)
            pyautogui.moveTo(375, 374)
            sleep(0.2)
            pyautogui.click(x=375, y=374)
            sleep(0.2)
            pyautogui.moveTo(10, 10)
            print("Starting new game")

sleep(5)
print("AI Started")
main()


