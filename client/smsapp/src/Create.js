import { useRef, useState } from "react";
import axios from "axios";

function Create()
{
		const rRno = useRef();
		const rName = useRef();
		const rMarks = useRef();

		const [rno, setRno] = useState("");
		const [name, setName] = useState("");
		const [marks, setMarks] = useState("");
		const [msg, setMsg] = useState("");

		const hRno = (event) => { setRno(event.target.value); }
		const hName = (event) => { setName(event.target.value); }
		const hMarks = (event) => { setMarks(event.target.value); }

		const save = (event) => {
				event.preventDefault();

				if (rno === "")
				{
						alert("please enter rno");
						setMsg();
						rRno.current.focus();
						return;
				}		

				if (name === "")
				{
				alert("please enter name");
				setMsg();
				rName.current.focus();
				return;
				}

				if (marks === "")
				{
				alert("please enter marks");
				setMsg();
				rMarks.current.focus();
				return;
				}

				let data = { rno, name, marks};
				let url = "http://localhost:9000/ss";
				axios.post(url, data)
				.then(res => {
						if (res.data.affectedRows === 1)
						{
								setMsg("record created");
								setRno("");
								setName("");
								setMarks("");
								rRno.current.focus();
						}
						else if (res.data.errno === 1062)
						{
								setMsg(rno + " already exists ");
								setRno("");
								rRno.current.focus();
						}
				})
				.catch(err => {
						setMsg("issue" + err);
				});
	};

	return(
	<>
	<center>
		<h1> Create Page </h1>
		<form onSubmit={ save }>
				<input type= "number" placeholder="enter rno "
				ref={ rRno} onChange={ hRno} value={ rno }/>
				<br/><br/>
				<input type="text" placeholder="enter name"
				ref={rName} onChange={hName}  value={ name }/>
				<br/><br/>
				<input type= "number" placeholder="enter marks"
				ref={ rMarks} onChange={ hMarks}  value={ marks }/>
				<br/><br/>
				<input type= "submit" value="Save" />
		</form>
				<h2> {msg }</h2>
	</center>
	</>
	);
}

export default Create;