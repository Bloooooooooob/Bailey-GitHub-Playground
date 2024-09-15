import random

print ("Welcome to tic-tac-toe. In this game we will translate the board into numbers.")
print ("The top left square will be 1, the top middle will be 2, and we will continue like that until the bottom right square which is 9.")
players = input("Input the number of players: ")


if players == "1":
    turn_order = input("Would you like to go first: ")
    if turn_order == "yes" or "Yes":
        move_1_str = input("Which spot would you like to take: ")
        move_1 = float(move_1_str)
        excluded = {move_1}
        allowed_values = [num for num in range(1, 10) if num not in excluded]
        move_2 = random.sample(allowed_values, 1)[0]
        print ("The computer chose spot", move_2)
        move_3_str = input("Which spot would you like to take: ")
        move_3 = float(move_3_str)
        excluded = {move_1, move_2, move_3}
        allowed_values = [num for num in range(1, 10) if num not in excluded]
        move_4 = random.sample(allowed_values, 1)[0]
        print ("The computer chose spot", move_4)
        move_5_str = input("Which spot would you like to take: ")
        move_5 = float(move_5_str)
        excluded = {move_1, move_2, move_3, move_4, move_5}
        allowed_values = [num for num in range(1, 10) if num not in excluded]
        move_6 = random.sample(allowed_values, 1)[0]
        print ("The computer chose spot", move_6)
        move_7_str = input("Which spot would you like to take: ")
        move_7 = float(move_7_str)
        excluded = {move_1, move_2, move_3, move_4, move_5, move_6, move_7}
        allowed_values = [num for num in range(1, 10) if num not in excluded]
        move_8 = random.sample(allowed_values, 1)[0]
        print ("The computer chose spot", move_8)
        move_9_str = input("Which spot would you like to take: ")
        move_9 = float(move_9_str)
elif players == "2":
    print ("coolio")
else:
    print ("You might want to consider another game with that number of players.")