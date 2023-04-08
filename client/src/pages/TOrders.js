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
  const [payments, setPayments] = React.useState([]);

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
    axios.get("http://localhost:4000/payment").then((res) => {
      setPayments(res.data);
    });
  }, []);

  return (
    <React.Fragment>
      <Title>Transactions</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Payment Date</TableCell>
            <TableCell>Paid To</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Paid By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                {new Date(user.transaction_date).toLocaleDateString()}
              </TableCell>
              <TableCell>{user.user}</TableCell>
              <TableCell>$ {user.amount}</TableCell>
              <TableCell>{user.paidby}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
    </React.Fragment>
  );
}
