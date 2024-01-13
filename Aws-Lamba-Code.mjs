import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const client = new DynamoDBClient({ region: 'us-east-1' });

export const handler = async (event, context) => {
    const params = {
        TableName: 'UsersTable'
    };

    try {
        const data = await client.send(new ScanCommand(params));
        const formattedData = data.Items ? data.Items.map(item => unmarshall(item)) : [];

        return {
            statusCode: 200,
            body: JSON.stringify(formattedData),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
