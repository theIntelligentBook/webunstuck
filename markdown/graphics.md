Originally, HTML didn't include graphical elements. Hypertext was simply hyper*text* and images were linked externally.
However, that was a very long time ago now, and there are two kinds of graphic element you should know about:

* Scalable Vector Graphics (SVG), which describe a vector graphic in a document-like manner. 
  Elements within it (e.g. lines and shapes) form part of the document model.

* Canvas, which gives you an area to paint on programmatically. We'll look at this for 2D graphics, but it can also
  be used for 3D graphics with WebGL.

Although you can create both of these directly, there are also many different visualisation and graphics libraries that
can be used on the web. 

One that we will particularly introduce is D3 ("Data Driven Documents").