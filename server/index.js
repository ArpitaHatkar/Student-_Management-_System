const express = require("express" );
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password : "arsh29722",
	database : "sms26dec24"
});

app.post("/ss", (req, res) => {
	let sql = "insert into student values(?, ?, ?)";
	let data = [req.body.rno, req.body.name, req.body.marks];
	con.query(sql, data, (err, result) => {
	if (err) 		res.send(err);
	else 					res.send(result);

	});
});

app.get("/gs", (req, res) => {
	let sql = "select * from student";
	con.query(sql, (err, result) => {
		if (err) 		res.send(err);
		else 					res.send(result);
	});
});

app.put("/us", (req, res) => {
		let sql = "update student set name=?, marks = ? where rno = ?";
		let data = [req.body.name, req.body.marks, req.body.rno];
		con.query(sql, data, (err, result) => {
			if (err) 		res.send(err);
			else 			res.send(result);

		});
});

app.delete("/ds", (req, res) => {
		let sql = "delete from student where rno = ?";
		let data = [req.body.r];
		con.query(sql, data, (err, result) => {
			if (err) 		res.send(err);
			else 			res.send(result);

		});

});

app.listen(9000, () => { console.log("ready to serve @ 9000"); } );

