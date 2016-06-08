/**
 * Created by CROSP on 005 05.06.16.
 */
var Logger = (function () {
    // Private members
    var _settings = {
        json: JSON,
        dumper: (function () {

            var dumpBoolean = function (v) {
                return 'Boolean(1) ' + (v ? 'TRUE' : 'FALSE');
            };

            var dumpNumber = function (v) {
                var num_digits = ('' + v).length;
                return 'Number(' + num_digits + ') ' + v;
            };

            var dumpString = function (v) {
                var num_chars = v.length;
                return 'String(' + num_chars + ') "' + v + '"';
            };

            var dumpObject = function (v) {
                if (v === null) {
                    return "NULL(0)";
                }

                var out = '';
                var elemNumber = 0;
                var indent = '';

                if (v instanceof Array) {
                    elemNumber = v.length;
                    for (var d = 0; d < indent; ++d) {
                        indent += ' ';
                    }
                    out = "Array(" + elemNumber + ") \n" + (indent.length === 0 ? '' : '|' + indent + '') + "(";
                    for (var i = 0; i < elemNumber; ++i) {
                        out += "\n" + (indent.length === 0 ? '' : '|' + indent) + "|   [" + i + "] = " + dumpVariable(v[i], '', false, indent);
                    }
                    out += "\n" + (indent.length === 0 ? '' : '|' + indent + '') + ")";
                    return out;
                }
                else if (v instanceof Object) {
                    for (var d = 0; d < indent; ++d) {
                        indent += ' ';
                    }
                    out = "Object \n" + (indent.length === 0 ? '' : '|' + indent + '') + "(";
                    for (var p in v) {
                        out += "\n" + (indent.length === 0 ? '' : '|' + indent) + "|   [" + p + "] = " + dumpVariable(v[p], '', false, indent);
                    }
                    out += "\n" + (indent.length === 0 ? '' : '|' + indent + '') + ")";
                    return out;
                }
                else {
                    return 'Unknown Object Type!';
                }
            };
            var dumpVariable = function (varName, varValue) {
                var out = '';
                var variableName = varName || 'DUMPED VARIABLE';;
                if (varValue == null) {
                    return "Null Variable";
                }
                else {
                    variableName += ' = ';
                    switch (typeof varValue) {
                        case "boolean":
                            out += variableName + dumpBoolean(varValue);
                            break;
                        case "number":
                            out += variableName + dumpNumber(varValue);
                            break;
                        case "string":
                            out += variableName + dumpString(varValue);
                            break;
                        case "object":
                            variableName = ' => ';
                            out += variableName + dumpObject(varValue);
                            break;
                        case "function":
                            out += variableName + "Function";
                            break;
                        case "undefined":
                            out += variableName + "Undefined";
                            break;
                        default:
                            out += variableName + ' is unknown type!';
                    }
                    return out;
                }
            };
            return {
                dump: dumpVariable
            }
        })(),
        output: console
    };
    // Private methods
    var _log = function (info) {
        _settings.output.log(info);
    };
    var _dump = function (varName, varValue) {
        _log(_settings.dumper.dump(varName, varValue));
    };
    // Change default settings
    var changeSettings = function (settingsArgs) {
        if (settingsArgs !== undefined) {
            if (settingsArgs.json !== undefined) {
                _settings.json = settingsArgs.json;
            }
            if (settingsArgs.output !== undefined) {
                _settings.output = settingsArgs.output;
            }
            if (settingsArgs.dumper !== undefined) {
                _settings.dumper = settingsArgs.dumper;
            }
        }
    };
    return {
        init: changeSettings,
        log: _log,
        dump: _dump
    };
})();
