const { spawnSync } = require('child_process');

interface APIGatewayEvent {
  pathParameters: {
    package: string;
  };
}

exports.handler = async (event: APIGatewayEvent) => {
  const { package: packageName } = event.pathParameters;

  try {
    const packageVersion = spawnSync('npm', ['view', packageName, 'versions']);

    const response = {
      statusCode: 200,
      body: JSON.stringify(packageVersion),
    };
    return response;
  } catch (e) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(e),
    };
    return response;
  }
};
