import React, { useEffect, useState } from "react";

const RosData: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const eventSource = new EventSource(
      process.env.REACT_APP_API_HOST_URL + "/api/sensor"
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessage(data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <p>Message: {JSON.stringify(message)}</p>
    </div>
  );
};

export default RosData;
