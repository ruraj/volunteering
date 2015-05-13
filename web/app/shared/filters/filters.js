angular.module('qmsApp.filters', [])

    .filter('objectSearch', function ($filter) {
        return function (object, searchCriteria, AND_OR) {
            if (!searchCriteria || searchCriteria.length == 0) {
                return object;
            }

            var searchText = searchCriteria["searchBy"];

            if (!searchText || searchText.length == 0) {
                return object;
            }

            var mSearchCols = searchCriteria["cols"];

            var returnArray = [],
            // Split on single or multi space
                splitext = searchText.toLowerCase().split(/\s+/),
            // Build Regexp with Logical AND using "look ahead assertions"
                regexp_and = "(?=.*" + splitext.join(")(?=.*") + ")",
            // Build Regexp with logical OR
                regexp_or = searchText.toLowerCase().replace(/\s+/g, "|");

            // Compile the regular expression
            var re = new RegExp((AND_OR == "AND") ? regexp_and : regexp_or, "i");

            for (var x = 0; x < object.length; x++) {
                var str = "";
                for (var i = 0; i < mSearchCols.length; i++) {
                    var col = mSearchCols[i];
                    var val = byString(object[x], col);
                    if (val) {
                        str += " " + val;
                    }
                }
                if (re.test(str)) returnArray.push(object[x]);
            }

            function byString(o, s) {
                s = s.replace(/\[(\w+)\]/g, '.$1');  // convert indexes to properties
                s = s.replace(/^\./, ''); // strip leading dot
                var a = s.split('.');
                for (var i = 0; i < a.length; ++i) {
                    var n = a[i];
                    if (n in o) {
                        o = o[n];
                    } else {
                        return;
                    }
                }
                return o;
            }

            return returnArray;
        }
    })

    .filter('state', function() {
        return function(input) {
            if (input) {
                input = input || '';
                return input.replace("\.", " > ").toUpperCase();
            } else {
                return input;
            }
        }
    });