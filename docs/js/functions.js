/* specific ----------------------------------------------------------------- */
function set_page_information(){
	$('#github_repository').attr('href', G.cfg.url.github_repository);
	$('#title').html(marked(G.cfg.title));
	$('#subtitle').html(marked(G.cfg.subtitle));

	G.templates = {};
	G.templates.item = _.template($('#item-menu').html());
	G.templates.lan = _.template($('#item-lang').html());
	G.templates.tex = _.template($('#item-text').html());
}

function generate_menu(){
	yml_load(G.cfg.menu_texts_list_file, function(v){
	    let k, tmp_item;

		G.menu = v;
		G.html_men = $('#menu');
	    G.html_lan = $('#lan');
	    G.html_tit = $('#tit');
	    G.html_des = $('#des');
	    G.html_com = $('#com');
	    G.html_aut = $('#aut');
	    G.html_lic = $('#lic');
	    G.html_tex = $('#tex');

	  clear_document();
	
		for(k in G.menu.texts){
			G.html_men.append(G.templates.item({id:k, tit: G.menu.texts[k].title, ru:G.cfg.folder.texts}));
		}

		G.html_men.delegate('button', {
			click: function(){
				let e = $(this);
				const c = 'active';

				clear_document();	
				show_loading(true);
				update_url(`d:${e.data('key')}`);
				yml_load(e.data('src'), show_document);
				G.html_men.find('button').removeClass(c);
				e.addClass(c);
			}
		});

		G.html_lan.delegate('button', {
			click: function(){
				let e = $(this);
				e.toggleClass('ignore');
				G.html_tex.find('.tex.'+e.val()).toggle();
			}
		});

		load_documento_from_url();
	});
}

function active_tools(){

	if(G.html_tools == undefined){
		const ctl = 'show_top_line',
					ch = 'hover';
		
		G.html_tools = $('#tools');

		G.html_tools_btn = $('#tools .btn').eq(0);
		G.html_tools_btn.on({
			click: function(ev){
				G.html_tools.toggleClass(ch);
			}
		});

		G.html_tool_w_cols = $('#tool_w_cols');
		G.html_tool_w_cols.on({
			change: function(ev){
				$('#tex .paragraph .tex').css('width', `${G.html_tool_w_cols.val()}%`);
			}
		});

		G.html_tool_p_d_lines = $('#tool_p_d_lines');
		G.html_tool_p_d_lines.on({
			change: function(ev){
				let status = G.html_tool_p_d_lines[0].checked;
				console.log(status);
				if(status){
					$('#tex .paragraph').addClass(ctl);
				}else{
					$('#tex .paragraph').removeClass(ctl);
				}
			}
		});

	}
}

function clear_document(){
	G.html_lan.html('');
	G.html_tit.html('');
	G.html_tit.attr('href', '');
	G.html_des.html('').hide();
	G.html_com.html('').hide();
	G.html_aut.html('').hide();
	G.html_lic.html('').hide();
	G.html_tex.html('');
}

function show_document (d){
	let ld = _.keys(d.paragraphs[0]).sort(),
			i, j;
	
	G.html_tit.html(marked(d.title));

	if(d.description){
		G.html_des.html(marked(d.description)).show();
	}
	if(d.comment){
		G.html_com.html(marked(d.comment)).show();
	}
	if(d.authors){
		G.html_aut.html(marked(d.authors)).show();
	}

	for(i in ld){
		G.html_lan.append(G.templates.lan({id: ld[i]}));
	}

	for(j in d.paragraphs){
		G.html_tex.append(G.templates.tex({n: parseInt(j)+1, d: d.paragraphs[j], ld: ld}));
	}

	show_loading(false);
};

function show_loading(status){
	if(G.html_loading == undefined){
		G.html_loading = $('#loading');
	}
	const c = 'active';
	if(status){
		G.html_loading.addClass(c);
	}else{
		G.html_loading.removeClass(c);
	}
}

function update_url(tex){
	document.location.hash = tex;
	G.html_tit.attr('href', tex);
}

function load_documento_from_url(){
	const dat = document.location.hash.replace('#', '').split(':');
	if(dat[0] == 'd'){
		let btn = $(`[data-key=${dat[1]}]`);
		if(btn.length > 0){
			btn.click();
		}
	}
}


/* general ----------------------------------------------------------------- */
function yml_load(url, fn){
	$.get(url, function(r){
		fn(jsyaml.load(r));
	});
}

function server_shutdown(){
	$.get('./exit', function(r){
		window.close();
	});
}

function close_server(sel){
	let e = $(sel);
	if(document.location.host.indexOf('localhost') < 0){
		e.remove();
	}
	e.on({
		click: function(ev){
			server_shutdown();
		}
	});
}

function ask_exit(){
	return false;
}

function on_before_unload(e){
    if (ask_exit()){
        e.preventDefault();
        e.returnValue = '';
    	server_shutdown();
        return;
    }
    delete e['returnValue'];
}