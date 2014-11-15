if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hpmentor.helpers({
    counter: function () {
      return Session.get("counter");
    },
    requests: function () {
      return Requests.find();
    }
  });

  Template.hpmentor.events({
    'click a #signout': function(event) {
      // alert('hello');
      // Meteor.logout(function() {
      //   Router.go('/signout')
      //   console.log('Logged out');
      // });

      return false;
    },
    'click button': function(event) {
      var id = event.currentTarget.id;
      var requests = Requests.find({_id: id}).fetch();
      var request = requests[0];
      if (request.statusg) {
        Requests.update({_id: id}, {$set: {statusg: null, statusy: true}});
      }
      else if (request.statusy) {
        Requests.update({_id: id}, {$set: {statusy: null, statusr: true}});
      }
    }
  });
        
    Meteor.startup(function() {
        $('html').attr('style', 'background-color: #f5f5f5');
    });
}