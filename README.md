# backstory
henro my name is gregjay3 and i am best rainbow six siege esp aimbot paster
topfrag is #1 rainbow six siege esp aimbot cheat 
pls give me money i need it to beat nicole
thx :D

# dependencies
node.js (latest)
discord.js (11.6.4)
mysql/mariadb (latest)
fs (latest)

# db setup
select a database with the name of your database in bot.js
`CREATE TABLE `infractions` (
  `moderator` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `reason` varchar(2000) NOT NULL DEFAULT 'No Reason',
  `time` varchar(255) NOT NULL DEFAULT 'Forever'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
`
