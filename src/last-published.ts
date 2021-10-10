exports.handler = async (event: unknown) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(event),
  };
  return response;
};
