// app.js

console.log('app.js starting');

//"Global" config, used in the main js file because browser/client has massive issues with modules
const config = {
    NUMBER_OF_BALLS: 10,
};

//Number of bubble divs to be created
const bubbleCount = config.NUMBER_OF_BALLS;

//Container for the bubbles
let container = document.getElementById('bubble-container');

//Number of bubbles made to be shown in the html webpage
let bNumber = document.getElementById('nbr-of-bubbles');

//This gets the bounds (left, right, top, bottom) of the container that holds the bubbles
let bounds = container.getBoundingClientRect();

//px movement for each bubble, array number matches bubble number
let yPosition = [];
let xPosition = [];

//Arrays where the booleans for horizontal and vertical collisions are pushed
let vArray = [];
let hArray = [];

//Numerical movement values for each bubble
let posArrayX = [];
let posArrayY = [];

//Random numerical values for bubble movement speed
let xSpeed = [];
let ySpeed = [];

//Creating a bubble to the container and adding id and class to said bubble
createBubble = function (i) {
    let bubble = document.createElement('div');   
    bubble.setAttribute('id', 'bubble-'+i);
    bubble.setAttribute('class', 'bubble-item');
    bubble.appendChild(document.createTextNode(i));
    return bubble;
}

//Making as many bubbles as have been defined in the config, adding start position and speed for every bubble
for (i = 1; i <= bubbleCount; i++) {
    contBubble = this.createBubble(i);
    container.appendChild(contBubble); 

    yPosition[i] = 250;
    xPosition[i] = window.innerWidth/2;

    xSpeed[i] = (Math.random() * 1.5) + 0.1;
    ySpeed[i] = (Math.random() * 1.5) + 0.1;

    bNumber.innerHTML = "Number of bubbles: "+i;
}

//Click variable for click event
let click = document.getElementsByClassName("bubble-item")[0];

//Click event for when clicking on a bubble. Clicking shows the bubble number in console log
document.addEventListener('click', function(e){
    let target = e.target;
    text = target.textContent;
    console.log(`Klikatun pallon numero on ${text}`);
})

//Pushing numbers to the arrays
for (i = 0; i <= bubbleCount; i++) {
    let vertical = Math.floor(Math.random() * 2) + 1;
    vArray.push(vertical);

    let horizontal = Math.floor(Math.random() * 2) + 1;
    hArray.push(horizontal);

    posArrayX.push(xPosition);
    posArrayY.push(yPosition);
}

//Movement function along with collision detection
moveDiv = () => {

    for (i = 1; i <= bubbleCount; i++) {
        
            //Selector for bubbles by id and number
            let bSelector = document.getElementById('bubble-'+i);

            //Location of bubble bounds
            let bLocation = bSelector.getBoundingClientRect();

            //Bubble movement based on directions
            if (vArray[i] == 1) {  
                xPosition[i] += xSpeed[i];
            }
            else {      
                xPosition[i] -= xSpeed[i];
            } 
            if (hArray[i] == 1) {          
                yPosition[i] += ySpeed[i];
            }
           else {          
                yPosition[i] -= ySpeed[i];
            }
            
            //Collision detection for bubbles using getBoundingClientRect, direction changes and randomized speed on collision 
            if (bLocation.top >= bounds.top && bLocation.bottom >= bounds.bottom)
            {
                hArray[i] = 2;
                xSpeed[i] = (Math.random() * 1.5) + 0.1;
                ySpeed[i] = (Math.random() * 1.5) + 0.1;
            }
            if (bLocation.left >= bounds.left && bLocation.right >= bounds.right)
            {
                vArray[i] = 2;
                xSpeed[i] = (Math.random() * 1.5) + 0.1;
                ySpeed[i] = (Math.random() * 1.5) + 0.1;
            }
           else if (bLocation.top <= bounds.top && bLocation.bottom <= bounds.bottom)
            {
                hArray[i] = 1;
                xSpeed[i] = (Math.random() * 1.5) + 0.1;
                ySpeed[i] = (Math.random() * 1.5) + 0.1;
            }
            else if (bLocation.left <= bounds.left && bLocation.right <= bounds.right)
            {
                vArray[i] = 1;
                xSpeed[i] = (Math.random() * 1.5) + 0.1;
                ySpeed[i] = (Math.random() * 1.5) + 0.1;
            }
            //After all calculations, the movement is applied to the bubbles
            bSelector.style.left = xPosition[i] + "px";
            bSelector.style.top = yPosition[i] + "px";                
        }
        //Requesting animation frame moveDiv for movement
        requestAnimationFrame(moveDiv);
}
requestAnimationFrame(moveDiv);




      
