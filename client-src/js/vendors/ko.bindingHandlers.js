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
};