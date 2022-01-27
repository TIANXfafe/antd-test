import React, { useState } from 'react';
import { Row, Col, Calendar, Badge } from 'antd';
import moment from 'moment';
import MainContent from '@/components/MainContent';
import styles from './index.less';

function Dashboard(props) {
  const startTime = 1640966400000;
  const endTime = 1643644799000;
  const data = [
    /**
     * type:
     *    success: 新增
     *    error: 删除
     *    processing: 编辑
     */
    {
      timeLimit: [1640966400000, 1641052799000],
      listData: [
        { type: 'warning', content: 'warning1.' },
        { type: 'success', content: 'success1.' },
      ],
    },
    {
      timeLimit: [1641052800000, 1641139199000],
      listData: [
        { type: 'warning', content: 'warning2.' },
        { type: 'success', content: 'success2.' },
      ],
    },
    {
      timeLimit: [1641139200000, 1641225599000],
      listData: [
        { type: 'warning', content: 'warning3.' },
        { type: 'processing', content: 'success3.' },
      ],
    },
  ];

  const [dailyData, setDailyData] = useState(data);
  const [flag, setFlag] = useState(false);

  const getListData = (value) => {
    let listData;
    dailyData.length &&
      dailyData.map((item) => {
        const temporaryDate = moment(item.timeLimit[0]).format('YYYY-MM-DD');
        const tempDateList = temporaryDate.split('-');
        if (
          value.year() === parseInt(tempDateList[0]) &&
          value.month() === tempDateList[1] - 1 &&
          value.date() === parseInt(tempDateList[2])
        ) {
          listData = item.listData;
        }
      });
    return listData || [];
  };

  /**
   * 自定义渲染日期单元格，返回内容会被追加到单元格
   * @param value
   * @returns {JSX.Element}
   */
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  /**
   * 自定义渲染月单元格，返回内容会被追加到单元格
   * @param value
   * @returns {JSX.Element|null}
   */
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const onSelect = (value) => {
    console.log('vvv', moment(value.format('YYYY-MM-DD')).format('x'));
    setFlag(!flag);
  };

  return (
    <MainContent>
      <Row className={styles.calendarContent}>
        <Col sm={0} md={24}>
          <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            onSelect={onSelect}
          />
        </Col>
        <Col sm={24} md={0}>
          <Calendar fullscreen={false} onSelect={onSelect} />
        </Col>
        <div className={styles.DetailContent} style={{ display: flag ? 'block' : 'none' }}>
          123
        </div>
      </Row>
    </MainContent>
  );
}

export default Dashboard;