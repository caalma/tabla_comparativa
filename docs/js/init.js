/* underscore custom settings */
_.templateSettings = {
  interpolate:/\{\{=([\s\S]+?)\}\}/g,
  evaluate:/\{\{([\s\S]+?)\}\}/g,
  escape:/\{\{--([\s\S]+?)\}--\}/g
};


/* global variable */
var G = {};


/* initialization */
$(window).on({
	load: function(){
		yml_load('./cfg/general.yml', function(v){
			G.cfg = v;
			set_page_information();
			generate_menu();
			active_tools();
			close_server('#exit');
		});
	},
});

window.addEventListener('beforeunload', on_before_unload);