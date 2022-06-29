import * as React from "react";
import Navbar from "../../components/navbar/Navbar";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  card: {
    width: "40%",
    marginTop: 40,
    marginBottom: 40,
    margin: "auto",
  },
});

const Account = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Navbar />
      <section className="account-container">
        <Card
          className={classes.card}
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Register" {...a11yProps(0)} />
                  <Tab label="Login" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                {/* <SignIn /> */}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {/* <SignUp /> */}
              </TabPanel>
            </Box>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default Account;
