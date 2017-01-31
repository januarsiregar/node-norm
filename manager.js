const Connection = require('./connection');
const Query = require('./query');

class Manager {
  constructor ({ connections = [] } = {}) {
    this.connections = connections;
    this.cachedConnections = {};
  }

  getConnectionByName (name) {
    if (name && name.indexOf('.') >= 0) {
      [ name ] = name.split('.');
    } else {
      name = this.connections[0].name;
    }

    if (!this.cachedConnections[name]) {
      const options = this.connections.find(connection => connection.name === name);
      this.cachedConnections[name] = Connection.create(options);
    }

    return this.cachedConnections[name];
  }

  find (name, criteria) {
    const manager = this;
    return new Query({ manager, name, criteria });
  }
}

module.exports = Manager;
