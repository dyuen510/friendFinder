DROP DATABASE IF EXISTS friend_finder;

CREATE DATABASE friend_finder;

USE friend_finder;


CREATE TABLE friend (
    id INT NOT NULL AUTO_INCREMENT,
    friend_name VARCHAR(255),
    picture_link VARCHAR(255),
    PRIMARY KEY(id)

);

CREATE TABLE question (
    id INT NOT NULL AUTO_INCREMENT,
    ques VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE scores (
    id INT NOT NULL AUTO_INCREMENT,
    questions_id INT NOT NULL,
    friends_id INT NOT NULL,
    answer INT NOT NULL,
    FOREIGN KEY (questions_id) REFERENCES question(id),
    FOREIGN KEY (friends_id) REFERENCES friend(id),
    PRIMARY KEY(id),
    CHECK (answer >= 0),
    CHECK (answer <= 5)
);

function displayNum(n){
    for(var i =0; i<n; i++){
        console.log(i);
    }
}
displayNum(100)