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

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.lastIndexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

function fileExists(location, onExists, onNotExists) {
    $.ajax({
        type: 'HEAD',
        url: location,
        success: onExists,
        error: onNotExists
    });
}

function loadScript(url, callback) {
    if (!callback) {
        $("head").append('<script type="text/javascript" src="' + url + '"></script>');
    } else {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function getPosition(string, subString, index, offset) {
    return string.split(subString, index).join(subString).length;
}