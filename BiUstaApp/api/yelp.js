import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer aETOPuVSQ-luGy16YjLMitcWYtZh4W9pRa8Z8hk5Tz42JZA2f2UPY0ve9r7XDLnrlfVrbVqqJ-MagxP1AugW2wZgFVw2cl2ci8tq0UnFZRzUsT7_x_0-7hVa4F-RZHYx',
  },
});
