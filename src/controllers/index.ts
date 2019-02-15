import * as PubNub from 'pubnub';
import Dynamo from '../db/dynamo';
import { IShortResponse } from '../models/interfaces';
import Wink from '../services/wink';

class IoTActivity {
  private wink = new Wink();
  private dynamo = new Dynamo();

  public async createDevicesListener(persistEvent: boolean) {
    const deviceList = await this.wink.getAllDevices();

    deviceList.data.forEach((device) => {
      const pubnub = new PubNub({
        subscribeKey: device.subscription.pubnub.subscribe_key,
      });

      console.log('Subscribing to pubnub for:', device.name);
      pubnub.subscribe({ channels: [device.subscription.pubnub.channel] });

      pubnub.addListener({
        message: async (message) => {
          const deviceData: WinkAPI.IDevice = JSON.parse(message.message);

          if (persistEvent) {
            try {
              console.log('Writing Event for:', deviceData.name);
              const response: IShortResponse = await this.dynamo.putEventData(deviceData);
              console.log('Recieved Response:', response);
            } catch (err) {
              console.log('Recieved Error:', err);
            }
          }
        },
      });
    });
  }
}

export default IoTActivity;
