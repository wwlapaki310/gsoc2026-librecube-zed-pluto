/**
 * Tree-sitter grammar for PLUTO
 * ECSS-E-ST-70-32C — Test and Operations Procedure Language
 *
 * Reference:
 *   - https://ecss.nl/standard/ecss-e-st-70-32c-test-and-operations-procedure-language/
 *   - https://gitlab.com/librecube/tools/vscodium-pluto-syntax (VS Code plugin)
 *   - https://gitlab.com/librecube/lib/python-pluto-parser
 *
 * Status: WIP skeleton — covers top-level structure and core tokens.
 *         Full grammar implementation is the GSoC 2026 project goal.
 */

module.exports = grammar({
  name: 'pluto',

  // PLUTO is case-insensitive; handled via case-insensitive keywords below
  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    // -------------------------------------------------------------------------
    // Top-level: a PLUTO file is one or more procedure definitions
    // -------------------------------------------------------------------------
    source_file: $ => repeat1($.procedure),

    // -------------------------------------------------------------------------
    // Procedure structure
    // PLUTO spec: procedure = declaration_body + preconditions? + main + confirmation? + watchdog?
    // -------------------------------------------------------------------------
    procedure: $ => seq(
      caseInsensitive('procedure'),
      optional($.identifier),       // procedure name (optional in spec)
      optional($.declaration_body),
      optional($.preconditions),
      $.main_body,
      optional($.confirmation),
      optional($.watchdog),
      caseInsensitive('end'),
      caseInsensitive('procedure'),
    ),

    declaration_body: $ => seq(
      caseInsensitive('variables'),
      repeat($.variable_declaration),
      caseInsensitive('end'),
      caseInsensitive('variables'),
    ),

    preconditions: $ => seq(
      caseInsensitive('preconditions'),
      repeat($.statement),
      caseInsensitive('end'),
      caseInsensitive('preconditions'),
    ),

    main_body: $ => seq(
      caseInsensitive('main'),
      repeat(choice($.step, $.statement)),
      caseInsensitive('end'),
      caseInsensitive('main'),
    ),

    confirmation: $ => seq(
      caseInsensitive('confirmation'),
      repeat($.statement),
      caseInsensitive('end'),
      caseInsensitive('confirmation'),
    ),

    watchdog: $ => seq(
      caseInsensitive('watchdog'),
      repeat($.statement),
      caseInsensitive('end'),
      caseInsensitive('watchdog'),
    ),

    // -------------------------------------------------------------------------
    // Step (nested mini-procedure inside main)
    // -------------------------------------------------------------------------
    step: $ => seq(
      caseInsensitive('step'),
      $.identifier,
      optional($.preconditions),
      $.main_body,
      optional($.confirmation),
      optional($.watchdog),
      caseInsensitive('end'),
      caseInsensitive('step'),
    ),

    // -------------------------------------------------------------------------
    // Statements
    // -------------------------------------------------------------------------
    statement: $ => choice(
      $.activity_call,
      $.wait_statement,
      $.if_statement,
      $.while_statement,
      $.set_statement,
      $.check_statement,
    ),

    // initiate [and confirm] <activity>;
    activity_call: $ => seq(
      caseInsensitive('initiate'),
      optional(seq(caseInsensitive('and'), caseInsensitive('confirm'))),
      $.identifier,
      ';',
    ),

    // wait until <condition>  |  wait for <duration> until <condition>
    wait_statement: $ => seq(
      caseInsensitive('wait'),
      choice(
        seq(caseInsensitive('until'), $.expression),
        seq(caseInsensitive('for'), $.eng_value, caseInsensitive('until'), $.expression),
      ),
    ),

    // if <condition> then ... [else ...] end if
    if_statement: $ => seq(
      caseInsensitive('if'),
      $.expression,
      caseInsensitive('then'),
      repeat($.statement),
      optional(seq(
        caseInsensitive('else'),
        repeat($.statement),
      )),
      caseInsensitive('end'),
      caseInsensitive('if'),
    ),

    // while <condition> do ... end while
    while_statement: $ => seq(
      caseInsensitive('while'),
      $.expression,
      caseInsensitive('do'),
      repeat($.statement),
      caseInsensitive('end'),
      caseInsensitive('while'),
    ),

    // set <variable> = <expression>;
    set_statement: $ => seq(
      caseInsensitive('set'),
      $.identifier,
      '=',
      $.expression,
      ';',
    ),

    // check value of <param> <op> <value>;
    check_statement: $ => seq(
      caseInsensitive('check'),
      caseInsensitive('value'),
      caseInsensitive('of'),
      $.identifier,
      $.comparison_op,
      $.expression,
      ';',
    ),

    // -------------------------------------------------------------------------
    // Expressions and values
    // -------------------------------------------------------------------------
    expression: $ => choice(
      $.telemetry_ref,
      $.eng_value,
      $.boolean_literal,
      $.string_literal,
      $.identifier,
      $.binary_expression,
    ),

    // value of <parameter>
    telemetry_ref: $ => seq(
      caseInsensitive('value'),
      caseInsensitive('of'),
      $.identifier,
    ),

    // number + engineering unit (e.g. "60 degC", "0.2 deg/h", "30 s")
    eng_value: $ => seq(
      $.number,
      optional($.eng_unit),
    ),

    binary_expression: $ => seq(
      $.expression,
      choice($.comparison_op, $.logical_op, $.arithmetic_op),
      $.expression,
    ),

    comparison_op: $ => choice('>', '<', '>=', '<=', '=', '!='),
    logical_op:    $ => choice(
      caseInsensitive('and'),
      caseInsensitive('or'),
      caseInsensitive('not'),
    ),
    arithmetic_op: $ => choice('+', '-', '*', '/'),

    // -------------------------------------------------------------------------
    // Variable declaration
    // -------------------------------------------------------------------------
    variable_declaration: $ => seq(
      $.identifier,
      ':',
      $.type_name,
      optional(seq('=', $.expression)),
      ';',
    ),

    type_name: $ => choice(
      caseInsensitive('integer'),
      caseInsensitive('real'),
      caseInsensitive('boolean'),
      caseInsensitive('string'),
      caseInsensitive('time'),
    ),

    // -------------------------------------------------------------------------
    // Terminals
    // -------------------------------------------------------------------------
    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    number: $ => /[+-]?[0-9]+(\.[0-9]+)?/,

    // Engineering unit: letters, digits, /, . (e.g. deg/h, degC, m/s2)
    eng_unit: $ => /[a-zA-Z][a-zA-Z0-9\/\.\*]*/,

    boolean_literal: $ => choice(
      caseInsensitive('true'),
      caseInsensitive('false'),
    ),

    string_literal: $ => /"[^"]*"/,

    // Comments: /* ... */ and // ...
    comment: $ => choice(
      seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'),
      seq('//', /.*/),
    ),
  },
});

/**
 * Helper: case-insensitive keyword matching.
 * Tree-sitter grammars are case-sensitive by default;
 * this wraps each letter in [Xx] alternation.
 */
function caseInsensitive(str) {
  return new RegExp(
    str.split('').map(c =>
      c.match(/[a-zA-Z]/) ? `[${c.toLowerCase()}${c.toUpperCase()}]` : c
    ).join('')
  );
}
