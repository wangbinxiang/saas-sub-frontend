import { nbspbr } from './tools/string'


ko.bindingHandlers.nbspbr = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

        ko.utils.setHtml(element, nbspbr(valueAccessor()))

        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

        ko.utils.setHtml(element, nbspbr(valueAccessor()))

        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.
    }
}

ko.bindingHandlers.foreachprop = {
  transformObject: function (obj) {
    var properties = [];
    ko.utils.objectForEach(obj, function (key, value) {
      properties.push({ key: key, value: value });
    });
    return properties;
  },
  init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    var properties = ko.pureComputed(function () {
      var obj = ko.utils.unwrapObservable(valueAccessor());
      return ko.bindingHandlers.foreachprop.transformObject(obj);
    });
    ko.applyBindingsToNode(element, { foreach: properties }, bindingContext);
    return { controlsDescendantBindings: true };
  }
};