import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import "../styles/dash.css";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import Paper from "@mui/material/Paper";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

const mainFeaturedPost = {
  title: "Novel Nook - Book Rental Platform",
  description:
    "Our Books lending system is a service that allows individuals to rent books with each other through an online platform. Users can search and request for specific books and the lender can approve or deny the request.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
};

const theme = createTheme();

export default function Blog() {
  const navigate = useNavigate();

  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:4000/books")
      .then((res) => {
        setBooks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* {user ? (
        <div>
          <img src={user.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {user.name}</p>
          <p>Email Address: {user.email}</p>
          <br />
          <br />
          <button>Log out</button>
        </div>
      ) : (
        <button>Sign in with Google 🚀 </button>
      )} */}
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Novel Nook" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />

          <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
        </main>
      </Container>
      <br />
      <br />
      <Grid sx={{ flexGrow: 1 }} container spacing={7}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={10}>
            {books.map((book) => (
              <Grid key={book._id} className="book-card" item>
                <Paper
                  sx={{
                    height: 300,
                    width: 220,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                  elevation={10}
                  className="book"
                >
                  <img
                    src={book.bookimage}
                    onClick={() => {
                      navigate(`/confirmpurchase/${book._id}`);
                    }}
                    className="book-image"
                    alt="book"
                  />

                  <p className="description">
                    {book.title} <br /> - {book.author}
                  </p>
                </Paper>

                <br />
                <br />
                <br />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />

      <Footer
        sx={{
          backgroundColor: "#1A2027",
        }}
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
