

/*
 * MSSE ClassDay representation
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
      if(this._date.getYear() == date.getYear() &&
         this._date.getMonth() == date.getMonth() &&
         this._date.getDate() == date.getDate())
          return 0;
        
      if(this._date.getYear() <= date.getYear() &&
         this._date.getMonth() <= date.getMonth() &&
         this._date.getDate() <= date.getDate())
          return -1;
        
      else
        return 1;
        
    }
    catch(e)
    {
      super.dispatchIfError(e.toString(), "ClassDays::compare()", 152);
    }
    return null;
  }
}