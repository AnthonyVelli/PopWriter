

function scriptify(screenplay){
    var script = '';
    screenplay.scenes.forEach( scene => {
        script += '<p id=' + scene._id + ' class="header">' + scene.header + '"</p>"';
        scene.components.forEach( component => {
            if(component.character) script += '<p id=' + component.character + ' class="character">' + component.name + '</p>';
            script += '<p id=' + component_id + 'class="'+ component.type +'">' + component.text + '</p>';
        })
    })
    return script;
}

function textToObj(text) {
    var scenesArray = [];
    //create an array of all the paragraph elements in the editor and id if it does have it
    var scriptPartsArray = text.match(/(\d+"\sclass=")?\w+">[^<]+/g);
    var sceneObj = {};
    var currentCharacter;
    var currentCharacterId;
    var newObj;
    scriptPartsArray.forEach(ele => {
        //getting the id if it's in the string
        var id = /\d+/.test(ele) ? ele.match(/\d+/)[0] : null;
        //if there is an id in the string, it replaces it with an empty string.
        if (id) ele = ele.replace(/\d+\W+class="/, '');
        //creates and array of the type of component as first element and the text that contains as second element
        var elementParts = ele.split(/["><]+/g);
        // console.log('I am getting here', elementParts);
        if(elementParts[0] === 'header'){
            sceneObj = { header: elementParts[1], components: [] };
            if(id) sceneObj_.id = id;
            scenesArray.push(sceneObj);
        } else if(elementParts[0] === 'character'){
            currentCharacter = elementParts[1];
            currentCharacterId = id;
        } else if(elementParts[0] === 'dialogue') {
            newObj = {
                type: elementParts[0],
                name: currentCharacter,
                text: elementParts[1]
            }
            if(id) newObj._id = id;
            if(currentCharacterId) newObj.character = currentCharacterId;
            sceneObj['components'].push(newObj);
        } else {
            newObj = {
                type: elementParts[0],
                text: elementParts[1]
            }
            if(id) newObj._id = id;
            sceneObj['components'].push(newObj);
        }
    });
    return scenesArray;
}
