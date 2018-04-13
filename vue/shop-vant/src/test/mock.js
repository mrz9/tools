import Mock from 'mockjs';

Mock.mock(/^\/admin\/type\/create/,'post',{
    status:0,
    id:'@natural(1, 100)'
})

Mock.mock(/(\s)*rlogs.youdao.com/,{
    status:0
})