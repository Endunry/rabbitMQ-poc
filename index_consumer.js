const rabbit = require('amqplib');
const QUEUE_NAME = 'number';
connection = rabbit.connect('amqp://localhost');
// Connect to RabbitMQ
connection.then(async (conn) => {
    // A Channel is a form of pipe to send and receive messages
    const channel = await conn.createChannel(); // Channel to receive data
    const clientChannel = await conn.createChannel(); // Channel to send back data to the client

    await clientChannel.assertExchange('clients', 'fanout'); // An exchange is a way to route messages to queues, the first parameter is the name of the exchange and the second parameter is the type of exchange 'fanout' means that all the messages will be sent to all the queues that are connected to this exchange (In our case all the other clients)
    
    // A Queue Stores messages and waits until a consumer is ready to receive them, it is a FIFO queue (First In First Out) and it is a durable queue (It will survive a server restart)
    await clientChannel.assertQueue('square'); // Every "client" has a own queue to receive messages from the server in this case the server has 2 clients. In production you would handle the channels in a better way.
    await clientChannel.assertQueue('square2');
    channel.consume(QUEUE_NAME, (m) => { // Consume the input from the 'number'-Queue
        const number = parseInt(m.content.toString())
        const square = number * number // Square it and
        clientChannel.publish('clients', '', Buffer.from(square.toString())) // Send the message back to the exchange, from there itll be sent to all the clients connected to the exchange due to the 'fanout' type of exchange
        channel.ack(m) // Acknowledge the message
    })
})