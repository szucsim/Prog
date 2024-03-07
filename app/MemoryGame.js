// Import the Application class
import Application from './Application.js';
import Card from  '../memory-game/Card.js';

// Define a new class that inherits from Application
export default class MemoryGame extends Application {

    /**
     * @type {string[]}
     */
    #availablePieces = [
        "https://svgshare.com/i/141x.svg",
        "https://svgshare.com/i/1404.svg",
        "https://svgshare.com/i/140h.svg",
        "https://svgshare.com/i/140r.svg",
        "https://svgshare.com/i/13zs.svg",
        "https://svgshare.com/i/140i.svg",
        "https://svgshare.com/i/13wy.svg",
        "https://svgshare.com/i/1428.svg"
    ]


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
        
        // doboule the original array
        const urls = [...this.#availablePieces, ...this.#availablePieces];
        let randomIndex;
        let randomElement;
        
        for(let cardElem of cards){
            
            // Generate a random index
            randomIndex = Math.floor(Math.random() * urls.length);

            // Get the random element
            randomElement = urls[randomIndex];

            // Remove the element from the array
            urls.splice(randomIndex, 1);

            const card = new Card(cardElem, randomElement);

            cardElem.addEventListener('click', /** @this {MemoryGame} */ function(){                
                this.#flipCard(card);
            }.bind(this));
        }
    }

    run(){
        super.run();

      
    }

    /**
     * @param {Card} card
     */
    #flipCard(card){
        if(!card.matched){
            card.flip();
        }
    }
}