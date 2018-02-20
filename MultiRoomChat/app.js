var app = require('./config/server');

var server = app.listen(80, function(){
	console.log('servidor online');
})

var io = require('socket.io').listen(server);

app.set('io',io);

io.on('connection', function(socket){
	
	console.log('Usuario conectado');
	
	socket.on('disconnect', function(socket){
		console.log('Usuario desconectado');
	});
	
	socket.on('msgParaServidor',function(data){
		//dialogos
		socket.emit('msgParaCliente', {apelido:data.apelido, mensagem: data.mensagem});
		socket.broadcast.emit('msgParaCliente', {apelido:data.apelido, mensagem: data.mensagem});
		
		//participantes
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
			socket.emit('participantesParaCliente', {apelido:data.apelido});
			socket.broadcast.emit('participantesParaCliente', {apelido:data.apelido});
		}
		
		
	});
	
});

