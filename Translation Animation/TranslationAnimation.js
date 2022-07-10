"use strict";

var canvas;
var gl;



var points = [
    vec4( -0.25, -0.25,  0.5, 1.0 ),
    vec4( -0.25,  0.25,  0.5, 1.0 ),
    vec4(  0.25,  0.25,  0.5, 1.0 ),
	vec4(  0.25, -0.25,  0.5, 1.0 )	
,
];

var colors = [
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green	
];

var NumVertices  = 4;
var translation;
var Tx = 0.5, Ty = 0, Tz = 0.0;
var left = false;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );


     translation = gl.getUniformLocation(program, 'translation');
    //gl.uniform4f(translation, Tx, Ty, Tz, 0.0);


    render();
}



function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		if ( left == true){
			Tx= Tx -.05;
			if (Tx <-1){
				left = false;
			}
		}
		if(left == false){
			Tx= Tx +.05;
			if (Tx > 1){
				left = true;
			}
		}
	//translation.x=Tx;
	gl.uniform4f(translation, Tx, Ty, Tz, 0.0);	
	//document.write(Tx);
    gl.drawArrays( gl.TRIANGLE_FAN, 0, NumVertices );
	window.requestAnimationFrame(render);
}
