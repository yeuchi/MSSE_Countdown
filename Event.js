/*
 * Event class
 *
 * - a broadcasting event
 */
class Event {
  constructor()
  {
    this.OnCompleteMarshal = "OnCompleteMarshal";
    this.OnLoadError = "OnLoadError";
    
    this.OnChangeDateInput = "OnChangeDateInput";
  }
  
  setContent(eventType,
             data,
             classFunction,
             lineNumber)
  {
    this.eventType = eventType;
    this.data = data;
    this.classFunction = classFunction;
    this.lineNumber = lineNumber;
  }
}

/*
 * base class
 */
class EventBase {
  
  constructor()
  {
  
  }
  
  /*
   *  Dispatch error event if one makes it here.
   */
  dispatchIfError(errorMsg, classFunction, lineNumber)
  {
    if(errorMsg)
      this.dispatch("OnLoadError", errorMsg, classFunction, lineNumber);
  }
  
  dispatch(eventType, msg, classFunction, lineNumber)
  {
    if(msg)
    {
      let event = new Event();
      event.setContent(eventType, msg, classFunction, lineNumber);
      $(document).trigger(eventType, event);
    }
  }
}