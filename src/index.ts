import { GetDevices } from 'wink-api';
import * as PubNub from 'pubnub';
import * as AWS from 'aws-sdk';
import * as uuid from 'uuid/v4';

AWS.config.update({region: 'us-west-2'});
let dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});;

async function devicesSub() {
  console.log('Attempting to get devices...');

  try { 
    let devicesResponse: WinkAPI.IUserDevicesResponse = await GetDevices.execute({
      host: 'https://api.wink.com',
      access_token: process.env.WINK_TOKEN
    });

    // console.log(devicesResponse);

    // let deviceDemo = devicesResponse.data.filter(device => device.name === 'Master Bedroom Light 1')[0];
    // console.log(deviceDemo);

    devicesResponse.data.forEach(device => {
      let pubnub = new PubNub({
        subscribeKey: device.subscription.pubnub.subscribe_key
      });

      pubnub.subscribe({ channels: [device.subscription.pubnub.channel] });
      pubnub.addListener({
        message: (message) => {
          let payload = JSON.parse(message.message);
          payload.uniqueid = uuid();

          // console.log(payload);

          let params = {
            TableName: 'winkdevices',
            Item: payload
          };
          
          dynamodb.put(params, (err, data) => {
            if (err) {
              console.log("Error", err);
            } else {
              console.log("Success", data);
            }
          });
        }
      });
    });
  } catch (err) {
    console.log('An error occurred:', err);
  }
}

devicesSub();
