import IoTActivity from './controllers';

const iot = new IoTActivity();
const persistEvent: boolean = false;

iot.createDevicesListener(persistEvent);
