READ ME FILE 
In this file we will be briefly exploring what we have implemented so far , our plans in completing the project and how we will deal with problem that may arise.

Section 1 : What we have implemented so far.
The features that have implemented so far come in 4 different formats which are:

-Galaxy:We have creeated a spiral of poits which mimic a condensing galaxy.Each point here , reacts to the music by being animated.

-Illusion:Here we have an illusion where we tried to portrait what would be going on through a listeners mind whilst listening to the beats.

-Polygon:We incorporated a shape which reacts to the music as well as the movement of the mouse to generate polygons.

-Ridgeplot:Here the vertexes react to the amplitude of the music and as a result it displays its different wave forms.

We have done this by using the following:

The push() function saves the current drawing style settings and transformations, while pop() restores these settings. Note that these functions are always used together. They allow you to change the style and transformation settings and later return to what you had. When a new state is started with push(), it builds on the current style and transform information. The push() and pop() functions can be embedded to provide more control.

FFT (Fast Fourier Transform) is an analysis algorithm that isolates individual audio frequencies within a waveform.

Once instantiated, a p5.FFT object can return an array based on two types of analyses:
• FFT.waveform() computes amplitude values along the time domain. The array indices correspond to samples across a brief moment in time. Each value represents amplitude of the waveform at that sample of time.
• FFT.analyze() computes amplitude values along the frequency domain. The array indices correspond to frequencies (i.e. pitches), from the lowest to the highest that humans can hear. Each value represents amplitude at that slice of the frequency spectrum. Use with getEnergy() to measure amplitude at specific frequencies, or within a range of frequencies.


Section 2:Our plans for the future.
Ideally we would like to include a dragon like creature which takes form as the music is playing.Additionally we have also contemplated the idea of having a fixed image of a dragon with the shape distorting when the music plays so that it looks animated. 

Section 3 : Problems that may arise.
Having understood the difficulties we understand that our ideas may not be viable due to their sheer complexity.Furthermore we also comprehend that the implemntation may result in a different expected outcome.We may not have access to resources to draw a proper visualization and as a result not coming out as crisp as we may like it to come.
