//This function here will contain all the other necessary requirements for this type of visualizer to work.
function Microphone() {
	this.name = "Microphone";
    //the following will include all the possible variables needed.
    var res = 50;
    var outerCircle;
    var xSquares;

    var innerCircle;

    var intervall;
    var k;

    //slider
    var slider;
   

    //checkboxes
    var micOn;
    var micOutput;

    //sound
    var music;
    var fft;
    var mic;

    var backCol;
    
    
    rectMode(CORNER);
    
    //Here there will be the components of the visualizer 
    outerCircle = color(255, 0, 255); //This will be the outer circle.
    xSquares = color(0, 105, 255, 50);//This will be the squares that appear when adjusting sliders on the outer layer (outsideCircle)
    innerCircle = color(0, 255, 0);//This will be the inner circle where vibrations will occur 
    backCol = color(0); //Background colour
    
    //Slider to mess about with the outer circles looks
    slider = createSlider(20, 1000, 300, 1); //Make the slider.
    slider.style('width', '300px'); //To adjust the style and looks of the slider.
    slider.position(10, height -height*0.1); //To adjust the position of the slider

    //These check boxes will determine whether or not the boxes are ticked or not.
    micOn = createCheckbox('Mic input', false); //create the check box
    micOn.style('color', color(255)); //Style the checkbox
    micOn.changed(micEnabled); //If the status of the check boxes changes to "enabled" then it will will take microphone input and make the visualizer act accordingly
    micOn.position(10, height -height*0.15); //position of the checkbox

    micOutput = createCheckbox('Output mic input', false); //This is to create another checkbox which will deliver the audible output of what has just been said in the microphone.
    micOutput.style('color', color(255));//The colour of the box
    micOutput.changed(micOutEnabled);//If this status changes to ticked and "enabled" then it will deliver the microphone input.
    micOutput.position(10+150, height -height*0.15);//Position of the box

    valuesCalculated();
    
    
    
    //Music
    
    mic = new p5.AudioIn(); //This allows us to get audio input from the laptops microphone
    mic.connect(fourier);
    
    //In this function couple other functions will be recalled to make the audiovisualizer come to life and be displayed in the set canvas.
	this.draw = function() {
		push();
        angleMode(RADIANS);
        
        backCol = 0;
        valuesCalculated();
        //visualize
        spectrumLook();
        waveCreated();
		pop();
        noFill()
        noStroke()
	};
    
    function valuesCalculated() {
        res = slider.value(); //This helps adjusting the width of the bars in the outer circle by using the slider.
        k = height*0.3; //This helps resizing the size of the circle , the smaller the value it is multiplied by the smaller the circle.
        var angleStep = TWO_PI/res; //This helps to create anappropriate distance between the bars in the outer circle.
        var otherAngles = PI - angleStep;
        intervall = 2*k * sin(angleStep/4);//rotates the bars all in line so  they all look uniform.
    }

    function spectrumLook() {
        //make spectrum usable
        var spectrum = fourier.analyze();
        var specInter = floor(spectrum.length/res);
        var reducedSpec = [];

        for(var i = 0; i < res; i++) {
            reducedSpec.push(spectrum[i*specInter]);
        }
    
      //draw the spectrum visualizer
      for(var i = 0; i < res; i++) {
        var scale = map(reducedSpec[i], 0, 255, 0, k*0.5);  

        var angle = map(i, 0, res, 0, TWO_PI);
        var y = k * sin(angle - PI/2);//Helps to translate the bars towards the center of the screen forming a circle of rectangles.
        var x = k * cos(angle - PI/2);//Helps to translate the bars towards the center of the screen forming a circle of rectangles.

        push();
        translate(width/2 + x, height/2 + y);
        rotate(angle);   
        stroke(outerCircle);
        strokeWeight(2);
        fill(xSquares);
        rect(-intervall/2, -scale, intervall, scale); 
        pop();
        backCol += reducedSpec[i];
      }

      backCol /= res;

      backCol = map(backCol, 0, 255, 0, 100);
    }

    function waveCreated() {
      //make waveform usable
      var waveform = fourier.waveform();
      var waveInter = floor(waveform.length/res);
      var reducedWave = [];

      for(var i = 0; i < res; i++) {
        reducedWave.push(waveform[i*waveInter]);
      }
  
      //drawing the inner circle 
      beginShape();
      noFill();
      stroke(innerCircle);
      strokeWeight(8);//Thickness of the line drawing the inner circle.
      translate(width/2, height/2);//Sets the position of the inner circle in the middle because of the width and height both being divided by 2
      for(var i = 0; i < res; i++) {
        var off = map(reducedWave[i], -1, 1, -k/2, k/2);  

        var angle = map(i, 0, res, 0, TWO_PI);
        var y = ((k-k*0.1)+off) * sin(angle);//sets the angle relative to the outer circle (positive coorelation)
        var x = ((k-k*0.1)+off) * cos(angle);//sets the angle relative to the outer circle(negative correlation)

        vertex(x, y);
      }
        endShape(CLOSE);

    }
    //This function will check whether or not the mic box has been checked or not
    function micEnabled() {
      if (this.checked()) { //If the box is checked it will carry out whats in the loop
        mic.start(); //So if checked it will activate the mic

      }
    }
    //This function will check whether or not the micOutput box has been enabled or not
    function micOutEnabled() {
      if (this.checked()) {//If it  is checked then it will carry out whats inside the loop.
        mic.connect(); //so if it is checked it will project the mics input in an audible format
      } else {
        music.disconnect(); //This doesn't seem to work for some strange reason.
      }
    }
    }