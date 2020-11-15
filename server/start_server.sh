cd /root/server
npm install

if [ $DEV ];then npm run dev;else npm start;fi
