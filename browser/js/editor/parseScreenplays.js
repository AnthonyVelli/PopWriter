

function scriptify(screenplay){
    var script = '';
    screenplay.scenes.forEach( scene => {
        script += '<p id="' + scene._id.toString() + '" class="header">' + scene.header + '</p>';
        scene.components.forEach( component => {
            if(component.charName) {
                    if (component.character) script += '<p id="' + component.character + '" class="character">' + component.charName + '</p>';
                    else script += '<p class="character">' + component.charName + '</p>';
                }
            script += '<p id="' + component._id + '" class="'+ component.type +'">' + component.text + '</p>';
        })
    })
    return script;
}


function getId(updatedScreenplay) {
    var scenes = updatedScreenplay.scenes;
    var lastScene = scenes[scenes.length -1];
    var currentId;
        if(lastScene && lastScene.components && lastScene.components.length) {
            currentId = lastScene.components[lastScene.components.length -1]._id;
        } else {
            currentId = lastScene._id;
        }
    return currentId;
}



function textToObj() {
    var editor = document.getElementById('editor').childNodes;
    var arrayOfScenes = [];
    var toBeSaved = {};
    var currentCharacter;
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
            currentCharacter = editor[key].textContent;
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

    return arrayOfScenes;
}

function getSelectionStart() {
    var node = document.getSelection().anchorNode;
    return (node.nodeType == 3 ? node.parentNode : node);
}
