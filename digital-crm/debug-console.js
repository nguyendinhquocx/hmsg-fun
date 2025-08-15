// Debug login trong browser console
// Copy/paste vào Developer Tools → Console

console.log('Testing login API...');

// Test 1: Direct API call
fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'quynh.bui@hoanmy.com',
    password: '123456789'
  })
})
.then(async response => {
  console.log('Response status:', response.status);
  console.log('Response headers:', [...response.headers.entries()]);
  
  const text = await response.text();
  console.log('Response text:', text);
  
  try {
    const json = JSON.parse(text);
    console.log('Response JSON:', json);
  } catch (e) {
    console.log('Not JSON response');
  }
})
.catch(error => {
  console.error('Fetch error:', error);
});

// Test 2: Check if we can reach the API
fetch('/api/auth/login', {
  method: 'OPTIONS'
})
.then(response => {
  console.log('OPTIONS response:', response.status);
})
.catch(error => {
  console.error('OPTIONS error:', error);
});

// Test 3: Simple GET test
fetch('/api/auth/user')
.then(async response => {
  console.log('User API status:', response.status);
  const text = await response.text();
  console.log('User API response:', text);
})
.catch(error => {
  console.error('User API error:', error);
});