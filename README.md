# callsigns_api

Project for learning to make an API. 

`xls_to_sqlite.py` is used to convert the latest callsign spreadsheet from Ofcom to a postgresql format and upload it to the connection specified in your environmental variables. 

If you want to try it yourself, you'll need to grab the latest sheet, add it to the folder and rename it to callsigns.xlsx, I've been using the one from https://www.whatdotheyknow.com/request/requesting_list_of_allocated_and#incoming-1994281 for testing. 

running `npm start` will listen for requests on port 5001. 

endpoints I have set up so far are: 

GET: /callsigns/ : Returns all callsigns (this is a lot of info and not super practical) 

GET: /callsigns/\<callsign\> : Returns information about a specific callsign. 
  
Example of what is returned:
```
{
    "Callsign": [
        {
            "Value": "G5LLP",
            "Status": "Allocated",
            "Type": "Call Sign - Amateur",
            "level": "Full",
            "qrz": "https://www.qrz.com/db/G5LLP"
        }
    ]
}
```
  
GET: /callsigns/level/\<level\> : returns all callsigns of a particular level (Full/Intermediate/Foundation) 
  
POST: /callsigns : Add a callsign to the database

PATCH: /callsigns/\<callsign\> : Update Callsign
  
DELETE: /callsigns/\<callsign\> : Delete Callsign from Database
  
