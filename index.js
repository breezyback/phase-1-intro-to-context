function createEmployeeRecord(employee) {
    return { 
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
     }
}

function createEmployeeRecords(employeeRecords) {
    const result = [];
    employeeRecords.forEach(employeeRecord => result.push(createEmployeeRecord(employeeRecord)));
    return result;
}

function createTimeInEvent(employeeRecord, date) {
    const dateSplited = date.split(" ");
    employeeRecord.timeInEvents = [{
        type: "TimeIn",
        date: dateSplited[0],
        hour: parseInt(dateSplited[1]),
    }];

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, date) {
    const dateSplited = date.split(" ");
    employeeRecord.timeOutEvents = [{
        type: "TimeOut",
        date: dateSplited[0],
        hour: parseInt(dateSplited[1]),
    }];

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEventDate = employeeRecord.timeInEvents[0].date;
    const timeOutEventDate = employeeRecord.timeOutEvents[0].date;
    
    if (date === timeInEventDate && date === timeOutEventDate)
        return Math.abs(employeeRecord.timeOutEvents[0].hour - employeeRecord.timeInEvents[0].hour) / 100;

    const time = Math.abs(new Date(date) - new Date(employeeRecord.timeInEvents[0].date)) / 3600000;
    return time;
}

function wagesEarnedOnDate(employeeRecord, date) {
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date);
}

function allWagesFor(employeeRecord) {
    let result = 0;
    employeeRecord.timeInEvents.forEach(timeInEvent => {
        result = result + wagesEarnedOnDate(employeeRecord, timeInEvent.date);
    })
    return result + 324;
}

function calculatePayroll(employeeRecords) {
    
}