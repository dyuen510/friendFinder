INSERT INTO friend (friend_name, picture_link) VALUES 
('David Yuen', 'images/dave.png'),
('Sophia Feng', 'images/sophia.png'),
('Simon Yeung', 'images/simon.png');

INSERT INTO question (ques) VALUES
('For vacations you would like to travel to different countries and experience a different culture.'),
('Love listening to jazz while trying to concentrating in work.'),
('Like to motivate others at the workplace.'),
('Excited to go to events that offers booze.'),
('You feel more energetic after spending time with a large group of people.'),
('You love trying new things and challenging yourself.'),
('On your day off you would spend it running errands and be productive.'),
('You like to meet new people.'),
('You love the outdoors and have always wanted to go on a roadtrip.'),
('It is really easy to get distracted.');

INSERT INTO scores (questions_id, friends_id, answer) VALUES
(1,1,5),(2,1,5),(3,1,4),(4,1,5),(5,1,2),(6,1,3),(7,1,2),(8,1,3),(9,1,5),(10,1,5),
(1,2,5),(2,2,1),(3,2,2),(4,2,5),(5,2,1),(6,2,2),(7,2,4),(8,2,1),(9,2,1),(10,2,1),
(1,3,5),(2,3,3),(3,3,5),(4,3,3),(5,3,5),(6,3,5),(7,3,1),(8,3,5),(9,3,1),(10,3,1);


-- SELECT SUM(answer_difference) AS difference, friend_name, picture_link
-- FROM
-- (SELECT *, ABS(answer-t2answer AS answer_difference FROM 
-- (SELECT *
-- FROM scores s1
-- LEFT JOIN (SELECT questions_id AS t2questions_id, friends_id AS t2friends_id, answer AS t2answer
-- FROM scores s2) t2
-- ON t2questions_id = s1.questions_id) t3) t4
-- LEFT JOIN friend 
-- ON t4.friends_id = friend.friends_id
-- WHERE t2friends_id != 10
-- GROUP BY friend_name, picture_link
-- ORDER BY difference;

-- SELECT questions_id, friends_id, t2friends_id, answer_difference FROM 
-- (SELECT *, (answer-t2answer) AS answer_difference FROM
-- (SELECT *
-- FROM scores s1
-- LEFT JOIN (SELECT questions_id AS t2questions_id, friends_id AS t2friends_id, answer AS t2answer
-- FROM scores s2) t2
-- ON t2questions_id = s1.questions_id) t3) t4;