import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProductAsync,
  getAllProductsAsync,
  getProductAsync,
} from "../../features/product/productSlice";
import AdminNavbar from "../../components/AdminNavbar";
import {
  Card,
  CardContent,
  FormGroup,
  Button,
  makeStyles,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  styled,
  TableCell,
} from "@material-ui/core";
import { tableCellClasses } from "@mui/material";
import { PulseLoader } from "react-spinners";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: "#435d7d",
    backgroundColor: theme.palette.action.hover,
    color: "rgba(0, 0, 0, 0.87)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const useStyles = makeStyles({
  listProducts: { backgroundColor: "#435d7d", height: "100vh" },
  card: {
    width: "95%",
    marginTop: 40,
    marginBottom: 40,
    margin: "auto",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableHeaderText: { fontSize: "24px", fontWeight: "bold" },
  tableHeaderButton: {
    backgroundColor: "#28a745",
    width: "250",
    color: "white",

    "&:hover": {
      backgroundColor: "#28a745",
    },
  },
  tableBody: {
    height: "400px !important",
    overflow: "scroll !important",
  },
  addCircleSharpIcon: {
    marginRight: 10,
  },
  editBtn: {
    edit: "#192a56",
    marginRight: 20,
    cursor: "pointer",
  },
  deleteBtn: {
    color: "red",
    cursor: "pointer",
  },
});

const ListProducts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.products.productList);
  const isLoading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  const handleEdit = async (id) => {
    await dispatch(getProductAsync(id));
    navigate(`/admin/editProduct/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete the product?")) {
      await dispatch(deleteProductAsync(id));
    }
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {isLoading ? (
        // <div>Loading...</div>
        <PulseLoader css={{ position: "absolute", top: "50%", left: "50%" }} />
      ) : (
        <div className={classes.listProducts}>
          <AdminNavbar />
          <Card
            className={classes.card}
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            <CardContent>
              <FormGroup className={classes.container}>
                <div className={classes.tableHeader}>
                  <span className={classes.tableHeaderText}>
                    Manage Products
                  </span>
                  <Button
                    className={classes.tableHeaderButton}
                    onClick={() => navigate("/admin/addProduct")}
                  >
                    <AddCircleSharpIcon
                      className={classes.addCircleSharpIcon}
                    />
                    Add Product
                  </Button>
                </div>
                <br />

                <Typography component="div">
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">ID</StyledTableCell>
                          <StyledTableCell align="center">
                            Product Name
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Description
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Price
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody
                        className={classes.tableBody}
                        style={{ maxHeight: 150 }}
                      >
                        {productList.map((product) => (
                          <StyledTableRow key={product._id}>
                            <StyledTableCell align="center" scope="row">
                              {product._id}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {product.productName}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {product.description}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {product.price}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <BorderColorIcon
                                className={classes.editBtn}
                                onClick={() => handleEdit(product._id)}
                              />
                              <DeleteOutlineIcon
                                className={classes.deleteBtn}
                                onClick={() => handleDelete(product._id)}
                              />
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Typography>
              </FormGroup>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ListProducts;
