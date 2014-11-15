Router.map( function() {
  this.route('hpmentor', {
    path:'/questions',
    template:'hpmentor',
  });
  //this.route('mentor');
  this.route('mentorform', {
    path:'/',
    template:'mentorform',
  });
  this.route('register', {
  	path:'/register',
  	template:'SignUp',
  });
  this.route('signin', {
  	path:'/signin',
  	template:'SignIn'
  });
  this.route('signout', {
  	path:'/signout',
  	template:'SignOut'
  });
});
