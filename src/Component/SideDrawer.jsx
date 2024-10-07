import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import NewsCard from "./NewsCard";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { Button } from "@mui/material";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideDrawer({
  data,
  loading,
  categorysArrayData,
  Select_data_language,
  categorysArray,
}) {
  let localStorage_language = localStorage.getItem("language");
  localStorage_language=JSON.parse(localStorage_language)
  let { id } = useParams();
  let requried = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const typeOfNews = (event, text ,index) => {
    categorysArray.map((ele,index1)=>{
      if(index==index1){
        requried(`/${ele.toLowerCase()}`);
      }
    })
    handleDrawerClose();

  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {id ? id.toUpperCase()  : "News"}
          </Typography>
        </Toolbar>
      </AppBar>
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
        open={open}
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
        <div>
          <Button
            variant="contained"
            value={"en"}
            onClick={Select_data_language}
            disabled={localStorage_language =="en"}
          >
            Englsih
          </Button>
          <Button
            variant="contained"
            value={"hi"}
            style={{marginLeft:"4px"}}
            onClick={Select_data_language}
            disabled={localStorage_language =="hi"}

          >
           हिन्दी
          </Button>
        </div>
        <List>
          {categorysArrayData.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={(event) => typeOfNews(event, text ,index)}>
                <ListItemText id={text} primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {loading ? (
        <Loading />
      ) : (
        <Main open={open}>
          <DrawerHeader />
          <Typography sx={{ marginBottom: 2, marginLeft: 15 }}>
            <NewsCard data={data} />
          </Typography>
        </Main>
      )}
    </Box>
  );
}
