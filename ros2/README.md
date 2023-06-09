### A. Install ROS in Raspberry PI

### B. Setup and Installation

```
copy the folder led_sensor_package and my_sensor_package to your ROS workspace src directory

```

Run the following command

```
cd ~/ros2_ws
colcon build
source /opt/ros/foxy/setup.bash
source ~/ros2_ws/install/setup.bash

echo "create access right for access GPIO"
sudo usermod -a -G gpio user
sudo chown root.gpio /dev/gpiomem
sudo chmod g+rw /dev/gpiomem

```

Start ROS service

```
/opt/ros/foxy/bin/ros2 run my_sensor_package distance_sensor_node &
/opt/ros/foxy/bin/ros2 launch rosbridge_server rosbridge_websocket_launch.xml&
/opt/ros/foxy/bin/ros2 run led_sensor_package led_control_node&

```

Check ROS topics

```
ros2 run topic list
```

You should see below topics
/client_count <br>
/connected_clients<br>
/led/control<br>
/parameter_events<br>
/rosout<br>
/sensor/distance<br>

### C. Testing

1. Distance sensor

```
 ros2 topic echo /sensor/distance

 you will see something like this:
data: 0.1850000023841858
---
data: 0.18400000035762787
---
data: 0.1860000044107437
---
data: 0.1850000023841858
---
data: 0.18400000035762787
---
data: 0.18799999356269836
---
data: 0.1860000044107437
---
data: 0.17800000309944153
---
data: 0.18400000035762787
---
data: 0.18700000643730164
---
data: 0.18700000643730164
```

2. LED control<br>

```
run the following command to control the LED on and off
ros2 topic pub /led/control std_msgs/msg/String "data: 'on'"
ros2 topic pub /led/control std_msgs/msg/String "data: 'off'"
```
