'use strict';

/*
 * Data Model for MSSE time remaining
 *
 * class schedule does not include commencement
 * https://www.msse.umn.edu/spring-2017-class-schedule-class-2017
 */
class Model extends EventBase {
  constructor()
  {
    super();
    // *** possible to put these in closure to make them private ?
    this._filePath = "filePath";
    this._keys = null;
    this._data = null;
    this.classDays = null;
  }
  
  /*
   * Load an ASCII file with JSON string
   *
   * Return: 
   */
  openJsonFile(filePath)
  {
    this._filePath = filePath;
    this.classDays = null;
    $.getJSON(filePath, this.onLoadJsonHandler);
  }
  
  serialize()
  {
    // write to file
  }
  
  /*
   * Handle JSON load from file
   *
   * Dispatch: event of success or error
   */
  onLoadJsonHandler(data)
  {
    let event = new Event();
    var eventType = (data)? event.OnCompleteMarshal : event.OnLoadError;
    super.dispatch(eventType, data, "Model::onLoadJsonHandler()", 83);
  }
  
  /*
   * Parse data stream into local values
   *
   * Return true or false
   */
  marshal(data)     // raw JSON data
  { 
    if(data)
    {
      var keys = Object.keys(data);
      var values = Object.values(data);
      
      if(keys && keys.length
         && values && values.length
         && keys.length == values.length)
      {
        this.classDays = [];
        
        try
        {
          for(var i=0; i<keys.length; i++)
          {
            var day = new ClassDay(keys[i], values[i]);
            this.classDays.push(day);
          }
          return true;
        }
        catch(e)
        {
          super.dispatchIfError(e.toString(), "Model::marshal()", 70);
          return false;
        }
      }
    }
    return false;
  }
  
  /*
   * Find number of all ClassDay objects in model
   */
  get numClassDays()
  {
    if(this.classDays && this.classDays.length)
      return this.classDays.length;
    
    return 0;
  }
  
  /*
   * build data for D3.js calendar view
   */
  buildData4D3(dateStr)
  {
    try
    {
      var dateSelected = new Date(dateStr);
      var d3Data = {};
      var numClasses = this.numClassDays;
      var index = 0;
      
      this.classDays.forEach((e) => {
        index ++;
        var iso = e._date.toISOString();
        var dd = iso.split("T");
        if(dd && 2==dd.length)
        {
          var val = e.compare(dateSelected);
          var status = this.mapD3Color(val);
          var p = index / numClasses * 100;
          d3Data[dd[0]] = {code:status, percent:p};
        }
        else
          throw "Model::get data3D3() invalid dd.";
      });
      return d3Data;
    }
    catch(e)
    {
        super.dispatchIfError(e.toString(), "Model::marshal()", 70);
    }
    return null;
  }
  
  /*
   * Map date to D3 calendar color
   */
  mapD3Color(val)
  {
    switch(val)
    {
      case 0:
        return 0;
      
      case 1:
        return -.03;
      
      case -1:
        return 1;
    }
  }
}


