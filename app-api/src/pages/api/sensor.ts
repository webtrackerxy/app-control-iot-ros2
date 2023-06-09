import { NextApiRequest, NextApiResponse } from 'next';
import ROSLIB from 'roslib';
import Cors from 'cors';
import { config } from 'dotenv';

config();

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: (req: NextApiRequest, res: NextApiResponse, next: (result: unknown) => void) => void) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

// Create and cache ROSLIB.Ros instance
const ros = new ROSLIB.Ros({
  url: "ws://" + process.env.ROS_WS_HOST_URL, // replace with your ROS bridge server
  /* 
    To expose your ROS WebSocket server running on port 9090 to the internet
    1. Download and install ngrok
    2. Run ngrok > ngrok http 9090
    3. copy your_generated_subdomain.ngrok.io to the websocket server url. please use wss for secure web socket connection
  */
  //  url: "wss://" + process.env.ROS_WS_NGROK_HOST_URL, // replace with your ROS bridge server
});

ros.on('error', function(error:any) {
  console.log('Error connecting to websocket server: ', error);
});

// Create and cache Topic
let topic = new ROSLIB.Topic({
  ros: ros,
  name: "/sensor/distance",
  messageType: "std_msgs/msg/Float32", 
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

  req.socket.setTimeout(Number.MAX_VALUE);
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Use cached ROSLIB.Topic instance
  topic.subscribe(function (message: ROSLIB.Message) {
    res.write(`data: ${JSON.stringify(message)}\n\n`);
  });

  res.on('close', () => {
    topic.unsubscribe();
    res.end();
  });
};
