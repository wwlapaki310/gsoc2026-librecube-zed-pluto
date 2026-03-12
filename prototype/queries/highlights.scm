; highlights.scm — ZED syntax highlighting queries for PLUTO
; Maps Tree-sitter grammar nodes to ZED semantic token types.
;
; Status: WIP — to be refined once grammar.js is complete.

; ── Keywords ──────────────────────────────────────────────────────────────────
[
  "procedure" "end"
  "main" "step"
  "preconditions" "confirmation" "watchdog"
  "variables"
] @keyword

[
  "if" "then" "else"
  "while" "do"
  "repeat" "until"
] @keyword.control

[
  "initiate" "confirm" "abort"
  "wait" "for" "set" "check"
] @keyword.operator

[
  "value" "of"
  "and" "or" "not"
] @keyword

; ── Identifiers ───────────────────────────────────────────────────────────────
(procedure name: (identifier) @function)
(step       name: (identifier) @function)
(activity_call    (identifier) @function.call)
(telemetry_ref    (identifier) @variable)
(set_statement    (identifier) @variable)
(check_statement  (identifier) @variable)

; ── Types ─────────────────────────────────────────────────────────────────────
(type_name) @type

; ── Literals ──────────────────────────────────────────────────────────────────
(number)          @number
(eng_value
  (eng_unit)      @type.builtin)   ; degC, deg/h, kPa, etc.
(boolean_literal) @constant.builtin
(string_literal)  @string

; ── Operators ─────────────────────────────────────────────────────────────────
(comparison_op) @operator
(arithmetic_op) @operator

; ── Comments ──────────────────────────────────────────────────────────────────
(comment) @comment

; ── Punctuation ───────────────────────────────────────────────────────────────
";" @punctuation.delimiter
":" @punctuation.delimiter
"=" @operator
