interface APIGatewayEvent {
  pathParameters: {
    package: string;
  };
}

exports.handler = async (event: APIGatewayEvent) => {
  const { package: packageName } = event.pathParameters;

  const response = {
    statusCode: 200,
    body: JSON.stringify(packageName),
  };
  return response;
};
