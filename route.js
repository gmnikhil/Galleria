UI.registerHelper("currentRouteName",function(){
  return Router.current()?Router.current().route.getName():"";
});
Router.onBeforeAction(function() {
  $('body').addClass(this.route.options.template);
  this.next();
});
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});
Router.route('/',function(){

	this.render('navbar',{to:"navbar"});
	this.render('images',{to:"main"});
	this.render('modal',{to:"modal"})
});
Router.route('/about',function(){
	
	this.render('navbar',{to:"navbar"});
	this.render('modal',{to:"modal"})
	this.render('about',{to:"main"});

}); 