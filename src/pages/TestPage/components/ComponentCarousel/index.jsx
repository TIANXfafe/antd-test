import React from 'react';
import { Carousel } from 'antd';
import PropTypes from 'prop-types';

function ComponentCarousel(props) {
  return (
    <Carousel style={props.style} autoplay>
      {props.carouseData.map((item) => {
        return (
          <div key={item.id}>
            <h3 style={props.contentStyle}>
              <a href={item.url}>
                <img src={item.imgUrl} alt="" />
              </a>
            </h3>
          </div>
        );
      })}
    </Carousel>
  );
}

ComponentCarousel.propTypes = {
  style: PropTypes.object,
  carouseData: PropTypes.array.isRequired,
  contentStyle: PropTypes.object.isRequired,
};

export default ComponentCarousel;
