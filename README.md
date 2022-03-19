# rabbitMQ-poc

Install and run RabbidMQ Server:
`docker-compose up`

Install npm Packages
`npm install`

Open 3 Terminals and run the three .js files index.js, index2.js and index_consumer.js
The index and index2 will send messages to the consumer, he squares the input and broadcasts it back to the all the other
``` bash
node index.js
node index2.js
node index_consumer.js
```
