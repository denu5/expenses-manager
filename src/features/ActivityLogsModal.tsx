import React, { useState, FC, useMemo } from 'react';
import { Modal, Table } from 'antd';

import { useStoreState } from 'store/hooks';

interface Props {
  afterClose?: () => unknown;
}

const ActivityLogsModal: FC<Props> = ({ afterClose }) => {
  const { logs } = useStoreState(state => state.activityLogs);

  const [isVisible, setIsVisible] = useState(true);

  const data = useMemo(
    () =>
      logs.map(i => {
        return {
          timestamp: i.timestamp,
          message: i.content.message,
          type: i.type
        };
      }),
    [logs]
  );

  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message'
    }
  ];

  const hide = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      title="Activity Logs"
      visible={isVisible}
      onCancel={hide}
      afterClose={afterClose}
      destroyOnClose={true}
      closable={true}
    >
      <Table
        dataSource={data}
        rowKey={record => record.timestamp}
        columns={columns}
      />
    </Modal>
  );
};

export default ActivityLogsModal;
