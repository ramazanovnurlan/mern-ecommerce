import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductAsync, editProductAsync } from "../../features/product/productSlice";
import {
  Card,
  CardContent,
  FormGroup,
  FormControl,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdminNavbar from "../../components/AdminNavbar";

const useStyles = makeStyles({
  editProduct: { backgroundColor: "#435d7d", height: "100vh" },
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

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  // useEffect(() => {
  //   dispatch(getProductAsync(productId));
  // }, [dispatch]);

  //method 1
  // const getProducts = useSelector((state) => state.products.productList);
  // const getProduct = getProducts.find((x) => x.id == productId);

  //method 2
  const getProduct = useSelector((state) => state.products.product);

  const [error, setError] = useState("");
  const [productName, setProductName] = useState(getProduct.productName);
  const [description, setDescription] = useState(getProduct.description);
  const [price, setPrice] = useState(getProduct.price);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!productName || !price || !description) {
      setError("Please fill in all fields");
    } else {
      await dispatch(
        editProductAsync({
          id: productId,
          changes: { productName, description, price },
        })
      );
      navigate("/admin/listProducts");
    }
  };

  return (
    <div className={classes.editProduct}>
      <AdminNavbar />
      <Card
        className={classes.card}
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <CardContent className={classes.content}>
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
              <span className={classes.cardHeaderText}>Edit Product</span>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-basic"
                className=""
                label="Product Name"
                variant="outlined"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
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
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>

            {error && <h3 style={{ color: "red" }}>{error}</h3>}

            <FormControl className={classes.formControl}>
              <Button className={classes.addBtn} onClick={(e) => handleEdit(e)}>
                Edit Product
              </Button>
            </FormControl>
          </FormGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProduct;
