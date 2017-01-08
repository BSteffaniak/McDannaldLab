function getTextFromNode(node, addSpaces) {
    if (typeof node === 'string') {
        var div = document.createElement("div");
        div.innerHTML = node;
        
        return getTextFromNode(div, addSpaces);
    }
    
    var i, result, text, child;
    result = '';
    for (i = 0; i < node.childNodes.length; i++) {
        child = node.childNodes[i];
        text = null;
        if (child.nodeType === 1) {
            text = getTextFromNode(child, addSpaces);
        } else if (child.nodeType === 3) {
            text = child.nodeValue;
        }
        if (text) {
            if (addSpaces && /\S$/.test(result) && /^\S/.test(text)) text = ' ' + text;
            result += text;
        }
    }
    return result;
}