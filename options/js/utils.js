(function(window) {
  var utils = window.utils || {}
  utils.getData = function(name) {
    var rawdata = localStorage.getItem(name)
    try {
      return JSON.parse(rawdata)
    } catch (variable) {
      return
    }
  }
  utils.saveData = function(name, data) {
    localStorage.setItem(name, angular.toJson(data));
  }
  window.utils = utils
})(window)
