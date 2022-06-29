import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  FormGroup,
  FormControl,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { login } from "../../features/auth/authSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdminNavbar from "../../components/AdminNavbar";
import { Label } from "@mui/icons-material";

const useStyles = makeStyles({
  addProduct: { backgroundColor: "#435d7d", height: "100vh" },
  card: {
    width: "40%",
    marginTop: 40,
    marginBottom: 40,
    margin: "auto",
  },
  formControl: {
    paddingTop: 25,
  },
  cardHeaderText: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: "24px",
    fontWeight: "bold",
    justifyContent: "center",
  },
  addBtn: {
    backgroundColor: "#28a745",
    width: "100%",
    color: "white",

    "&:hover": {
      backgroundColor: "#28a745",
    },
  },
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const validationSchema = Yup.object({
  //   email: Yup.string().email("Invalid email format").required("Required"),
  //   password: Yup.string().required("Required"),
  // });

  // const onSubmit = () => {
  //   console.log("gjnkfm");
  // };

  const [error, setError] = useState("");

  const { email, password } = formData;

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (!email || !password) {
      setError("Please fill all Input Field");
    } else {
      setError("");
      await dispatch(login(formData));
      // navigate("/admin-register");
    }
  };

  return (
    <div className={classes.addProduct}>
      <AdminNavbar />
      {/* <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <input
                control="input"
                type="email"
                label="Email"
                name="email"
                // value={email}
              />

              <input
                control="input"
                type="password"
                label="Password"
                name="password"
                // value={password}
              />

              <button type="submit" disabled={!formik.isValid}>
                Register
              </button>
            </Form>
          );
        }}
      </Formik> */}
      <Card
        className={classes.card}
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <CardContent>
          <FormGroup
            className={classes.container}
            style={{ position: "relative" }}
          >
            <FormControl>
              <ArrowBackIcon
                onClick={() => navigate("/admin/listProducts")}
                style={{ cursor: "pointer" }}
              >
                Back
              </ArrowBackIcon>
              <span className={classes.cardHeaderText}>Register</span>
            </FormControl>
            
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-basic"
                className=""
                label="email"
                variant="outlined"
                name="email"
                value={email}
                onChange={(e) => onChangeInput(e)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-basic"
                className=""
                label="password"
                variant="outlined"
                name="password"
                value={password}
                onChange={(e) => onChangeInput(e)}
              />
            </FormControl>

            {error && <h3 style={{ color: "red" }}>{error}</h3>}

            <FormControl className={classes.formControl}>
              <Button className={classes.addBtn} onClick={handleSubmit}>
                Login
              </Button>
            </FormControl>
          </FormGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
