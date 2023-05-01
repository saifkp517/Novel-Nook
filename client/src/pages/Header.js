import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import ListItem from "@mui/material/ListItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import axios from "axios";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useTheme } from "@emotion/react";

function Header(props) {
  const { sections, title } = props;
  const theme = useTheme();

  const [options, setOptions] = React.useState([]);

  const [notifno, setNotifno] = React.useState(0);

  //////////////////////////////////////drawer code//////////////////////////////

  React.useEffect(() => {
    axios.get(`http://localhost:4000/notification/${user._id}`).then((data) => {
      setNotifno(data.data.length);
      setOptions(data.data);
    });
  }, []);

  const NotifDel = (notifid) => {
    axios
      .post("http://localhost:4000/notifdel", {
        notifid: notifid,
      })
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    if (notifno > 0) {
      setAnchorEl(event.currentTarget);
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const Logout = (res) => {
    sessionStorage.clear();
    navigate("/");
  };

  let user;

  user = JSON.parse(sessionStorage.getItem("userinfo"));
  console.log(user);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const drawerWidth = 240;

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(drawerOpen && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItemButton
              onClick={() => {
                navigate(`/delivery/${user._id}`);
              }}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate(`/tracking`);
              }}
            >
              <ListItemIcon>
                <LocalShippingOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Tracking" />
            </ListItemButton>
            <ListItemButton onClick={() => Logout()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Drawer>
        <Typography
          component="h2"
          variant="h5"
          onClick={() => {
            navigate("/main");
          }}
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <List component="nav" aria-label="Device settings">
            <ListItem
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
            >
              <StyledBadge badgeContent={notifno} color="secondary">
                <NotificationsIcon />
              </StyledBadge>
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {options.map((option) => (
              <div>
                <MenuItem>
                  <ListItemText>{option.message}</ListItemText>
                  &nbsp; &nbsp;
                  <DeleteIcon onClick={() => NotifDel(option._id)} />
                </MenuItem>
              </div>
            ))}
          </Menu>
        </IconButton>
        &nbsp; &nbsp;
        {user ? (
          <div onClick={() => navigate("/profile")}>
            <Avatar alt={user.name} src={user.name} />
            {/* <h3>User Logged in</h3>
            <p>Name: {user.name}</p>
            <p>Email Address: {user.email}</p>
            <br />
            <br />
            <button>Log out</button> */}
          </div>
        ) : (
          <Button
            onClick={() => {
              navigate("/");
            }}
            variant="outlined"
            size="small"
          >
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
