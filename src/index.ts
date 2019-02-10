import { GetDevices } from 'wink-api';
import * as PubNub from 'pubnub';

async function devicesSub() {
  console.log('Attempting to get devices...');

  try { 
    let devicesResponse: WinkAPI.IUserDevicesResponse = await GetDevices.execute({
      host: 'https://api.wink.com',
      access_token: process.env.WINK_TOKEN
    });

    // console.log(devicesResponse);

    let deviceDemo = devicesResponse.data.filter(device => device.name === 'Master Bedroom Light 1')[0];
    console.log(deviceDemo);

    let pubnub = new PubNub({
      subscribeKey: deviceDemo.subscription.pubnub.subscribe_key
    });

    pubnub.subscribe({ channels: [deviceDemo.subscription.pubnub.channel] });
      pubnub.addListener({
      message: (message) => {
        console.log(message);
      }
    });

    /* pubnub.history({
      channel: deviceDemo.subscription.pubnub.channel,
      count: 1,
      stringifiedTimeToken: true
    }, (status, response) => {
      console.log('Status:', status);
      console.log('Pubnub History:', response);
    }); */

  } catch (err) {
    console.log('An error occurred:', err);
  }
}

devicesSub();
