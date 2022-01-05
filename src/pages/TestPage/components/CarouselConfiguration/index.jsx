import React, {useState} from 'react';
import {Row, Col, Carousel, Tabs, Radio, Upload, Input, Button} from 'antd';

import styles from './index.less'

const {TabPane} = Tabs;

function CarouselConfiguration(props) {
  const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '400px',
    textAlign: 'center',
    background: '#364d79',
  };
  const positionList = [
    {
      name: '上',
      value: 'top'
    },
    {
      name: '下',
      value: 'bottom'
    },
    {
      name: '左',
      value: 'left'
    },
    {
      name: '右',
      value: 'right'
    },
  ]

  const handlePositionChange = ({target: {value}}) => {
    setDotPosition(value);
  };

  const handleChange = (id) => {
    console.log('id', id)
    const carouseListNew = carouselList
  }

  const submit = () => props.submit()

  const cancel = () => props.cancel()

  const reset = () => props.reset()

  const addPic = () => props.addPic()

  const onEdit = (targetKey) => props.remove(targetKey)

  const [dotPosition, setDotPosition] = useState('top');

  const uploadButton = (<div>
    <div style={{marginTop: 8}}>上传图片</div>
  </div>);
  const operations = (<Button onClick={addPic}>新增</Button>)

  return (
    <>
    <Row>
      <Col span={24}>
        <Carousel autoplay dotPosition={dotPosition}>
          {
            props.carouseData.map(item => {
              return (
                <div key={item.id}>
                  <h3 style={contentStyle}>
                    <a href={item.url}>
                      <img src={item.imgUrl} alt=""/>
                    </a>
                  </h3>
                </div>
              )
            })
          }
        </Carousel>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Row>
          <Col span={3}>位置: </Col>
          <Col span={21}>
            <Radio.Group onChange={e => handlePositionChange(e)} value={dotPosition} style={{marginBottom: 8}} size="small">
              {
                positionList.map(item => {
                  return (
                    <Radio.Button key={item.value} value={item.value}>{item.name}</Radio.Button>
                  )
                })
              }
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={3}>选择图片: </Col>
          <Col span={21}>
            <Tabs
              defaultActiveKey="1"
              tabPosition="top"
              style={{height: 275}}
              tabBarExtraContent={operations}
              type="editable-card"
              hideAdd
              size="small"
              onEdit={onEdit}
            >
              {
                props.carouseData.map(item => {
                  return (
                    <TabPane key={item.id} tab={`第${item.id}张`}>
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        onChange={() => handleChange(item.id)}
                      >
                        {item.imgUrl ? <img src={item.imgUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                      </Upload>
                      <Input addonBefore="请输入链接地址" type="text"/>
                    </TabPane>
                  )
                })
              }
            </Tabs>
          </Col>
        </Row>
        <Row className={styles.btnContent}>
          <Button type="primary" onClick={submit}>保存</Button>
          <Button onClick={cancel}>取消</Button>
          <Button onClick={reset}>重置</Button>
        </Row>
      </Col>
    </Row>
    </>
  );
}

export default CarouselConfiguration;
