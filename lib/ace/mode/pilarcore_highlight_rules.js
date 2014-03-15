define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var PilarCoreHighlightRules = function() {

    var keywords = (
    "assert|assume|call|else|global|" +
    "goto|if|procedure|return|then|"
    );

    var buildinConstants = ("");

    var langClasses = (
        "Int"
    );

    var keywordMapper = this.createKeywordMapper({
        "variable.language": "this",
        "keyword": keywords,
        "constant.language": buildinConstants,
        "support.function": langClasses
    }, "identifier");

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "\\/\\/.*$"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            }, {
                token : keywordMapper,
                regex : '`.*`'
            },{
                token : "constant.numeric",
                regex : "[+-]?\\d+"
            }, {
                token : keywordMapper,
                regex : "@@[a-zA-Z_$][a-zA-Z0-9_$]*"
            }, {
                token : keywordMapper,
                regex : "#[a-zA-Z_$][a-zA-Z0-9_$]*(\\.)"
            }, {
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*"
            }, {
                token : "keyword.operator",
                regex : "!|%|&|\\*|\\-|\\+|\\:=|==|=|!=|!==|<=|>=|<|>|!|&&|\\|\\|"
            }, {
                token : "lparen",
                regex : "[({]"
            }, {
                token : "rparen",
                regex : "[)}]"
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : ".*?\\*\\/",
                next : "start"
            }, {
                token : "comment", // comment spanning whole line
                regex : ".+"
            }
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
};

oop.inherits(PilarCoreHighlightRules, TextHighlightRules);

exports.PilarCoreHighlightRules = PilarCoreHighlightRules;
});
