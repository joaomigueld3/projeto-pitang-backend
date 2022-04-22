const validatorDate= (date) => {
    const splitDate =date.split("-");
    const year=parseInt(splitDate[0]);
    const month=parseInt(splitDate[1]);
    const day=parseInt(splitDate[2]);

    const dateToString = Date.parse(date);
    const newDate = new Date(dateToString)
    console.log(newDate)
    console.log(dateToString)
    console.log(Date.now())
    console.log(dateToString- Date.now())
    if(dateToString - Date.now() < 1 ){
        throw new Error("You can't schedule an Appointment before today");
    }
        else if(year<2022 || year>2060){
      throw new Error('year must be beteween 2022 and 2060');
    }
        else if(month<1 || month>12){
      throw new Error("month must be beetween 01 and 12");
    }
        else if(day<1 || day>31){
      throw new Error("day must be beetween 01 and 31");
    }
        else if((month==4 || month==6 || month==9 || month==11) && day>30){
      throw new Error("Apr, Jun, Set, Nov only have 30 days");
    }
        else if(month==2 && day>28){
      throw new Error("Feb only have 28 days");
    }
    console.log("splitted appDate: "+splitDate)
    }

    export default validatorDate;