// Controller / Handler (via Pubnub) to subscribe, receive, transform and persist Wink events
// Later, we can break out handlers for different types and a wrapper for Pubnub if necessary
import * as PubNub from 'pubnub';
import Dynamo from '../db/dynamo';
import logger from '../lib/logger';
import { IShortResponse, ISimpleDevice } from '../models/interfaces';
import Wink from '../services/wink';

class IoTActivity {
  private wink = new Wink();
  private dynamo = new Dynamo();

  public async createDevicesListener(persistEvent: boolean) {
    try {
      const deviceList = await this.wink.getAllDevices();

      deviceList.data.forEach((device) => {
        const pubnub = new PubNub({
          subscribeKey: device.subscription.pubnub.subscribe_key,
        });

        logger.info(`Subscribing to pubnub for: ${device.name}`);
        pubnub.subscribe({ channels: [device.subscription.pubnub.channel] });

        pubnub.addListener({
          message: async (message) => {
            const deviceData: WinkAPI.IDevice = JSON.parse(message.message);
            const simpleDeviceData: ISimpleDevice = this.wink.formatDeviceData(deviceData);

            if (persistEvent) {
              try {
                logger.info(`Writing Event for: ${simpleDeviceData}`);
                const response: IShortResponse = await this.dynamo.putEventData(simpleDeviceData);
                logger.debug('Recieved Response:', response);
              } catch (err) {
                logger.warn('Recieved Error:', err);
              }
            }
          },
        });
      });
    } catch (err) {
      logger.info('Wink Exception:', err);
    }
  }
}

export default IoTActivity;
