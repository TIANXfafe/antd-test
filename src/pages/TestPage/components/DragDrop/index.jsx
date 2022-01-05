import React from 'react';
import {Carousel, Col} from "antd";
import styles from "./index.less";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import SetArea from "@/pages/TestPage/components/SetArea";

function DragDrop(props) {
  const contentStyle = {
    height: '140px',
    color: '#fff',
    lineHeight: '140px',
    textAlign: 'center',
    background: '#364d79',
  };

  const onFirstMenuDragEnd = (result) => props.onFirstMenuDragEnd(result)

  return (
    <DragDropContext onDragEnd={onFirstMenuDragEnd}>
      <Col className={styles.configContent} style={{display: props.configurable ? "" : "none"}}>
        {
          <div>
            <Droppable droppableId="droppable1">
              {
                (provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {
                        props.componentLibrary.map((item, index) => {
                          return(
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {
                                (provided, snapshot) => {
                                  return(
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {item.content}
                                    </div>
                                  )
                                }
                              }
                            </Draggable>
                          )
                        })
                      }
                      {provided.placeholder}
                    </div>
                  )
                }
              }
            </Droppable>
          </div>
        }
      </Col>

      <Col className={styles.configContent}>
        {
          <div>
            <Droppable droppableId="droppable2">
              {
                (provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {
                        props.displayComponent.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {
                                (provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={styles.componentContent}
                                    >
                                      {
                                        item.type === 'carousel' ? (
                                          <Carousel style={{width: '291px', height: '150px'}} autoplay>
                                            {
                                              props.carouseData.map(cItem => {
                                                return (
                                                  <div key={cItem.id}>
                                                    <h3 style={contentStyle}>
                                                      <a href={cItem.url}>
                                                        <img src={cItem.imgUrl} alt=""/>
                                                      </a>
                                                    </h3>
                                                  </div>
                                                )
                                              })
                                            }
                                          </Carousel>
                                        ) : item.type === 'classification' ? (
                                          <div className={styles.classification}>
                                            <div className={styles.test} />
                                            <div className={styles.test} />
                                            <div className={styles.test} />
                                            <div className={styles.test} />
                                            <div className={styles.test} />
                                            <div className={styles.test} />
                                            <div className={styles.test} />
                                            <div className={styles.test} />
                                            <div className={styles.test} />
                                          </div>
                                        ) : (
                                          <div>{item.content}</div>
                                        )
                                      }
                                    </div>
                                  )
                                }
                              }
                            </Draggable>
                          )
                        })
                      }
                      {provided.placeholder}
                    </div>
                  )
                }
              }
            </Droppable>
          </div>
        }
      </Col>

      {/*<Col className={styles.configContent}>*/}
      <Col>
        <SetArea
          onOpen={props.onOpen}
          configurable={props.configurable}
          onSwitch={props.onSwitch}
        />
      </Col>
    </DragDropContext>
  );
}

export default DragDrop;
