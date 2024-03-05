// Import the Application class
import Application from './Application.js';

// Define a new class that inherits from Application
export default class MemoryGame extends Application {

    /**
     * @param {import('./Application.js').ApplicationOptions} options Options
     */
    constructor(options = {}) {
        super(options);
    }

    initialize(){
        super.initialize();

        if(this.htmlTemplateString){
            const domParser = new DOMParser();
            const domElement = domParser.parseFromString(this.htmlTemplateString, 'text/html');
            for (let child of domElement.body.children){
                document.adoptNode(child);
                this.target.appendChild(child);
            }            
        }

        const cards = this.target.querySelectorAll('.memory-game-card');
        for(let cardEleme of cards){
            cardEleme.addEventListener('click', function(){
                cardEleme.classList.toggle('face-down');
                cardEleme.classList.toggle('face-up');
            });
        }
    }

    run(){
        super.run();

      
    }
}