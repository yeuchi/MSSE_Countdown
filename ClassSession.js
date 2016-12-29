/*
 * MSSE ClassSession representation
 */
class ClassSession extends EventBase {
  
  constructor(index,
              date,
              sessionTimeString)
  {
    super();

    this._index = index;
    this._date = date;
    this._startTime= "";
    this._endTime = "";
    
    this.marshal(sessionTimeString);
  }
  
  marshal(sessionTimeString)
  {
    var errorMsg = null;
    
    try
    {
      var listTime = sessionTimeString.split("-");
      if(listTime && 2 == listTime.length)
      {
        this._startTime= this.parseTime(listTime[0]);
        this._endTime = this.parseTime(listTime[1]);
        
        if(this._startTime&& this._endTime)
          return true;
        
        else
          errorMsg = "ClassSession::marshal() startTime or endTime failed.";
      }
    }
    catch(e)
    {
      errorMsg = e.toString();
    }
    super.dispatchIfError(errorMsg, "ClassSession::marshal()", 39);
    return false;
  }
  
  /*
   * convert hour:minutes string into date object
   */
  parseTime(str)
  {
    var errorMsg = null;
    
    try
    {
      var hhmm = str.split(":");
      if(hhmm && 2 == hhmm.length)
      {
        var date = new Date(this._date.getTime());
        date.setHours(hhmm[0]);
        date.setMinutes(hhmm[1]);
        return date;
      }
    }
    catch(e)
    {
      errorMsg = e.toString();
    }
    super.dispatchIfError(errorMsg, "ClassSession::parseTime()", 56);
    return null;
  }
  
  /*
   * End time - start time
   */
  get durationInSeconds()
  {
      var duration = (this._endTime.getTime() - this.startTime.getTime()) / 1000;
      return duration;
  }
  
  get startTime()
  {
    return this._startTime;
  }
  
  get endTime()
  {
    return this._endTime;
  }
} 