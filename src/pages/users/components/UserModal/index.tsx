import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const UserModal = props => {
  const { visible, record, onCancel, onFinish } = props;
  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue(record);
    }
  }, [visible]);

  const [form] = Form.useForm();

  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Modal
        title="UserModal"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        forceRender
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Create_time"
            name="create_time"
            rules={[
              { required: true, message: 'please input your create_time!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'please input status!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
