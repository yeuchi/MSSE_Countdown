/*
 * DateInput class
 *
 * - Everything supporting the date input text field
 */
class DateInput {
    
    constructor(dateClass, dateStr)
    {
        this._eventBase = new EventBase();
        this._dateClass = dateClass;
        this._dateSelected = new Date(dateStr);
        
        this.initHandler();
        this.initValue();
    }
    
    /*
     * Initial value of the text field -- today's date
     */
    initValue()
    {
        try
        {
            var input = $(this._dateClass)[0];
            input.value = this.selectedDateStr;
        }
        catch(e)
        {
            this._eventBase.dispatchIfError(e.toString(), "DateInput::initValue()", 44);
        }
    }
    
    /*
     * Initialize the change handler
     */
    initHandler()
    {
        try
        {
            // input change
            $(this._dateClass).on("change", this.onChangeHandler);
        }
        catch(e)
        {
            this._eventBase.dispatchIfError(e.toString(), "DateInput::initHandler()", 20);
        }
    }
    
    /*
     * Date input field change handler
     */
    onChangeHandler(e)
    {
        var eventBase = new EventBase();

        try
        {
            // validator
            var date = new Date(e.currentTarget.value);
            if(!date || !date.getTime())
                throw "DateInput::onChangeHandler() invalid date";
            
            // need to validate date (i.e. 2-28)
            
            // dispatch changed date for application update
            var event = new Event();
            eventBase.dispatch(event.OnChangeDateInput, date.toISOString(), "DateInput::onChangeHandler()", 53);
        }
        catch(e)
        {
            eventBase.dispatchIfError(e.toString(), "DateInput::onChangeHandler()", 53);
        }
    }
    
    get selectedDateStr()
    {
        var dateArray = this._dateSelected.toISOString().split("T");
        return dateArray[0];
    }
}