import { AWSError } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import * as uuid from 'uuid/v4';
import config from '../config';
import { IShortResponse, ISimpleDevice, IUniqueDevice } from '../models/interfaces';

class Dynamo {
  private tableName: string;
  private dynamodb;

  constructor() {
    this.tableName = config.dynamo.tableName;
    AWS.config.update({ region: config.dynamo.region });
    this.dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: config.dynamo.apiVersion });
  }

  public putEventData(deviceData: ISimpleDevice): Promise<IShortResponse> {
    return new Promise<IShortResponse>((resolve, reject) => {
      const uniqueDeviceData: IUniqueDevice = {
        uniqueid: uuid(),
        ...deviceData,
      };

      const params = {
        Item: uniqueDeviceData,
        TableName: this.tableName,
      };

      this.dynamodb.put(params, (err: AWSError, data) => {
        if (err) {
          // Expect err.statusCode = 400, also err.message = "Requested resource not found"
          // console.log('Error', err);
          reject(err);
        }

        // Mimic the err response from aws for success
        const response: IShortResponse = {
          message: 'Success',
          payload: uniqueDeviceData,
          statusCode: 200,
          time: new Date(),
        };

        // console.log('Success', data);
        resolve(response);
      });
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

    this.dynamodb.scan(params, (err, data) => {
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
