import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import Title from "./Title";
import axios from "axios";

export default function Orders() {
  const [users, setUsers] = React.useState([]);

  function Promote(id) {
    axios.post("http://localhost:4000/user/promote", {
        id: id
    })
    .then(data => console.log(data));
    window.location.reload(false);

  }

  function Demote(id) {
    axios.post("http://localhost:4000/user/demote", {
        id: id
    })
    .then(data => console.log(data))
    window.location.reload(false);
  }

  React.useEffect(() => {
    axios.get("http://localhost:4000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <React.Fragment>
      <Title>Users</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Join Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Admin Status</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Promote/Demote</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                {new Date(user.joined_date).toLocaleDateString()}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{`${user.adminstatus}`}</TableCell>
              <TableCell>{user.address}</TableCell>
            
              <TableCell align="right">
                {user.adminstatus === true ? <Button onClick={() => Demote(user._id)} color="error" variant="contained">Demote</Button>: <Button onClick={() => Promote(user._id)} color="success" variant="contained">Promote</Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
    </React.Fragment>
  );
}
