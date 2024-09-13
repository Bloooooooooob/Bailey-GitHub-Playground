# Prompt the user for input
cost_str = input("Please enter the cost of the meal: ")
cost_int = float (cost_str)
tip_str = input("What percent would you like to tip? (Only enter a number, no percent sign): ")
tip_int = float (tip_str)
pay_amount = round(cost_int*tip_int*.01 + cost_int, 2)
print (pay_amount)
