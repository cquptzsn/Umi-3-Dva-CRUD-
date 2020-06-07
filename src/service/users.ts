import { request } from "@@/plugin-request/request";

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
}

//修改用户数据
export const updateUserInfo = async ({ values, id }) => {
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: values
  })
    .then(function(response) {
      console.log('已成功修改');
    })
    .catch(function(error) {
      console.log(error);
    });
}

//删除某条用户数据
export const deleteUser = async ({ id }) => {
  return request(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
    .then(function(response) {
      console.log('已删除');
    })
    .catch(function(error) {
      console.log(error);
    });
}

