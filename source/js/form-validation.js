// Form validation module

exports.validate = function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='mail-form']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      name: {
        required: true,
        minlength: 2
      },
      mail: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        email: true
      }
    },
    // Specify validation error messages
    messages: {
      name: {
        required: "Please enter your name",
        minlength: "Your name must be at least 2 characters long"
      },
      mail: "Please enter a valid email address"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
};
