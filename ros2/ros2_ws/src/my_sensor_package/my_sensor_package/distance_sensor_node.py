import rclpy
import time
import VL53L0X
from rclpy.node import Node
from std_msgs.msg import Float32

class DistanceSensorNode(Node):
    def __init__(self):
        super().__init__('distance_sensor_node')
        self.publisher_ = self.create_publisher(Float32, 'sensor/distance', 10)
        timer_period = 0.01  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

        # Create a VL53L0X object
        self.tof = VL53L0X.VL53L0X()

        # Open and start the VL53L0X sensor
        self.tof.open()
        self.tof.start_ranging(VL53L0X.Vl53l0xAccuracyMode.BETTER)

    def read_distance(self):
        # Read distance from the sensor
        distance = self.tof.get_distance()

        # Convert distance from millimeters to meters
        distance_m = distance / 1000.0

        return distance_m

    def timer_callback(self):
        msg = Float32()
        msg.data = self.read_distance()
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%f"' % msg.data)

def main(args=None):
    rclpy.init(args=args)

    distance_sensor_node = DistanceSensorNode()

    try:
        rclpy.spin(distance_sensor_node)
    except KeyboardInterrupt:
        # Stop ranging and close the sensor on KeyboardInterrupt
        distance_sensor_node.tof.stop_ranging()
        distance_sensor_node.tof.close()
        distance_sensor_node.get_logger().info('Sensor stopped and closed')

    # Destroy the node explicitly
    # (optional - otherwise it will be done automatically
    # when the garbage collector destroys the node object)
    distance_sensor_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
