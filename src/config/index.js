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
  log: {
    file: {
      enable: process.env.LOG_FILE_ENABLE || false,
      name: 'iot-activity.log',
    },
    level: process.env.LOG_LEVEL || 'info',
  },
};
