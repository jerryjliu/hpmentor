if (Meteor.isClient) {
  var tagBox;
  // counter starts at 0
  Template.mentorform.helpers({
    
  });

  Template.mentorform.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    },
    'submit' : function(event) {
      alert('hi');
      var name = $("#form_name").val();
            alert('hi');
      var description = $("#form_msg").val();
      var contactInfo = $("#form_contact").val();
            alert('hi');

      var location = $("#form_location").val();
      var tag_box = tagBox[0];
            alert('hi');

      var tags = tag_box.tagging("getTags");

      alert('hi');
    
      Requests.insert({
        name: name,
        description: description,
        contact: contactInfo,
        location: location,
        tags: tags,
        statusg: true,
        statusy: false,
        statusr: false
      });

      alert('hi2');
      
      $("#formcontainer").hide();
      $("#formdone").show();
      event.preventDefault();
    }
  });
  
  Template.mentorform.rendered = function() {
    tagBox = $("#tagBox").tagging();
    tagBox[0].addClass("form-control");
  }
    Meteor.startup(function() {
      //$("#formcontainer").hide();
      //alert($("#formcontainer"));
      //$("#tagBox").tagging();
    });
}