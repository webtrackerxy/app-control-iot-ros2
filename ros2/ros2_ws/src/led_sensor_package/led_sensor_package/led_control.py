from gpiozero import LED
from std_msgs.msg import String
import rclpy
from rclpy.node import Node

class LedControlNode(Node):
    def __init__(self):
        super().__init__('led_control_node')
        self.led = LED(10)
        self.publisher_ = self.create_publisher(String, '/led/control', 10)
        self.subscription = self.create_subscription(String, '/led/control', self.listener_callback, 10)

    def listener_callback(self, msg):
        if msg.data.lower() == "on":
            self.led.on()
            self.get_logger().info('LED is ON')
        elif msg.data.lower() == "off":
            self.led.off()
            self.get_logger().info('LED is OFF')
        else:
            self.get_logger().info('Invalid command, please send "on" or "off"')

def main(args=None):
    rclpy.init(args=args)
    led_control_node = LedControlNode()
    rclpy.spin(led_control_node)
    led_control_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
