import React from 'react';
import { Carousel, Col, Image } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import SetArea from '@/pages/TestPage/components/SetArea';
import ComponentCarousel from '@/pages/TestPage/components/ComponentCarousel';

function DragDrop(props) {
  const contentStyle = {
    height: '140px',
    color: '#fff',
    lineHeight: '140px',
    textAlign: 'center',
    background: '#364d79',
  };

  const onFirstMenuDragEnd = (result) => props.onFirstMenuDragEnd(result);

  return (
    <DragDropContext onDragEnd={onFirstMenuDragEnd}>
      <Col className={styles.configContent} style={{ display: props.configurable ? '' : 'none' }}>
        {
          <div>
            <Droppable droppableId="droppable1">
              {(provided, snapshot) => {
                return (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {props.componentLibrary.map((item, index) => {
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {item.content}
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        }
      </Col>

      <Col className={styles.configContent}>
        {
          <div>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => {
                return (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {props.displayComponent.map((item, index) => {
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={styles.componentContent}
                              >
                                {item.type === 'carousel' ? (
                                  <ComponentCarousel
                                    style={{ width: '291px', height: '150px' }}
                                    carouseData={props.carouseData}
                                    contentStyle={contentStyle}
                                  />
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
                                ) : item.type === 'picture' ? (
                                  <Image
                                    width={291}
                                    height={150}
                                    preview={false}
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                  />
                                ) : (
                                  <div>{item.content}</div>
                                )}
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
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

DragDrop.propTypes = {
  configurable: PropTypes.bool.isRequired,
  componentLibrary: PropTypes.array.isRequired,
  displayComponent: PropTypes.array.isRequired,
  carouseData: PropTypes.array.isRequired,
  onFirstMenuDragEnd: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired,
};

export default DragDrop;
