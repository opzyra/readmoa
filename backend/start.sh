#!/bin/sh
pm2 stop readmoa-server
pm2 delete readmoa-server
export NODE_ENV=production
pm2 start --name "readmoa-server" npm -- start
