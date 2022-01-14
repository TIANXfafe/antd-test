import React, { useState, useEffect, useRef } from 'react';
import MainContent from '@/components/MainContent';
import { Row, Col } from 'antd';
import { useWindowSize } from '@/utils/utils';
import styles from './index.less';

function Template(props) {
  // 模版盒子主体ref
  const templateContainer = useRef(null);

  // 视窗大小
  const windowSize = useWindowSize();

  // 盒子高度
  const [containerHeight, setContainerHeight] = useState(0);

  /**
   * 模版盒子高度随视窗大小变化
   */
  useEffect(() => {
    setContainerHeight(templateContainer.current.clientWidth * 1.2);
  }, [windowSize]);

  return (
    <MainContent>
      <Row>
        <Col
          xs={12}
          md={8}
          xl={6}
          className={styles.templateContainer}
          style={{ height: containerHeight + 'px' }}
          ref={templateContainer}
        >
          <a className={styles.templateItem} href="#">
            <img
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt=""
            />
          </a>
        </Col>
        <Col
          xs={12}
          md={8}
          xl={6}
          className={styles.templateContainer}
          style={{ height: containerHeight + 'px' }}
          ref={templateContainer}
        >
          <div className={styles.templateItem}>1</div>
        </Col>
        <Col
          xs={12}
          md={8}
          xl={6}
          className={styles.templateContainer}
          style={{ height: containerHeight + 'px' }}
          ref={templateContainer}
        >
          <div className={styles.templateItem}>1</div>
        </Col>
        <Col
          xs={12}
          md={8}
          xl={6}
          className={styles.templateContainer}
          style={{ height: containerHeight + 'px' }}
          ref={templateContainer}
        >
          <div className={styles.templateItem}>1</div>
        </Col>
        <Col
          xs={12}
          md={8}
          xl={6}
          className={styles.templateContainer}
          style={{ height: containerHeight + 'px' }}
          ref={templateContainer}
        >
          <div className={styles.templateItem}>1</div>
        </Col>
        <Col
          xs={12}
          md={8}
          xl={6}
          className={styles.templateContainer}
          style={{ height: containerHeight + 'px' }}
          ref={templateContainer}
        >
          <div className={styles.templateItem}>1</div>
        </Col>
        <Col
          xs={12}
          md={8}
          xl={6}
          className={styles.templateContainer}
          style={{ height: containerHeight + 'px' }}
          ref={templateContainer}
        >
          <div className={styles.templateItem}>1</div>
        </Col>
      </Row>
    </MainContent>
  );
}

export default Template;
