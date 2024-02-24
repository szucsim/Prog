import { validateHTMLElementId } from "./utils/validation.js";

/**
 * @typedef {Object} ApplicationOptions
 * @property {string} {target} The application's display target.
 * @property {string} {statusBar} The status bar target id
 */

class Application{

    /** 
    * @type {HTMLElement|undefined}
    */
    target;

    /**
     * @type {HTMLElement|undefined}
     */
    statusBar;

    /**
     * 
     * @param {ApplicationOptions} options 
     */
    constructor(options = {}){
        this.#validate(options);
    }

    /**
     * Validates the constructor arguments.
     * @param {ApplicationOptions} options 
     */
    #validate(options){
        this.target = validateHTMLElementId(options.target);
        if(this.target === null) new Error('Param: Target must be a valid ID');

        this.statusBar = validateHTMLElementId(options.statusBar);
        if(this.statusBar === null) throw Error('Param: statusbar must be a valid ID');
    }

    run(){
        //export inherit PrimeGenerator class from application (default export)
    }
}

export default Application;