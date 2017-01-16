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

function getQueryParams() {
    var queryParams = {};
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&;=]+)=?([^&;]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q))
       queryParams[d(e[1])] = d(e[2]);

    return queryParams;
}

function getQueryString(params) {
    var url = "";
    
    var index = 0;
    
    Object.keys(params).forEach(function (key) {
        var value = params[key];
        
        if (value) {
            if (index++ > 0) {
                url += "&";
            }
            
            url += encodeURIComponent(key) + "=" + encodeURIComponent(value);
        }
    });
    
    return url;
}

function updateQueryParams() {
    window.queryParams = getQueryParams();
}

updateQueryParams();

window.originalPathname = window.location.pathname;
window.originalQueryString = window.location.search;
window.originalQueryParams = window.queryParams;
window.originalHash = window.location.hash;