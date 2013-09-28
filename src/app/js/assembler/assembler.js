if (typeof yasp == 'undefined') yasp = { };

(function () {
  /**
   * Assembler is responsible for generating the bytecode from the assembler
   * @constructor
   */
  yasp.Assembler = function () {
    this.jobs = [ ];
    this.errors = [ ]; // array containing all the errors that occured while assembling

    // results
    this.map = null;
    this.symbols = null;
    this.result = null;

    this.passes = [
      new yasp.Lexer(),
      new yasp.PreProcessor(),
      new yasp.Checker(),
      new yasp.Analyser(),
      new yasp.Parser(),
      new yasp.Generator()
    ];
  };

  /**
   * @function Assembles the files
   */
  yasp.Assembler.prototype.assemble = function (params) {
    this.jobs = params.jobs;

    var tmpResult = params.code;
    for (var i = 0; i < this.passes.length; i++) {
      tmpResult = this.passes[i].pass(this, tmpResult);
    }
    this.result = tmpResult;
    return this.result;
  };

  /**
   * @function Rises a syntax error
   */
  yasp.Assembler.prototype.riseSyntaxError = function (iterator, msg) {
    var token = iterator.current();
    console.log(msg = ("Syntax error: " + msg + " in line " + token.line + " at character " + token.char));
    this.errors.push({
      token: token,
      msg: msg
    });

    throw msg;
  }

  /**
   * Creates an iterator that iterates through a token array.
   * It also features some useful methods
   * @param tokens
   * @constructor
   */
  yasp.TokenIterator = function (assembler, tokens) {
    this.tokens = tokens;
    this.pos = 0;
    this.assembler = assembler;
  }

  /**
   * Matches the current token with the specified text, if it fails an error is raised
   * @param text
   * @returns {*}
   */
  yasp.TokenIterator.prototype.match = function (text) {
    if (this.is(text)) {
      return this.next();
    } else {
      this.assembler.riseSyntaxError(this, "Unexpected token '" + this.current().text + "', expecting '" + text + "'");
    }
  }

  /**
   * Checks whether the current token equals the given text.
   * @param text
   * @returns {boolean}
   */
  yasp.TokenIterator.prototype.is = function (text) {
    return this.current().text == text;
  }

  /**
   * Moves to the next token. If there is none, an error is rised.
   */
  yasp.TokenIterator.prototype.next = function () {
    if (this.hasNext()) {
      this.pos++;
      return this.current();
    } else {
      this.assembler.riseSyntaxError(this, "Unexpected end of file");
    }
  }

  /**
   * Returns the current token
   * @returns {*}
   */
  yasp.TokenIterator.prototype.current = function () {
    return this.tokens[this.pos];
  }

  /**
   * Returns whether there is a next token or not
   * @returns {boolean}
   */
  yasp.TokenIterator.prototype.hasNext = function () {
    return this.pos + 1 < this.tokens.length
  }

  /**
   * Restores the TokenIterator to the next consistent state (used for multiple error messages)
   */
  yasp.TokenIterator.prototype.restore = function () {
    // restore state => continue until \n is reached, and then skip the \n
    while (this.hasNext() && !this.is('\n')) this.next();
    if (this.hasNext()) this.next();
  }

  /**
   * Wrapper for the yasp.Assembler.riseSyntaxError function
   * @param msg
   */
  yasp.TokenIterator.prototype.riseSyntaxError = function (msg) {
    this.assembler.riseSyntaxError(this, msg);
  }
})();