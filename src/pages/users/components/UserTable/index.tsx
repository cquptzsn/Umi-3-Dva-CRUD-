import React, { useState } from 'react';
import { Table, Space, Popconfirm, Button } from 'antd';
import { connect } from 'dva';
import UserModal from '@/pages/users/components/UserModal';

import styles from './index.less';

const UserTable = ({ userInfo, dispatch, userListLoading }) => {
  const [isVisible, setVisible] = useState(false);
  const [record, setRecord] = useState(undefined);
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
      render: text => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: text => {
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
      render: record => (
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

  const handleEdit = record => {
    setVisible(true);
    setRecord(record);
  };

  const okHandler = () => {
    setVisible(false);
  };

  const cancelHandler = () => {
    setVisible(false);
  };

  const onFinish = values => {
    // const id = record.id;
    let id = 0;
    if (record) {
      id = record.id;
    }
    if (id) {
      console.log('edit');
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
        loading={userListLoading}
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

const mapStateToProps = ({ users, loading }) => {
  console.log(loading);
  return {
    userInfo: users,
    userListLoading: loading.models.users,
  };
};

export default connect(mapStateToProps)(UserTable);
