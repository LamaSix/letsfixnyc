(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    $('button.menu-toggle').on('click touch', function(ev) {
      ev.preventDefault();
      $('ul.nav-items').toggleClass('active');
		$('ul.social-items').toggleClass('active');
      $(this).toggleClass('menu-active');
    });
  });

})(jQuery, window, document);

(function() {
  var isSecure;

  isSecure = function() {
    return window.location.protocol === 'https:';
  };

  $(document).ready(function() {
    $('#revmsg-CallSignupForm').attr('action', 'javascript:void(0);');

    $('#revmsg-CallSignupForm').submit(function(e) {
      var info, revereCalling, s;

      info = {
        phone: $('#phone').val(),
        campaign_line: $('#campaign_line').val()
      };

      if ($('#name').length > 0 && $('#name').val() !== '') {
        info.name = $('#name').val();
      }

      if ($('#first_name').length > 0 && $('#first_name').val() !== '') {
        info.first_name = $('#first_name').val();
      }

      if ($('#last_name').length > 0 && $('#last_name').val() !== '') {
        info.last_name = $('#last_name').val();
      }

      if ($('#zip').length > 0 && $('#zip').val() !== '') {
        info.zip = $('#zip').val();
      }

      if ($('#email').length > 0 && $('#email').val() !== '') {
        info.email = $('#email').val();
      }

      s = isSecure() ? 's' : '';

      revereCalling = 'http' + s + '://' + 'phone.reverehq.com/outgoing/';

      $.get(revereCalling, info, function(data) {
        if (data.err) {
          $('#revmsg-click-to-call #revmsg-CallSignupForm .err').html(data.message);

          $('#revmsg-click-to-call #revmsg-CallSignupForm .err').show();
        } else {
          if($('#revmsghtml').length > 0 && $('#revmsghtml').val() !== '' && $('#revmsghtml').val() != window.location && $('#always_redirect').val() == 'true') {
            window.location = 'http://'+$('#revmsghtml').val();
          } else {
            $('#revmsg-click-to-call .success').html(data.message);

            $('#revmsg-CallSignupForm').hide();

            $('#revmsg-click-to-call .success').append("<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '555717268143031');fbq('track', 'PageView');</script><noscript><img height=\"1\" width=\"1\" src=\"https://www.facebook.com/tr?id=555717268143031&ev=PageView&noscript=1\"/></noscript>");3

            $('#revmsg-click-to-call .success').show();
          }
        }
      });

      return false;
    });
  });
}).call(this);
