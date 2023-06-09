import { NextApiRequest, NextApiResponse } from 'next';
import ROSLIB from 'roslib';
import Cors from 'cors';
import { config } from 'dotenv';

config();
// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'], 
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: (req: NextApiRequest, res: NextApiResponse, next: (result: unknown) => void) => void) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

  // Run the middleware
  await runMiddleware(req, res, cors)

  // Only handle post requests
  if (req.method === 'POST') {
    const ros = new ROSLIB.Ros({
      url: "ws://"+ process.env.HOST_URL, // replace with your ROS bridge server
    });

    const topic = new ROSLIB.Topic({
      ros: ros,
      name: "/led/control", // replace with your topic
      messageType: "std_msgs/msg/String", // replace with your message type
    });

    const ledState = req.body.state; // Assuming you're sending a "state" field in your POST body
    console.log("ledState", ledState);

    // Check that ledState is valid
    if (['on', 'off'].includes(ledState)) {
      // Create a new ROS message
      const message = new ROSLIB.Message({
        data: ledState
      });


      // Publish the message to the ROS topic
      topic.publish(message);

      // Respond to the client
      res.status(200).json({ message: `LED turned ${ledState}` });
    } else {
      res.status(400).json({ error: 'Invalid state. State must be "on" or "off".' });
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
};
