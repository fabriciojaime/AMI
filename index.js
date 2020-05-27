const AsteriskManager = require('asterisk-manager');
const ami = new AsteriskManager('5038','192.168.0.250','admin','123456',true);

//ESCUTA TODOS OS EVENTOS
/*ami.on('managerevent', function(evt) {
   console.log(evt);
});*/

ami.on('peerstatus', function({
    peer,
    peerstatus,
    address
}){ 
    console.log("RAMAL: " + peer +", STATUS: "+peerstatus+", IP: "+address);
});

ami.action({
    'action':'command',
    'command':'sip show peers'
  }, function(err, res) {
      console.log(res)
  });