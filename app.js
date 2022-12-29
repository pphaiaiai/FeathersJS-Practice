const feathers = require('@feathersjs/feathers');

const app = feathers();

class MessageService {
  constructor() {
    this.message = [];
  }

  async find(params) {
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

app.use('messages', new MessageService());

app.service('messages').on('created', message => {
    console.log('A new message has been created', message);   
})

const main = async () => {
    await app.service('messages').create({
        text: 'Hello world'
    });

    await app.service('messages').create({
        text: 'Hello world again'
    });

    const messages = await app.service('messages').find();
    console.log('All messages', messages);
}

main();

