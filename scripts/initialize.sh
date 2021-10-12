#!/bin/bash
cd /home/ubuntu/MuggerBar/server
npm install
npm install pm2@latest
sudo apt-get update
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown ubuntu /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80