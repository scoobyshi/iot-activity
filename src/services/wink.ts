import { GetDevices } from 'wink-api';
import config from '../config';

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
}

export default Wink;
