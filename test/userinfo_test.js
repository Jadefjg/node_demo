const axios = require('axios');

describe('GET /userinfo', () => {
  it('should return user info', async () => {
    const res = await axios.get('http://localhost:3000/userinfo');

    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('name');
    expect(res.data).toHaveProperty('email');
  });
});
