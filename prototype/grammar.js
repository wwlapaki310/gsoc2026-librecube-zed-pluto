/**
 * Tree-sitter grammar for PLUTO
 * ECSS-E-ST-70-32C — Test and Operations Procedure Language
 *
 * Status: WIP — core structure parses. Run: tree-sitter generate && tree-sitter test
 */

module.exports = grammar({
  name: 'pluto',

  extras: $ => [
    /\s/,
    $.comment,
  ],

  // Resolve ambiguities via explicit precedence
  conflicts: $ => [
    [$.expression, $.binary_expression],
  ],

  rules: {
    // -----------------------------------------------------------------------
    // Root
    // -----------------------------------------------------------------------
    source_file: $ => repeat1($.procedure),

    // -----------------------------------------------------------------------
    // Procedure
    // -----------------------------------------------------------------------
    procedure: $ => seq(
      keyword('procedure'),
      optional(field('name', $.identifier)),
      optional($.declaration_body),
      optional($.preconditions),
      $.main_body,
      optional($.confirmation),
      optional($.watchdog),
      keyword('end'),
      keyword('procedure'),
    ),

    declaration_body: $ => seq(
      keyword('variables'),
      repeat($.variable_declaration),
      keyword('end'),
      keyword('variables'),
    ),

    preconditions: $ => seq(
      keyword('preconditions'),
      repeat($.statement),
      keyword('end'),
      keyword('preconditions'),
    ),

    main_body: $ => seq(
      keyword('main'),
      repeat(choice($.step, $.statement)),
      keyword('end'),
      keyword('main'),
    ),

    confirmation: $ => seq(
      keyword('confirmation'),
      repeat($.statement),
      keyword('end'),
      keyword('confirmation'),
    ),

    watchdog: $ => seq(
      keyword('watchdog'),
      repeat($.statement),
      keyword('end'),
      keyword('watchdog'),
    ),

    // -----------------------------------------------------------------------
    // Step
    // -----------------------------------------------------------------------
    step: $ => seq(
      keyword('step'),
      field('name', $.identifier),
      optional($.preconditions),
      $.main_body,
      optional($.confirmation),
      optional($.watchdog),
      keyword('end'),
      keyword('step'),
    ),

    // -----------------------------------------------------------------------
    // Statements
    // -----------------------------------------------------------------------
    statement: $ => choice(
      $.activity_call,
      $.wait_statement,
      $.if_statement,
      $.while_statement,
      $.set_statement,
      $.check_statement,
    ),

    // initiate [and confirm] <id>;
    activity_call: $ => seq(
      keyword('initiate'),
      optional(seq(keyword('and'), keyword('confirm'))),
      field('activity', $.identifier),
      ';',
    ),

    // wait until <expr>  |  wait for <eng_value> until <expr>
    wait_statement: $ => seq(
      keyword('wait'),
      choice(
        seq(keyword('until'), $.expression),
        seq(keyword('for'), $.eng_value, keyword('until'), $.expression),
      ),
    ),

    // if <expr> then ... [else ...] end if
    if_statement: $ => seq(
      keyword('if'),
      $.expression,
      keyword('then'),
      repeat($.statement),
      optional(seq(keyword('else'), repeat($.statement))),
      keyword('end'),
      keyword('if'),
    ),

    // while <expr> do ... end while
    while_statement: $ => seq(
      keyword('while'),
      $.expression,
      keyword('do'),
      repeat($.statement),
      keyword('end'),
      keyword('while'),
    ),

    // set <id> = <expr>;
    set_statement: $ => seq(
      keyword('set'),
      field('variable', $.identifier),
      '=',
      $.expression,
      ';',
    ),

    // check value of <id> <op> <expr>;
    check_statement: $ => seq(
      keyword('check'),
      keyword('value'),
      keyword('of'),
      field('parameter', $.identifier),
      $.comparison_op,
      $.expression,
      ';',
    ),

    // -----------------------------------------------------------------------
    // Expressions  (use prec.left to avoid left-recursion errors)
    // -----------------------------------------------------------------------
    expression: $ => choice(
      $.binary_expression,
      $.primary_expression,
    ),

    primary_expression: $ => choice(
      $.telemetry_ref,
      $.eng_value,
      $.boolean_literal,
      $.string_literal,
      $.identifier,
    ),

    binary_expression: $ => prec.left(1, seq(
      $.primary_expression,
      choice($.comparison_op, $.logical_op, $.arithmetic_op),
      $.primary_expression,
    )),

    // value of <id>
    telemetry_ref: $ => seq(
      keyword('value'),
      keyword('of'),
      field('parameter', $.identifier),
    ),

    // number [unit]   e.g. 60 degC, 0.2 deg/h
    eng_value: $ => seq(
      $.number,
      optional($.eng_unit),
    ),

    // -----------------------------------------------------------------------
    // Variable declarations
    // -----------------------------------------------------------------------
    variable_declaration: $ => seq(
      field('name', $.identifier),
      ':',
      $.type_name,
      optional(seq('=', $.primary_expression)),
      ';',
    ),

    type_name: $ => choice(
      keyword('integer'),
      keyword('real'),
      keyword('boolean'),
      keyword('string'),
      keyword('time'),
    ),

    // -----------------------------------------------------------------------
    // Operators
    // -----------------------------------------------------------------------
    comparison_op: $ => choice('>', '<', '>=', '<=', '=', '!='),
    logical_op:    $ => choice(keyword('and'), keyword('or'), keyword('not')),
    arithmetic_op: $ => choice('+', '-', '*', '/'),

    // -----------------------------------------------------------------------
    // Terminals
    // -----------------------------------------------------------------------
    // Identifiers are case-insensitive in PLUTO; we accept any case here.
    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    number: $ => /[+-]?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/,

    // Engineering units: degC, deg/h, m/s2, kPa, rpm ...
    eng_unit: $ => /[a-zA-Z][a-zA-Z0-9\/\.\*]*/,

    boolean_literal: $ => choice(
      keyword('true'),
      keyword('false'),
    ),

    string_literal: $ => /"[^"]*"/,

    // Block comment /* ... */ and line comment // ...
    comment: $ => token(choice(
      seq('//', /.*/),
      seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'),
    )),
  },
});

// Case-insensitive keyword: matches "procedure", "PROCEDURE", "Procedure" etc.
function keyword(word) {
  return new RegExp(
    word.split('').map(c =>
      /[a-zA-Z]/.test(c) ? `[${c.toLowerCase()}${c.toUpperCase()}]` : c
    ).join('')
  );
}
