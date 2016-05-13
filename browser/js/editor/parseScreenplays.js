

function scriptify(screenplay){
    var script = '';
    screenplay.scenes.forEach( scene => {
        script += '<p id="' + scene._id.toString() + '" class="header">' + scene.header + '</p>';
        scene.components.forEach( component => {
            if(component.character) script += '<p id="' + component.character + '" class="character">' + component.charName + '</p>';
            else script += '<p class="character">' + component.charName + '</p>';
            if(component._id) script += '<p id="' + component._id + '" class="'+ component.type +'">' + component.text + '</p>';
            else script += '<p class="'+ component.type +'">' + component.text + '</p>';
        })
    })
    return script;
}

function textToObj(text) {
    console.log(text);
    var scenesArray = [];
    //create an array of all the paragraph elements in the editor and id if it does have it
    // var scriptPartsArray = text.match(/(\d+"\sclass=")?\w+">[^<]+/g);
    var scriptPartsArray = text.match(/(\w+"\sclass=")?\w+">[^<]+/g);
    var sceneObj = {};
    var currentCharacter;
    var currentCharacterId;
    var newObj;
    scriptPartsArray.forEach(ele => {
        //getting the id if it's in the string
        var id = /(?=.*\d)\w{24}/.test(ele) ? ele.match(/(?=.*\d)\w{24}/)[0] : null;
        //if there is an id in the string, it replaces it with an empty string.
        if (id) ele = ele.replace(/\w{24}"\s/, '');
        //creates and array of the type of component as first element and the text that contains as second element
        var elementParts = ele.match(/[\w\s\.\,\:\?\!\;]+[^"\>]+/gi);
        if(id) elementParts = elementParts.slice(1, 3);
        if(elementParts[0] === 'header'){
            sceneObj = { header: elementParts[1], components: [] };
            if(id) sceneObj._id = id;
            scenesArray.push(sceneObj);
        } else if(elementParts[0] === 'character'){
            currentCharacter = elementParts[1];
            currentCharacterId = id;
        } else if(elementParts[0] === 'dialogue') {
            newObj = {
                type: elementParts[0],
                charName: currentCharacter,
                text: elementParts[1]
            }
            if(id) newObj._id = id;
            if(currentCharacterId) newObj.character._id = currentCharacterId;
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
