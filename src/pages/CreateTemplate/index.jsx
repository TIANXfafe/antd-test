import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Space,
  Steps,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Radio,
  Skeleton,
} from 'antd';
import {
  LogoutOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import { useWindowSize } from '@/utils/utils';
import styles from './index.less';
import classNames from 'classnames';

const { Step } = Steps;
const { RangePicker } = DatePicker;

function CreateTemplate(props) {
  const windowSize = useWindowSize();

  // pc端示例的ref
  const pcExample = useRef(null);
  // 小程序示例的ref
  const miniExample = useRef(null);

  // 当前步骤
  const [currentStep, setCurrentStep] = useState(0);
  // pc端示例高度
  const [pcExampleHeight, setPcExampleHeight] = useState(0);
  // 小程序示例的高度
  const [miniExampleHeight, setMiniExampleHeight] = useState(0);

  /**
   * pc端示例、小程序示例高度随视窗大小变化
   */
  useEffect(() => {
    setPcExampleHeight(pcExample.current.clientWidth * 0.7);
    setMiniExampleHeight(miniExample.current.clientWidth * 2);
  }, [windowSize]);

  /**
   * 上一步
   */
  const preStep = () => {
    if (currentStep === 0) history.goBack();
    else setCurrentStep(currentStep - 1);
  };

  /**
   * 下一步
   */
  const nextStep = () => {
    if (currentStep === 2) history.goBack();
    else setCurrentStep(currentStep + 1);
  };

  return (
    <Card>
      <Steps current={currentStep} status="error">
        <Step />
        <Step />
        <Step />
      </Steps>
      <Divider />
      <Card>
        {currentStep === 0 ? (
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
                  <Radio.Group>
                    <div className={classNames(styles.radioContent, styles.pcContent)}>
                      <Radio value="pc">PC端</Radio>
                      <div
                        className={styles.typeContent}
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
              </Form>
            </Col>
          </Row>
        ) : currentStep === 1 ? (
          <div>456</div>
        ) : (
          <div>789</div>
        )}
        <div className={styles.btnContent}>
          <Space size="small">
            <Button
              type={currentStep === 0 ? '' : 'primary'}
              icon={currentStep === 0 ? <LogoutOutlined /> : <ArrowLeftOutlined />}
              onClick={preStep}
            >
              {currentStep === 0 ? '取消' : '上一步'}
            </Button>
            <Button
              type="primary"
              icon={currentStep === 2 ? <CheckOutlined /> : <ArrowRightOutlined />}
              onClick={nextStep}
            >
              {currentStep === 2 ? '完成' : '下一步'}
            </Button>
          </Space>
        </div>
      </Card>
    </Card>
  );
}

export default CreateTemplate;
