#!/bin/sh
cd /Users/wangxiaoyu/Project/simple-blog/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
echo "copy access.log done!"



