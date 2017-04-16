(function() {
  function vendorModule() {
    'use strict';

    const ps = self['PerfectScrollbar'];

    return {
      'default': ps,
      'initialize': ps['initialize'],
      'destroy': ps['destroy'],
      'update': ps['update']
    };
  }

  define('perfect-scrollbar', [], vendorModule);
})();
