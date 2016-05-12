

function scriptify(screenplay){
    var script = '';

    screenplay.scenes.forEach( scene =>{
        script += '<p class="header">' + scene.header + '"</p>"';
        scene.components.forEach( component => {
            script += '<p class="'+ component.type +'">' + component.text + '</p>';
        })
    })
    return script;
}

function textToObj(text) {
    var scenesArray = [];
    var scriptPartsArray = text.match(/"\w+">[^<]+/g);
    var sceneObj = {};
    scriptPartsArray.forEach(ele => {
        var elementParts = ele.split(/["><]+/g).splice(1, 2);
        if(elementParts[0] === 'header'){
            sceneObj = { header: elementParts[1], components: [] };
            scenesArray.push(sceneObj);
        } else {
            sceneObj['components'].push({ type: elementParts[0], text: elementParts[1] });
        }
    });
    return scenesArray;
}
