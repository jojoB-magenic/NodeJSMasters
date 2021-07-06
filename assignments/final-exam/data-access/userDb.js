const DataAccess = require('./db');

class UserDataAccess extends DataAccess {
  constructor () {
    super('users');
  }

  async getUserByAny (propertyName, propertyValue) {
    const user = await this.getByAny({
      propName: propertyName,
      propValue: propertyValue
    });

    return user;
  }
}

module.exports = new UserDataAccess();