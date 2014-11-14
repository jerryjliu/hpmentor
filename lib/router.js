Router.map( function() {
  this.route('hpmentor', {
    path:'/',
    template:'hpmentor',
  });
  //this.route('mentor');
  this.route('mentorform', {
    path:'/mentorform',
    template:'mentorform',
  });
  this.route('login', {
  	path:'/login',
  	template:'login',
  });
});
