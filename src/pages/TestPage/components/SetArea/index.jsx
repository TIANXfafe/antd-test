import React from 'react';
import { Form, Input, Button, Switch } from 'antd';
import { SettingOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

function SetArea(props) {
  const openDrawer = () => props.onOpen()
  const onSwitch = (checked) => props.onSwitch(checked)

  return (
    <Form layout="horizontal">
      <Form.Item label="Field A">
        <Button type="primary" onClick={openDrawer} icon={<SettingOutlined/>}>123</Button>
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder"/>
      </Form.Item>
      <Form.Item label="Field C">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={props.configurable}
          onChange={onSwitch}
        />
      </Form.Item>
    </Form>
  );
}

export default SetArea;
