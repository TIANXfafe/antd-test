import React, {useState} from 'react';
import MainContent from "@/components/MainContent";
import {Row, Drawer} from 'antd';
import styles from './index.less'

import CarouselConfiguration from "./components/CarouselConfiguration";
import DragDrop from "./components/DragDrop";

function TestPage() {
  // 轮播图列表
  const carouselList = [
    {
      id: 1,
      url: '',
      imgUrl: ''
    },
    {
      id: 2,
      url: '',
      imgUrl: ''
    },
    {
      id: 3,
      url: '',
      imgUrl: ''
    },
  ]
  // 组件列表
  const componentList = [
    {
      id: 'c1',
      content: 'c1',
      sort: 1,
      type: 'carousel'
    },
    {
      id: 'c2',
      content: 'c2',
      sort: 2,
      type: ''
    },
    {
      id: 'c3',
      content: 'c3',
      sort: 3,
      type: ''
    },
  ]
  // 展示列表
  const displayList = [
    {
      id: 'd1',
      content: 'd1',
      sort: 1,
      type: 'carousel'
    },
    {
      id: 'd2',
      content: 'd2',
      sort: 2,
      type: 'classification'
    },
    {
      id: 'd3',
      content: 'd3',
      sort: 3,
      type: 'carousel'
    },
  ]
  // 用于重置的轮播图列表
  const resetList = JSON.parse(JSON.stringify(carouselList))

  // 轮播图数据
  const [carouseData, setCarouseData] = useState(carouselList)
  const [componentLibrary, setComponentLibrary] = useState(componentList)
  const [displayComponent, setDisplayComponent] = useState(displayList)
  const [visible, setVisible] = useState(false)
  const [configurable, setConfigurable] = useState(true)

  /**
   * 打开弹窗回调
   */
  const onOpen = () => setVisible(true)
  /**
   * 弹窗提交回调
   */
  const onSubmit = () => setVisible(false)
  /**
   * 弹窗重置回调
   */
  const reset = () => setCarouseData(resetList)
  /**
   * 弹窗关闭回调
   */
  const onClose = () => setVisible(false)
  /**
   * 添加图片回调
   */
  const addPic = () => {
    setCarouseData([...carouseData, {id: carouseData.length+1, url: "", imgUrl: ""}])
  }
  /**
   * 删除图片回调
   */
  const remove = (targetKey) => {
    const dataList = JSON.parse(JSON.stringify(carouseData))
    const delIndex = carouseData.findIndex(item => item.id === parseInt(targetKey))
    dataList.splice(delIndex, 1)
    setCarouseData(dataList)
  }
  /**
   * 开关选择回调
   */
  const onSwitch = (checked) => setConfigurable(checked)
  /**
   * 拖拽结束回调
   */
  const onFirstMenuDragEnd = (result) => {
    console.log('result', result)
    const libraryList = JSON.parse(JSON.stringify(componentLibrary))
    const display = JSON.parse(JSON.stringify(displayComponent))
    const initialItem = result.source
    const finalItem = result.destination
    if (finalItem) {
      if (initialItem.droppableId === 'droppable1' && finalItem.droppableId === 'droppable1') {
        const moveItem = libraryList.splice(initialItem.index, 1)
        libraryList.splice(finalItem.index, 0, moveItem[0])
        setComponentLibrary(libraryList)
      } else if (initialItem.droppableId === 'droppable2' && finalItem.droppableId === 'droppable2') {
        const moveItem = display.splice(initialItem.index, 1)
        display.splice(finalItem.index, 0, moveItem[0])
        setDisplayComponent(display)
      } else if (initialItem.droppableId === 'droppable1' && finalItem.droppableId === 'droppable2') {
        const moveItem = libraryList.splice(initialItem.index, 1)
        console.log('moveItem', moveItem)
        display.splice(finalItem.index, 0, moveItem[0])
        setComponentLibrary(libraryList)
        setDisplayComponent(display)
      } else {
        const moveItem = display.splice(initialItem.index, 1)
        libraryList.splice(finalItem.index, 0, moveItem[0])
        setComponentLibrary(libraryList)
        setDisplayComponent(display)
      }
    }
  }

  return (
    <MainContent>
      <Row className={styles.mainContent}>
        <DragDrop
          componentLibrary={componentLibrary}
          displayComponent={displayComponent}
          configurable={configurable}
          onFirstMenuDragEnd={onFirstMenuDragEnd}
          onOpen={onOpen}
          onSwitch={onSwitch}
          carouseData={carouseData}
        />
      </Row>
      <Drawer
        title="轮播图设置"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        size="large"
      >
        <CarouselConfiguration
          carouseData={carouseData}
          cancel={onClose}
          submit={onSubmit}
          reset={reset}
          addPic={addPic}
          remove={remove}
        />
      </Drawer>
    </MainContent>
  );
}

export default TestPage;
