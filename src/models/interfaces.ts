import { AWSError } from 'aws-sdk';

export interface IUniqueDevice extends WinkAPI.IDevice {
  uniqueid: string;
}

export interface IShortResponse {
  message: string;
  payload?: any;
  statusCode: number;
  time: Date;
}
