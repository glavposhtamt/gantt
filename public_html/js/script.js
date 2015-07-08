
 Date.prototype.daysInMonth = function( month ) {
        return month >= 0 && month < 12 ? 32 - new Date(this.getFullYear(), month, 32).getDate() : null;
};

var LineCount = 0;

window.onload = function() {

    /* Создаём DOM-элементы графика (месяцы) */

    var content = document.getElementById("year");
    for( var i = 0; i < 12; ++i ) {
        var month = document.createElement("div");
        month.className = "month";
        content.appendChild(month);      
    }
    var months = document.getElementsByClassName("month");
   
    /* Заполняем месяцы днями */
   
    var date = new Date();
   
    var daysInYear = [];
    for( var i = 0; i < 12; ++i ) daysInYear[i] = date.daysInMonth(i);
      
    for( var i = 0; i < 12; ++i ) {
                
        for( var j = 0; j < daysInYear[i]; ++j ) { 
            date.setDate(j + 1);
            date.setMonth(i);     
            var day = document.createElement("div");
            day.className = "day";
            months[i].appendChild(day);
            if(date.getDay() === 0 ){ 
                day.className += " endOfweek";
            }
        }
   }
   
   addRowMonthName(); 
   addDaysNameRow();
   addDaysRow();
   addRow();
   addRow();
   editRow(5, 8, 1, 7, 2);
};

 /*
  * Функция добавляет строки в график
  */
 
function addRow() {
    ++LineCount;
    var count = 0, daysInYear = [];
    var date = new Date();
    for( var i = 0; i < 12; ++i ) daysInYear[i] = date.daysInMonth(i);
    var days = document.getElementsByClassName("day");
    var manager = document.getElementById("management");
   
    for( var i = 0, j = 0; i < days.length; ++i, ++j ) {
        if( j === daysInYear[count] ) { j = 0; ++count; }
        var line = document.createElement("div");
        line.className = "line" + LineCount + " line" + LineCount + "_" + (count + 1) + "_" + (j + 1);
        days[i].appendChild(line);
    }
   
    var line = document.createElement("div");
    line.className = "line";
    manager.appendChild(line);
}

 /*
  * Функция создаёт строку с названием месяцев
  */

function addRowMonthName() {
    var node = document.getElementsByClassName( "month" );
    var manager = document.getElementById("management");
    var monthsName = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];
    for( var i = 0; i < node.length; ++i ) {
        var desc = document.createElement("div");
        desc.className = "desc text-center";
        desc.innerHTML = monthsName[i];
        node[i].insertBefore(desc, node[i].firstChild);
    }
   
    var desc = document.createElement("div");
    desc.className = "desc";
    manager.insertBefore(desc, desc.firstChild);
}

 /*
  * Функция создаёт строку с числами
  */

function addDaysRow() {
    var count = 0, daysInYear = [];
    var date = new Date();
  
    for( var i = 0; i < 12; ++i ) daysInYear[i] = date.daysInMonth(i);
   
    var days = document.getElementsByClassName("day");
    var manager = document.getElementById("management");
   
    for( var i = 0, j = 0; i < days.length; ++i, ++j ) {
        if( j === daysInYear[count] ) { j = 0; ++count; }
        var line = document.createElement("div");
        line.className = "date";
        line.innerHTML = j + 1;
        days[i].appendChild(line);
    }
   
    var line = document.createElement("div");
    line.className = "line";
    manager.appendChild(line);
}

/*
 * Функция создаёт строку с днями недели
 */
function addDaysNameRow() {
    var count = 0, daysInYear = [];
    var date = new Date();
    var daysName = [ "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб" ];
  
    for( var i = 0; i < 12; ++i ) daysInYear[i] = date.daysInMonth(i);
        
    var days = document.getElementsByClassName("day");
    var manager = document.getElementById("management");
   
    for( var i = 0, j = 0; i < days.length; ++i, ++j ) {
        if( j === daysInYear[count] ) { j = 0; ++count; }
        date.setMonth(count);
        date.setDate(j + 1);
        var line = document.createElement("div");
        line.className = "date";
        line.innerHTML = daysName[date.getDay()];
        days[i].appendChild(line);
    }
   
    var line = document.createElement("div");
    line.className = "line";
    manager.appendChild(line);
    delete date;
}

function editRow(day1, day2, month1, month2, row) {
    var selectorRow = "line" + row;
    var selectorFirst = selectorRow + "_" + month1 + "_" + day1;
    var selectorSecond = selectorRow + "_" + month2 + "_" + day2;
    var firstElement = document.getElementsByClassName(selectorFirst);
    var htmlCollection = document.getElementsByClassName(selectorRow);
    var arr = [].slice.call(htmlCollection);
    var deb = arr.indexOf(firstElement[0]);
    console.log(deb);
    console.log(selectorFirst);
    console.log(selectorRow);
    
}