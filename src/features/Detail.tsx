import React from 'react';
import { PageHeader, Button } from 'antd';
import { useParams } from 'react-router-dom';

function Detail() {
  let { id } = useParams();

  return (
    <div>
      <PageHeader
        onBack={() => window.history.back()}
        title="Detail"
      ></PageHeader>
    </div>
  );
}

export default Detail;
