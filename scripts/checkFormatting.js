(function () {
    $(document).tooltip();
    
    window.fileErrors = {};
    
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
    
    function highlightLine(lineElement, lineno, errors) {
        if (errors) {
            var minDist = Number.MAX_VALUE;
            
            errors.forEach(function (error) {
                var distance = lineno - error.lineno;
                minDist = Math.min(minDist, distance);
                
                if (Math.abs(minDist) <= 1) {
                    if (distance == 0) {
                        lineElement.style.backgroundColor = "red";
                        lineElement.setAttribute("title", error.message);
                    } else {
                        lineElement.style.backgroundColor = "yellow";
                        lineElement.setAttribute("title", "This line might be part of the error.");
                    }
                }
            });
        }
    }
    
    function validateProperty(key, obj, model) {
        var value = model[key];
        var property = obj[key];
        
        if (property) {
            if (value.type == "date") {
                if (value.format && !moment(property, value.format, true).isValid()) {
                    console.warn("Invalid date format '" + property + "' given for required format of '" + value.format + "'");
                }
            } else if (value.type == "url") {
                fileExists(property, function () {
                    
                }, function () {
                    console.warn("Invalid file url '" + property + "'");
                });
            } else if (value.type == "email") {
                if (!validateEmail(property)) {
                    console.warn("Invalid email '" + property + "'");
                }
            }
        } else {
            if (!value.optional) {
                console.log("missing property '" + key + "'", obj, value)
                
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
            
            var errors = window.fileErrors[location];
            
            addTitle(file, location, errors);
            
            var row = document.createElement("tr");
            var lineContainerTd = document.createElement("td");
            var codeContainerTd = document.createElement("td");
            var lineContainer = document.createElement("pre");
            var container = document.createElement("div");
            
            lineContainer.classList.add("line-container");
            container.classList.add("code-container");
            
            $.get(location, function(data, status) {
                var element = document.createElement("pre");
                element.classList.add("error");
                
                var lines = data.split(/\s*?\n/g);
                
                lines.forEach(function (line, number) {
                    var lineCounter = document.createElement("span");
                    lineCounter.innerHTML = number + 1;
                    
                    lineContainer.appendChild(lineCounter);
                    
                    var lineElement = document.createElement("span");
                    lineElement.classList.add("line-" + (number + 1));
                    lineElement.innerHTML = line || " ";
                    
                    highlightLine(lineElement, number + 1, errors);
                    
                    element.appendChild(lineElement);
                });
                
                container.appendChild(element);
            });
            
            lineContainerTd.appendChild(lineContainer);
            codeContainerTd.appendChild(container);
            
            row.appendChild(lineContainerTd);
            row.appendChild(codeContainerTd);
            
            file.appendChild(row);
            files.appendChild(file);
            
            var checker = window.customPropertyChecking[location];
            
            if (checker && checker.export && checker.model) {
                var array = eval("(" + checker.export + ")");
                var keys = Object.keys(checker.model);
                
                if (array) {
                    array.forEach(function (obj) {
                        keys.forEach(function (key) {
                            validateProperty(key, obj, checker.model);
                        });
                    });
                }
            }
        });
    });
})();