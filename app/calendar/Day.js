import Reminder from "./Reminder.js";

export default class Day{
    /**
     * @type {Reminder[]}
     */
    reminders = [];

    /**
     * @type {string}
     */
    label;

    /**
     * 
     * @param {string} label 
     */
    constructor(label){
        this.label = label;
    }

    /**
     * 
     * @param {Reminder} reminder 
     */
    addReminder(reminder){
        this.reminders.push(reminder);
    }

    /**
     * 
     * @param {Reminder} reminder 
     */
    removeReminder(reminder){
        
    }

    updateReminder(reminder){

    }
}