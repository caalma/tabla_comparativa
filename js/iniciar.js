let cargar_yml = function(url, accion){
	$.get(url, function(r){
		accion(jsyaml.load(r));
	});
}

$(window).on({
	load: function(){
		let menu = $('#menu');
		let info = $('#info');
		let leng = $('.leng', info).eq(0);
		let	titu = $('.titu', info).eq(0);
		let	text = $('.text', info).eq(0);

		let mostrar_texto = function(d){
			/* lenguajes */
			let ld = _.keys(d.textos[1]);
			let pla_leng = _.template($('#item-lenguaje').html());
			leng.html('');
			for(let i in ld){
				leng.append(pla_leng({id: ld[i]}));
			}

			/* titulo */
			titu.html(marked.parse(d.titulo));

			/* texto */
			let pla_text = _.template($('#item-texto').html());
			text.html('');
			for(let i in d.textos){
				text.append(pla_text({n: parseInt(i)+1, d: d.textos[i]}));
			}
			
		};

		menu.delegate('button', {
			click: function(){
				let e = $(this);
				let c = 'actual';
				cargar_yml(e.data('src'), mostrar_texto);
				menu.find('button').removeClass(c);
				e.addClass(c);
			}
		});

		leng.delegate('button', {
			click: function(){
				let e = $(this);
				e.toggleClass('ignorar');
				text.find('.tex.'+e.val()).toggle();
			}
		});



		cargar_yml('cfg/menu.yml', function(v){
			let cfg = v;

			for(let i in cfg.textos){
				let k = cfg.textos[i];
				let p = _.template($('#item-menu').html());
				menu.append(p({id:k, ru:cfg.carpeta.dat}))					

			}
		});




	},
});
$(document).ready(function(){
});


if(false){
	btn_menu.on({
			click: function(ev){
				cargar_yml($(this).attr('value'), mostrar_contenido);
			}
		});
		
		let mostrar_contenido = function(tex){
			let yml = jsyaml.load(tex);
			vis_crudo.text(tex);
			vis_procesado.text(JSON.stringify(yml));
			cnt_tit.text(yml.titulo);
			cnt_inf.html(marked.parse(yml.texto));
			cnt_acc.html('');
			if(!_.isUndefined(yml.acciones)){
				for(let k in yml.acciones){
					let t = '<li><%= it %>:<b><%= va %></b></li>'
					cnt_acc.append(_.template(t)({'it':k, 'va':yml.acciones[k]}));
				}
			}
		}
}