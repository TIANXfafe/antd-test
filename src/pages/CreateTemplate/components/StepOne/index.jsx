import React from 'react';
import { Col, DatePicker, Form, Input, Radio, Row, Skeleton, Switch } from 'antd';
import classNames from 'classnames';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './index.less';

const { RangePicker } = DatePicker;

function StepOne(props) {
  const {
    pcExample,
    miniExample,
    pcExampleHeight,
    miniExampleHeight,
    changeType,
    tempType,
    changeStatus,
    isLock,
  } = props;
  console.log('tempType', tempType);

  const changeLockStatus = (checked) => changeStatus(checked);

  const changeTempType = (event) => changeType(event.target.value);

  return (
    <Row className={styles.firstStep}>
      <Col xs={24} md={{ span: 12, offset: 6 }} xxl={{ span: 8, offset: 8 }}>
        <Form layout="vertical">
          <Form.Item
            label="模板名称"
            name="templateName"
            rules={[{ required: true, message: '请输入模板名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="生效时间"
            name="effectiveTime"
            rules={[{ required: true, message: '请选择生效时间!' }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item
            label="模板类型"
            name="templateType"
            rules={[{ required: true, message: '请选择模板类型!' }]}
          >
            <Radio.Group value={tempType} onChange={changeTempType}>
              <div className={styles.radioContent}>
                <Radio value="pc">PC端</Radio>
                <div
                  className={classNames(styles.typeContent, styles.pcContent)}
                  ref={pcExample}
                  style={{ height: pcExampleHeight + 'px' }}
                >
                  <div className={styles.pcTitle}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.pcBody}>
                    <Skeleton active />
                  </div>
                </div>
              </div>
              <div className={styles.radioContent}>
                <Radio value="mini-program">小程序</Radio>
                <div
                  className={classNames(styles.typeContent, styles.miniContent)}
                  ref={miniExample}
                  style={{ height: miniExampleHeight + 'px' }}
                >
                  <div className={styles.miniTitle}>
                    <span />
                  </div>
                  <div className={styles.miniBody}>
                    <Skeleton active />
                  </div>
                </div>
              </div>
              {/*<Radio value="andriod">item 3</Radio>*/}
            </Radio.Group>
          </Form.Item>
          <Form.Item label="是否启用" name="isAble" valuePropName="checked">
            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
          </Form.Item>
          <Form.Item label="是否锁定" name="isLocked">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={changeLockStatus}
            />
          </Form.Item>
          {isLock ? (
            <>
              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="确认密码"
                name="checkPassword"
                rules={[{ required: true, message: '请再次输入密码!' }]}
              >
                <Input.Password />
              </Form.Item>
            </>
          ) : (
            <></>
          )}
        </Form>
      </Col>
    </Row>
  );
}

export default StepOne;
