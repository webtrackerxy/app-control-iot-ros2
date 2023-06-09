import { useEffect, useState } from "react";
import ROSLIB from "roslib";

const RosPage = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const ros = new ROSLIB.Ros({
      url: "ws://192.168.1.102:9090", // replace with your ROS bridge server
    });

    const topic = new ROSLIB.Topic({
      ros: ros,
      name: "/sensor/distance", // replace with your topic
      messageType: "std_msgs/msg/Float32", // replace with your message type
    });

    ros.on("connection", function () {
      console.log("Connected to ROS websocket server.");
    });

    ros.on("error", function (error) {
      console.log("Error connecting to ROS websocket server: ", error);
    });

    ros.on("close", function () {
      console.log("Connection to ROS websocket server closed.");
    });

    topic.subscribe(function (message) {
      console.log("Received message on " + topic.name + ": ", message);
      setMessage(message.data);
    });

    return () => {
      topic.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>ROS IoT Project</h1>
      <p>Message: {message}</p>
    </div>
  );
};

export default RosPage;
