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

        if(options.htmlTemplate){
            this.htmlTemplate = options.htmlTemplate;
        }
    }

    /**
     * Initialize the application's (typically GUI) state
     */
    initialize(){
        console.log('Initialization() function');

        if (this.htmlTemplate) {
            fetch(this.htmlTemplate).then(response => {
                if (response.status !== 200) {
                    throw new Error('Could not load HTML template');
                }

                response.text().then(data => {
                    console.log(data);
                    this.htmlTemplateString = data;

                    if(this.htmlTemplateString){
                        this.target.innerHTML = this.htmlTemplateString;
                    }
                });
            });
        }
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