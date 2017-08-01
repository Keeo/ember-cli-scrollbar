/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const BroccoliDebug = require('broccoli-debug');
const fastbootTransform = require('fastboot-transform');
const path = require('path');

module.exports = {
  name: 'ember-cli-scrollbar',

  included(app) {
    let vendor = this.treePaths.vendor;
    let dir = `${vendor}/perfect-scrollbar`;

    app.import(`${dir}/js/perfect-scrollbar.js`);
    app.import(`${dir}/css/perfect-scrollbar.css`);

    return this._super.included.apply(this, arguments);
  },

  treeForVendor(vendorTree) {
    let debugTree = BroccoliDebug.buildDebugCallback(this.name),
        trees = [];

    if (vendorTree) {
      trees.push(
        debugTree(vendorTree, 'vendorTree')
      );
    }

    let js = fastbootTransform(
      moduleToFunnel('perfect-scrollbar', {
        srcDir: 'dist',
        include: ['**/*.js'],
        destDir: 'perfect-scrollbar'
      }, true)
    );

    trees.push(
      debugTree(js, 'perfect-scrollbar:js')
    );

    return debugTree(mergeTrees(trees), 'mergedVendorTrees');
  },

  treeForStyles(styleTree) {
    let debugTree = BroccoliDebug.buildDebugCallback(this.name),
        trees = [];

    if (styleTree) {
      trees.push(
        debugTree(styleTree, 'styleTree')
      );
    }

    let css = moduleToFunnel('perfect-scrollbar', {
      srcDir: 'dist',
      include: ['**/*.css'],
      destDir: 'perfect-scrollbar'
    });

    trees.push(
      debugTree(css, 'perfect-scrollbar:css')
    );

    return debugTree(mergeTrees(trees), 'mergedStyleTrees');
  },

};

function moduleToFunnel(moduleName, opts) {
  opts = opts || { destDir: moduleName };
  return new Funnel(resolveModulePath(moduleName), opts);
}

function resolveModulePath(moduleName) {
  return path.dirname(require.resolve(moduleName));
}
