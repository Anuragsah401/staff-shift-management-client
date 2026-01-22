import React from "react";

import { Button, Checkbox, Form, Input } from "antd";
import Label from "../components/ui/Label";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const submit = () => {
    console.log("clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Login in</h3>
        <div className="mb-8">Enter your credentials to access your dashboard</div>

        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onClick={submit}
          autoComplete="off"
          className="w-full"
        >
          <Label htmlFor="email">Email</Label>
          <Form.Item
            name="Email Address"
            rules={[{ type: "email", required: true, message: "Please input your valid email!" }]}
          >
            <Input />
          </Form.Item>
          <Label htmlFor="password">Password</Label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
