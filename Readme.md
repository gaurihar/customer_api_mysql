### **Nodejs API with all method i.e., GET,POST,PUT and PATCH for user object.**
---

## Directory Structure
---
![Image](directory.png)

## How to Run
---

*	Create Database using mysql script in `resource/database.sql`
*   mysql -u username -p database_name < file.sql*
*   Create all procedure in mysql using `resource/procedure.sql`
*	Run Server `node index.js` || nodemon index.json

## API call syntax using curl
---

* GET method  ```curl -X GET http://localhost:port number/api/userinfo```

* DELETE method ```curl -X POST http://localhost:port number/api/userdel/id```

* POST method ```curl -X POST -d '{"first_name": "ABC", "last_name":"XYZ","email_id":"wzx@xz.gmail.com","contact_no":"1234567891"}' http://localhost:port number/api/userinfo
 ```

## Author
---
* Name : Gaurihar Darade
