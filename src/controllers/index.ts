import * as PubNub from 'pubnub';
import Dynamo from '../db/dynamo';
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

      pubnub.subscribe({ channels: [device.subscription.pubnub.channel] });
      pubnub.addListener({
        message: (message) => {
          const deviceData: WinkAPI.IDevice = JSON.parse(message.message);

          if (persistEvent) {
            this.dynamo.putEventData(deviceData);
          }
        },
      });
    });
  }
}

export default IoTActivity;
