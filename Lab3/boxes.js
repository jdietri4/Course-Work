//----------------------------------------------------------------------------
// State Variable Setup 
//----------------------------------------------------------------------------

//Edited by Jacob Dietrich

// This variable will store the WebGL rendering context
var gl;

//Collect shape information into neat package
//wireCube2 added by Jacob Dietrich
var shapes = {
   wireCube: {points:[], colors:[], start:0, size:0, type: 0},
   wireCube2: {points:[], colors:[], start:0, size:0, type: 0},
   solidCube: {points:[], colors:[], start:0, size:0, type: 0},
   axes: {points:[], colors:[], start:0, size:0, type: 0},
};

//Variables for Transformation Matrices
var mv = new mat4();
var p  = new mat4();
var mvLoc, projLoc;

//Model state variables
var shoulder = 0, elbow = 0;


//----------------------------------------------------------------------------
// Define Shape Data 
//----------------------------------------------------------------------------

//Some colours
var red = 		   	vec4(1.0, 0.0, 0.0, 1.0);
var green = 	   	vec4(0.0, 1.0, 0.0, 1.0);
var blue = 		   	vec4(0.0, 0.0, 1.0, 1.0);
var lightred =		vec4(1.0, 0.5, 0.5, 1.0);
var lightgreen =	vec4(0.5, 1.0, 0.5, 1.0);
var lightblue =   	vec4(0.5, 0.5, 1.0, 1.0);
var white = 	   	vec4(1.0, 1.0, 1.0, 1.0);


//Generate Axis Data: use LINES to draw. Three axes in red, green and blue
shapes.axes.points = 
[ 
	vec4(  2.0,  0.0,  0.0, 1.0), //x axis, will be green
	vec4( -2.0,  0.0,  0.0, 1.0),
	vec4(  0.0,  2.0,  0.0, 1.0), //y axis, will be red
	vec4(  0.0, -2.0,  0.0, 1.0),
	vec4(  0.0,  0.0,  2.0, 1.0), //z axis, will be blue
	vec4(  0.0,  0.0, -2.0, 1.0)
];

shapes.axes.colors = 
[
	green,green,
	red,  red,
	blue, blue
];


//Define points for a unit cube
var cubeVerts = [
	vec4( 0.5,  0.5,  0.5, 1), //0
	vec4( 0.5,  0.5, -0.5, 1), //1
	vec4( 0.5, -0.5,  0.5, 1), //2
	vec4( 0.5, -0.5, -0.5, 1), //3
	vec4(-0.5,  0.5,  0.5, 1), //4
	vec4(-0.5,  0.5, -0.5, 1), //5
	vec4(-0.5, -0.5,  0.5, 1), //6
	vec4(-0.5, -0.5, -0.5, 1), //7
];

//Added by Jacob Dietrich for the second wireCube
var cubeVerts2 = [
	vec4( 0.5,  0.5,  0.5, 1), //0
	vec4( 0.5,  0.5, -0.5, 1), //1
	vec4( 0.5, -0.5,  0.5, 1), //2
	vec4( 0.5, -0.5, -0.5, 1), //3
	vec4(-0.5,  0.5,  0.5, 1), //4
	vec4(-0.5,  0.5, -0.5, 1), //5
	vec4(-0.5, -0.5,  0.5, 1), //6
	vec4(-0.5, -0.5, -0.5, 1), //7
];

//Look up patterns from cubeVerts for different primitive types
//Wire Cube - draw with LINE_STRIP
var wireCubeLookups = [
	0,4,6,2,0, //front
	1,0,2,3,1, //right
	5,1,3,7,5, //back
	4,5,7,6,4, //right
	4,0,1,5,4, //top
	6,7,3,2,6, //bottom
];

//Added by Jacob Dietrich for the second wireCube
var wireCubeLookups2 = [
    0,4,6,2,0, //front
	1,0,2,3,1, //right
	5,1,3,7,5, //back
	4,5,7,6,4, //right
	4,0,1,5,4, //top
	6,7,3,2,6, //bottom
];

//Solid Cube - draw with TRIANGLES, 2 triangles per face
var solidCubeLookups = [
	0,4,6,   0,6,2, //front
	1,0,2,   1,2,3, //right
	5,1,3,   5,3,7,//back
	4,5,7,   4,7,6,//left
	4,0,1,   4,1,5,//top
	6,7,3,   6,3,2,//bottom
];

//Expand Wire Cube data: this wire cube will be white...
for (var i =0; i < wireCubeLookups.length; i++)
{
   shapes.wireCube.points.push(cubeVerts[wireCubeLookups[i]]);
   shapes.wireCube.colors.push(white);
}

//Added by Jacob Dietrich for the second wireCube
for (var i = 0; i < wireCubeLookups2.length; i++) {
	shapes.wireCube2.points.push(cubeVerts2[wireCubeLookups2[i]]);
	shapes.wireCube2.colors.push(lightred);
}

//Expand Solid Cube data: each face will be a different color so you can see
//    the 3D shape better without lighting.
var colorNum = 0;
var colorList = [lightblue, lightgreen, lightred, blue, red, green];
for (var i = 0; i < solidCubeLookups.length; i++)
{
   shapes.solidCube.points.push(cubeVerts[solidCubeLookups[i]]);
   shapes.solidCube.colors.push(colorList[colorNum]);
   if (i % 6 == 5) colorNum++; //Switch color for every face. 6 vertices/face
}
//load data into points and colors arrays - runs once as page loads.
var points = [];
var colors = [];

//Convenience function:
//  - adds shape data to points and colors arrays
//  - adds primitive type to a shape
function loadShape(myShape, type)
{
   myShape.start = points.length;
   points = points.concat(myShape.points);
   colors = colors.concat(myShape.colors);
   myShape.size = points.length - myShape.start;
   myShape.type = type;
}

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

	// Set up data to draw
	// Mostly done globally in this program...
	loadShape(shapes.wireCube, gl.LINE_STRIP);
	loadShape(shapes.wireCube2, gl.LINE_STRIP); //Added by Jacob Dietrich
	loadShape(shapes.solidCube, gl.TRIANGLES);
	loadShape(shapes.axes, gl.LINES);


	// Load the data into GPU data buffers and
	// Associate shader attributes with corresponding data buffers
	//***Vertices***  ***Colors***
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );


	//Set up projection matrix
	//projectionMatrix = ortho(-5,5,-5,5,-4,10);
	projectionMatrix=perspective(45.0, 1.0, 0.1, 100.0); //9.9 - -99.9
	gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    render();
}

//----------------------------------------------------------------------------
// Rendering Event Function
//----------------------------------------------------------------------------

function render() {

	gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
	
	//Set initial view
	//eye, at, and up variables edited by Jacob Dietrich to show the final product.
	var eye = vec3(-5.0, 5.0, 10.0);
	var at =  vec3(0.0, 0.0, 0.0);
	var up =  vec3(0.0, 5.0, 0.0);

	modelViewMatrix = mat4();
	modelViewMatrix = lookAt(eye,at,up);
	//modelViewMatrix = translate(0,0,-10); 
		
	//translate() function added by Jacob Dietrich
	modelViewMatrix = mult(modelViewMatrix, translate(1,0,0));
    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
	gl.drawArrays(shapes.wireCube.type, shapes.wireCube.start, shapes.wireCube.size);
	
	//Added by Jacob Dietrich
	modelViewMatrix = mat4();
	modelViewMatrix = lookAt (eye,at,up);
	modelViewMatrix = mult(modelViewMatrix, translate(1,1,0));
	modelViewMatrix = mult(modelViewMatrix, rotateY(45));
	gl.uniformMatrix4fv(modelViewMatrixLoc,false,flatten(modelViewMatrix));
	gl.drawArrays(shapes.wireCube2.type, shapes.wireCube2.start, shapes.wireCube2.size);
	
	//Added by Jacob Dietrich
	modelViewMatrix = mat4();
	modelViewMatrix = lookAt(eye,at,up);
	gl.uniformMatrix4fv(modelViewMatrixLoc,false,flatten(modelViewMatrix));
	gl.drawArrays(shapes.axes.type, shapes.axes.start, shapes.axes.size);
	
    requestAnimationFrame(render);
}