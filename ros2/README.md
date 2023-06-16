### A. Install ROS in Raspberry PI

Before installing ROS 2, ensure your Raspberry Pi 4 or 400 is set up correctly. Install Ubuntu Server 20.04 LTS. Run the following commands to setup, install and test ROS2

```
sudo apt update
sudo apt upgrade -y
sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
sudo apt install curl gnupg2 lsb-release
curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add -
sudo sh -c 'echo "deb [arch=$(dpkg --print-architecture)] http://packages.ros.org/ros2/ubuntu $(lsb_release -cs) main" > /etc/apt/sources.list.d/ros2-latest.list'
sudo apt update
sudo apt install ros-foxy-desktop
sudo apt install python3-colcon-common-extensions
sudo apt-get install ros-noetic-rosbridge-server
echo "source /opt/ros/foxy/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

Test the installation:

Open a terminal, run the following command.

```
ros2 run demo_nodes_cpp talker
```

Open another terminal, run the following command.

```
ros2 run demo_nodes_cpp listener
```

You will see the messages sending from the talker to the listener.

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
ros2 topic list
```

<br>
You should see below topics<br>
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

 you will see something like this: It return the data from the distance sensor in meter.
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
