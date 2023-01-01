const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

class MessageService {
  constructor() {
    this.message = [];
  }

  async find() {
    return this.message;
  }

  async create (data) {
    const message = {
        id: this.message.length,
        text: data.text
    };

    this.message.push(message);
    return message; 
  }
}

const app = express(feathers());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.configure(express.rest());
app.configure(socketio());

app.use('/messages', new MessageService());

app.use(express.errorHandler());

app.on('connection', connection => {
  app.channel('everybody').join(connection);
});

app.publish(() => app.channel('everybody'));

app.listen(3030).on('listening', () => {
  console.log('Feathers server listening on localhost:3030');
});

app.service('messages').create({
  text: 'Hello from the server'
}); 