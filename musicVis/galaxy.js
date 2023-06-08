// construction function to draw the galaxy
function Galaxy(){
    // name of the visualisation 
    this.name = "Galaxy";
    

    
    // drawing the visualisation to the screen 
    this.draw = function() {
        //setting the angle mode of p5 to radians for this specific visualisation , pushing the drawing matrix and popping it to allow the current drawing style settings to remain and pop to restore it to the original state.
        angleMode(RADIANS);
		push();
        translate(width/2, height/2);// allows the visualisation to be centered from the middle of the screen 
        rotate(angle);// the angle by which the displayed visualisation rotates by which is an increasing factor of 30. this is set in the sketch.js
        vis.selectedVisual.galaxy1();
        pop();
    }
    
    this.galaxy1 = function(){// function that will display the visualisation when called 
        

        var spectrum = fourier.analyze();// This provides analysis of the array of coordinate_posvalues of the song across the frequency spectrum
        var Treble = fourier.getEnergy("treble");//returns the amount of energy/ volume at a specific frequency correspongind to the string in the parameters
        var Medium = fourier.getEnergy("mid");//returns the amount of energy/ volume at a specific frequency correspongind to the string in the parameters
        
        var spectrum2 = fourier2.analyze();// This provides analysis of the array of coordinate_posvalues of the song across the frequency spectrum but with specific changes to the smoothing and bins.
        var Medium2 = fourier2.getEnergy("mid");//returns the amount of energy/ volume at a specific frequency correspongind to the string in the parameters
        var Bass2 = fourier2.getEnergy("bass");//returns the amount of energy/ volume at a specific frequency correspongind to the string in the parameters
        
        //console.log(Bass2)
        

        
        stroke(Bass2, Medium2 - 50, 255 - Bass2);// the color of the visualisation changes depending on the energy values of the corresponding frequencies 
        
        strokeWeight(6);// size of the points of the vertex
        beginShape(POINTS);// beginShape records the the vertices of the shape with the parameter specifying what shape should be drawn 
        
        for (var i = 0; i < spectrum.length/2; i++){// setting the for loop to run for atleast half the values of the coordinate_posarray 
            var angle = map(i, 0, spectrum.length/2, 0, -720);//mapping the local variable angle between -720 and 0  degrees giving an clockwise rotation 
            
            var coordinate_pos= map(spectrum[i], 0, 255, 0 + (i *1.1), 200);// mapping the variable coordinate_posto a constant incrementing value of i multiplied by a factor up to 200 so as the music plays the dimensions of the visualisation increases
            
            var x = (spectrum[i] * sin(angle));//calculation of drawing a circle using the formula x coord r cos theta and r sin theta only reversed for an anticlockwise effect but this time using the spectrum values as is a rotation straight line allowing this set of vertex to take on more complex shapes.
            var y = (coordinate_pos* cos(angle));//calculation of drawing a circle using the formula x coord r cos theta and r sin theta only reversed for an anticlockwise effect
            
            vertex(x, y);// drawing the points at the allocated coordinates 
            
        }
        
        for (var i = 0; i < spectrum.length/2; i++){
            var angle = map(i, 0, spectrum.length/2, 90, -720);//mapping the local variable angle between -720 and 90  degrees giving the second set of vertexes a clockwise spin and increase in turn speed 
            
            var coordinate_pos= map(spectrum[i], 0, 255, 0 + (i *1.1), 200);// mapping the variable coordinate_posto a constant incrementing value of i multiplied by a factor up to 200 so as the music plays the dimensions of the visualisation increases
            
            var x = (coordinate_pos* sin(angle));//calculation of drawing a circle using the formula x coord r cos theta and r sin theta only reversed for an anticlockwise effect
            var y = (coordinate_pos* cos(angle));//calculation of drawing a circle using the formula x coord r cos theta and r sin theta only reversed for an anticlockwise effect
            // with the angle and the vertex coordinates acting in a paradox to one another this creates the illusion of a rapidly condensing and expanding galaxy
            vertex(x, y);// drawing the points at the allocated coordinates
            
        }
        endShape();// stops the recording of the shape
        
    }
        
        

}