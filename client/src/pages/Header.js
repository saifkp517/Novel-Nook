import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import jwt_decode from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const { sections, title } = props;

  const navigate = useNavigate();

  const Logout = (res) => {
    sessionStorage.clear();
    navigate("/");
  };

  let user;

  if (sessionStorage.getItem("googleinfo") != null) {
    user = jwt_decode(sessionStorage.getItem("googleinfo"));
    console.log(typeof(user));
  } else {
    user = JSON.parse(sessionStorage.getItem("userinfo"));
    console.log(user);
  }

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button
          onClick={() => {
            Logout();
          }}
          size="small"
        >
          Logout
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {user ? (
          <div onClick={() => navigate('/profile')}>
            <Avatar  alt={user.name} src={user.name} />
            {/* <h3>User Logged in</h3>
            <p>Name: {user.name}</p>
            <p>Email Address: {user.email}</p>
            <br />
            <br />
            <button>Log out</button> */}
          </div>
        ) : (
          <Button variant="outlined" size="small">
            Sign up
          </Button>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
