import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import "../styles/dash.css";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import Paper from '@mui/material/Paper';
import Footer from "./Footer";
import image from '../pages/book.jpg'

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
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const theme = createTheme();

export default function Blog() {

  const testarr = [1, 2, 3, 4, 5]

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
        <Grid container justifyContent="center" spacing={7}>
          {testarr.map((value) => (
            <Grid key={value} item>
              <Paper
                sx={{
                  height: 300,
                  width: 220,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
                elevation={10}
              >
                <img src={image} className="book-image" alt="book" />
                <p className="description">WHEREVER YOU GO THERE YOU ARE<br/>- Jon Kabat Zim </p>
              </Paper>
              <br/>
              <br/>
              <br/>
            </Grid>
          ))}
        </Grid>

      </Grid>
      </Grid>
      <Footer
        sx={{
          backgroundColor: '#1A2027'
        }}
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
