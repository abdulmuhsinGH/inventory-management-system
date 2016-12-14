#!/bin/bash
trigger=100
# activeQcount=
echo mysql -e "show full processlist;" | egrep -v "leechprotect|root|Time" | awk -v T=$trigger '{ if ( $6 > T ) print $0}' | wc -l
# if [ $activeQcount -gt 0 ]
# then
# echo "=====================================================================================" > /tmp/QueryMonitor
# echo "= QueryMonitor has found a new query running for longer than 100 seconds (1 min,40 secs)" >> /tmp/QueryMonitor
# echo "=====================================================================================" >> /tmp/QueryMonitor
# date >> /tmp/QueryMonitor
# echo "" >> /tmp/QueryMonitor
# mysql -e "show full processlist;" >> /tmp/QueryMonitor
# echo "=====================================================================================">> /tmp/QueryMonitor
# cat /tmp/QueryMonitor | awk -v T=$trigger '{ if ( $6 > T ) print $0}' | \
# mail -s"Caught query running longer than $trigger seconds" iddris@votomobile.org -- -r "iddris@votomobile.org"
# fi