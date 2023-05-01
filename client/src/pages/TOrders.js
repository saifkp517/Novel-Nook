import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { Button } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Title from "./Title";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Orders() {
  const [bookdata, setBookData] = React.useState([]);
  const [orderinfo, setOrderinfo] = React.useState("");
  const [date, setDate] = React.useState("");
  const [orderid, setOrderid] = React.useState("");

  const setGenre = (e) => {
    setOrderinfo(e.target.value);
  };

  const updateDate = (e) => {
    console.log(e.$d)
    setDate(e.$d);
  }

  const updateInfo = (userid) => {
    axios.post('http://localhost:4000/tracking', {
      userid: userid,
      shipdate: date,
      orderstatus: orderinfo
    })
    .then(data => {
      console.log(data);
      alert("Successfully Updated Order!")
    })
    .catch(err => console.log(err));
  }

  let user = JSON.parse(sessionStorage.getItem("userinfo"));

  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/delivery`)
      .then((res) => {
        console.log(res.data);
        setOrderid(res.data[0]._id);
        setBookData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Title>Transactions</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Order-Id</TableCell>
            <TableCell>Books</TableCell>
            <TableCell>Order-Status</TableCell>
            <TableCell>Order-Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookdata.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>
                {order.books.map((e) => (
                  <Paper
                    sx={{
                      height: 150,
                      width: 100,
                      margin: 1,
                      display: "inline-block",
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    }}
                    elevation={10}
                    className="bookbox"
                  >
                    <img src={e.image} className="book_image" alt="book" />
                  </Paper>
                ))}
              </TableCell>
              <TableCell>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Order Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={orderinfo}
                    onChange={setGenre}
                    label="OrderStatus"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"processed"}>Processed</MenuItem>
                    <MenuItem value={"shipped"}>Shipped</MenuItem>
                    <MenuItem value={"route"}>En Route</MenuItem>
                    <MenuItem value={"arrived"}>Arrived!</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker onChange={updateDate}/>
                </LocalizationProvider>
              </TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => updateInfo(order.customerid)}>UPDATE</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br />
    </React.Fragment>
  );
}
