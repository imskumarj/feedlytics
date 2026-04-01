const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");
const { response } = require("./utils/response");
const { validateFeedback } = require("./utils/validate");

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const error = validateFeedback(body);
    if (error) return response(400, { error });

    const item = {
      feedbackId: uuidv4(),
      name: body.name || null,
      email: body.email || null,
      message: body.message,
      rating: body.rating,
      createdAt: new Date().toISOString(),
      ipAddress: event.requestContext?.http?.sourceIp || "unknown"
    };

    await ddb.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item
      })
    );

    return response(200, { message: "Feedback stored" });
  } catch (err) {
    console.error("Error:", err);
    return response(500, { error: "Internal Server Error" });
  }
};