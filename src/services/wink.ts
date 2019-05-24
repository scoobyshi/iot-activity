import { GetDevices } from 'wink-api';
import config from '../config';
import { ISimpleDevice } from '../models/interfaces';

class Wink {
  public async getAllDevices() {
    try {
      const devicesResponse: WinkAPI.IUserDevicesResponse = await GetDevices.execute({
        access_token: config.wink.accessToken,
        host: config.wink.host,
      });

      return devicesResponse;
    } catch (err) {
      throw (err);
    }
  }

  public formatDeviceData(device: WinkAPI.IDevice): ISimpleDevice {
    // Initialize model
    const model: ISimpleDevice = {
      desired_state: {},
      last_reading: {},
      model_name: '',
      name: '',
      object_id: '',
      object_type: '',
      radio_type: '',
      updated_at: null,
    };

    // Match and return only those attributes that exist in our reduced model
    const response = Object.keys(model).reduce((obj, key) =>
      ({
        ...obj,
        [key]: device[key],
      }),
      {},
    ) as ISimpleDevice;

    return response;
  }
}

export default Wink;
