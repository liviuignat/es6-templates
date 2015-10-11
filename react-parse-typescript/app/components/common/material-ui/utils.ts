export default {
  getExtendedStyles:  (instance, obj, newObj) => {
    return function getStyles() {
      return window.$.extend(true, obj, newObj);
    }.bind(instance);
  }
};