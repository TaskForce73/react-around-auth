export const BASE_URL = 'https://register.nomoreparties.co';

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

  // Hi Mahmud! Nice to meet you again! I have a little question about this red mistake. As I know the private functions is a privelegy of the class instances, but I don't use them here in this module, so if i just right something like "const _checkResponse or _checkResponse ()" it will be a mistake, won't it?  So, what should I do here?) 

export const register = ( password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email}),
  }).then(checkResponse);
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password, email})
  }).then(checkResponse);
};

export const validateToken = (token) => {
  if (token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then(checkResponse);
  }
};
