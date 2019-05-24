import * as uuid from 'uuid/v4';
import { IShortResponse, ISimpleDevice, IUniqueDevice } from '../models/interfaces';
import Dynamo from './dynamo';

const optionalDesiredState = {
  brightness: 0.13,
  powered: true,
};

const LAT_EXAMPLE = 49.289951;
const LONG_EXAMPLE = -123.13303;

const mockPayload: ISimpleDevice = {
  desired_state: optionalDesiredState,
  last_reading: {
    brightness: 0.13,
    brightness_changed_at: 1549683566.607007,
    brightness_updated_at: 1549766163.286579,
    connection: true,
    connection_changed_at: 1549650507.6754107,
    connection_updated_at: 1549766163.286579,
    desired_brightness_changed_at: 1549766114.28179,
    desired_brightness_updated_at: 1549766114.28179,
    desired_powered_changed_at: 1549766163.39231,
    desired_powered_updated_at: 1549766163.39231,
    firmware_date_code: 'Unknown',
    firmware_date_code_changed_at: 1549515819.1513884,
    firmware_date_code_updated_at: 1549766163.286579,
    firmware_version: '0.2b10 / 0.1b6d',
    firmware_version_changed_at: 1549515819.1513884,
    firmware_version_updated_at: 1549766163.286579,
    powered: false,
    powered_changed_at: 1549766163.286579,
    powered_updated_at: 1549766163.286579,
  },
  model_name: 'Generic Zigbee Light Bulb',
  name: 'Master Bedroom Light 1',
  object_id: '41012345',
  object_type: 'light_bulb',
  radio_type: 'zigbee',
  updated_at: 1549665310,
};

describe('Dynamo DB Connection', () => {
  const dynamo = new Dynamo();

  try {
    beforeEach(() => {
      dynamo.putEventData = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('Should push the event payload', async () => {
      const spy: jest.SpyInstance = jest.spyOn(dynamo, 'putEventData');
      await dynamo.putEventData(mockPayload);
      expect(spy).toHaveBeenCalledWith(mockPayload);
    });

    it('Should generate a uniqueid', async () => {
      const spy: jest.SpyInstance = jest.spyOn(dynamo, 'putEventData');
      spy.mockImplementation(() => {
        const mockResponse: IShortResponse = {
          message: 'Success',
          payload: {
            ...mockPayload,
            uniqueid: uuid(),
          },
          statusCode: 200,
          time: new Date(),
        };
        return mockResponse;
      });
      const response = await dynamo.putEventData(mockPayload);
      expect(response).toHaveProperty('payload.uniqueid');
    });
  } catch (err) {
    throw (err);
  }
});
