app.factory('EditorFactory', function($http){

    function scriptify(screenplay){
        var script = '';
        var charArray = [];
        screenplay.scenes.forEach( scene => {
            script += '<p id="' + scene._id.toString() + '" class="header">' + scene.header + '</p>';
            scene.components.forEach( component => {
                if(component.charName) {
                        if (component.character) script += '<p id="' + component.character + '" class="character">' + component.charName.toUpperCase() + '</p>';
                        else script += '<p class="character">' + component.charName.toUpperCase() + '</p>';
                        charArray.push(component.charName.toUpperCase());
                    }
                script += '<p id="' + component._id + '" class="'+ component.type +'">' + component.text + '</p>';
            })
        })
        return { screenplay: script, characters: charArray };
    }

    function getId(updatedScreenplay) {
        var scenes = updatedScreenplay.scenes;
        var lastScene = scenes[scenes.length -1];
        var lastSceneComp = lastScene.components;
        var currentId;
            if(lastScene.components.length) {
                currentId = lastScene.components[lastScene.components.length -1]._id;
            } else {
                currentId = lastScene._id;
            }
        return currentId;
    }

    function textToObj(spId) {
        var editor = document.getElementById('editor').childNodes;
        var arrayOfScenes = [];
        var toBeSaved = {};
        var currentCharacter;
        var characters = [];
        // var currentCharacterId;

        for(var key = 0; key < editor.length; key++ ){

            var currentClass = editor[key].classList[0];
            var component;
            if(currentClass === 'header'){
                toBeSaved = {
                    header: editor[key].textContent
                }
                if(editor[key].id) toBeSaved._id = editor[key].id;
                arrayOfScenes.push(toBeSaved);
            } else if (currentClass === "character"){
                currentCharacter = editor[key].textContent.toUpperCase();
                if(!characters.includes(currentCharacter)) characters.push(currentCharacter);
                // currentCharacterId = editor[key].id;
            } else {
                if(!toBeSaved.components) toBeSaved.components = [];
                component = {
                    type: currentClass,
                    text: editor[key].textContent,
                    // _id: editor[key].id
                }
                if(currentClass === 'dialogue') {
                    component.charName = currentCharacter;
                    // component.character = currentCharacterId;
                }
                toBeSaved.components.push(component);
            }
        }
        characters = characters.map(charName => {
            //ADDS SCREENPLAYIDS TO THE CHARACTER OBJECT TO BE SAVED>>>

            return {name: charName, screenplay: spId};
        })
        return { scenes: arrayOfScenes, characters: characters };
    }

    function getSelectionStart() {
        var node = document.getSelection().anchorNode;
        return (node.nodeType == 3 ? node.parentNode : node);
    }

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
        },
        saveCharacter: function(character) {
            $http.post('/api/character/', character)
            .then(res => res.data);
        },
        scriptify: scriptify,
        getId: getId,
        textToObj: textToObj,
        getSelectionStart: getSelectionStart
    };
});


