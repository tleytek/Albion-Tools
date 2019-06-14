import axios from 'axios';
import url from 'url';

const absoluteUrl = (req, setLocalhost) => {
  let protocol = 'https';
  // NOTE: window.location.hostname does not work in this case because 'window' is a client-side
  // property, yet this file is being rendered server-side.
  let host = req ? req.headers.host : window.location.hostname;
  // if (host.indexOf('localhost') > -1) {
  //   if (setLocalhost) host = setLocalhost;
  //   protocol = 'http';
  // }

  return url.format({
    protocol,
    host,
    pathname: '/' // req.url
  });
};

/* NOTE - relative url in this function runs will not work and 
        will get ECONNRESET error since it runs on server context */
const generateUrl = context => {
  const baseUrl = absoluteUrl(context.req, 'localhost:3000');
  const apiUrl = 'http://localhost:9999';
  const rootUrl = process.env.NODE_ENV === 'production' ? baseUrl : apiUrl;
  return rootUrl;
};

export default {
  getMe: async context => {
    try {
      const { status, data } = await axios.get('/api/me');
      console.log(data);
      return { user: data.user };
    } catch (ex) {
      console.log(`Error fetching data from ${generateUrl(context)} - ${ex.message}`);
      return { user: null };
    }
  }
};
