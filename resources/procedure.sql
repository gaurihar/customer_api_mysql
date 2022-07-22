USE UserInfo;
DROP PROCEDURE IF EXISTS CreateUser;
DROP PROCEDURE IF EXISTS GetAllUser;
DROP PROCEDURE IF EXISTS GetUserById;
DROP PROCEDURE IF EXISTS LastRowEntry;
DROP PROCEDURE IF EXISTS DeleteUserById;
DROP PROCEDURE IF EXISTS UpdateUserById;
DROP PROCEDURE IF EXISTS UpdateUserContactById;
USE UserInfo;
DROP PROCEDURE IF EXISTS CreateUser;
DROP PROCEDURE IF EXISTS GetAllUser;
DROP PROCEDURE IF EXISTS GetUserById;
DROP PROCEDURE IF EXISTS LastRowEntry;
DROP PROCEDURE IF EXISTS DeleteUserById;
DROP PROCEDURE IF EXISTS UpdateUserById;
DROP PROCEDURE IF EXISTS UpdateUserContactById;

CREATE PROCEDURE CreateUser(IN fname VARCHAR(20),IN lname VARCHAR(20),IN email VARCHAR(100),IN cn VARCHAR(10))
    INSERT INTO user_info (first_name,last_name,email_id,contact_no) values(fname,lname,email,cn);


CREATE PROCEDURE GetAllUser()
    SELECT * from user_info;

CREATE PROCEDURE GetUserById(IN userid int)
    SELECT * FROM user_info WHERE id = userid;

CREATE PROCEDURE LastRowEntry()
    SELECT * FROM user_info where id=(SELECT LAST_INSERT_ID());

CREATE PROCEDURE DeleteUserById(IN userid int)
    DELETE FROM user_info WHERE id = userid;

CREATE PROCEDURE UpdateUserById(IN userid int,IN fname VARCHAR(20),IN lname VARCHAR(20),IN email VARCHAR(100),IN cn VARCHAR(10))
    UPDATE user_info 
        SET 
            id = userid,
            first_name = fname,
            last_name = lname,
            email_id = email,
            contact_no = cn
        WHERE 
            id = userid;

CREATE PROCEDURE UpdateUserContactById(IN userid int,IN cn VARCHAR(10))
    UPDATE user_info 
        SET 
            contact_no = cn
        WHERE 
            id = userid;