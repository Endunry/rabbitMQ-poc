const rabbit = require('amqplib');
const QUEUE_NAME = 'number';
const EXCHANGE_TYPE = 'direct';
const EXCHANGE_NAME = 'mainClient';
const KEY = 'myKey';
const number = '5'
connection = rabbit.connect('amqp://localhost');
connection.then(async (conn) => {
    const clientChannel = await conn.createChannel();
    const subscriberChannel = await conn.createChannel();
    await clientChannel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
    await clientChannel.assertQueue(QUEUE_NAME);
    clientChannel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, 'ClientSend');
    clientChannel.sendToQueue(QUEUE_NAME, Buffer.from('1'));
    subscriberChannel.consume('square', (m) => {
        const number = parseInt(m.content.toString())
        console.log(number)
        subscriberChannel.ack(m)
    })
})