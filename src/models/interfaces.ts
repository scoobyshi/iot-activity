import { AWSError } from 'aws-sdk';

// Should maybe be sticking with the WinkAPI already defined interfaces, but they are lengthy
// and this could be perhaps more agnostic of just Wink, and used for any device
export interface ISimpleDevice {
  desired_state: any;
  last_reading: any;
  model_name: string;
  name: string;
  object_id: string;
  object_type: string;
  radio_type: string;
  updated_at: number;
}

export interface IUniqueDevice extends ISimpleDevice {
  uniqueid: string;
}

export interface IShortResponse {
  message: string;
  payload?: any;
  statusCode: number;
  time: Date;
}
