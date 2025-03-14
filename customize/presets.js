const flourishPresets = [
    {
        'default': { 
            primary: "#BDFE6D",
            primaryrgb: "#BDFE6D",
            secondary: "#CAC6D6",
            secondaryrgb: "#CAC6D6",
            body: "#CECECE",
            bodyrgb: "#CECECE",
            bodybg: "#050B00", 
            bodybgrgb: "#050B00"
        }
    },
    {
        'preset1': {
            primary: "#265201", 
            primaryrgb: "#265201", 
            secondary: "#CAC6D6", 
            secondaryrgb: "#CAC6D6", 
            body: "#CECECE", 
            bodyrgb: "#CECECE", 
            bodybg: "#0A1103", 
            bodybgrgb: "#0A1103"
        },
    },
    
    {
        'preset2': { 
            primary: "#92f519", 
            primaryrgb: "#92f519", 
            secondary: "#FAF7F0", 
            secondaryrgb: "#FAF7F0", 
            body: "#4C4D49", 
            bodyrgb: "#4C4D49", 
            bodybg: "#0A1103", 
            bodybgrgb: "#0A1103"
        }
    },
    {
        'preset3': {
            primary: "#D0D5DD",
            primaryrgb: "#D0D5DD",
            secondary: "#FBFAF8",
            secondaryrgb: "#FBFAF8",
            body: "#4C4D49",
            bodyrgb: "#4C4D49",
            bodybg: "#ffffff",
            bodybgrgb: "#ffffff"
        }
    },
    {
        'bodysquare': { 
            bodyBorderRadius : '0',
            bodyBorderWidth : "1"
        } 
    },
    {
        'bodysemiround': { 
            bodyBorderRadius : '12',
            bodyBorderWidth : "1"
        }       
    },
    {
        'btnsquare': { 
            btnBorderRadius : '0',
            btnBorderWidth : "1"
        }       
    },
    {
        'btnsemiround': {
            btnBorderRadius : '10',
            btnBorderWidth : "1"
        }       
    },
    {
        'btnrounded': { 
            btnBorderRadius : '12',
            btnBorderWidth : "1"
        }
    },
    {
        'inputsquare': { 
            inputBorderRadius : '0',
            inputBorderWidth : "1"
        }       
    },
    {
        'inputsemiround': { 
            inputBorderRadius : '9',
            inputBorderWidth : "1"
        }       
    },
    {
        'inputrounded': { 
            inputBorderRadius : '20',
            inputBorderWidth : "1"
        }       
    },
    {
        'fontdefault': { 
            googlefontsURL : 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Jost:ital,wght@0,100..900;1,100..900&display=swap',
            fontfamily : '"Jost", sans-serif',
            headingsfontfamily:  '"Jost", sans-serif',
            displayfontfamily: '"Fraunces", serif'
        }       
    },
    {
        'font1': { 
            googlefontsURL : 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap',
            fontfamily : "'Inter', sans-serif",
            headingsfontfamily:  '"Inter", sans-serif',
            displayfontfamily: '"Inter", serif'
        }
    },
    {
        'font2': {
            googlefontsURL : 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
            fontfamily : "'Poppins', sans-serif",
            headingsfontfamily:  '"Poppins", sans-serif',
            displayfontfamily: '"Poppins", serif'
        }
    }
    
    // Add more presets as needed
];

function loadPreset(presetName) {
    const presets = flourishPresets.find((preset) => preset.hasOwnProperty(presetName));

    if (presets) {
        const preset = presets[presetName];
        // Here you can use the preset data to apply it to your application or perform necessary operations
        loadCustomizeData(preset);
        applyCSS();
    } else {
        console.error("Preset not found:", presetName);
    }
}

function updateHiddenValue(hiddenInputName, colorValue) {
    const hiddenInput = document.querySelector(`input[name="${hiddenInputName}"]`);
    hiddenInput.value = colorValue;
}

function applyCSS() {
    var inputs = document.querySelectorAll(".preset-input");
    var styleTag = document.getElementById("customize-css");
    var cssRules = {};
    var customizeData = {};

    inputs.forEach(function (input) {
        // Check if input value is empty, then skip processing
        if (input.value === "") {
            return;
        }

        var selector = input.getAttribute("data-selector");
        var cssVar = input.getAttribute("data-var");
        var valueType = input.getAttribute("data-value-type");
        var value;

        customizeData[input.name] = input.value;

        if (input.type === "color") {
            value = input.value;

            if (valueType === "rgba") {
                // Convert the color value to rgba for HEXA type
                value = hexToRGBA(value);
            }
            if (valueType === "rgb") {
                // Convert the color value to rgb for HEXA type
                value = hexToRGB(value);
            }
        } else if (input.type === "number") {
            value = input.value + (valueType === "px" ? "px" : "");
        } else if (input.type === "text") {
            value = input.value;
        }

        // If selector exists in rules, update the value; otherwise, create a new rule
        if (!cssRules[selector]) {
            cssRules[selector] = {};
        }
        cssRules[selector][cssVar] = value;
    });

    var cssCode = "";
    const googlefontsURL = document.getElementById("googlefontsURL").value;
    if (googlefontsURL != "") {
        cssCode += "@import url('" + googlefontsURL + "');\n";
        customizeData[document.getElementById("googlefontsURL").name] = googlefontsURL;
    }

    for (var selector in cssRules) {
        cssCode += selector + " { ";
        var properties = cssRules[selector];
        for (var prop in properties) {
            cssCode += prop + ": " + properties[prop] + "; ";
        }
        cssCode += "}\n";
    }

    // Set the CSS content of the <style> tag
    if (styleTag.styleSheet) {
        styleTag.styleSheet.cssText = cssCode;
    } else {
        styleTag.innerHTML = cssCode;
    }
    document.getElementById("css-input").value = cssCode;
    localStorage.setItem("savedCSS", cssCode);
    localStorage.setItem("savedCustomizeData", JSON.stringify(customizeData));
}

// Function to convert hex to rgba
function hexToRGBA(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, 1)` : null;
}

// Function to convert hex to rgba
function hexToRGB(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

function loadSavedCSS() {
    var savedCSS = localStorage.getItem("savedCSS");

    if (savedCSS) {
        document.getElementById("css-input").value = savedCSS;
        var styleTag = document.getElementById("customize-css");
        // Set the CSS content of the <style> tag
        if (styleTag.styleSheet) {
            styleTag.styleSheet.cssText = savedCSS;
        } else {
            styleTag.innerHTML = savedCSS;
        }
    }
}

function loadCustomizeData(parameters) {
    var customizeData = localStorage.getItem("savedCustomizeData");

    if (parameters) {
        for (var name in parameters) {
            var element = document.querySelector('[name="' + name + '"]');
            if (element !== null) {
                element.value = parameters[name];
            } else {
                console.warn('Element with name "' + name + '" not found.');
            }
        }
    } else if (customizeData) {
        const data = JSON.parse(customizeData);
        for (var name in data) {
            var element = document.querySelector('[name="' + name + '"]');
            if (element !== null) {
                element.value = data[name];
            } else {
                console.warn('Element with name "' + name + '" not found.');
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    window.addEventListener("load", function () {
        const date = new Date();
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var html = xhr.responseText;
                    document.querySelector("body").insertAdjacentHTML("beforeend", html);
                    loadCustomizeData();
                    loadSavedCSS();
                } else {
                    console.error("Error:", xhr.status);
                }
            }
        };

        xhr.open("GET", "customize/presets.html?time=" + date.getTime() + "bhgu", true);
        xhr.send();
    });

    document.addEventListener("submit", function (event) {
        var target = event.target;
        if (target && target.id === "customizer-form") {
            event.preventDefault();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const copyLinks = document.querySelectorAll('[data-copy="css-input"]');

    copyLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("data-copy");
            const textarea = document.getElementById(targetId);

            if (textarea) {
                textarea.select();
            }
        });
    });
});