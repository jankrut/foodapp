import Cookies from 'js-cookie';

let accessToken, refreshToken;

  const getAccessToken = (type, query, cb) => {
    if (type === "refresh") {
      refreshAccessToken(query, cb);
    } else {
      // console.log("Cookies",Cookies.get('access_token'));
      if (Cookies.get('access_token') && Cookies.get('access_token') !== "undefined" && Cookies.get('access_token') !== "") {
        accessToken = Cookies.get('access_token');
        refreshToken = Cookies.get('refresh_token');
        getQueryData(query, cb);
      } else {
        newAccessToken(query, cb);
      }
    }
  }
  const newAccessToken = (query, cb) => {
    fetch('https://realm.mongodb.com/api/client/v2.0/app/familytree-jlvgj/auth/providers/local-userpass/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": "jinkipandit@gmail.com",
        "password": "123456"
      })
    }).then(function (response) {
      console.log("response", response)
      return response.json();
    }).then(function (data) {
      console.log('tokens', data);
      if (data.access_token) {
        accessToken = data.access_token;
        refreshToken = data.refresh_token;
        // this.device_id = data.device_id;
        // this.user_id = data.user_id;
        Cookies.set('access_token', data.access_token);
        Cookies.set('refresh_token', data.refresh_token);
        getQueryData(query, cb);
      } else {

      }
    });
  }
  const refreshAccessToken = (query, cb) => {
    console.log("this.refresh_token", refreshToken);
    fetch('https://realm.mongodb.com/api/client/v2.0/auth/session', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + refreshToken
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log('tokens', data);
      accessToken = data.access_token;
      Cookies.set('access_token', data.access_token);
      getQueryData(query, cb);
    });
  }
  const getData = (query, cb) => {
    // query_str = query;
    // callback = cb;
    getAccessToken("", query, cb);
  }
  const getQueryData = (query, cb) => {
    fetch('https://realm.mongodb.com/api/client/v2.0/app/familytree-jlvgj/graphql', {
      method: 'post',
      headers: {
        Authorization: `Bearer ` + accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({query:query})
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log('getQueryData:', data);
      if(data.error){
        if(data.error_code === "InvalidSession")
          getAccessToken("refresh", query, cb);
      }else{
        if(cb){
          cb(data);
        }
      }
    });
  }
  const getTime = () => {
    return new Date().toLocaleTimeString('en-GB')
  }
  const getToday = () => {
    return new Date().toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  export {getData, getToday, getTime}
