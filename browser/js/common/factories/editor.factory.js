app.factory('EditorFactory', function(){
    return {
        setScopeClick: function setScopeClick(scope){
            var currentElement;
            setTimeout(()=> {
                currentElement = getSelectionStart(0);
                scope.selected = currentElement.classList[0];
                scope.$digest();
            }, 5);
        },
        setScopeKeyDown: function setScopeKeyDown(event, scope){
            var compIdx = scope.components.indexOf(scope.selected);
            var currentClass = scope.components[compIdx];
            var currentElement;
            if(event.code === 'Tab') {
                currentElement = getSelectionStart();
                event.preventDefault();
                if(!scope.components[compIdx + 1]) scope.selected = scope.components[0];
                else scope.selected = scope.components[compIdx + 1];
                currentElement.classList.remove(currentClass);
                currentElement.classList.add(scope.selected);
            } else if (event.code === 'Enter') {
                currentElement = getSelectionStart();
                setTimeout(()=> {
                    currentElement = getSelectionStart();
                    currentElement.removeAttribute('id');
                    if(currentClass === 'header' || currentClass === 'character'){
                        scope.selected = scope.components[compIdx + 1];
                        currentElement.classList.remove(currentClass);
                        currentElement.classList.add(scope.selected);

                    } else if(currentClass === 'dialogue') {
                        scope.selected = scope.components[compIdx - 1];
                        currentElement.classList.remove(currentClass);
                        currentElement.classList.add(scope.selected);
                    }
                    scope.$digest();
                }, 5)
            } else if(event.code === 'Backspace') {
                    currentElement = getSelectionStart();
                    if(!currentElement.previousSibling && !currentElement.textContent) event.preventDefault();
                setTimeout(()=> {
                    currentElement = getSelectionStart();
                    scope.selected = currentElement.classList[0];
                    scope.$digest();
                }, 5)
            }
        },
        editorOptions: {
            toolbar: false,
            placeholder: false
        }
    }
})


