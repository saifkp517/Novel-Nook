import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import "../styles/confirmpurchase.css";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Header from "./Header";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const sections = [];

const theme = createTheme();

export default function Blog() {
  const navigate = useNavigate();

  /////////////////////razorpay code////////////////////////////////

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

  const [bookimage, setBookImage] = React.useState("");
  const [months, setMonths] = React.useState(1);
  const [author, setAuthor] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [userid, setUserid] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [bill, setBill] = React.useState(0);
  const [rentedby, setRentedby] = React.useState("");
  const [text, setText] = React.useState("");
  const [pricing, setPricing] = React.useState("");
  const [reviews, setReviews] = React.useState([]);
  const [cart, setCart] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(1);

  const handleChange = (e) => {
    setMonths(e.target.value);
    setBill(e.target.value * pricing);
    setText(e.target.value);
  };

  const comment = (e) => {
    axios
      .post("http://localhost:4000/review", {
        user: user.name,
        book: params.bookid,
        rating: value,
        comment: text,
      })
      .then((data) => {
        console.log(data);
      });
  };

  const addToCart = (e) => {
    if (bill === 0) {
      alert("Months cannot be blank!");
      return;
    }

    axios
      .post("http://localhost:4000/addtocart", {
        book: params.bookid,
        months: months,
        bookimg: bookimage,
        booktitle: title,
        price: bill,
        user: user._id,
      })
      .then((data) => {
        console.log(data);
        setOpen(true);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  const closeNotif = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeNotif}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const params = useParams();

  axios
    .get(`http://localhost:4000/user/${userid}`)
    .then((data) => {
      setOwner(data.data.name);
    })
    .catch((err) => console.log(err));

  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/bookid/${params.bookid}`)
      .then((data) => {
        setBookImage(data.data.bookimage);
        setAuthor(data.data.author);
        setTitle(data.data.title);
        setUserid(data.data.user);
        setRentedby(data.data.rentedby);
        setPricing(data.data.pricing);
        setDescription(data.data.description);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:4000/bookreview/${params.bookid}`)
      .then((res) => {
        setReviews(res.data);
      });
  }, []);

  React.useEffect(() => {
    axios
      .post(`http://localhost:4000/checkitem/${user._id}`, {
        bookid: params.bookid,
      })
      .then((res) => {
        if (res.data.length !== 0) {
          setCart(true)
        }
        console.log(res.data)
      });
  });

  let user = JSON.parse(sessionStorage.getItem("userinfo"));
  console.log(user);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Novel Nook" sections={sections} />
        <Typography variant="h4">{title}</Typography>
      </Container>
      <br />
      <br />
      <Grid sx={{ flexGrow: 1 }} container spacing={6}>
        <Grid className="maingrid" item xs={12}>
          <div className="bookinfo">
            <img height={600} width={420} src={bookimage} />
            <h2> - {author}</h2>
          </div>
          <div className="info">
            <br />
            <br />
            <br />
            <br />
            <Typography variant="h4">Book Description</Typography>
            <br />
            <p>{description}</p>
            <br />
            <Divider />
            <br />
            <Typography>
              Monthly Pricing- <b>₹{pricing}</b>
            </Typography>
            <br />
            <Typography variant="h5">
              {userid === user._id ? (
                <p>Owned By You!</p>
              ) : (
                <p>Owned By: {owner}</p>
              )}
            </Typography>
            <br />
            {userid === user._id ? (
              <Button disabled variant="contained">
                You Own This Book
              </Button>
            ) : (
              <div>
                <TextField
                  id="standard-basic"
                  label="Months"
                  variant="standard"
                  onChange={handleChange}
                />
                <h2>Bill: ₹{bill}</h2>
                {cart == false ? (
                  <Button
                    onClick={() => addToCart()}
                    color="success"
                    variant="contained"
                  >
                    ADD TO CART
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate(`/delivery/${user._id}`)}
                    variant="contained"
                  >
                    ADDED TO CART
                  </Button>
                )}
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={closeNotif}
                  message="Successfully added to cart"
                  action={action}
                />

                {/* <Button onClick={displayRazorpay} variant="contained">
                  Pay ₹{bill} with UPI
                </Button> */}
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <br />
          <Typography variant="h5">
            <b>Reviews</b>
          </Typography>
          <div className="parent">
            <TextField
              id="outlined-basic"
              label="Comment"
              fullWidth
              multiline
              sx={{ maxWidth: 560 }}
              variant="standard"
              onChange={handleChange}
            />
            &nbsp; &nbsp;
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <br />
            <br />
            <Button
              onClick={() => comment()}
              size="large"
              variant="outlined"
              color="secondary"
            >
              POST
            </Button>
            <br />
            <br />
          </div>
        </Grid>
        <Grid className="center" item xs={12}>
          <List
            sx={{ width: "100%", maxWidth: 660, bgcolor: "background.paper" }}
          >
            {reviews.map((review) => (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={review.user} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={review.user}
                  secondary={
                    <React.Fragment>
                      {review.comment}
                      <br />
                      <b>Rating</b> - {review.rating}
                      <br />
                      {new Date(review.review_date).toLocaleDateString()}
                      <br />
                      <Divider />
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
