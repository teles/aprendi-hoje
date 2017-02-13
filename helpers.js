// helpers.js
var handlebars  = require('handlebars');

handlebars.registerHelper("numeroParaNomeDoMes", function(numeroDoMes) {
	var nomesDosMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
	return nomesDosMeses[numeroDoMes-1];		
});	

module.exports = handlebars;