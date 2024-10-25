#!/usr/bin/env python3
import json, cgi

get_params = cgi.FieldStorage()
curr_user_turn =  get_params["curr_user"].value
row_placement =  get_params["row"].value

next_user = "black" if curr_user_turn == "red" else "red" 

response_data = {
    "nextUser": next_user
}

json_str = json.dumps(response_data)

print(
    f"""\
Content-Type: application/json

{json_str}
"""
)