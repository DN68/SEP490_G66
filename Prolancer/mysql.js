const mysql = require('mysql');
 
 const connection = mysql.createConnection({ 
	 host: 'sql12.freesqldatabase.com', 
	 database: 'sql12654961', 
	 user: 'sql12654961', // username of the mysql connection 
	 password: 'QhPc3Yxkkc', // password of the mysql connection
	 port: 3306
});
connection.connect(function (err) {
   if(err){
       console.log('Error connecting' + err.stack );
	   return;
   }
   else{
       console.log('Connected as id' + connection.threadId);
   }
});

connection.query('SELECT * FROM User', function(error, results, fields) {
	if(error)
		throw error;
		results.forEach(result => {
			console.log(result);
		});
});