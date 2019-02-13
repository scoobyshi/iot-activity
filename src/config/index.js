export default {
  wink: {
    accessToken: process.env.WINK_TOKEN,
    host: 'https://api.wink.com',
  },
  dynamo: {
    apiVersion: '2012-08-10',
    region: 'us-west-2',
    tableName: 'winkdevices',
  },
};
