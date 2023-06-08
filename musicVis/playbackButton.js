//displays and handles clicks on the playback button.
function PlaybackButton() {
	
	this.x = 20;
	this.y = 20;
	this.width = 20;
	this.height = 20;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.playing = false;

	this.draw = function() {
		if (this.playing) {
			rect(this.x, this.y, this.width/2 - 2, this.height);
			rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
		} else {
			triangle(this.x, this.y,
                     this.x + this.width, this.y + this.height/2,
                     this.x, this.y+this.height);
		}
	};
    
    sel = createSelect();
    this.sel = sel.position(1320,70);
    this.d = dist(mouseX,mouseY,1320,70);

   
    
    sel.option("Don Toliver No idea");
    sel.option("Travis Cant Say");
    sel.option("Ricky La Mordidita");


	//checks for clicks on the button, starts or pauses playback.
	//@returns true if clicked false otherwise.
	this.hitCheck = function() {
        if(sel.value() =="Don Toliver No idea" ){

        sound_2.pause()
        sound_3.pause()
		if (mouseX > this.x
            && mouseX < this.x + this.width
            && mouseY > this.y
            && mouseY < this.y + this.height) {
			if (sound.isPlaying()) {
    			sound.pause();
  			} else {
    			sound.loop();
                
  			}
  			this.playing = !this.playing;
  			return true;
		}
        }
        
        
        if (sel.value() == "Travis Cant Say"){
            sound.pause()
            sound_3.pause()
            if (mouseX > this.x
            && mouseX < this.x + this.width
            && mouseY > this.y
            && mouseY < this.y + this.height) {
			if (sound_2.isPlaying()) {
    			sound_2.pause();
  			} else {
    			sound_2.loop();
                
  			}
           
        }
            this.playing = !this.playing;
  			return true;
            
        }
            
        if(sel.value() =="Ricky La Mordidita" ){
            sound.pause()
            sound_2.pause()
		if (mouseX > this.x
            && mouseX < this.x + this.width
            && mouseY > this.y
            && mouseY < this.y + this.height) {
			if (sound_3.isPlaying()) {
    			sound_3.pause();
  			} else {
    			sound_3.loop();
                
  			}
		}
            this.playing = !this.playing;
  		    return true;
        }
        
        
        return false;

    }

}
