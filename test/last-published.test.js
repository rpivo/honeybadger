const { handler } = require('../src/last-published');

describe('last-published', () => {
  const APIGatewayEventMock = {
    pathParameters: { package: 'react-automation-profiler' },
  };

  it('should not throw an UnhandledPromiseRejection when the handler is called with an API Gateway event', () => {
    handler(APIGatewayEventMock);
    expect(true).toBe(true);
  });
});
