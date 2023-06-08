// construction function to draw the interbody
function Interbody() {
    // name of the visualisation 
	this.name = "Interbody";
    var stars = []; // empty array keeps tabs on the stars 
    var spectrum = fourier.analyze();// This provides analysis of the array of coordinate_posvalues of the song across the frequency spectrum
    var Treble = fourier.getEnergy("treble");//returns the amount of energy/ volume at a specific frequency correspongind to the string in the parameters
       
    var Medium = fourier.getEnergy("mid");//returns the amount of energy/ volume at a specific frequency correspongind to the string in the parameters
        
    var spectrum2 = fourier2.analyze();// This provides analysis of the array of coordinate_posvalues of the song across the frequency spectrum but with specific changes to the smoothing and bins.
        
    var Medium2 = fourier2.getEnergy("mid");//returns the amount of energy/ volume at a specific frequency correspongind to the string in the parameters
        
    var Bass2 = fourier2.getEnergy("bass");//returns the amount of energy/ volume at a specific frequency correspongind to the string in the parameters
 
	this.draw = function() {
        var spectrum = fourier.analyze();// This provides analysis of the array of amplitude values of the song across the frequency spectrum
        //console.log(spectrum)
        angleMode(DEGREES);//setting the angle mode to degrees for the circlular waveform 
        
        //pushing the drawing matrix and popping it to allow the current drawing style settings to remain and pop to restore it to the original state.
		push();
        image(imagew,0,0,width,height);//setting the image to fill the whole screen 
        translate(width/2, height/2);// making sure the visualisation is in the center of the screen
        vis.selectedVisual.interbody1();// calling the function that displays the circular wave form
        var p = new Particle();//creating a new particle in every frame of the visualiser
        stars.push(p);//pushing each new particle to the array.
        
        
        for (var j = stars.length -1 ; j >= 0; j--){//loop iterates through all the stars 
            if (!stars[j].edges()){// check to see if the stars are in the boundaries of the screen 
                stars[j].update(spectrum[0] > 230)//stars condition
                stars[j].show()// displays the stars 
            }else{
                stars.splice(j,1)//removes stars that are out of the screen 
            }
        }
        pop();
        noFill();
        noStroke();
	};

    
    this.interbody1 = function(){
         
        imageMode(CENTER);
        var wavelink = fourier.waveform();//returns an array of amplitude values between - 1.0 and +1.0 corresponding to a snapshot of amplitudes of the song in a single buffer
        
        
        noFill();//preventing other function fill affecting this
        stroke(255);
        strokeWeight(4);
        for (var a = -1; a<= 1; a+=2){// for loop runs twice in a negative  run and postive run to draw the two half circle to make a full circle 
            beginShape()// beginShape records the the vertices of the shape
            for (var i = 0; i < 180; i+= 0.5){//iterates for number of degrees in a half circle 
                var tracker = floor(map(i, 0, 180, 0, wavelink.length - 1));//mapping the for loop variable to the wave index flooring it to be an integer 
                var r = map(wavelink[tracker], -1, 1, 150, 550);// mapping the radius of the circle to the waveform with 150 - 550 being the min and maximum radius of the circle
                var x = r * sin(i) * a// drawing the coordinates to draw the circle
                var y = r * cos(i) // drawing the coordinates to draw the circle 
                vertex(x,y)// plotting the points
            }
            endShape();// endShape stops recording the the vertices of the shape
        }
        
    }
    
    class Particle{
            constructor(){//constructor name Particle
                this.position = p5.Vector.random2D().mult(250);//vector position of the stars
                this.velocity = createVector(0,0);//allows the particle to move with an initial value of zero when created 
                this.acceleration = this.position.copy().mult(random(0.0002, 0.00002));//acceleration vector has the same value of velocity initially thne increments randomly relative to the position
                
                this.widt = random(6,15);// width of each particle 
                
                this.color = [random(255), random(255), random(255)];// assigning random colors to each particle 
            }
            update(cond){// updates the stars position
                this.velocity.add(this.acceleration)// acceleration added to the velocity
                this.position.add(this.velocity)// velocity added to the position
                if (cond){//if the value in the amplitude array exceeds the condition the stars will seem to move in response to the music through the incrementation of these vectors
                    this.position.add(this.velocity)
                    this.position.add(this.velocity)
                    this.position.add(this.velocity)
                }
            }
            edges(){// bounds for the stars so only stars within the screen are displayed 
                if(this.position.x < - width / 2 || this.position.x > width / 2 || this.position.y < -height / 2 || this.position.y > height / 2 ){
                    return true
                } else{
                    return false 
                }
            }
        
            show(){//displaying the stars 
                noStroke();
                fill(this.color);
                ellipse(this.position.x, this.position.y, this.widt);
            }
        }
    
        
    
       
}