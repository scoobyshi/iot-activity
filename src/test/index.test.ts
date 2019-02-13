import { IUniqueDevice } from '../models/interfaces';

const optionalDesiredState = {
  brightness: 0.13,
  powered: true,
};

const LAT_EXAMPLE = 49.289951;
const LONG_EXAMPLE = -123.13303;

const mockPayload: IUniqueDevice = {
  capabilities: {
    is_generic: true,
    mass_broadcast_disabled: true,
  },
  created_at: 1549515738,
  desired_state: optionalDesiredState,
  device_manufacturer: 'generic_zigbee',
  gang_id: null,
  hidden_at: null,
  hub_id: '123456',
  icon_code: 'light_bulb-light_bulb',
  icon_id: '71',
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
  lat_lng: [LAT_EXAMPLE, LONG_EXAMPLE],
  light_bulb_id: '4108632',
  linked_service_id: null,
  local_id: '17',
  locale: 'en_us',
  location: '123 Anystreet, Anycity, ON, Canada',
  manufacturer_device_id: null,
  manufacturer_device_model: 'generic_zigbee',
  model_name: 'Generic Zigbee Light Bulb',
  name: 'Master Bedroom Light 1',
  nonce: 80612345,
  object_id: '41012345',
  object_type: 'light_bulb',
  order: 0,
  primary_upc_code: 'generic_zigbee_light_bulb',
  radio_type: 'zigbee',
  subscription: {
    pubnub: {
      channel: 'b32131241231-user123',
      origin: null,
      subscribe_key: 'sub-c-12345' 
    },
  },
  triggers: [],
  uniqueid: '1000005',
  units: {},
  upc_code: 'generic_zigbee_light_bulb',
  upc_id: '124',
  updated_at: 1549665310,
  user_ids: ['4071234'],
  uuid: '2c052dea-bbdd-42c2-8af1-123456',
};
