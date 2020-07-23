import makeData from "./makeData";

const users = [
  {
    login: 'user',
    password: '12345',
    role: 'user',
    name: 'User 123'
  },
  {
    login: 'admin',
    password: '12345',
    role: 'admin',
    name: 'Main admin'
  },
];

export const db = {
  getAll: (terminologyName) => makeData(terminologyName, 10000),
};

export const userAuthenticate = (user) => {
  return new Promise((resolve, reject) => {
    const loggedUser = users.find(registeredUser => {
      return registeredUser.login === user.login && registeredUser.password === user.password
    });

    if(loggedUser) {resolve(loggedUser)}
    else reject(false)

  })
};