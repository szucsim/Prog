/**
 * @typedef {Object} ReminderArgs Reminder contructor args
 * @property {string} title
 * @property {string} [description]
 * @property {number} timestamp
 * @property {number} id
*/

export default class Reminder {
    /**
     * @type {string}
     */
    title;

    /**
     * @type {string}
     */
    description;

    /**
     * @type {number}
     */
    timestamp;

    /**
     * @type {number}
     */
    id;

    /**
     * 
     * @param {ReminderArgs} options 
     */
    constructor(options){
        this.id = options.id;
        this.title = options.title;
        this.description = options.description;
        this.timestamp = options.timestamp;
    }
}