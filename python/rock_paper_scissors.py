import random

# 1 = rock
# 2 = paper
# 3 = scissors
comp_pick = random.randint(1,3)

person_pick = input("Type the move you'd like to play: ")
if person_pick == "rock":
    if comp_pick == 1:
        print ("Tie. You both picked rock.")
    elif comp_pick == 2:
        print ("You lose. The computer picked paper, and you picked rock.")
    else:
        print ("You win! You picked rock, and the computer picked scissors.")
elif person_pick == "paper":
    if comp_pick == 1:
        print ("You win! You picked paper, and the computer picked rock.")
    elif comp_pick == 2:
        print ("Tie. You both picked paper.")
    else:
        print ("You lose. The computer picked scissors, and you picked paper.")
elif person_pick == "scissors":
    if comp_pick == 1:
        print ("You lose. The computer picked rock, and you picked scissors.")
    elif comp_pick == 2:
        print ("You win! You picked scissors, and the computer picked paper.")
    else:
        print ("Tie. You both picked paper.")
else:
    print ("Please try again and enter a valid rock paper scissors move.")