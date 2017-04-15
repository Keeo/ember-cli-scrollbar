# Ember-cli-scrollbar

Another wrapper for [perfect-scrollbar](https://github.com/noraesae/perfect-scrollbar). This one  can be used as a mixin or component and events coming from *perfect-scrollbar* are directed
to functions in component and send out as actions. See usage for examples.

This addon was created as compilation of [ember-perfect-scroll](https://github.com/imanhodjaev/ember-perfect-scroll) and [ember-perfect-scrollbar](https://github.com/null-null-null/ember-perfect-scrollbar).

## Installation

`ember install ember-cli-scrollbar`

## Usage as mixin

```js
import Ember from 'ember';
import PerfectScrollbarMixin from 'ember-cli-scrollbar/mixins/perfect-scrollbar';

export default Ember.Component.extend(PerfectScrollbarMixin, {
  // options for perfect scrollbar
  perfectScrollbarOptions: {
    suppressScrollX: true,
  },

  // camelized name of event from perfect scrollbar
  psScrollLeft(event) {
  }
});
```

## Usage as component

```hbs
{{#perfect-scrollbar
  perfectScrollbarOptions=(hash suppressScrollX=true)
  psScrollLeft=(action "psScrollLeft")
}}
{{/perfect-scrollbar}}
```
