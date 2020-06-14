import React, { useState, FC } from 'react';
import { Table, Space, Popconfirm, Button } from 'antd';
import { connect } from 'dva';
import UserModal from '@/pages/users/components/UserModal';

import { UserState } from '@/models/users';
import { SingleUserType, FormValues } from '@/types/users';

import styles from './index.less';

interface UserTableProps {
  userInfo: UserState;
  dispatch: (action: { type: string; payload?: any }) => any;
  loading: boolean;
}

const UserTable: FC<UserTableProps> = ({ userInfo, dispatch, loading }) => {
  const [isVisible, setVisible] = useState(false);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => {
        if (text) {
          return <a>{text}</a>;
        }
        return '--';
      },
    },
    {
      title: 'Create_time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Update_time',
      dataIndex: 'update_time',
      key: 'update_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: SingleUserType) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <Popconfirm
            title={'Are you sure delete this?'}
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <a
              onClick={() => {
                setRecord(record);
              }}
            >
              Delete
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const confirm = () => {
    const id = record.id;
    dispatch({
      type: 'users/deleteItem',
      payload: {
        id,
      },
    });
  };

  const handleEdit = (record: SingleUserType) => {
    setVisible(true);
    setRecord(record);
  };

  const okHandler = () => {
    setVisible(false);
  };

  const cancelHandler = () => {
    setVisible(false);
  };

  const onFinish = (values: FormValues) => {
    let id = 0;
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'users/changeUserInfo',
        payload: {
          values,
          id,
        },
      });
    } else {
      console.log('add');
      dispatch({
        type: 'users/addUserItem',
        payload: {
          values,
        },
      });
    }

    setVisible(false);
  };

  const handleAddClick = () => {
    setVisible(true);
    setRecord(undefined);
  };

  return (
    <div className={styles.userTable}>
      <Button type="primary" onClick={handleAddClick}>
        add
      </Button>
      <Table
        columns={columns}
        dataSource={userInfo}
        rowKey="id"
        loading={loading}
      />
      <UserModal
        visible={isVisible}
        // onOk={okHandler}
        onCancel={cancelHandler}
        record={record}
        onFinish={onFinish}
      />
    </div>
  );
};

export default connect(({ loading, users }: any) => ({
  userInfo: users,
  loading: loading.effects['users/getList'],
}))(UserTable);
