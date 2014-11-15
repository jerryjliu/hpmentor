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

    'click #signout': function(event) {
      Meteor.logout(function() {
        Router.go('/signout');
      });


      return false;
    },
    'click button': function(event) {
      var id = event.currentTarget.id;
      var requests = Requests.find({_id: id}).fetch();
      var request = requests[0];
      /*alert(Meteor.user.find_id;);*/
      var existingrequest = Requests.find({_id: id});
      if (existingrequest.mentor == null) {
        Requests.update({_id: id}, {$set: {mentor: Meteor.user().profile.firstname}});
      }
      if (existingrequest.mentor != Meteor.user().profile.firstname) {
        if (request.statusg) {
          Requests.update({_id: id}, {$set: {statusg: null, statusy: true}});
        }
        else if (request.statusy) {
          Requests.update({_id: id}, {$set: {statusy: null, statusr: true}});
        }
      }
    }
  });

  Template.hpmentor.rendered = function() {
    if (Meteor.user() == null) {
      Router.go("/signin");
    }
  }
        
    Meteor.startup(function() {
        $('html').attr('style', 'background-color: #f5f5f5');
    });
}