/*
 * Module:      ClassDay
 *
 * Description: MSSE ClassDay representation
 *
 * Author(s):   C.T. Yeung
 *
 * Date:        29Dec16
 * 
 * Copyright (c) 2016 MSSE Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file. See the AUTHORS file for names of contributors.
 */
class ClassDay extends EventBase {
  
  constructor(key, value)
  {
    super();

    this._key = key;
    this._value = value;
    this._date = null;
    this._sessions = null;
    this.marshal();
  }
  
  /*
   * Parse the class date and sessions information
   *
   * Return: true or false
   * Dispatch: error if fail
   */
  marshal()
  {
    var errorMsg = null;
    
    try
    {
      // parse date
      var dayDate = this._key.split(",");
      if(dayDate && 2 == dayDate.length)
      {
        var dd = dayDate[1];
        while(dd.indexOf("-")>=0)
          dd = dd.replace("-",",");
          
        this._date = new Date(dd);
        
        // parse class sessions
        var listSchedule = this._value.split(",");
        if(listSchedule && listSchedule.length)
        {
          this._sessions = [];
           for(var i=0; i<listSchedule.length; i++)
          {
            var session = new ClassSession(i, this._date, listSchedule[i]);
            this._sessions.push(session);
          }
          return true;
        }
        else
          errorMsg = "Failed to parse class session string.";
      }
      else
        errorMsg = "Failed to parse date.";
    }
    catch(e)
    {
      errorMsg = e.toString();
    }
    
    super.dispatchIfError(errorMsg, "ClassDay::marshal()", 39);
    return false;
  }
  
  /*
   * Get total class time for entire day
   */
  get classTimeInMinutes()
  {
    var totalTime = 0;
    this._sessions.forEach((e)=>{
      totalTime += e.durationInSeconds;
    });
    return totalTime/60;  // seconds -> minutes
  }
  
  /*
   * Get total class time after given
   */
  calClassTimeAfter(date)
  {
    // implement next
    return 1;
  }
  
  /*
   * Compare date with resolution of 'date' or 'day'
   *
   * Return -1 (earlier than date)
   * Return 0 if same day
   * Return 1 (later than date)
   */
  compare(date)
  {
    try
    {
      date = this.filterTime(date);
      var thisDate = this.filterTime(this._date);
      var diff = thisDate.valueOf() - date.valueOf();
      
      if(0==diff)
        return 0;
       
      if(0<diff)
        return 1;
      
      else
        return -1;
    }
    catch(e)
    {
      super.dispatchIfError(e.toString(), "ClassDays::compare()", 152);
    }
    return null;
  }
  
  filterTime(date)
  {
    try
    {
      var dateArray = date.toISOString().split("T");
      var dateStr = new Date(dateArray[0]);
      return new Date(dateStr);
    }
    catch(e)
    {
      super.dispatchIfError(e.toString(), "ClassDays::removeDateTime()", 121);
    }
    return null;
  }
}