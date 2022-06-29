import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  reset,
  register,
  getAllUsersAsync,
} from "../../features/auth/authSlice";
import Navbar from "../../components/navbar/Navbar";
import Login from "../login/Login";
// import "antd/dist/antd.css";
import { Card, Form, Input, Button, Row, Col } from "antd";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const getUsers = useSelector((state) => state.auth.users);

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, password, password2 } = formData;

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // if (isError) {
    //   toast.error(message, {
    //     position: "bottom-left",
    //     theme: "dark",
    //     autoClose: 1000,
    //     pauseOnHover: false,
    //     hideProgressBar: true,
    //   });
    // }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return (
      <PulseLoader css={{ position: "absolute", top: "50%", left: "50%" }} />
    );
  }

  const onFinish = () => {

     const userData = {
       firstName,
       lastName,
       email,
       password,
     };

     dispatch(register(userData));

    // const existEmail = getUsers.find((x) => x.email === email);

    // if (existEmail) {
    //   toast.error("This email is already available", {
    //     position: "bottom-left",
    //     theme: "dark",
    //     autoClose: 1000,
    //     pauseOnHover: false,
    //     hideProgressBar: true,
    //   });
    // } else if (password !== password2) {
    //   toast.error("Passwords do not match", {
    //     position: "bottom-left",
    //     theme: "dark",
    //     autoClose: 1000,
    //     pauseOnHover: false,
    //     hideProgressBar: true,
    //   });
    // } else {
    //   const userData = {
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //   };

    //   dispatch(register(userData));
    //   // navigate("/account/login");
    // }

    // console.log(values);
  };

  return (
    <>
      <Navbar />

      <Row>
        <Col span={8}></Col>
        <Col span={8} align="middle">
          <Card title="Register" style={{ width: 400, marginTop: 60 }}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  name="firstName"
                  value={firstName}
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  name="lastName"
                  value={lastName}
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input
                  name="email"
                  value={email}
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  name="password"
                  value={password}
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Item>
              <Form.Item
                name="password2"
                label="Confirm Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  name="password2"
                  value={password2}
                  onChange={(e) => onChangeInput(e)}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>

              <Link to="/account/login" element={<Login />}>
                <b>Already have an account?</b> Login
              </Link>
            </Form>
          </Card>
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  );
};

export default Register;
