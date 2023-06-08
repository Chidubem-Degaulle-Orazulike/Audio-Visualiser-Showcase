/*
1. draw the lines without any output
    a.work out where on the screen to plot and scale
    b.draw lines that move up the screen in regular intervals.
        i.create a 2d array of lines and add one to the array every however many frames 
        ii.each frame sclear screen and decrease the y coordinate of each line
        iii.if line reaches the top then remove the array.
2.add in that wave in pattern so it shows the output of the music.

*/

function Ridgeplot() {
	this.name = "Ridgeplot";
    this.output = [];
    this.startX; //starting x position
    this.startY;//starting y position
    this.endY;//ending y position
    this.spectrumWidth; //how wide the plot will be
    this.speed = 0.7

    this.startX = width/5; //where it will be on the canvas plot (x position)
    this.endY = height/5;//where it will be on the canvas plot (y position)
    this.startY = height - this.endY; //plot will be right in the middle of the screen
    this.spectrumWidth = (width/5)*3; //for good plot size.
    
    this.addWave = function(){
        var w = fourier.waveform();
        var output_wave = []; //inner array 
        var smallScale = 3;
        var bigScale = 40;
        //used to loop over the waveform
        for (var i = 0; i < w.length; i++){
            if (i % 20 == 0){
                //this will give us our x coordinates
                var x = map(i, 0, 1024, this.startX, this.startX + this.spectrumWidth);
                //this will give the y coordinates
                if(i< 1024 * 0.25 || i > 1024 * 0.75){
                    var y = map(w[i], -1, 1, -smallScale, smallScale);
                    output_wave.push({x: x, y: this.startY + y}) 
                }
                else{
                    var y = map(w[i], -1, 1, -bigScale, bigScale);
                    output_wave.push({x: x,y: this.startY + y})
                }
            }
        }
        this.output.push(output_wave);
    }

	this.draw = function() {
        stroke(255) //black background colour
        strokeWeight(2) //thickness of the lines
        //if  the frame count modulos 30 it will give us a result of 0 every 30 frames
        if(frameCount % 30 == 0){
            this.addWave() //add a new line to the array (or add a "wave")
        }
        //this loop is used for the animation section of the waves
        for (var i = 0; i < this.output.length; i++){
            var o = this.output[i]; 
            beginShape()
            for (var j = 0; j < o.length; j++){
                o[j].y -= this.speed;
                vertex(o[j].x, o[j].y)
            }
            endShape()
            //loop to remove elements from the array  if they have a smaller y than endY
            if(o[0].y < this.endY){
                this.output.splice(i, 1); //to do this splice is used because it allows us to take elements out of the array (removing 1 element at index i). 
            }
            
        }
        noStroke()
        noFill()
	};
    
}