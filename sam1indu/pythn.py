import boto3
ddb = boto3.client("dynamodb")

def handler(event, context):
    try:
        data = ddb.get_item(
            TableName="testIndu",
            Key={
                'test': {
                    'S': "2"
                }
            }
        )
    except BaseException as e:
        print(e)
        raise(e)
    
    return {"message": "Successfully executed"}
