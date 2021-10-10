const { EventEmitter } = require("stream");
const https = require("https");

interface APIGatewayEvent {
  pathParameters: {
    package: string;
  };
}

exports.handler = async (event: APIGatewayEvent) => {
  const { package: packageName } = event.pathParameters;

  https
    .get(
      `https://registry.npmjs.org/${packageName}`,
      (res: typeof EventEmitter) => {
        let data = "";

        res.on("data", (chunk: string) => {
          data += chunk;
        });

        res.on("end", () => {
          const json = JSON.parse(data);
          const packageVersion = json["dist-tags"].latest;

          return {
            statusCode: 200,
            body: JSON.stringify(packageVersion),
          };
        });
      }
    )
    .on("error", (e: unknown) => {
      return {
        statusCode: 200,
        body: JSON.stringify(e),
      };
    });
};
