//var config = {
//    columns: 24,
//    viewports: {
//        highdef: {
//            min: 1200,
//            width: 34,
//            margin: 6
//        },
//        default: {
//            width: 30,
//            margin: 5
//        },
//        tablet: {
//            min: 768,
//            max: 979,
//            width: 24,
//            margin: 4
//        },
//        smartphone: {
//            min: 481,
//            max: 767,
//            width: 14,
//            margin: 3
//        },
//        smallphone: {
//            min: 0,
//            max: 480,
//            width: 14,
//            margin: 2
//        }
//    }
//};

//var css = grid(config);

//var head = document.getElementsByTagName("head")[0];

//var style = document.createElement("style");

//style.type = "text/css";
//if (style.styleSheet) {
//    style.styleSheet.cssText = css;
//} else {
//    style.appendChild(document.createTextNode(css));
//}

//head.appendChild(style);

function grid(config) {

    var css = "";

    function generateViewport(columns, width, margin) {
        var totalWidth = (columns * width) + ((2 * columns) - 2) * margin;

        var css = "";

        css += ".container { width: {w}px; }\n".supplant({ w: totalWidth });

        css += "[class*=\"span\"] { margin-left: {m}px; margin-right: {m}px; }\n".supplant({ m: margin });

        css += ".row { margin-left: -{m}px; margin-right: -{m}px }\n".supplant({ m: margin });

        for (var i = 0; i < columns; i++) {

            css += ".span{i} { width: {w}px; }\n".supplant({ i: i + 1, w: (i + 1) * width + (i * margin * 2) });
        }

        for (var i = 0; i < columns; i++) {
            css += ".offset{i} { margin-left: {o}px; }\n".supplant({ i: i + 1, o: (i + 1) * (margin * 2 + width) + margin });
        }

        return css;
    }

    for (var viewportName in config.viewports) {

        var viewport = config.viewports[viewportName];

        if (viewport.min != null || viewport.max != null) {
            css += "@media ";

            if (viewport.min != null) {
                css += "(min-width: {w}px)".supplant({ w: viewport.min });
            }
            if (viewport.max != null) {
                css += " and (max-width: {w}px)".supplant({ w: viewport.max });
            }

            css += " {\n";

        }

        css += generateViewport(config.columns, viewport.width, viewport.margin);

        if (viewport.min != null || viewport.max != null) {
            css += "}\n";
        }
    }

    return css;
}


if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(
            /\{([^{}]*)\}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
}