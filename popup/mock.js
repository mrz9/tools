import Mock from 'mockjs';

Mock.mock(/^\?ct=ajax&ac=get_org_data/,{
    status:0,
    message:'',
    'data|1-10':[
        {
            'id|+1':1,
            'name':'@cname',
            'type':function() {
                return Math.random() > 0.5 ? 'department' : 'member';
              },
            'is_sub':'@integer(0, 1)'
        }
    ]
})