// construction function to draw the illusion
function Illusion() {
    // name of the visualisation 
	this.name = "Illusion";
    
    
    // drawing the visualisation to the screen 
	this.draw = function() {
        // pushing the drawing matrix and popping it to allow the current drawing style settings to remain and pop to restore it to the original state.
        angleMode(RADIANS);
		push();
        translate(width/2, height/2);// allows the visualisation to be centered from the middle of the screen 
        noStroke();
        rotate(angle);// the angle by which the displayed visualisation rotates by which is an increasing factor of 30. this is set in the sketch.js
        vis.selectedVisual.illusion1();
        pop();
	};
    
    this.illusion1 = function(){// function that will display the visualisation when called 
        var spectrum = fourier.analyze();// This provides analysis of the array of amplitude values of the song across the frequency spectrum
        var Treble = fourier.getEnergy("treble");//returns the amount of energy/ volume at a specific frequency correspongind to the string in the parameters
        var Medium = fourier.getEnergy("mid");//returns the amount of energy/ volume at a specific frequency correspongind to the string in the parameters
        var Bass = fourier.getEnergy("bass");//returns the amount of energy/ volume at a specific frequency correspongind to the string in the parameters
        var wave = fourier.waveform();//returns an array of amplitude values between - 1.0 and +1.0 corresponding to a snapshot of amplitudes of the song in a single buffer
        var LineNo = 50;// variable to store the number of lines 
        var radius = 150;// the radius of the circle in the middle 
        var x = map(Bass, 0,255,-150,150);// mapping the bass energy of the song to certain values 
        var y = map(Medium, 0, 255, -250, 250);// mapping the mid energy of the song to certain values 
        var z = map(Treble,0,255,-300,300);// mapping the treble energy of the song to certain values 
        
        fill(51,255,255);// fill of the ellipse
        ellipse(0,0,radius);// centered ellipse 
        
        for (i = 0; i < LineNo; i++){// for the number of lines to be drawn 
            rotate(TWO_PI/LineNo);// the visualisation rotates by 12 degrees
            //each line is drawn in correspondence to different energies with different fill representing them
            stroke(255,255,0);
            strokeWeight(5);
            line(x,radius/2,0,radius);
            stroke(255,153,51);
            strokeWeight(7);
            line(y,radius/2,0,radius);
            stroke(255,51,153);
            strokeWeight(3);
            line(z,radius/2,0,radius);
            
        } 
    }
}