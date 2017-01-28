(function () {
    $(document).tooltip();
    
    window.fileErrors = {};
    window.fileWarnings = {};
    window.fileLines = {};
    
    var files = document.getElementById("files");
    
    function addTitle(container, location, errors) {
        var row = document.createElement("tr");
        var td = document.createElement("td");
        var title = document.createElement("span");
        var status = document.createElement("span");
        status.classList.add("status");
        
        title.textContent = location + " - ";
        
        if (errors) {
            status.textContent = errors.length + " error" + (errors.length != 1 ? "s" : "");
            status.classList.add("errors");
        } else {
            status.textContent = "Success";
            status.classList.add("success");
        }
        
        td.appendChild(title);
        td.appendChild(status);
        row.appendChild(document.createElement("td"));
        row.appendChild(td);
        container.appendChild(row);
    }
    
    function highlightLine(lineElement, lineno, errors, warnings) {
        if (warnings) {
            warnings.forEach(function (warning) {
                var distance = lineno - warning.lineno;
                
                if (distance == 0) {
                    lineElement.style.backgroundColor = "yellow";
                    lineElement.setAttribute("title", warning.message);
                }
            });
        }
        if (errors) {
            errors.forEach(function (error) {
                var distance = lineno - error.lineno;
                
                if (distance == 0) {
                    lineElement.style.backgroundColor = "red";
                    lineElement.setAttribute("title", error.message);
                }
            });
        }
    }
    
    function validateProperty(location, source, key, obj, keyIndex, objIndex, model) {
        var value = model[key];
        var property = obj[key];
        
        function warning(message, containsProperty) {
            var objPosition = getPosition(source, "{", objIndex);
            var position = objPosition;
            
            if (containsProperty !== false) {
                position = source.indexOf(key, objPosition);
            }
            
            var subsource = source.substring(0, position);
            
            var lineNumber = subsource.length - subsource.replace(/\n/g, "").length + 1;
            
            window.fileWarnings[location] = window.fileWarnings[location] || [];
            window.fileWarnings[location].push({
                message: message,
                lineno: lineNumber
            });
            
            if (window.fileLines[location]) {
                highlightLine(fileLines[location][lineNumber - 1], lineNumber, undefined, window.fileWarnings[location]);
            }
            
            console.warn(message + " on line " + lineNumber);
        }
        
        if (property) {
            if (value.type == "date") {
                if (value.format && !moment(property, value.format, true).isValid()) {
                    warning("Invalid date format '" + property + "' given for required format of '" + value.format + "'");
                }
            } else if (value.type == "url" || value.type == "image") {
                fileExists(property, function () {
                    
                }, function () {
                    if (value.type == "url") {
                        warning("Invalid file url '" + property + "'");
                    } else if (value.type == "image") {
                        warning("Invalid image url '" + property + "'");
                    }
                });
            } else if (value.type == "email") {
                if (!validateEmail(property)) {
                    warning("Invalid email '" + property + "'");
                }
            } else if (["string", "number", "boolean"].indexOf(value.type) >= 0) {
                if (typeof property !== value.type) {
                    warning("Invalid type '" + (typeof property) + "'");
                }
            }
        } else {
            if (!value.optional) {
                warning("Missing required property '" + key + "'", false);
                
                return;
            }
        }
    }
    
    window.addEventListener('error', function (error) {
        var file = window.checkFormattingFiles.find(function (loc) {
            return error.filename.endsWith(loc);
        });
        
        if (file) {
            window.fileErrors[file] = window.fileErrors[file] || [];
            window.fileErrors[file].push(error);
        }
    });
    
    window.checkFormattingFiles.forEach(function (location) {
        loadScript(location, function () {
            var file = document.createElement("tbody");
            
            var row = document.createElement("tr");
            var lineContainerTd = document.createElement("td");
            var codeContainerTd = document.createElement("td");
            var lineContainer = document.createElement("pre");
            var container = document.createElement("div");
            
            lineContainer.classList.add("line-container");
            container.classList.add("code-container");
        
            $.get(location, function(data, status) {
                var checker = window.customPropertyChecking[location];
                
                if (checker && checker.export && checker.model) {
                    var array = eval("(window." + checker.export + ")");
                    var keys = Object.keys(checker.model);
                    
                    if (array) {
                        array.forEach(function (obj) {
                            keys.forEach(function (key) {
                                validateProperty(location, key, obj, checker.model);
                            });
                        });
                    } else {
                        console.warn("No export '" + checker.export + "' from " + location);
                    }
                }
                
                var errors = window.fileErrors[location];
                var warnings = window.fileWarnings[location];
                
                addTitle(file, location, errors);
                
                var element = document.createElement("pre");
                element.classList.add("error");
                
                var lines = data.split(/\s*?\n/g);
                window.fileLines[location] = [];
                
                lines.forEach(function (line, number) {
                    var lineCounter = document.createElement("span");
                    lineCounter.innerHTML = number + 1;
                    
                    lineContainer.appendChild(lineCounter);
                    
                    var lineElement = document.createElement("span");
                    lineElement.classList.add("line-" + (number + 1));
                    lineElement.innerHTML = line || " ";
                    
                    highlightLine(lineElement, number + 1, errors);
                    
                    element.appendChild(lineElement);
                    window.fileLines[location].push(lineElement);
                });
                
                container.appendChild(element);
                
                lineContainerTd.appendChild(lineContainer);
                codeContainerTd.appendChild(container);
                
                row.appendChild(lineContainerTd);
                row.appendChild(codeContainerTd);
                
                file.appendChild(row);
                files.appendChild(file);
            });
        });
    });
})();