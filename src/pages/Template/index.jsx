import React, { useState, useEffect, useRef } from 'react';
import MainContent from '@/components/MainContent';
import { Row, Col, Input, Button, DatePicker, Space } from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { useWindowSize } from '@/utils/utils';
import styles from './index.less';

const { RangePicker } = DatePicker;

function Template(props) {
  const templateData = [
    {
      id: 1,
      name: '模板名称一',
      time: '2022-01-15',
      url: '',
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      id: 2,
      name: '模板名称二',
      time: '2022-01-15',
      url: '',
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      id: 3,
      name: '模板名称三',
      time: '2022-01-15',
      url: '',
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      id: 4,
      name: '模板名称四',
      time: '2022-01-15',
      url: '',
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      id: 5,
      name: '模板名称五',
      time: '2022-01-15',
      url: '',
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ];

  // 模版盒子主体ref
  const templateContainer = useRef(null);

  // 视窗大小
  const windowSize = useWindowSize();

  // 盒子高度
  const [containerHeight, setContainerHeight] = useState(0);
  // 模板列表
  const [templateList, setTemplateList] = useState(templateData);

  /**
   * 模版盒子高度随视窗大小变化
   */
  useEffect(() => {
    setContainerHeight(templateContainer.current.clientWidth * 1.4);
  }, [windowSize]);

  return (
    <MainContent>
      <Row className={styles.titleContainer}>
        <div className={styles.titleContent}>
          <div className={styles.searchTitle}>模板名称</div>
          <Input placeholder="请输入名称" style={{ width: '288px' }} />
        </div>
        <div className={styles.titleContent}>
          <div className={styles.searchTitle}>创建时间</div>
          <RangePicker />
        </div>
        <div className={styles.titleContent}>
          <Space size="small">
            <Button type="primary" icon={<SearchOutlined />}>
              搜索
            </Button>
            <Button icon={<RedoOutlined />}>重置</Button>
          </Space>
        </div>
      </Row>
      <Row>
        {templateList.map((item) => {
          return (
            <Col
              xs={12}
              md={8}
              xl={6}
              xxl={4}
              className={styles.templateContainer}
              style={{ height: containerHeight + 'px' }}
              ref={templateContainer}
              key={item.id}
            >
              <a className={styles.templateItem} href={item.url}>
                <img src={item.imgUrl} alt="" />
                <div className={styles.mask}>
                  <div className={styles.title}>{item.name}</div>
                  <div className={styles.post}>{item.time}</div>
                </div>
              </a>
            </Col>
          );
        })}
      </Row>
    </MainContent>
  );
}

export default Template;
