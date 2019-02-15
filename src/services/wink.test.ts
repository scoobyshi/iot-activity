import MockWinkService from '../__mocks__/services/WinkService';
// import Wink from './wink';

describe('Wink Service', () => {
  // const wink = new Wink();
  const mockWink = new MockWinkService();

  try {
    /* beforeEach(() => {
      wink.getAllDevices = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('Should attempt to retrieve all Devices', async () => {

    }); */

    it('Should return device list in data', async () => {
      const response = await mockWink.getDevicesMock();
      expect(response).toHaveProperty('data');
    });
  } catch (err) {
    throw (err);
  }
});
