
 Date.prototype.daysInMonth = function( month ) {
        return month >= 0 && month < 12 ? 32 - new Date(this.getFullYear(), month, 32).getDate() : null;
};

window.onload = function() {

    /* Создаём DOM-элементы */

    var content = document.getElementById("year");
    for( var i = 0; i < 12; ++i ) {
        var month = document.createElement("div");
        month.className = "month";
        content.appendChild(month);      
    }
   var months = document.getElementsByClassName("month");
   
   for( var i = 0; i < 12; ++i ) {
        for( var j = 0; j < 5; ++j ) {
            var week = document.createElement("div");
            week.className = "week";
            months[i].appendChild(week);
        }    
   }

   var weeks = document.getElementsByClassName("week");
   
   var date = new Date();
   
   var countDays = 0;
   
    for( var i = 0; i < weeks.length; ++i ) {
        var monthIndex = parseInt( i / 5, 10 );
        for( var j = 0; j < 7; ++j ) {
            if( countDays === date.daysInMonth(monthIndex) ) {
                countDays = 0; break;
            }
            var day = document.createElement("div");
            day.className = "day";
            weeks[i].appendChild(day);
            ++countDays;
        }
   }
   
   var days = document.getElementsByClassName("day");
   var manager = document.getElementById("management");
   
   for( var i = 0; i < days.length; ++i ) {
       var line = document.createElement("div");
       line.className = "line";
       days[i].appendChild(line);
   }
   
    var line = document.createElement("div");
    line.className = "line";
    manager.appendChild(line);

};
