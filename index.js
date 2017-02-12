/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-scrollbar',

  included: function(app) {
    this._super.included(app);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import(app.bowerDirectory + '/perfect-scrollbar/js/perfect-scrollbar.js');
      app.import(app.bowerDirectory + '/perfect-scrollbar/css/perfect-scrollbar.css');
    }

  }
};
