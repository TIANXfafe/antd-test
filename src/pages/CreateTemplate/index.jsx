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
  Switch,
} from 'antd';
import {
  LogoutOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import { useWindowSize } from '@/utils/utils';
import styles from './index.less';
import StepOne from './components/StepOne';
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
  // 模版类型
  const [tempType, setTempType] = useState('pc');
  // 是否锁定
  const [isLock, setIsLock] = useState(false);

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

  /**
   * 切换模版类型
   */
  const changeType = (value) => setTempType(value);

  /**
   * 切换是否锁定
   */
  const changeStatus = (checked) => setIsLock(checked);

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
          <StepOne
            pcExample={pcExample}
            miniExample={miniExample}
            pcExampleHeight={pcExampleHeight}
            miniExampleHeight={miniExampleHeight}
            tempType={tempType}
            changeType={changeType}
            isLock={isLock}
            changeStatus={changeStatus}
          />
        ) : currentStep === 1 ? (
          <div>{tempType === 'pc' ? <div>456</div> : <div>879</div>}</div>
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
