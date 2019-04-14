const VIEW_ID = {
    LOGIN_VIEW : 0,
    ALL_ARTICLE : 1,
    MY_ARTICLE : 2,
    DRAFT : 3  
}

Vue.mixin({
    data: function() {
      return {
        VIEW_ID
      }
    }
  })
const BASE_URL = "http://localhost:3000";
const myaxios = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
  });