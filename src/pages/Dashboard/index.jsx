import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Calendar, Badge } from 'antd';
import moment from 'moment';
import classNames from 'classnames';
import MainContent from '@/components/MainContent';
import styles from './index.less';
import { useWindowSize } from '@/utils/utils';

function Dashboard(props) {
  const windowSize = useWindowSize();

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
  const data1 = [
    {
      id: 1,
      data: 1,
    },
    {
      id: 2,
      data: 2,
    },
    {
      id: 3,
      data: 3,
    },
    {
      id: 4,
      data: 4,
    },
    {
      id: 5,
      data: 1,
    },
  ];

  const baseBoxRef = useRef();

  // 每个日期数据
  const [dailyData, setDailyData] = useState(data);
  // 遮罩层轮播图数据
  const [maskData, setMaskData] = useState(data1);
  // 是否显示遮罩层
  const [flag, setFlag] = useState(false);
  // 轮播图总宽度
  const [carouselWidth, setCarouselWidth] = useState(0);
  // 轮播图偏移量
  const [carouselOffset, setCarouselOffset] = useState(0);
  // 初始在中间的index
  const [originActive, setOriginActive] = useState(1);

  const [leftOffset, setLeftOffset] = useState(0);
  const [mouseOffset, setMouseOffset] = useState(0);

  useEffect(() => {
    setCarouselWidth(baseBoxRef.current.offsetWidth);
    setCarouselOffset(-baseBoxRef.current.offsetWidth * 0.6);
  }, [windowSize]);

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

  /**
   * 日期点击事件
   * @param value
   */
  const onSelect = (value) => {
    console.log('vvv', moment(value.format('YYYY-MM-DD')).format('x'));
    setFlag(!flag);
  };

  const touchStart = (e) => {
    setLeftOffset(e.changedTouches[0].clientX);
  };
  const touchEnd = (e) => {
    const subX = e.changedTouches[0].clientX - leftOffset;
    if (subX > 50) {
      console.log('右滑');
      const originOffset = carouselOffset;
      setCarouselOffset(originOffset - -baseBoxRef.current.offsetWidth * 0.7);
    } else if (subX < -50) {
      console.log('左滑');
      const originOffset = carouselOffset;
      setCarouselOffset(originOffset + -baseBoxRef.current.offsetWidth * 0.7);
    } else {
      console.log('无效');
    }
  };
  const mouseDown = (e) => {
    setMouseOffset(e.clientX);
  };
  const mouseUp = (e) => {
    const subX = e.clientX - mouseOffset;
    if (subX > 50) {
      console.log('右滑');
      const originOffset = carouselOffset;
      const originIndex = originActive;
      setCarouselOffset(originOffset - -baseBoxRef.current.offsetWidth * 0.7);
      setOriginActive(originIndex - 1);
    } else if (subX < -50) {
      console.log('左滑');
      const originOffset = carouselOffset;
      const originIndex = originActive;
      if (originIndex > 0 && originIndex < 3) {
        setCarouselOffset(originOffset + -baseBoxRef.current.offsetWidth * 0.7);
        setOriginActive(originIndex + 1);
      } else {
        console.log('11');
        setCarouselOffset(-baseBoxRef.current.offsetWidth * 0.6);
        setOriginActive(1);
      }
    } else {
      console.log('无效');
    }
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
        <div
          className={classNames(styles.mask, flag ? styles.show : styles.hidden)}
          ref={baseBoxRef}
        >
          <div
            className={styles.carouselContent}
            style={{ width: `${carouselWidth * 0.7 * 5}px` }}
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
          >
            {maskData.map((item, index) => {
              return (
                <div
                  className={styles.carouselItem}
                  key={item.id}
                  style={{
                    width: `${carouselWidth * 0.6}px`,
                    marginLeft: `${carouselWidth * 0.1}px`,
                    transform: `translateX(${carouselOffset}px)`,
                  }}
                >
                  <div
                    className={classNames(
                      styles.carouselMaintain,
                      index === originActive ? styles.active : '',
                    )}
                  >
                    {item.data}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Row>
    </MainContent>
  );
}

export default Dashboard;
