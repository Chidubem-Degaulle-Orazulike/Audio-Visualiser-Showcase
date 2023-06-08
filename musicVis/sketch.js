//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

var sliderRate;

var camWork;





function preload() {
	//sound = loadSound('assets/stomper_reggae_bit.mp3');
    sound = loadSound('assets/Noidea.mp3');
    sound_2 = loadSound('assets/Cantsay.mp3');
    sound_3 = loadSound('assets/LaMordidita.mp3');
    slider = createSlider(0,1,0.5,0.01) //Volume of music slider.
    slider.position(1325,390)
    
    
    sliderRate = createSlider(0,3,1,0.01)
    sliderRate.position(1325,300) //Music speed slider.
    angle = 0
    radius = 0
    imagew = loadImage('Galaxy-Eyes.jpg')
}

function setup() {
	 createCanvas(windowWidth, windowHeight);
    
     //angleMode(DEGREES)
	 background(0);
    
     //imageMode(CENTER)
	 controls = new ControlsAndInput();

    
     
    
     Mic = new p5.AudioIn();
     Mic.start()
    
	 //instantiate the fft object
	 fourier = new p5.FFT();
     fourier2 = new p5.FFT(0,256);

	 //create a new visualisation container and add visualisations
	 vis = new Visualisations();
	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
     vis.add(new Ridgeplot());
     vis.add(new Interbody());
     vis.add(new Microphone());
     vis.add(new Galaxy());
     vis.add(new Illusion());

    
}

function draw() {
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
    fill('orange');
    textSize(15);
    text('Select by pressing down arrow and then Enter to confirm choice',1090,60);
    textSize(20);
    text('Music speed slider', 1325, 290);
    text('Music volume slider', 1325, 380);
    text('Interact with outer circle by sliding',10,720);
    noFill();
    sound.setVolume(slider.value());
    sound.rate(sliderRate.value());
    sound_2.setVolume(slider.value());
    sound_2.rate(sliderRate.value());
    sound_3.setVolume(slider.value());
    sound_3.rate(sliderRate.value());
    angle += 30;
}

function mouseClicked() {
	controls.mousePressed();

}

function keyPressed() {
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (vis.selectedVisual.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
}
