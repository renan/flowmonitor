var Collector=require("Netflow");
var x = new Collector(function (err) {
    if(err != null) {
        console.log("ERROR ERROR \n"+err);
    }
})
.on("listening",function() { console.log("listening on 2055"); } )

.on("packet",function(packet) { 
	var now = new Date();
	console.log("\n SEQ " + packet.header.flow_sequence + " on > " + now.toTimeString() + "\n");

	for (it = 0; it < packet.v5Flows.length; it++) {
		console.log(packet.v5Flows[it].srcaddr + ":" + packet.v5Flows[it].srcport  + " -> " + packet.v5Flows[it].dstaddr + ":" + packet.v5Flows[it].dstport + " ( " + packet.v5Flows[it].dOctets + " bytes)"); 
	}
} )



.listen(2055);
