export const sendTextToOpenAi = async (userText: string) => {
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ userText }),
  });
  const { message }: { message: string } = await response.json();
  console.log(message);

  return message;
};
