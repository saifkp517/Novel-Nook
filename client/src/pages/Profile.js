import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import "../styles/profile.css";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import jwt_decode from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const sections = [];

const mainFeaturedPost = {
  title: "Profile Page",
  description: "",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function Blog() {
  const testarr = [1, 2, 3, 4, 5];

  let user;

  if (sessionStorage.getItem("googleinfo") != null) {
    user = jwt_decode(sessionStorage.getItem("googleinfo"));
    console.log(user);
  } else {
    user = JSON.parse(sessionStorage.getItem("userinfo"));
    console.log(user.name);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Novel Nook" sections={sections} />
        <main>
          <br />
          <MainFeaturedPost post={mainFeaturedPost} />

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <div className="profile">
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <Box sx={{ my: 3, mx: 2 }}>
                      <Grid container alignItems="center">
                        <Grid item xs>
                          <Typography gutterBottom variant="h4" component="div">
                            <Avatar
                              className="profile-pic"
                              src={user.picture}
                              sx={{ width: 100, height: 100 }}
                            />
                          </Typography>
                          <br />
                          <br />
                          <Typography gutterBottom variant="p" component="div">
                            Joined at:{" "}
                            {new Date(user.joined_date).toLocaleDateString()}
                          </Typography>
                          <Typography gutterBottom variant="h4" component="div">
                            {user.name}
                          </Typography>
                          <Typography gutterBottom variant="p" component="div">
                            {user.email}
                          </Typography>

                          <Divider variant="middle" />
                          <br />
                        </Grid>
                      </Grid>
                      <Typography color="text.secondary" variant="body2">
                        Pinstriped cornflower blue cotton blouse takes you on a
                        walk to the park or just down the hall.
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                      <Button>Add a Book</Button>
                    </Box>
                  </Box>
                </div>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item>
                <TextField
                  id="standard-helperText"
                  label="Edit and save your bio profile"
                  fullWidth
                  variant="standard"
                  multiline
                />
                <div className="button">
                  <Button variant="outlined">SAVE</Button>
                </div>
              </Item>
            </Grid>
          </Grid>

          <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
        </main>
      </Container>
      <br />
      <br />
      <Grid sx={{ flexGrow: 1 }} container spacing={7}>
        <Grid item xs={12}>
          {user ? (
            <div>
              <img src={user.picture} alt="user image" />
              <h3>User Logged in</h3>
              <p>Name: {user.name}</p>
              <p>Email Address: {user.joined_date}</p>
              <br />
              <br />
              <button>Log out</button>
            </div>
          ) : (
            <button>Sign in with Google 🚀 </button>
          )}

          <h1>Upload Image</h1>

          <form
            action="/uploadphoto"
            encType="multipart/form-data"
            method="POST"
          >
            <input type="file" name="myimage" accept="image/*" />
            <input type="submit" value="Upload Photo" />
          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
