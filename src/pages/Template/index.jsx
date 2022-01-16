import React, { useState, useEffect, useRef } from 'react';
import MainContent from '@/components/MainContent';
import { history } from 'umi';
import { Row, Col, Input, Button, DatePicker, Space, Divider } from 'antd';
import { SearchOutlined, RedoOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
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

  /**
   * 跳转至新建页
   */
  const handleJumpCreate = () => {
    history.push('/create-template');
  };

  /**
   * 跳转至模板详情页
   * @param id 模板id
   */
  const handleJumpDetail = (id) => {
    history.push(`/test/test-page?id=${id}`);
  };

  return (
    <MainContent>
      <Row className={styles.titleContainer}>
        <Col className={styles.titleContent} xs={24} md={12} xl={8} xxl={6}>
          <div className={styles.searchTitle}>模板名称</div>
          <Input placeholder="请输入名称" style={{ width: '288px' }} />
        </Col>
        <Col className={styles.titleContent} xs={24} md={12} xl={8} xxl={6}>
          <div className={styles.searchTitle}>创建时间</div>
          <RangePicker />
        </Col>
        <Col className={styles.btnContent} xs={24} md={12} xl={8} xxl={{ span: 3, offset: 9 }}>
          <Space size="small">
            <Button type="primary" icon={<SearchOutlined />}>
              搜索
            </Button>
            <Button icon={<RedoOutlined />}>重置</Button>
          </Space>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Space size="small">
          <Button type="primary" icon={<EditOutlined />} onClick={handleJumpCreate}>
            新建
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />}>
            批量删除
          </Button>
        </Space>
      </Row>
      <Row>
        {templateList.map((item) => {
          return (
            <Col
              xs={12}
              md={8}
              xl={6}
              xxl={3}
              className={styles.templateContainer}
              style={{ height: containerHeight + 'px' }}
              ref={templateContainer}
              key={item.id}
            >
              <div className={styles.templateItem} onClick={() => handleJumpDetail(item.id)}>
                <img src={item.imgUrl} alt="" />
                <div className={styles.mask}>
                  <div className={styles.title}>{item.name}</div>
                  <div className={styles.post}>{item.time}</div>
                  {/*<DeleteOutlined />*/}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </MainContent>
  );
}

export default Template;
