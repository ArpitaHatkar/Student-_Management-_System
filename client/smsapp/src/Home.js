import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home()
{
		const nav = useNavigate();
		const [info, setInfo] = useState([]);

		useEffect( () =>{
			let url = "http://localhost:9000/gs";
			axios.get(url)
			.then(res => {
				setInfo(res.data);
			})
			.catch(err => {
			alert("issue " + err);
			});
		}, []);

		const delStu = (r) => {
				let url = "http://localhost:9000/ds";
				let d = { data: {r}};
				axios.delete(url, d)
				.then(res => {
						alert("record deleted");
						window.location.reload();
				})
				.catch(err => {
						alert("del issue" + err);
				});
		}

		const updateStu = (r, n, m) => {
				nav("/update", { state: {r , n, m}});
		}


		return(
		<>
		<center>
				<h1> Home Page </h1>
				<table border="5">
					<tr>
						<th> Rno </th>
						<th> Name </th>
						<th> Marks </th>
						<th> Delete </th>
						<th> Update </th>
					</tr>
				{
					info.map( (e) => (
					<tr>
						<td> { e.rno } </td>
						<td> { e.name} </td>
						<td> { e.marks } </td>
						<td><button onClick = {() => { if (window.confirm('R u sure??')) delStu(e.rno); }}>
						Delete </button> </td>
						<td><button onClick ={() => { updateStu(e.rno, e.name, e.marks ); } }>
						Update </button> </td>

					</tr>
				))
				}
				</table>
		</center>
		</>
		);
}

export default Home;