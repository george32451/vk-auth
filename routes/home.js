const request = require('request');

module.exports = function (app) {
  app.get('/', (req, res) => {
    let passedVar = req.session.array;
    res.render('index', {
      user: req.user,
      friends: passedVar
    });
    passedVar = null;
  });
  app.get('/friends', (req, res) => {
    request(`https://api.vk.com/method/friends.get?user_id=${req.user.userID}&order=random&count=5&fields=nickname&access_token=ACCESS_TOKEN&v=5.85`,
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const info = JSON.parse(body);
          const arrayResult = [];
          for (let i = 0; i < Object.keys(info.response.items).length; i += 1) {
            arrayResult[i] = `${info.response.items[i].first_name} ${info.response.items[i].last_name}`;
          }
          req.session.array = arrayResult;
          res.redirect('/');
        }
      });
  });
};
