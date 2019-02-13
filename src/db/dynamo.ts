import * as AWS from 'aws-sdk';
import * as uuid from 'uuid/v4';
import config from '../config';
import { IUniqueDevice } from '../models/interfaces';

AWS.config.update({ region: config.dynamo.region });

const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: config.dynamo.apiVersion });

class Dynamo {
  private tableName: string;

  constructor() {
    this.tableName = config.dynamo.tableName;
  }

  public putEventData(deviceData: WinkAPI.IDevice) {
    const uniqueDeviceData: IUniqueDevice = {
      uniqueid: uuid(),
      ...deviceData,
    };

    const params = {
      Item: uniqueDeviceData,
      TableName: this.tableName,
    };

    dynamodb.put(params, (err, data) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
      }
    });
  }

  public getEventData(deviceName: string) {
    const params = {
      ExpressionAttributeNames: {
        '#nm': 'name',
      },
      ExpressionAttributeValues: {
        ':name': deviceName,
      },
      FilterExpression: '#nm = :name',
      TableName: this.tableName,
    };

    dynamodb.scan(params, (err, data) => {
      if (err) {
        console.log('Error', err);
        return err;
      }

      console.log('Success', data.Items);
      return data.Items;
    });
  }
}

export default Dynamo;
