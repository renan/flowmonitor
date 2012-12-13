flowmonitor
===========
collectors/ 
- dstat: parse and push dstat streams
- sflow: parse and push sflow streams

web/
- AngularJS: MVC framework


Requirements Server side:

apt-get install dstat nc
dstat | nc tools.fshosting.net 8888
