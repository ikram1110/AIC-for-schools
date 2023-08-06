import { Col, Row } from "antd";
import React, { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import TitleLogin from "./TitleLogin";
import FormLogin from "./FormLogin";

const Login = () => {
  return (
    <Fragment>
      <Helmet>
        <title>LogIn | AIS of Schools</title>
      </Helmet>
      <Row align={"middle"} style={{ minWidth: "100vw" }}>
        <Col xs={0} md={10} style={{ width: "100%", height: "100vh" }}>
          <TitleLogin />
        </Col>
        <Col xs={24} md={14} style={{ width: "100%", height: "100vh" }}>
          <FormLogin />
        </Col>
      </Row>
    </Fragment>
  );
};
export default Login;
