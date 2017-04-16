/* eslint-env node */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'ember-cli-scrollbar',

  included(app) {

    if (!isFastBoot()) {

      const vendor = this.treePaths.vendor;

      app.import(vendor + '/perfect-scrollbar/js/perfect-scrollbar.js');
      app.import(vendor + '/perfect-scrollbar/css/perfect-scrollbar.css');

    }

    return this._super.included.apply(this, arguments);
  },

  treeForVendor(vendorTree) {
    var trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(moduleToFunnel('perfect-scrollbar', {
      srcDir: 'dist',
      include: ['**/*.js', '**/*.css'],
      destDir: 'perfect-scrollbar'
    }));

    return mergeTrees(trees);
  },

};

function moduleToFunnel(moduleName, opts) {
  opts = opts || { destDir: moduleName };
  return new Funnel(resolveModulePath(moduleName), opts);
}

function resolveModulePath(moduleName) {
  return path.dirname(require.resolve(moduleName));
}

// Checks to see whether this build is targeting FastBoot. Note that we cannot
// check this at boot time--the environment variable is only set once the build
// has started, which happens after this file is evaluated.
function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}
