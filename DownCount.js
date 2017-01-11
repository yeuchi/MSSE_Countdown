/*
 * Module: DownCount class 
 *
 * Description: business logic
 *
 * Author(s):   C.T. Yeung
 *
 * Date:        29Dec16
 * 
 * Copyright (c) 2016 MSSE Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file. See the AUTHORS file for names of contributors.
 */
class DownCount {
  
  constructor(model, dateStr)
  {
    this._model = model;
    this._dateSelected = new Date(dateStr);
  }
  
  /*
   * Number of days remaining -- not including today
   */
  get daysRemain()
  {
    // find all class days to come
    var classDays = this.findClassDaysAfter(this._dateSelected);
    
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
    // -- this NEEDS to be finished !
    // if today is a class day -- parse today's remaining 
    var todayClassDay = this.findClassDay(this._dateSelected);
    
    // find all class days to come
    var classDays = this.findClassDaysAfter(this._dateSelected);
    
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
    var percent = this.minutesRemain / this._model.totalClassTimeInMinutes * 100;
    return percent;
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