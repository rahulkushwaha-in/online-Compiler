
const apiUrl = import.meta.env.VITE_API_URL;
export async function executeCode(code) {
  try {
    const response = await fetch("https://vfupw381da.execute-api.ap-south-1.amazonaws.com/default/executeNode", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    return await response.json();
  } catch (error) {
    return {
      result: '',
      error: 'Failed to connect to the server',
      executionTime: 0
    };
  }
}