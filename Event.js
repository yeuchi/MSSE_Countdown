/*
 * Module:      Event class
 *
 * Description: a broadcasting event
 *
 * Author(s):   C.T. Yeung
 *
 * Date:        29Dec16
 * 
 * Copyright (c) 2016 MSSE Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file. See the AUTHORS file for names of contributors.
 */
class Event {
  constructor()
  {
    this.OnCompleteMarshal = "OnCompleteMarshal";
    this.OnLoadError = "OnLoadError";
    
    this.OnChangeDateInput = "OnChangeDateInput";
    this.OnClickDay = "OnClickDay";
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