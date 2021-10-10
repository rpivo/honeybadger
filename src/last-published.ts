const { EventEmitter } = require("stream");
const https = require("https");

interface APIGatewayEvent {
  pathParameters: {
    package: string;
  };
}

exports.handler = async (event: APIGatewayEvent) => {
  const { package: packageName } = event.pathParameters;

  return await new Promise((resolve, reject) => {
    https
      .get(
        `https://registry.npmjs.org/${packageName}`,
        (response: typeof EventEmitter) => {
          let data = "";

          response.on("data", (chunk: string) => {
            data += chunk;
          });

          response.on("end", () => {
            const json = JSON.parse(data);
            const packageVersion = json["dist-tags"].latest;

            resolve({
              statusCode: 200,
              body: JSON.stringify(packageVersion),
            });
          });
        }
      )
      .on("error", (e: unknown) => {
        reject({
          statusCode: 200,
          body: JSON.stringify(e),
        });
      });
  });
};
