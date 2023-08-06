import { Button, Form, Input, Layout } from "antd";

const FormLogin = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Layout
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Sistem Informasi Akademik</h1>
      <hr
        style={{
          width: "80%",
          height: "1px",
          backgroundColor: "#46CB85",
          border: "none",
        }}
      />
      <h4>Login</h4>
      <Form name="login" style={{ width: "60%" }} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            className="input-with-affix-prefix"
            prefix={<i className="ri-user-line icon-grey-input"></i>}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            className="input-with-affix-prefix"
            prefix={<i className="ri-lock-password-line icon-grey-input"></i>}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "4px" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item style={{ display: "flex", flexDirection: "row-reverse" }}>
          <a className="login-form-forgot" href="/forgot">
            Forgot password
          </a>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default FormLogin;
