import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';

const MainContent = (props) => {
  return (
    <PageHeaderWrapper>
      <Card>
        {
          props.children
        }
      </Card>
    </PageHeaderWrapper>
  )

}

export default MainContent
