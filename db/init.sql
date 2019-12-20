CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `imageurl` varchar(255) DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT '4',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `usu_hash_UNIQUE` (`hash`),
  UNIQUE KEY `login_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;



INSERT INTO `users`
(
name,
email,
imageurl,
hash,
username,
password,
type)
VALUES
('Admin',
'averdion@gmail.com',
'admin.png',
'Admin',
'admin',
'e10adc3949ba59abbe56e057f20f883e',
4);

CREATE TABLE `words` (
  `wordId` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(45) DEFAULT NULL,
  `translation` varchar(45) DEFAULT NULL,
  `words` varchar(2) DEFAULT 'de',
  `type` varchar(10) DEFAULT 'Nm',
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`wordId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
