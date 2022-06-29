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
import { addProductAsync } from "../../features/product/productSlice";
import FileBase64 from "react-file-base64";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdminNavbar from "../../components/AdminNavbar";
import { Label } from "@mui/icons-material";
import Form from 'react-bootstrap/Form';

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

const AddProduct = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    mainImage: "",
  });

  const [error, setError] = useState("");

  const { productName, description, price, mainImage } = formData;

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log("mainImage", mainImage);


  const handleSubmit = async (e) => {
    if (!productName || !description || !price || !mainImage) {
      setError("Please fill all Input Field");
    } else {
      setError("");
      await dispatch(addProductAsync(formData));
      navigate("/admin/listProducts");
    }
  };

  return (
    <div className={classes.addProduct}>
      <AdminNavbar />
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
              <span className={classes.cardHeaderText}>Add Product</span>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-basic"
                className=""
                label="Product Name"
                variant="outlined"
                name="productName"
                value={productName}
                onChange={(e) => onChangeInput(e)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-basic"
                className=""
                label="Description"
                variant="outlined"
                name="description"
                value={description}
                onChange={(e) => onChangeInput(e)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-basic"
                className=""
                label="Price"
                variant="outlined"
                name="price"
                value={price}
                onChange={(e) => onChangeInput(e)}
              />
            </FormControl>
            {/* <FileBase64
              multiple={false}
              name="mainImage"
              value={mainImage}
              // onDone={({ base64 }) => {
              //   setFile(base64);
              // }}
            /> */}

            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Small file input example</Form.Label>
              <Form.Control
                type="file"
                size="sm"
                name="mainImage"
                value={mainImage}
                onChange={(e) => onChangeInput(e)}
              />
            </Form.Group>

            {/* <FormControl className={classes.formControl}>
              <TextField
                type="file"
                id="outlined-basic"
                className=""
                // label="Add product main image"
                variant="outlined"
                name="mainImage"
                value={mainImage}
                onChange={(e) => onChangeInput(e)}
              />
            </FormControl> */}

            {error && <h3 style={{ color: "red" }}>{error}</h3>}

            <FormControl className={classes.formControl}>
              <Button className={classes.addBtn} onClick={handleSubmit}>
                Add Product
              </Button>
            </FormControl>
          </FormGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
