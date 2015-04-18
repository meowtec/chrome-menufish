var utils = window.utils
window.ruleCtrl = function($scope) {
  var saveOptions = function () {
    utils.saveData('settingMore', $scope.settingMore)
    utils.saveData('rules', $scope.rules)
    chrome.extension.sendRequest({
      ask: "reload"
    })
  }
  var ctrlInit = function () {
    $scope.rules = utils.getData('rules')
    $scope.settingMore = utils.getData('settingMore')
    $scope.$_suspend = {
      search: {},
      share: {}
    }
  }
  $scope.editClick = function (rule) {
    rule.$_name = rule.name
    rule.$_url = rule.url
    rule.$_edit = true
  }
  $scope.cancelClick = function (rule) {
    rule.$_name = rule.$_url = null
    rule.$_edit = false
  }
  $scope.submitClick = function (rule) {
    rule.name = rule.$_name
    rule.url = rule.$_url
    rule.$_url = rule.$_url = null
    rule.$_edit = false
  }
  $scope.deleteClick = function (rule, rules) {
    rules.splice(rules.indexOf(rule), 1)
  }
  $scope.addClick = function (type) {
    var rule = $scope.$_suspend[type]
    $scope.rules[type].push(rule)
    $scope.$_suspend[type] = {}
  }
  $scope.resetClick = function () {
    var resetConfirm = window.confirm("你确认重置选项吗？")
    if (!resetConfirm) {
      return
    }
    chrome.extension.sendRequest({
      ask: "reset"
    }, function () {
      ctrlInit()
      $scope.$digest();
    })
  }
  $scope.upClick = function (rule, rules) {
    var count = rules.length
    var index = rules.indexOf(rule)
    var indexEx = (count + index - 1) % count
    // exchange
    rules[index] = rules[indexEx]
    rules[indexEx] = rule
  }
  $scope.downClick = function (rule, rules) {
    var count = rules.length
    var index = rules.indexOf(rule)
    var indexEx = (count + index + 1) % count
    // exchange
    rules[index] = rules[indexEx]
    rules[indexEx] = rule
  }
  $scope.$watch('rules',
    function () {
      saveOptions()
    },
    true
  )
  $scope.$watch('settingMore',
    function () {
      saveOptions()
    },
    true
  )
  $scope.message = {
    onoff: {
      true: '点击禁用',
      false: '点击启用'
    }
  }
  ctrlInit()
}
