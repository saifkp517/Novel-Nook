import * as React from "react";
import "../styles/status.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Form, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, RadioGroup } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(15),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post("http://localhost:4000/login", {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((data) => {
        console.log(data.data);
        navigate("/main");
        sessionStorage.clear();
        sessionStorage.setItem("userinfo", JSON.stringify(data.data));
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    navigate('/main')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <div className="box-shadow">
          <Card className="statuscard">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Typography component="h1" variant="h5">
                  Would you like to continue as a Customer or Vendor?
                </Typography>
                <br />
                <br />
                <Grid className="test" container spacing={2}>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Customer"
                      name="radio-buttons-group"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="customer"
                        control={<Radio />}
                        label="Customer"
                      />
                      <FormControlLabel
                        value="vendor"
                        control={<Radio />}
                        label="Vendor"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Continue
                </Button>
                <br />
              </Box>
            </Box>
          </Card>
        </div>
      </Container>
    </ThemeProvider>
  );
}
