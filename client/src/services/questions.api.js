// utils/api.js
export const fetchQuestionBank = async () => {
  const token = localStorage.getItem('token'); // Or wherever you store your JWT
  
  const response = await fetch('/api/questions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Matches your authMiddleware expectations
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch question bank');
  }

  const result = await response.json();
  return result.data; // This matches the { success: true, data: [...] } structure from your controller
};