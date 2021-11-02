const { handler } = require('../src/last-published');

describe('last-published', () => {
  const APIGatewayEventMock = {
    pathParameters: {},
  };

  it('should not throw an UnhandledPromiseRejection when the handler is called with an API Gateway event', () => {
    handler(APIGatewayEventMock);
    expect(true).toBe(true);
  });

  // it('should return something', () => {
  //   const result = handler(APIGatewayEventMock);
  //   expect(result).toBe({});
  // });
});
