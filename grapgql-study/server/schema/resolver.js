const { UserList } = require("../fakeData");

const resolvers = {
  Query: {
    users: () => {
      // Here you can write all your logic to tell graphQL what to return
      return UserList;
    },
  },
};

module.exports = { resolvers };
