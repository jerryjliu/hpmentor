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
      'click button #btn-submit': function(e) {
        e.preventDefault();

        var signUpForm = $(e.currentTarget),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase()),
            password = signUpForm.find('#signUpPassword').val(),
            passwordConfirm = signUpForm.find('#signUpPasswordConfirm').val();

        if (isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {

          Accounts.createUser({email: email, password: password}, function(err) {
            if (err) {
              if (err.message === 'Email already exists. [403]') {
                console.log('We are sorry but this email is already used.');
              } else {
                console.log('We are sorry but something went wrong.');
              }
            } else {
              console.log('Congrats new Meteorite, you\'re in!');
            }
          });

        }
        return false;
      },
    });

    /* SIGNIN: Third system */
    Template.SignIn.events({
      'click button #btn-submit': function(e, t) {
        e.preventDefault();

        var signInForm = $(e.currentTarget),
              email = trimInput(signInForm.find('.email').val().toLowerCase()),
              password = signInForm.find('.password').val();

        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {

          Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
              console.log('These credentials are not valid.');
            } else {
              console.log('Welcome back Meteorite!');
            }
          });

        }
        return false;
      },
    });

    /* SIGN OUT: Fourth system */
    Template.SignOut.events({
      'click button #btn-submit': function(e, t) {

        Meteor.logout(function() {
          console.log('Bye Meteorite! Come back whenever you want!');
        });

        return false;
      }
    });

    Meteor.startup(function() {
        $('html').attr('style', 'background-color: #f5f5f5');
    });
}