import { validateHTMLElementId } from "./utils/validation.js";

/**
 * @typedef {Object} ApplicationOptions
 * @property {string} {target} The application's display target.
 * @property {string} {statusBar} The status bar target id
 */

export default class Application{

    /** 
    * @type {HTMLElement|undefined}
    */
    target;

    /**
     * @type {HTMLElement|undefined}
     */
    statusBar;

    /** 
     * @param {ApplicationOptions} options 
     */
    constructor(options = {}){
        if(this.construtor === Application){
            throw new Error('Cannot instantiate abstract class Application');
        }

        let start = Date.now();
        this.#validate(options);
        let end = Date.now();

        let executionTime = end - start;
        
        start = Date.now();
        this.initialize();
        end = Date.now();

        executionTime += end - start;

        start = Date.now();
        this.run();
        end = Date.now();

        executionTime += end - start;
        // $"{how it works}"
        
        this.statusBar.textContent = `${this.constructor.name}` + ' loaded in: ' + executionTime + 'ms';
    } 

    /**
     * Validates the constructor arguments.
     * @param {ApplicationOptions} options 
     */
    #validate(options){
        this.target = validateHTMLElementId(options.target);
        if(this.target === null) throw new Error('Param: Target must be a valid ID');

        this.statusBar = validateHTMLElementId(options.statusBar);
        if(this.statusBar === null) throw new Error('Param: statusbar must be a valid ID');
    }

    /**
     * Initialize the application's (typically GUI) state
     */
    initialize(){
        console.log('Initialization() function');
    }

    /**
     * 
     */
    run(){
        console.log('run() function');
    }

    /**
     * Clean up target's div elements
     */
    destroy(){
        while(this.target.lastChild){
            this.target.lastChild.remove();
        }
    }
}