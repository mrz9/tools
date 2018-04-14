var request = require("request");

var options = { method: 'GET',
  url: 'https://www.doutula.com/api/search',
  qs: { keyword: '金馆长', mime: '0', page: '1' },
  headers: 
   { 'Postman-Token': '269f81f9-b16d-4969-b97c-6115c31d9cd8',
     'Cache-Control': 'no-cache' },
  form: { department_id: '19', organization_id: '19' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

// const request = require('superagent')

// let url = 'https://www.doutula.com/api/search?keyword=金馆长&mime=0&page=1';
// request.get(url)
//     .set('Cache-Control','no-cache')
//     .set('Postman-Token','269f81f9-b16d-4969-b97c-6115c31d9cd8')
//     .then(function(rs) {
//         console.log(url);
//         console.log(rs.body);
//     })
//     .catch(function(err) {
//         console.log(err);
//     });