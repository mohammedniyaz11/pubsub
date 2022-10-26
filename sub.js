const {PubSub} = require('@google-cloud/pubsub');

async function quickstart(
  projectId = 'pubsub-learn-366609', // Your Google Cloud Platform project ID
  topicNameOrId = 'projects/pubsub-learn-366609/topics/myfirstprojectiiiiiiiii', // Name for the new topic to create
  subscriptionName = 'projects/pubsub-learn-366609/subscriptions/MyfirstSubscriptioniiiiii' // Name for the new subscription to create
) {
  // Instantiates a client
  console.log(projectId)
  const pubsub = new PubSub({projectId});


  // Creates a new topic  \
  const [topic] = await pubsub.createTopic(topicNameOrId);
  console.log(`Topic ${topic.name} created.`);
  console.log(topic)

  // Creates a subscription on that new topic
  const [subscription] = await topic.createSubscription(subscriptionName);


  // Receive callbacks for new messages on the subscription
  subscription.on('message', message => {
    console.log('Received message:', message.data.toString());
    process.exit(0);
  });


  // Receive callbacks for errors on the subscription
  subscription.on('error', error => {
    console.error('Received error:', error);
    process.exit(1);
  });

  // Send a message to the topic
  topic.publish(Buffer.from('Test message!'));
}
quickstart()