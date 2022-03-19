const rabbit = require('amqplib');
const QUEUE_NAME = 'number';
connection = rabbit.connect('amqp://localhost');
connection.then(async (conn) => {
    const clientChannel = await conn.createChannel(); // Channel to send data to the server
    const subscriberChannel = await conn.createChannel(); // Channel to receive data from the server
    await clientChannel.assertQueue(QUEUE_NAME); // Every client uses the same queue to send data to the server
    clientChannel.sendToQueue(QUEUE_NAME, Buffer.from('2')); // Send a message to the server via the Channel
    subscriberChannel.consume('square2', (m) => { // Consume the message from the server via the Channel, this queue is only for this very client and will not be used by other clients, so the channel name should be the unique id of the client or something like that
        const number = parseInt(m.content.toString())
        console.log(number)
        subscriberChannel.ack(m)
    })
})