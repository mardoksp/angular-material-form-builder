(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('formItem', FormItem);

  /** @ngInject */
  function FormItem($compile) {
    var directive = {
      restrict: 'E',
      link: linker,
      scope: {
        item: '='
      },
      controller: FormItemCtrl,
      controllerAs: 'FormItem',
      bindToController: true
    };

    function linker(scope, elem, attrs, ctrl) {
      var template = ctrl._getItemTemplate(attrs.type);
      var el = $compile(template)(scope);
      elem.append(el);
    }

    return directive;
  }

  /*@ngInject*/
  function FormItemCtrl($attrs) {
    this.item = angular.extend({
      type: $attrs.type,
      props: {
        title: '',
        helpText: ''
      },
      config: {
        required: false
      }
    });

    this.templates = {
      input: '<bet-form-input item="FormItem.item"></bet-form-input>',
      chooseFromList: '<bet-form-choose-from-list item="FormItem.item"></bet-form-choose-from-list>',
      multipleChoices: '<bet-form-multiple-choices item="FormItem.item"></bet-form-mul>',
      matrix: '<bet-form-matrix item="FormItem.item"></bet-form-matrix>',
      checkboxes: '<checkboxes-item item="FormItem.item"></checkboxes-item>'
    };
  }

  FormItemCtrl.prototype._getItemTemplate = function (type) {
    var prefix = '' +
      '<md-input-container>' +
        '<label>Field Title</label>' +
        '<input ng-model="FormItem.item.props.title"/>' +
      '</md-input-container>' +
      '<md-input-container>' +
        '<label>Help Text</label>' +
        '<input ng-model="FormItem.item.props.helpText" />' +
      '</md-input-container>';

    var suffix = '' +
      '<md-input-container>' +
        '<md-checkbox ng-model="FormItem.item.config.required">Required field</md-checkbox>' +
      '</md-input-container>';

    return prefix + this.templates[type] + suffix;
  };

})(angular);
