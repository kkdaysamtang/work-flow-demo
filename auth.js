function login(username, password) {
  if (!username || !password) throw new Error('Missing credentials');
  return { token: 'demo-token', user: username };
}

function logout() {
  return { success: true };
}

module.exports = { login, logout };
