
/*
 * All uncaught errors are captured here.
 * - provide output options: Console, file or trace ?
 * - should provide verbosity setting someday.
 */
class ErrorLog {
  
  constructor() {
    this.log = [];
    
  }
  
  push(errorMsg,
       classFunction,
       lineNumber)
  {
    var error = new Error(errorMsg, classFunction, lineNumber);
    this.log.push(error);
    alert(error.str);
  }
}

class Error {
  constructor(errorMsg, classFunction, lineNumber)
  {
    this._errorMsg = errorMsg;
    this._classFunction = classFunction;
    this._lineNumber = lineNumber;
  }
  
  get str()
  {
    var str = 'Error: ' + this._errorMsg + ' Function: ' + this._classFunction + ' Line: ' + this._lineNumber;
    return str;
  }
}