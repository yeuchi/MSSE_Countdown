class DateInput extends EventBase {
    
    constructor(dateClass)
    {
        super();
        this._dateClass = dateClass;
        
        this.initValue();
        this.initHandler();
    }
    
    /*
     * Initialize the change handler
     */
    initHandler()
    {
        try
        {
            // input change
            $(this._dateClass).on("change", function(e) {
                // validator
            });
        }
        catch(e)
        {
            super.dispatchIfError(e.toString(), "DateInput::initHandler()", 20);
        }
    }
    
    /*
     * Initial value of the text field -- today's date
     */
    initValue()
    {
        try
        {
            var input = $(this._dateClass)[0];
            input.value = this.todayDate;
        }
        catch(e)
        {
            super.dispatchIfError(e.toString(), "DateInput::initValue()", 37);
        }
    }
    
    get todayDate()
    {
        var today = new Date().toISOString().split("T");
        return today[0];
    }
}