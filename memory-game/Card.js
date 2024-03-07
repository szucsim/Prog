export default class Card{
    /**
     * Image url to show when the card is flipped
     * @type {string}
     */
    url;

    /**
     * Determines it the card already found with its pair
     * @type {boolean}
     */
    matched = false;

    /**
     * Id of the card that will equals to the id of the div element
     * @type {HTMLElement}
     */
    cardElem;

    /**
     * 
     * @param {HTMLElement} element 
     * @param {string} url 
     */
    constructor(element, url){
        this.cardElem = element; 
        
        //document.getElementById(id)?.classList.toggle('face-down');

        if(!this.cardElem){
            throw new Error(`Cannot find html element assosiated with this card`);
        }

        this.url = url;

        const imageElem = document.createElement('div');
        imageElem.style.backgroundImage = `url(${url})`
        this.cardElem.appendChild(imageElem);
    }


    /**
     * Toggles the assosiated GUI element to reflect the card flipped state
     */
    flip(){
       this.cardElem?.classList.toggle('face-down');
    }
}