import { request } from '@@/plugin-request/request';
import { message } from 'antd';
import { FormValues } from '@/types/users';

//获取用户数据列表
export const getList = async () => {
  return request('http://public-api-v1.aspirantzhang.com/users', {
    method: 'get',
  })
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

//修改用户数据
export const updateUserInfo = async ({
  values,
  id,
}: {
  values: FormValues;
  id: number;
}) => {
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(function(response) {
      message.success('已编辑');
    })
    .catch(function(error) {
      message.error('编辑失败');
    });
};

//删除某条用户数据
export const deleteUser = async ({ id }: { id: number }) => {
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(function(response) {
      message.success('已删除');
    })
    .catch(function(error) {
      message.error('删除失败');
    });
};

//新增用户
export const addUser = async ({ values }: { values: FormValues }) => {
  return request('http://public-api-v1.aspirantzhang.com/users', {
    method: 'post',
    data: values,
  })
    .then(function(response) {
      message.success('添加成功');
    })
    .catch(function(error) {
      message.error('添加失败');
    });
};
