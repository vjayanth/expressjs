module.exports = {
    validateString: function(string, length) {
      if (string.length < length) {
        return false;
      } else {
        return true;
      }
    },
    validateEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    validateMobile: function(mobile) {
      if (/^\d{10}$/.test(mobile)) {
        return true;
      } else {
        return false;
      }
    }
  };
  