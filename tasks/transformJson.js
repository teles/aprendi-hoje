var gulp = require('gulp');
var jsonTransform = require('gulp-json-transform');
var rename = require('gulp-rename');
var gutil = require('gulp-util');

module.exports = function() {

 	var task = gulp.src("./temp/aprendizados.json")
    .pipe(jsonTransform(function(aprendizados, file) {
    	aprendizados.reverse();
    	var saida = [];

		if(!Array.prototype.getObjectByValue){
		    Array.prototype.getObjectByValue = function(propertyName, propertyValue){
		        for(var i=0; i < this.length;i++){
		            var item = this[i];
		            if(item[propertyName] === propertyValue){
		                return item;
		            }
		        }
		    };
		}

		for(var i=0; i < aprendizados.length; i++){
		   var anoMesDia = aprendizados[i].date.match(/(20[0-9]{2})-([0-9]{2})-([0-9]{2})/);
		   var idDoAno = anoMesDia[1];
		   var idDoMes = anoMesDia[2];
		   var idDoDia = anoMesDia[3];
		   var anoDaSaida, mesDaSaida, diaDaSaida;

		   // verifica e adiciona ano
		   if(!saida.anos) saida.anos = [];
		   var anoJaAdicionado = saida.anos.getObjectByValue("id", idDoAno);
		   if(!anoJaAdicionado){
		      anoDaSaida = {id: idDoAno};
		      saida.anos.push(anoDaSaida);
		   }
		   else {
		      anoDaSaida = anoJaAdicionado;
		   }

		   // verifica e adiciona meses
		   if(!anoDaSaida.meses) anoDaSaida.meses = [];
		   var mesJaAdicionado = anoDaSaida.meses.getObjectByValue("id", idDoMes);
		   if(!mesJaAdicionado){
		      mesDaSaida = {id: idDoMes};
		      anoDaSaida.meses.push(mesDaSaida);
		   }
		   else {
		      mesDaSaida = mesJaAdicionado;
		   }

		   // verifica e adiciona dias
		   if(!mesDaSaida.dias) mesDaSaida.dias = [];
		   diaDaSaida = {id: idDoDia};
		   mesDaSaida.dias.push(diaDaSaida);

		   diaDaSaida.aprendizado = aprendizados[i].aprendizado;
		   diaDaSaida.categoria = aprendizados[i].categoria;
		   diaDaSaida.descricaoLonga = aprendizados[i].descricaoLonga;
		   diaDaSaida.date = aprendizados[i].date;
		}
    	return saida.anos;

    }))
    .pipe(gulp.dest('./temp'));

	return task;
};
