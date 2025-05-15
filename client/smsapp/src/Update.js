import { useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Update()
{
		const nav = useNavigate();
		const loc = useLocation();
		const rRno = useRef();
		const rName = useRef();
		const rMarks = useRef();

		const [rno, setRno] = useState(loc.state.r);
		const [name, setName] = useState(loc.state.n);
		const [marks, setMarks] = useState(loc.state.m);
		const [msg, setMsg] = useState("");

		const hRno = (event) => { setRno(event.target.value); }
		const hName = (event) => { setName(event.target.value); }
		const hMarks = (event) => { setMarks(event.target.value); }

		const save = (event) => {
				event.preventDefault();

		if (rno === "")
		{
				alert("please enterrno" );
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
		let url = "http://localhost:9000/us";
		axios.put(url, data)
		.then(res => {
				alert("record updated");
				nav("/");
		})
		.catch(err => {
		setMsg("issue "+ err);
		});
	};
	return(
	<>
	<center>
		<h1> Update Page </h1>
		<form onSubmit={ save }>
			<input type= "number" placeholder="enter rno"
			ref={ rRno} onChange={ hRno} value={rno}  disabled={true}/>
			<br/><br/>
			<input type= "text"    placeholder= "enter name"
			ref={rName} onChange={hName}  value={ name }/>
<br/><br/>
			<input type= "number" placeholder= "enter marks "			
			ref={ rMarks} onChange={ hMarks}  value={ marks }/>
			<br/><br/>
			<input type= "submit" value="Update" />
		</form>
			<h2> {msg }</h2>
	</center>
	</>
	);
}
export default Update;
