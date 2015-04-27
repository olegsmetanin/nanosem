import express from 'express';

export default class Server {

	listen() {
		var instance = express();
		instance.use(express.static('./dest/webclient'));
		this.instance = instance.listen.apply(instance, arguments);
	}

	close() {
		this.instance.close();
	}
}