import makeData from "./makeData";

const users = [
  {
    login: 'user_editor',
    password: '12345',
    type: 'user',
    role: 'editor',
    organizationId: '0',
    name: 'User 123'
  },
  {
    login: 'user_reviewer',
    password: '12345',
    type: 'user',
    role: 'reviewer',
    organizationId: '0',
    name: 'User reviewer'
  },
  {
    login: 'admin',
    password: '12345',
    type: 'admin',
    name: 'Main admin'
  },
];

export const db = {
  getAll: (terminologyId, terminologiesList) => {
    const terminologyName = terminologiesList.find(item => item.id === terminologyId).terminologyName;
    return makeData(terminologyName, 10000)
  },
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