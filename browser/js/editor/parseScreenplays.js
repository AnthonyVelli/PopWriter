

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
    var scriptPartsArray = text.match(/"\w+">[^<]+/);
    var sceneObj = {};
    scriptPartsArray.forEach(ele => {
        var elementParts = ele.split(/">?/);
        if(elementParts[0] === 'header'){
            if (Object.keys(sceneObj).length !== 0) {
                scenesArray.push(sceneObj);
            }
            sceneObj = { header: elementParts[0], components: [] };
        } else {
            sceneObj['components'].push(elementParts[1]);
        }

    });

    return scenesArray;
}
