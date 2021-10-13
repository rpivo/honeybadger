import { makeBadge, Format } from "badge-maker";
import https from "https";

interface APIGatewayEvent {
  pathParameters: {
    package: string;
  };
}

enum Colors {
  GREEN = "2AB358",
  YELLOW = "F0BB07",
  RED = "EB1300",
}

exports.handler = async (event: APIGatewayEvent) => {
  const { package: packageName } = event.pathParameters;

  return await new Promise((resolve, reject) => {
    const format = <Format>{
      label: "Last Published",
      labelColor: "253B4D",
      message: "Bad Fetch",
      style: 'plastic'
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
          const latestVersion = json["dist-tags"].latest;

          const publishDate = new Date(json.time[latestVersion]);
          const currentDate = new Date();

          const yearPublished = publishDate.getFullYear();
          const currentYear = currentDate.getFullYear();

          if (yearPublished === currentYear) {
            const monthPublished = publishDate.getMonth();
            const currentMonth = currentDate.getMonth();
  
            if (monthPublished === currentMonth) {
              format.color = Colors.GREEN;
  
              const dayPublished = publishDate.getDate();
              const currentDay = currentDate.getDate();
  
              if (dayPublished === currentDay) {
                format.message = "Today";
              } else {
                const dayDifference = currentDay - dayPublished;
                format.message = `${dayDifference} day${dayDifference === 1 ? '' : 's'} ago`;
              }
            } else {
              const monthDifference = currentMonth - monthPublished;
              format.color = monthDifference >= 6 ? Colors.YELLOW : Colors.GREEN;
              format.message = `${monthDifference} month${monthDifference === 1 ? '' : 's'} ago`;
            }
          } else {
            const yearDifference = currentYear - yearPublished;

            if (yearDifference === 1) {
              const monthPublished = publishDate.getMonth();
              const currentMonth = currentDate.getMonth();
              
              if (monthPublished > currentMonth) {
                const monthDifference = (currentMonth - monthPublished) + 12;
                format.color = monthDifference >= 6 ? Colors.YELLOW : Colors.GREEN;
                format.message = `${monthDifference === 1 ? '' : 's'} months ago`;
              } else {
                const monthDifference = currentMonth - monthPublished;
                format.color = monthDifference >= 6 ? Colors.YELLOW : Colors.GREEN;
                format.message = `${monthDifference === 1 ? '' : 's'} months ago`;
             }
            } else {
              format.color = Colors.RED;
              format.message = `${yearDifference} years ago`;
            }
          }

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
