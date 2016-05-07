app.directive('cursorPosition', function() {

  function getPos(element) {
    if ('selectionStart' in element) {
      return element.selectionStart;
    } else if (document.selection) {
      element.focus();
      var sel = document.selection.createRange();
      var selLen = document.selection.createRange().text.length;
      sel.moveStart('character', -element.value.length);
      return sel.text.length - selLen;
    }
  }

  function setPos(element, cursorPos) {
    if (element.createTextRange) {
      var range = element.createTextRange();
      range.move('character', cursorPos);
      range.select();
    } else {
      element.focus();
      if (element.selectionStart !== undefined) {
        element.setSelectionRange(cursorPos, cursorPos);
      }
    }
  }

  return {
    restrict: 'A',
    scope: {
      cursorPosition: '=',
    },
    link: function(scope, element, attrs) {
      if (!scope.cursorPosition) scope.cursorPosition = {};

      element.on('keydown keyup click', function(event) {
        scope.$apply(function() {
          scope.cursorPosition.get = getPos(element[0]);
        });
      });
      scope.$watch('cursorPosition.set', function(newVal) {
        if (typeof newVal === 'undefined') return;
        setPos(element[0], newVal);
      });
    }
  };
});
