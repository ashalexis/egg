//there's an error regarding the number of {mustaches} but it only works like this for some reason??
//please anyone help

const contact = new Vue({
    el: '#contact',
    data: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
    computed: {
        formIsValid: function() {
            return this.firstName && this.lastName && this.email && this.purchaseAgreementSigned;
        }
    },
  }});