class DownCount {
  
  constructor(model)
  {
    this._model = model;
  }
  
  /*
   * Number of days remaining -- not including today
   */
  get daysRemain()
  {
    // *** need to count today if today's class session has NOT started.
    var now = new Date();
    
    // find all class days to come
    var classDays = this.findClassDaysAfter(now);
    
    return classDays.length;
  }
  
  /*
   * Number of hours remaining
   */
  get hoursRemain()
  {
    return Math.floor(this.minutesRemain / 60);
  }
  
  /*
   * Number of minutes remaining
   */
  get minutesRemain()
  {
    var now = new Date();
    
    // if today is a class day -- parse today's remaining 
    var todayClassDay = this.findClassDay(now);
    
    // find all class days to come
    var classDays = this.findClassDaysAfter(now);
    
    // calculate time
    var minutesTotal = 0;
    classDays.forEach((e)=>{
      minutesTotal += e.classTimeInMinutes;
    });
    
    return minutesTotal;
  }
  
  /*
   * Calculate the percent remaining
   */
  get percentRemain()
  {
    // do the calculation
    return 2;
  }
    
  /*
   * Find class day that matches specific date
   *
   * Return the ClassDay object element or null
   */
  findClassDay(date)
  {
    if(this._model.classDays && this._model.classDays.length)
    {
      this._model.classDays.forEach(function(e) {
        if(e.compare(date) == 0)
          return e;
      });
    }
    return null;
  }
  
  /*
   * Find all class days after a specific date
   *
   * Return: all ClassDay objects or empty array
   */
  findClassDaysAfter(date)
  {
    if(this._model.classDays && this._model.classDays.length)
    {
      var classDays = [];
      
      this._model.classDays.forEach(function(e) {
        if(e.compare(date) > 0) // e is later (larger) than now
            classDays.push(e);
      });
    }      
    return classDays;
  }
}