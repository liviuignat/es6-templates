export default {
  extend: function extend(obj, newObj) {
    return window.$.extend(true, obj, newObj);
  }
};