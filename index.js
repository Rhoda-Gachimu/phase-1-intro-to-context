// Your code here
function createEmployeeRecord(array) {
    if (array.length === 0) {
        return {
            timeInEvents: [],
            timeOutEvents: []
        }
    } else {
        return {
            firstName: array[0],
            familyName: array[1],
            title: array[2],
            payPerHour: array[3],
            timeInEvents: [],
            timeOutEvents: []
        }
    }
}
function createEmployeeRecords(arrOfArrays) {
    let EmployeeRecords = []
    arrOfArrays.map(array => EmployeeRecords.push(createEmployeeRecord(array)))
    return EmployeeRecords
}
function createTimeInEvent(empObj, date) {
    empObj.timeInEvents.push ({
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    })
    return empObj
}
function createTimeOutEvent(empObj, dateStamp) {
    empObj.timeOutEvents.push ({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return empObj
}
function hoursWorkedOnDate(empObj, date) {
    const timeinObj = empObj.timeInEvents.find(dayObj => dayObj.date === date)
    const timeinHours = timeinObj.hour
    const timeoutObj = empObj.timeOutEvents.find(dayObj => dayObj.date === date)
    const timeoutHours = timeoutObj.hour
    const time = timeoutHours - timeinHours
    const hours = Math.floor(time/100)
    return hours
}
function wagesEarnedOnDate(empObj, date) {
    const hoursWorked = hoursWorkedOnDate(empObj, date)
    const payPerHour = empObj.payPerHour
    return hoursWorked * payPerHour
}
function allWagesFor(empObj) {
    const datesArray = empObj.timeInEvents
    let total = 0
    datesArray.forEach(obj => {
        total += wagesEarnedOnDate(empObj, obj.date)
    })
    return total
}

function calculatePayroll(arrayOfEmp) {
    let payRollTotal = 0
    arrayOfEmp.forEach(obj => {
        payRollTotal += allWagesFor(obj)
    })
    return payRollTotal
} 