
const apiUrl = import.meta.env.VITE_API_URL;
export async function executeCode(code) {
  try {
    const response = await fetch("https://js-compiler-backend.onrender.com:10000/nodejs", {
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
