const express = require('express');
const app = express();
const bodyParser = require('body-parser');  //recebe dados de formulários

// MÓDULOS ASTERISK
const AsteriskManager = require('asterisk-manager');
const ami = new AsteriskManager('5038','192.168.0.250','admin','123456',true);

// ENGINE
app.set('view engine','ejs');
app.use(express.static("src"));

// BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//RECEBE STATUS RAMAL
var dados = ami.on('extensionstatus', function(event){ 
    console.log(event)
});

// ROTAS
app.get('/',(req,res)=>{
    res.render('index',{
        dados: dados
    });  
});

//RECEBE TODOS OS EVENTOS
/*
ami.on('managerevent', function(evt) {
    console.log(evt);
});
*/

// VERIFICA RAMAL / STATUS / IP
/*
ami.on('peerstatus', function({
    peer,
    peerstatus,
    address
}){ 
    console.log("RAMAL: " + peer +", STATUS: "+peerstatus+", IP: "+address);
});
*/

// ENVIA COMANDO A CLI
/*
ami.action({
    'action':'command',
    'command':'sip show peers'
}, function(err, res) {
    console.log(res)
});
*/

//RECEBE STATUS RAMAL
/* 
ami.on('ExtensionStatus', function({event}){ 
    console.log(event);
});
*/



const portNumber = 80;
app.listen(portNumber,(erro) => {
    if(erro){
        console.log("Não foi possível realizar a conexão com o servidor, erro: "+erro);
    }else{
        console.log("Servidor conectado na porta "+portNumber);
    }
});