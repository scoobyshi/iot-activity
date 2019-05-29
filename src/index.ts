import IoTActivity from './controllers';

const iot = new IoTActivity();
const persistEvent: boolean = true;

iot.createDevicesListener(persistEvent);
