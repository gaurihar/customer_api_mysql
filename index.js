const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const config = require('./config/config.json')
var app = express();

//Configuring express server
app.use(bodyparser.json());

const { host, user, password, database, multipleStatements } = config.database;
var mysqlConnection = mysql.createConnection({
    host,
    user,
    password,
    database,
    multipleStatements
});



mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});


app.get('/api/userinfo', (req, res) => {

    mysqlConnection.query('SELECT * FROM user_info', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/api/userinfo/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM user_info WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.post('/api/userinfo', (req, res) => {
    let user = req.body;
    var sql = "SET @first_name = ?;SET @last_name = ?;SET @email_id = ?;SET @contact_no = ?;\
        CALL CreateUser(@first_name,@last_name,@email_id,@contact_no);";
    mysqlConnection.query(sql, [user.first_name, user.last_name, user.email_id, user.contact_no], (err, rows, fields) => {
        if (!err)
            res.send("user Created Succesfully")
        else
            if (err.code == 'ER_DUP_ENTRY' || err.errno == 1062) {
                res.send("dublicate enttris found ..")
            }
    })
})


app.put('/api/userinfo/:id', (req, res) => {
    let user = req.body;

    var sql = "SET @id =?; SET @first_name = ?;SET @last_name = ?;SET @email_id = ?;SET @contact_no = ?; \
        CALL UpdateUserById(@id,@first_name,@last_name,@email_id,@contact_no);";
    mysqlConnection.query(sql, [req.params.id, user.first_name, user.last_name, user.email_id, user.contact_no], (err, rows, fields) => {
        if (!err)
            {console.log(rows)
            if (rows[0].affectedRows!= 0)
                res.send("Updated Succesufully")
            else
                res.send("User Not found of given id")}
        else

            if (err.code == 'ER_DUP_ENTRY' || err.errno == 1062) {
                res.send("dublicate enttris found ..")
            }
            else {
                console.log(err)

            }
    })
})




app.patch('/api/userinfo/:id', (req, res) => {
    let user = req.body;

    var sql = "SET @id =?;SET @contact_no = ?; \
        CALL UpdateUserContactById(@id,@contact_no);";
    mysqlConnection.query(sql, [req.params.id,user.contact_no], (err, rows, fields) => {
        if (!err)
            
            if (rows[0].affectedRows= 0)
                res.send("Contact Number Updated Succesufully")
            else
                res.send("User Not found of given id")
        else

            if (err.code == 'ER_DUP_ENTRY' || err.errno == 1062) {
                res.send("dublicate enttris found ..")
            }
            else {
                console.log(err)

            }
    })
})









app.delete('/api/userdel/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM user_info WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
        
            if (rows.affectedRows != 0)
                res.send("Deleted Succesufully")
            else
                res.send("user Not found of given id")
        else
            console.log(err);
    })
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));