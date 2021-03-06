(function() {
    
    Date.prototype.daysInMonth = function( month ) {
            return month >= 0 && month < 12 ? 32 - new Date(this.getFullYear(), month, 32).getDate() : null;
    };

    var LineCount = 0;

    window.onload = function() {

        var date = new Date();

        /* Создаём DOM-элементы графика (месяцы) */

        var content = document.getElementById("year");
        for( var i = 0; i < 12; ++i ) {
            var month = document.createElement("div");
            month.className = "month";
            content.appendChild(month);
        }
        var months = document.getElementsByClassName("month");

        /* Заполняем месяцы днями */


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

        $.get("json/date.json", function(obj) {
            var line = [], i = 0, proxy, param = [];
            for( proxy in obj ) { line[i] = proxy; ++i; }
            obj.length = i;

            for(var i = 0; i < obj.length; ++i) {
                param[0] = obj[line[i]].start.match(/\d{1,2}/g);
                param[1] = obj[line[i]].end.match(/\d{1,2}/g);
                param[2] = obj[line[i]].desc;

                addRow();
                editRow(parseInt(param[0][0]), parseInt(param[1][0]), parseInt(param[0][1]), parseInt(param[1][1]), i + 1, param[2]);

            }
       });
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
        line.className = "manage" + LineCount + " list-group-item";
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
            desc.className = "desc text-center list-group-item-success";
            desc.innerHTML = monthsName[i];
            node[i].insertBefore(desc, node[i].firstChild);
        }

        var desc = document.createElement("div");
        desc.className = "desc list-group-item list-group-item-success";
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
        line.className = "line text-center list-group-item list-group-item-info";
        line.innerHTML = "Дата:";
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
        line.className = "line text-center list-group-item list-group-item-info";
        line.innerHTML = "Дни недели:";
        manager.appendChild(line);
        delete date;
    }

    /*
     * Функция задаёт класс выделенным ячейкам
     */
    function editRow(day1, day2, month1, month2, row, message) {
        var selectorRow = "line" + row;
        var selectorFirst = selectorRow + "_" + month1 + "_" + day1;
        var selectorPanel = "manage" + row;

        var firstElement = document.getElementsByClassName(selectorFirst);
        var htmlCollection = document.getElementsByClassName(selectorRow);
        var manageRow = document.getElementsByClassName(selectorPanel);

        var arr = [].slice.call(htmlCollection);
        var deb = arr.indexOf(firstElement[0]);
        var days = ( new Date(month2 + '/' +  day2 + "/2015").getTime() - new Date(month1 + '/' +  day1 + "/2015").getTime() ) / (1000 * 60 * 60 *24);

        for(var i = deb; i < (deb + days + 1); ++i) {
            arr[i].className += " selectDays";
        }

        var messDiv = document.createElement("div");
        messDiv.innerHTML = message;
        messDiv.className = "message";
        manageRow[0].appendChild(messDiv);

    }
})();
