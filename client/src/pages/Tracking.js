import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import "../styles/confirmpurchase.css";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Header from "./Header";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";

const sections = [];

const theme = createTheme();

export default function Blog() {
  const [bookdata, setBookData] = React.useState([]);
  const [orderstatus, setOrderStatus] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [date, setDate] = React.useState("");
  const [orderid, setOrderid] = React.useState("");

  const navigate = useNavigate();

  const params = useParams();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "50%",
  }));

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 25 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  function DeleteCartItem(bookid) {
    axios
      .post("http://localhost:4000/deletecartitem", {
        bookid: bookid,
      })
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      });
  }

  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/delivery/${user._id}`)
      .then((res) => {
        console.log(res.data[0]);
        setBookData(res.data[0].books);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (orderstatus === "processed") {
      setValue(25);
    } else if (orderstatus === "shipped") {
      setValue(50);
    } else if (orderstatus === "route") {
      setValue(75);
    } else if (orderstatus === "arrived") {
      setValue(100);
    }

    axios
      .get(`http://localhost:4000/delivery/${user._id}`)
      .then((res) => {
        setOrderStatus(res.data[0].orderstatus);
        const readabledate = new Date(
          res.data[0].shipdate
        ).toLocaleDateString();
        setDate(readabledate);
      })
      .catch((err) => console.log(err));
  });

  let user = JSON.parse(sessionStorage.getItem("userinfo"));
  console.log(user);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Novel Nook" sections={sections} />

        <Typography variant="h5" className="orderheader">
          Order Id: {orderid}
        </Typography>
        <br />
        <Item>
          {bookdata.map((book) => (
            <Grid key={book.image} className="bookcard" item>
              <Paper
                sx={{
                  height: 260,
                  width: 170,
                  display: "inline-block",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
                elevation={10}
                className="bookbox"
              >
                <img src={book.image} className="book_image" alt="book" />
              </Paper>
            </Grid>
          ))}
        </Item>
        <br />

        <Item>
          <TextField
            id="standard-multiline-static"
            label="Shipping Address"
            multiline
            rows={4}
            fullWidth
            defaultValue={user.address}
            variant="standard"
          />
        </Item>
        <br />
        <br />
        <Typography variant="h5" color="primary">
          Order Progress
        </Typography>
        <br />
        <Grid container>
          <Grid xs={12}>
            <LinearProgressWithLabel value={value} />
            <Typography>Expected Arrival: {date}</Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={3}>
                <br />
                <DescriptionOutlinedIcon fontSize="small" />
                <br />
                <Typography variant="h6">Order Processed</Typography>
              </Grid>
              <Grid item xs={3}>
                <br />
                <ArchiveOutlinedIcon fontSize="small" />
                <br />
                <Typography variant="h6">Order Shipped</Typography>
              </Grid>
              <Grid item xs={3}>
                <br />
                <LocalShippingOutlinedIcon fontSize="small" />
                <Typography variant="h6">Order en Route</Typography>
              </Grid>
              <Grid item xs={3}>
                <br />
                <OtherHousesOutlinedIcon fontSize="small" color="primary" />
                <br />
                <Typography variant="h6">Order Arrived</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
      </Container>
    </ThemeProvider>
  );
}
