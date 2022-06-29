import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllUsersAsync,
  login,
  reset,
} from "../../features/auth/authSlice";
import Navbar from "../../components/navbar/Navbar";
import Register from "../register/Register";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { Card, Col, Form, Input, Row } from "antd";

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

export default function Login() {
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
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "bottom-left",
        theme: "dark",
        autoClose: 1000,
        pauseOnHover: false,
        hideProgressBar: true,
      });
    }

    // console.log(email);

    if (isSuccess || user) {
      // navigate("/account/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onFinish = () => {
    const existEmail = getUsers.find((item) => item.email === email);

    if (existEmail) {
      if (existEmail.password === password) {
        const userData = {
          email,
          password,
        };

        dispatch(login(userData));
        navigate("/");
      } else {
        toast.error("Your password is incorrect", {
          position: "bottom-left",
          theme: "dark",
          autoClose: 1000,
          pauseOnHover: false,
          hideProgressBar: true,
        });
      }
    } else {
      toast.error("This email is not available", {
        position: "bottom-left",
        theme: "dark",
        autoClose: 1000,
        pauseOnHover: false,
        hideProgressBar: true,
      });
    }

    // if (getUsers[index].email !== email) {
    //   toast.error("This email is not available", {
    //     position: "bottom-left",
    //     theme: "dark",
    //     autoClose: 1000,
    //     pauseOnHover: false,
    //     hideProgressBar: true,
    //   });
    // } else {
    //   const userData = {
    //     email,
    //     password,
    //   };

    //   dispatch(login(userData));
    //   // navigate("/");
    // }
  };

  if (isLoading) {
    return (
      <PulseLoader css={{ position: "absolute", top: "50%", left: "50%" }} />
    );
  }

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

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmltype="submit">
                  Submit
                </Button>
              </Form.Item>

              <Link to="/account/register" element={<Login />}>
                <b>Don't have an account?</b> Register
              </Link>
            </Form>
          </Card>
        </Col>
        <Col span={8}></Col>
      </Row>
    </>
  );
}
