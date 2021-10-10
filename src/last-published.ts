const execSync = require("child_process").execSync;

interface APIGatewayEvent {
  pathParameters: {
    package: string;
  };
}

exports.handler = async (event: APIGatewayEvent) => {
  const { package: packageName } = event.pathParameters;

  const packageVersion = execSync(`npm show ${packageName} version`);

  const response = {
    statusCode: 200,
    body: JSON.stringify(packageVersion),
  };
  return response;
};
