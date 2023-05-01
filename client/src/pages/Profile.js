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
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { Typography } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";

const sections = [];

const mainFeaturedPost = {
  title: "Profile Page",
  description: "",
  image: "https://source.unsplash.com/v8DSLoY80Xk",
  imageText: "main image description",
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
  const navigate = useNavigate();

  const [file, setFile] = React.useState(null);

  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userinfo"));
    console.log(user.name);

    axios.get(`http://localhost:4000/bookowned/${user._id}`).then((res) => {
      console.log(res.data);
      setBooks(res.data);
    });
  }, []);

  const [bookinfo, setBookinfo] = React.useState({
    title: "",
    author: "",
    genre: "",
    pricing: "",
    description: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let user = JSON.parse(sessionStorage.getItem("userinfo"));
  console.log(user.name);

  const handleChange = (e) => {
    setBookinfo({ ...bookinfo, [e.target.id]: e.target.value });
  };

  const setGenre = (e) => {
    setBookinfo({ genre: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", bookinfo.title);
    formData.append("author", bookinfo.author);
    formData.append("genre", bookinfo.genre);
    formData.append("userid", user._id);
    formData.append("pricing", bookinfo.pricing);
    formData.append("description", bookinfo.description);
    try {
      await axios({
        method: "post",
        url: "http://localhost:4000/book",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((data) => {
          console.log(formData);
          alert("Successfully added a book");
          setOpen(false);
          navigate("/main");
        })
        .catch((err) => console.log("It is an error"));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Novel Nook" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item className="profile-card">
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
                      <Button onClick={handleClickOpen}>Add a Book</Button>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Upload a Book!</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Book Title"
                            onChange={handleChange}
                            type="text"
                            value={bookinfo.title}
                            fullWidth
                            variant="outlined"
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="pricing"
                            label="Monthly Charge"
                            onChange={handleChange}
                            fullWidth
                            value={bookinfo.pricing}
                            type="text"
                            variant="outlined"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                            }}
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="author"
                            label="Author"
                            onChange={handleChange}
                            value={bookinfo.author}
                            fullWidth
                            type="text"
                            variant="outlined"
                          />
                          <br />
                          <br />
                          <FormControl fullWidth>
                            <InputLabel id="genre">Genre</InputLabel>
                            <Select
                              id="genre"
                              value={bookinfo.genre}
                              margin="dense"
                              label="Genre"
                              fullWidth
                              variant="outlined"
                              onChange={setGenre}
                            >
                              <MenuItem value={"Science Fiction"}>
                                Science Fiction
                              </MenuItem>
                              <MenuItem value={"Mystery"}>Mystery</MenuItem>
                              <MenuItem value={"Fiction"}>Fiction</MenuItem>
                              <MenuItem value={"Humor"}>Humor</MenuItem>
                              <MenuItem value={"Spirituality"}>
                                Spirituality
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <br />
                          <br />
                          <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            value={bookinfo.description}
                            onChange={handleChange}
                            label="Description"
                            type="text"
                            multiline
                            fullWidth
                            variant="outlined"
                          />
                          <br />
                          <br />

                          <form onSubmit={handleSubmit}>
                            {/* <Button type="file" variant="outlinedy" onChange={handleFileSelect}>Choose File</Button> */}
                            <input type="file" onChange={handleFileSelect} />
                            <Button
                              type="submit"
                              variant="outlined"
                              value="Upload File"
                            >
                              UPLOAD
                            </Button>
                          </form>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  </Box>
                </div>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item className="profile-card">
                <br />
                <Typography variant="h4" align="left">
                  Account Balance
                </Typography>
                <Divider />
                <br />
                <Typography variant="h6" align="left">
                  $1200
                </Typography>
                <br />
              </Item>
              <br />

              <Item className="profile-card-books">
                <br />
                <Typography variant="h4">
                  {books.length === 0 ? `No Books Uploaded` : `BOOKS YOU OWN`}
                </Typography>
                <br />
                {books.map((book) => (
                  <Grid key={book._id} className="bookcard" item>
                    <Paper
                      sx={{
                        height: 200,
                        width: 150,
                        display: "inline-block",
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                      }}
                      elevation={10}
                      className="bookbox"
                    >
                      <img
                        src={book.bookimage}
                        onClick={() => {
                          navigate(`/confirmpurchase/${book._id}`);
                        }}
                        className="book_image"
                        alt="book"
                      />
                      <p className="description">
                        {book.title} <br /> - {book.author}
                      </p>
                      {book.rentedby === null ? <Button>RENTED</Button> : <Button></Button>}
                    </Paper>
                    <br />
                    <br />
                  </Grid>
                ))}
                <br />

                <br />
              </Item>
            </Grid>
            <Grid item xs={8}></Grid>
          </Grid>

          <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
        </main>
      </Container>
      <br />
      <br />
      <Grid sx={{ flexGrow: 1 }} container spacing={7}></Grid>
    </ThemeProvider>
  );
}
