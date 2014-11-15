/* Section 1 */
trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
    if (value && value !== ''){
        return true;
    }
    console.log('Please fill in all required fields.');
    return false;
};

isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    console.log('Please enter a valid email address.');
    return false;
};

isValidPassword = function(password) {
    if (password.length < 6) {
        console.log('Your password should be 6 characters or longer.');
        return false;
    }
    return true;
};

areValidPasswords = function(password, confirm) {
    if (!isValidPassword(password)) {
        return false;
    }
    if (password !== confirm) {
        console.log('Your two passwords are not equivalent.');
        return false;
    }
    return true;
};


if (Meteor.isClient) {
    /* SIGNUP: Second system */
    Template.SignUp.events({
      'click button': function(e) {
        e.preventDefault();

        var email = trimInput($('#signUpEmail').val().toLowerCase()),
            password = $('#signUpPassword').val(),
            passwordConfirm = $('#signUpPasswordConfirm').val();
        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {

          Accounts.createUser({email: email, password: password}, function(err) {
            if (err) {
              if (err.message === 'Email already exists. [403]') {
                alert('We are sorry but this email is already used.');
              } else {
                alert('We are sorry but something went wrong.');
              }
            } else {
              Router.go('/questions');
              alert('Thanks for registering, you\'re in!');
            }
          });

        }
        return false;
      },
    });

    /* SIGNIN: Third system */
    Template.SignIn.events({
      'click button': function(e, t) {
        e.preventDefault();
        var email = trimInput($('#signInEmail').val().toLowerCase()),
            password = $('#signInPassword').val();

        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {

          Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
              Router.go('/signin');
              alert('These credentials are not valid.');
            } else {
              Router.go('/questions');
              alert('Welcome back!');
            }
          });

        }
        return false;
      },
    });

    Meteor.startup(function() {
        $('html').attr('style', 'background-color: #f5f5f5');
    });
}