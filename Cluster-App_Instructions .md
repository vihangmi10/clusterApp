# Cluster App Instructions 

## To make a get call to get the program listings  

 Node version ```12.8.1```
 
 Run the application 
 ```npm install```  
 ```npm start```  
 ```Port 5000```

```
var request = require("request");

var options = { method: 'GET',
  url: 'http://localhost:5000/api/v1/getProgramList',
  qs: 
   { page: '1',
     limit: '10',
     sort: 'programName',
     programName: 'Mechanical%20Engineering' },
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'Accept-Encoding': 'gzip, deflate',
     Host: 'localhost:5000',
     'Postman-Token': '1542f030-4ae4-41c5-b085-47fd118c7269,f662d54f-0a2f-4f01-94fd-dd1dfb6c4903',
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     'User-Agent': 'PostmanRuntime/7.19.0' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

Where Page Number specify page default 1.  
Limit specify number of program lists in one query default 25.  
Sort specify based on which key one wants to sort (-programName - Descending).   
Search based on the key and the equivalent value. Example programName=Mechanical Engineering. 

Expected Output

```
{
    "success": true,
    "count": 2,
    "pagination": {
        "next": {
            "page": 2,
            "limit": 10
        }
    },
    "list": [
        {
            "_id": "5dccf7a29f67d76a03551e3a",
            "school": "Houston Community College",
            "programName": "Mechanical Engineering",
            "degreeType": "Associate's",
            "delivery": "Online",
            "annualTuition": "$2,798",
            "location": "Houston, TX",
            "__v": 0
        },
        {
            "_id": "5dccf7a29f67d76a03551e5f",
            "school": "California Institute of Technology",
            "programName": "Mechanical Engineering",
            "degreeType": "Bachelor's",
            "delivery": "Campus",
            "annualTuition": "$4,610",
            "location": "Pasadena, CA",
            "__v": 0
        }
    ]
}
```
success: true -> Returns when the query is correct.   
count: Returns the total numbers of program list items sent.   
pagination: Lets the front end know if the next and previous are available.   
list: Contains the actual array of program listings.  
