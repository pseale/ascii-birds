#!/bin/bash

ruby -run -e httpd ./site -p 3000 &

sleep 1

if which xdg-open > /dev/null
then
  xdg-open http://localhost:3000
elif which gnome-open > /dev/null
then
  gnome-open http://localhost:3000
elif which open > /dev/null
then
  open http://localhost:3000
fi

fg