var mediumEditorOptions = {
    toolbar: false,
    placeholder: false
}


function getSelectionStart() {
    var node = document.getSelection().anchorNode;
    return (node.nodeType == 3 ? node.parentNode : node);
}
