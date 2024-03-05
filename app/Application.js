import { validateHTMLElementId } from "./utils/validation.js";

/**
 * @typedef {Object} ApplicationOptions
 * @property {string} {target} The application's display target.
 * @property {string} {statusBar} The status bar target id
 * @property {string} {htmlTemplate} */

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
     * @type {string|undefined}
     */
    htmlTemplateString;

    /**
     * @type {string|undefined}
     */
    htmlTemplate;

    /** 
     * @param {ApplicationOptions} options 
     */
    constructor(options = {}){
        if(this.constructor === Application){
            throw new Error('Cannot instantiate abstract class Application');
        }

        let start = Date.now();
        this.#validateAsync(options).then(function(){
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
        }.bind(this));        
    } 

    /**
     * Validates the constructor arguments.
     * @param {ApplicationOptions} options 
     */
    async #validateAsync(options){
        this.target = validateHTMLElementId(options.target);
        if(this.target === null) throw new Error('Param: Target must be a valid ID');

        this.statusBar = validateHTMLElementId(options.statusBar);
        if(this.statusBar === null) throw new Error('Param: statusbar must be a valid ID');

        if(options.htmlTemplate){        
            const response = await fetch(options.htmlTemplate);
            if (response.status !== 200) {
                throw new Error('Could not load HTML template');
            }
            const data = await response.text();
            this.htmlTemplateString = data;
        }
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