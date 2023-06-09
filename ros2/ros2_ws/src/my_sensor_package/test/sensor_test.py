import time
import VL53L0X

# Create a VL53L0X object
tof = VL53L0X.VL53L0X()

# Open and start the VL53L0X sensor
tof.open()
tof.start_ranging(VL53L0X.Vl53l0xAccuracyMode.BETTER)

# Loop to read and print distances
try:
    while True:
        distance = tof.get_distance()
        if distance > 0:
            print("Distance: {}mm".format(distance))
        time.sleep(0.01)
except KeyboardInterrupt:
    pass

# Stop ranging and close the sensor
tof.stop_ranging()
tof.close()
