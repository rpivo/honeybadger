import { makeBadge } from "badge-maker";
import https from "https";

interface APIGatewayEvent {
  pathParameters: {
    package: string;
  };
}

exports.handler = async (event: APIGatewayEvent) => {
  const { package: packageName } = event.pathParameters;

  return await new Promise((resolve, reject) => {
    const format = {
      label: "Latest Version",
      message: "Bad Fetch",
      color: "green",
    };
    const headers = {
      "Cache-Control": "private, max-age=86400",
      "Content-Type": "image/svg+xml",
    };

    https
      .get(`https://registry.npmjs.org/${packageName}`, (response) => {
        let data = "";

        response.on("data", (chunk: string) => {
          data += chunk;
        });

        response.on("end", () => {
          const json = JSON.parse(data);
          format.message = json["dist-tags"].latest;

          resolve({
            statusCode: 200,
            body: makeBadge(format),
            headers,
          });
        });
      })
      .on("error", (e: unknown) => {
        console.error("An error occurred while fetching the badge", e);
        reject({
          statusCode: 200,
          body: makeBadge(format),
          headers,
        });
      });
  });
};
