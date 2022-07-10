//Jacob Dietrich Lab 1 9/5/2020

var canvas;
var gl;

var numVertices  = 75;


var pointsArray = [
        vec4( 3.5  , 6.5 ,  0.5, 1.0 ), //0 Triangle Strip
        vec4( 3.5  , 3.24,  0.5, 1.0 ), //1
        vec4( 3.5  , 6.5 ,  0.5, 1.0 ), //2
		vec4( 3.5  , 3.24,  0.5, 1.0 ), //3
		
        vec4( 2  , 4,  0.5, 1.0 ), //4  Triangle Fan
        vec4( 1  , 5,  0.5, 1.0 ), //5
        vec4( 2  , 6,  0.5, 1.0 ), //6
        vec4( 3  , 5,  0.5, 1.0 ), //7
        vec4( 2.5, 3,  0.5, 1.0 ), //8
		vec4( 1.5, 3,  0.5, 1.0 ), //9
        vec4( 1  , 5,  0.5, 1.0 ), //10

        vec4( 1  , 8,  0.5, 1.0 ), //11  TriangleS
        vec4( 2  , 8,  0.5, 1.0 ), //12
        vec4( 1  , 7,  0.5, 1.0 ), //13
        vec4( 2  , 7,  0.5, 1.0 ), //14
        vec4( 3  , 8,  0.5, 1.0 ), //15
		vec4( 3  , 7,  0.5, 1.0 ), //16		

        vec4( 1  ,  9,  0.5, 1.0 ), //17 Points
        vec4( 1.5,8.5,  0.5, 1.0 ), //18
		vec4( 2  ,  9,  0.5, 1.0 ), //19	

        vec4( 2  ,8.5,  0.5, 1.0 ), //20 Lines
        vec4( 3  ,  9,  0.5, 1.0 ), //21
		vec4( 4.5,5.5,  0.5, 1.0 ), //22	
		vec4( 4.5,  5,  0.5, 1.0 ), //23
		vec4(4.25,5.5,  0.5, 1.0 ), //24
		vec4(4.75,5.5,  0.5, 1.0 ), //25
		vec4(5.25,5.25, 0.5, 1.0 ), //26
		vec4(5.25,  5,  0.5, 1.0 ), //27
		vec4(5.15,5.25, 0.5, 1.0 ), //28
		vec4( 5.4,5.25, 0.5, 1.0 ), //29
		vec4(3.5, 3.24, 0.5, 1.0 ), //30
		vec4(6.0, 3.24, 0.5, 1.0 ), //31
		
		vec4( 5.35,  4.75,  0.5, 1.0 ), //32 Back Tire
		vec4( 5.65,  4.75,  0.5, 1.0 ), //33
		vec4( 5.65,  4.75,  0.5, 1.0 ), //34
		vec4( 5.85,  4.5 ,  0.5, 1.0 ),  //35
		vec4( 5.85,  4.5 , 0.5 , 1.0 ),  //36
		vec4( 6.00,  4.25, 0.5 , 1.0 ),  //37
		vec4( 6.00,  4.25, 0.5 , 1.0 ),  //38
		vec4( 6.00,  3.75, 0.5 , 1.0 ),  //39
		vec4( 6.00,  3.75, 0.5 , 1.0 ),  //40
		vec4( 5.85,  3.5 , 0.5 , 1.0 ),  //41
		vec4( 5.85,  3.5 , 0.5 , 1.0 ),  //42
		vec4( 5.65,  3.25, 0.5 , 1.0 ),  //43
		vec4( 5.65,  3.25, 0.5 , 1.0 ),  //44
		vec4( 5.35,  3.25, 0.5 , 1.0 ),  //45
		vec4( 5.35,  3.25, 0.5 , 1.0 ),  //46
		vec4( 5.15,  3.5 , 0.5 , 1.0 ),  //47
		vec4( 5.15,  3.5 , 0.5 , 1.0 ),  //48
		vec4( 5   ,  3.75, 0.5 , 1.0 ),  //49
		vec4( 5   ,  3.75, 0.5 , 1.0 ),  //50
		vec4( 5   ,  4.25, 0.5 , 1.0 ),  //51
		vec4( 5   ,  4.25, 0.5 , 1.0 ),  //52
		vec4( 5.15,  4.5 , 0.5 , 1.0 ),  //53
		vec4( 5.15,  4.5 , 0.5 , 1.0 ),  //54
		vec4( 5.35,  4.75, 0.5 , 1.0 ),  //55
		vec4( 5.35,  4.75, 0.5 , 1.0 ),  //56

        vec4( 4.35,  4.75,  0.5, 1.0 ), //57 Line Strip/Front Tire
		vec4( 4.65,  4.75,  0.5, 1.0 ), //58	
		vec4( 4.85,  4.5,  0.5, 1.0 ),  //59	
		vec4( 5.00,  4.25, 0.5, 1.0 ),  //60
		vec4( 5.00,  3.75, 0.5, 1.0 ),  //61
		vec4( 4.85,  3.5 , 0.5, 1.0 ),  //62
		vec4( 4.65,  3.25, 0.5, 1.0 ),  //63
		vec4( 4.35,  3.25, 0.5, 1.0 ),  //64
		vec4( 4.15,  3.5 , 0.5, 1.0 ),  //65
		vec4( 4   ,  3.75, 0.5, 1.0 ),  //66
		vec4( 4   ,  4.25, 0.5, 1.0 ),  //67
		vec4( 4.15,  4.5 , 0.5, 1.0 ),  //68
		vec4( 4.35,  4.75, 0.5, 1.0 ),  //69

		vec4( 4.5,  5,  0.5, 1.0 ), //70 Line Loop
        vec4( 5.5  ,  4,  0.5, 1.0 ), //71
		vec4( 4.5,  4,  0.5, 1.0 ), //72	
		vec4( 4.5,  5,  0.5, 1.0 ), //73
		vec4( 5.5  ,  4,  0.5, 1.0 ), //74	
		vec4( 5.25,  5,  0.5, 1.0 ) //75
    ];

var colorsArray = [
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
		vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
		vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
		vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
		
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
        vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow		
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
        vec4( 0.0, 1.0, 0.0, 1.0 ),  // green 
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
        vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue		

        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
        vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta		
        vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan
        vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan		
        vec4( 0.0, 1.0, 1.0, 1.0 ),  // cyan

		vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
		vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
		vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue	
		
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
        vec4( 1.0, 0.0, 0.0, 1.0 ),  // red	
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),	 // black
		vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
		vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
		vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black		
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black	
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black		
        vec4( 0.0, 0.0, 0.0, 1.0 ),  // black	
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
		vec4( 0.0, 0.0, 0.0, 1.0 ),  // black

		vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
		vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
		vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
		vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
		vec4( 1.0, 0.0, 0.0, 1.0 ),	 // red
		vec4( 1.0, 0.0, 0.0, 1.0 )	 // red
    ];

var near = -1;
var far = 1;
var radius = 1.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var left = 0;
var right = 6;
var ytop = 10;
var bottom = 0;


var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;

const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);


window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
 
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

// buttons to change viewing parameters

    document.getElementById("Button1").onclick = function(){left  -= 1; right += 1;};
    document.getElementById("Button2").onclick = function(){left  += 1; right -= 1;};
    document.getElementById("Button3").onclick = function(){bottom  -= 1; top += 1;};
    document.getElementById("Button4").onclick = function(){bottom  += 1; top -= 1;};
    document.getElementById("Button5").onclick = function(){left  -= 1; right += 1; bottom  -= 1; top += 1;};
    document.getElementById("Button6").onclick = function(){left  += 1; right -= 1; bottom  += 1; top -= 1;;};
       
    render();
}


var render = function() {
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            
        eye = vec3(0, 0, 1);

        modelViewMatrix = lookAt(eye, at , up); 
        projectionMatrix = ortho(left, right, bottom, ytop, near, far);
        
        gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
        gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );
            
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
        gl.drawArrays( gl.TRIANGLE_FAN, 4, 7 );	
        gl.drawArrays( gl.TRIANGLES, 11, 6 );
        gl.drawArrays( gl.POINTS, 17, 3 );					
        gl.drawArrays( gl.LINES, 20, 37 ); 
        gl.drawArrays( gl.LINE_STRIP, 57, 13 ); 		
        gl.drawArrays( gl.LINE_LOOP, 70, 6 );
		
		requestAnimFrame(render);
    }