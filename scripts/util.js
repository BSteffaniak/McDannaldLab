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

function fuzzySearch(input, searchValue, searchColumns) {
    if (searchValue) {
        var searches = searchValue.toLowerCase().split(/\s+/g)
        
        return searchColumns.find(function (column) {
            var value = input[column].toLowerCase();
            
            return searches.filter(function (search) {
                return value.indexOf(search) >= 0;
            }).length == searches.length;
        });
    } else {
        return true;
    }
}

function setFont(font) {
    document.body.style.fontFamily = font;
}