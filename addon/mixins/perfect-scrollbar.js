import Ember from 'ember';
import PerfectScrollbar from 'perfect-scrollbar';
const {typeOf, String: {camelize}} = Ember;

const events = [
  'ps-scroll-y',
  'ps-scroll-x',
  'ps-scroll-up',
  'ps-scroll-down',
  'ps-scroll-left',
  'ps-scroll-right',
  'ps-y-reach-start',
  'ps-y-reach-end',
  'ps-x-reach-start',
  'ps-x-reach-end'
];

export default Ember.Mixin.create({
  perfectScrollbarOptions: {},

  didInsertElement(...args) {
    this._super(...args);

    PerfectScrollbar.initialize(this.element, this.get('perfectScrollbarOptions'));

    const self = this.$();
    events.map(event => {
      self.on(event, this._registerAction(camelize(event)));
    });
  },

  willDestroyElement(...args) {
    this._super(...args);

    const self = this.$();
    events.map(event => {
      self.off(event);
    });

    PerfectScrollbar.destroy(this.element);
  },

  psUpdate() {
    PerfectScrollbar.update(this.element);
  },

  _registerAction(action) {
    return Ember.run.bind(this, function() {
      const args = Array.prototype.slice.call(arguments);
      args.unshift(action);

      if (typeOf(this[action]) === 'function') {
        this[action].apply(this, args);
      }
      this.sendAction.apply(this, args);
    });
  },
});
