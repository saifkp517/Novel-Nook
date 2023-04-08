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
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DeleteIcon from "@mui/icons-material/Delete";

const sections = [];

const theme = createTheme();

export default function Blog() {
  const [months, setMonths] = React.useState(1);
  let [total, setTotal] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);
  const [bookdata, setBookData] = React.useState([]);
  const [bill, setBill] = React.useState(0);
  const [userid, setUserid] = React.useState("");

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
        console.log("lmao");
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript("http://checkout.razorpay.com/v1/checkout.js");

    if (!res)
      return alert("Razorpay SDK failed, Check your internet connection.....");

    const result = await axios.post(`http://localhost:4000/orders/${bill}`);

    if (!result) {
      alert("Server Error, Please Wait until the servers are back online...");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_xN7z13tKqXrkzC", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: currency,
      name: "Novel Nook",
      description: "Test Transaction",
      image: "http://example.com/your_logo",
      order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        //verifyying signature confirmation
        const result = await axios
          .post("http://localhost:4000/verify-success", data)
          .then((data) => {
            axios
              .post("http://localhost:4000/rentedupdate", {
                rentedby: user._id,
                bookid: params.bookid,
                months: months,
              })
              .then((data) => {
                console.log(data);
                alert("Successfully rented a book!");
              })
              .catch((err) => console.log(err));

            axios
              .post("http://localhost:4000/notification", {
                user: userid,
                message: `${user.name} has rented your book! for ${months} months`,
              })
              .then((data) => console.log(data))
              .catch((err) => console.log(err));

            axios
              .post("http://localhost:4000/order", {
                customerid: user._id,
                shippingaddress: user.address,
                book: params.bookid,
              })
              .then((data) => console.log(data));
          });

        alert(result.data.msg);
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "orange",
      },
    };
    var razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  /////////////////////razorpay code////////////////////////////////

  const navigate = useNavigate();

  const params = useParams();

  const [item, setItem] = React.useState([]);

  function DeleteCartItem(bookid) {
    axios.post('http://localhost:4000/deletecartitem', {
      bookid: bookid
    })
    .then(data => {
      console.log(data);
      window.location.reload(false);
    })
  }

  React.useEffect(() => {
    axios.get(`http://localhost:4000/getcart/${params.userid}`).then((data) => {
      setItem(data.data);
      console.log(data.data);

      let sum = 0;

      for (let i = 0; i < data.data.length; i++) {
        sum += data.data[i].price;
        console.log(sum);
        setBill(sum);
      }
    });
  }, []);

  React.useEffect(() => {
    if (bill > 1000 && bill < 1500) {
      setDiscount(10)
    } else if (bill > 1500) {
      setDiscount(20)
    }
  })

  React.useEffect(() => {
    if (bill > 1000 && bill < 1500) {
      setTotal(bill - (discount / 100) * bill)
    } else if (bill > 1500) {
      setTotal(bill - (discount / 100) * bill)    
    } else {
      setTotal(bill)
    }
  })

  let user = JSON.parse(sessionStorage.getItem("userinfo"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Novel Nook" sections={sections} />

        <main>
          <Typography color="text.secondary" align="center" variant="h5">
            Your Shopping Cart!
          </Typography>
          <br />
          <br />
          <br />
          <Grid container>
            <Grid item xs={9}>
              <Grid container spacing={2}>
                <Item className="redline">
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 760,
                      bgcolor: "background.paper",
                    }}
                  >
                    {item.length === 0 ? (
                      <Typography>No Books in Your Cart Yet..</Typography>
                    ) : (
                      item.map((item) => (
                        <div key={item._id}>
                          <ListItem
                            secondaryAction={
                              <IconButton onClick={() => DeleteCartItem(item._id)} edge="end" aria-label="delete">
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              &nbsp;&nbsp;
                              <Paper
                                sx={{
                                  height: 150,
                                  width: 100,
                                  display: "inline-block",
                                  backgroundColor: (theme) =>
                                    theme.palette.mode === "dark"
                                      ? "#1A2027"
                                      : "#fff",
                                }}
                                elevation={10}
                                className="bookbox"
                              >
                                <img
                                  src={item.bookimg}
                                  className="book_image"
                                  alt="book"
                                />
                              </Paper>
                            </ListItemAvatar>
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            <ListItemText
                              primary={item.booktitle}
                              secondary={`${item.months} Months - ₹${item.price}`}
                            />
                          </ListItem>
                          <Divider />
                        </div>
                      ))
                    )}
                  </List>
                </Item>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <Item className="profile-card">
                <Typography variant="h5" align="left">
                  <b>ORDER</b>
                </Typography>
                <Divider />
                <br />
                <Typography variant="h6" align="left">
                  <b>SubTotal</b>: ₹{bill}
                </Typography>
                <Typography variant="h6" align="left">
                  <b>Discount</b>: {discount}%
                </Typography>
                <Typography variant="h6" align="left">
                  <b>Grand Total</b>: ₹{total}
                </Typography>

                <Divider />
                <br />
                <Typography variant="h6" align="left">
                  <Button onClick={displayRazorpay} variant="contained">
                    Pay {total} with UPI
                  </Button>
                </Typography>
              </Item>
              <br />
            </Grid>
            <Grid item xs={8}></Grid>
          </Grid>

          <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}
