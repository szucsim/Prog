import Application from "./Application.js";
import Day from "./calendar/Day.js"

export default class Calendar extends Application{
    /**
     * @type {Day[]}
     */
    days = [];

    initialize(){
        

        const now = new Date();
        this.#setupDays(now.getFullYear(), now.getMonth() + 1);

        const calendarContainer = document.createElement('div');
        calendarContainer.className = 'calendar';

        for(let day of this.days){
            const dayCell = document.createElement('div');
            dayCell.textContent = day.label;
            dayCell.className = 'calendarDay';
            calendarContainer.appendChild(dayCell)
        }

        this.target.appendChild(calendarContainer);
    }

    /**
     * 
     * @param {number} yearNum 
     * @param {number} monthNum 
     */
    #setupDays(yearNum, monthNum){
        let currDay = new Date(`${yearNum}-${monthNum}-1`);
        const currMonth = currDay.getMonth();
        while(currMonth === currDay.getMonth()){
            this.#setupDay(currDay);
            currDay.setDate(currDay.getDate()+1);
        }
    }

    /**
     * 
     * @param {Date} date 
     */
    #setupDay(date){
        this.days.push(new Day(date.getDate().toString()));
    }
}