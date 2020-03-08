import React from 'react';
import {
  PageHeader,
  Button,
  Statistic,
  List,
  Avatar,
  Radio,
  Row,
  Col
} from 'antd';

const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
];

function Overview() {
  return (
    <div>
      <PageHeader title="Overview" ghost={false}></PageHeader>

      <Row justify="space-around" align="middle" style={{ height: '10vh' }}>
        <Col span={4}>
          <Statistic title="Total Expenses" value={112893.98} precision={2} />
        </Col>
      </Row>
      <Row justify="space-around" align="middle" style={{ height: '10vh' }}>
        <Radio.Group defaultValue="a" size="large">
          <Radio.Button value="x">ALL</Radio.Button>
          <Radio.Button value="a">CHF</Radio.Button>
          <Radio.Button value="b">EUR</Radio.Button>
          <Radio.Button value="c">USD</Radio.Button>
        </Radio.Group>
      </Row>

      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description="Food"
            />
            <div>$ 40.00</div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Overview;
