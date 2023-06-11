This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Rename .env.sample to .env, Edit .env, change ROS_WS_HOST_URL to IP address of the ROS2 machine.
2. Install and run the development server:

   ```bash
   npm i
   npm run dev
   # or
   yarn
   yarn run dev
   ```

## API endpoints

1. Distance Sensor <br>
   [http://localhost:3000/api/sensor](http://localhost:3000/api/sensor)

2. LED Control <br>
   [http://localhost:3000/api/led](http://localhost:3000/api/led)
