"use strict";

var selection = 2; 

var canvas;
var gl;

var numPositions  = 36;

var texSize = 64;

var program;
var flag = true;

var positionsArray = [];
var colorsArray = [];
var texCoordsArray = [];

var texture =[];

//Normal
//var texCoord = [
//    vec2(0, 0),
//    vec2(0, 1),
//    vec2(1, 1),
//    vec2(1, 0)
//];

//Tiling
var texCoord = [
    vec2(0, 0),
    vec2(0, 3),
    vec2(3, 3),
    vec2(3, 0)
];

//Clamping
var texCoord = [
    vec2(-1, -1),
    vec2(-1, 2),
    vec2(2, 2),
    vec2(2, -1)
];

var vertices = [
    vec4(-0.5, -0.5,  0.5, 1.0),
    vec4(-0.5,  0.5, 0.5, 1.0),
    vec4(0.5,  0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5,  0.5, -0.5, 1.0),
    vec4(0.5,  0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0)
];

var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0),  // black
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    vec4(0.0, 0.0, 1.0, 1.0),  // blue
    vec4(1.0, 0.0, 1.0, 1.0),  // magenta
    vec4(0.0, 1.0, 1.0, 1.0),  // white
    vec4(0.0, 1.0, 1.0, 1.0)   // cyan
];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var theta = vec3(45.0, 45.0, 45.0);

var thetaLoc;

//Animation state variables
var xrot = 0, yrot = 0, zrot = 0;
var anim = false;
var lastUpdateTime = new Date().getTime();
var degreesPerSecond = 60;

function configureTexture( image1, image2, image3) { //Clamping goes here
    var i=0;
     // Create Texture Name and Bind it as current
    texture[0] = gl.createTexture();
    texture[1] = gl.createTexture();
    texture[2] = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture[0]);
   // Load image into texture object
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image1);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, texture[1]);
   // Load image into texture object
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image2);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, texture[2]);
   // Load image into texture object
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image3);
    gl.generateMipmap(gl.TEXTURE_2D);
    
     //Set Texture Parameters
    // scale linearly when image bigger than texture 
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);

    // scale linearly when image smaller than texture
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    //Clamping
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Get image
    var image1 = document.getElementById("texImage256");
    var image2 = document.getElementById("texImage500");
    var image3 = document.getElementById("texImage512");

    gl.uniform1i(gl.getUniformLocation(program, "uTexMap"), 0);

}

function quad(a, b, c, d) {
     positionsArray.push(vertices[a]);
     colorsArray.push(vertexColors[a]);
     texCoordsArray.push(texCoord[0]);

     positionsArray.push(vertices[b]);
     colorsArray.push(vertexColors[a]);
     texCoordsArray.push(texCoord[1]);

     positionsArray.push(vertices[c]);
     colorsArray.push(vertexColors[a]);
     texCoordsArray.push(texCoord[2]);

     positionsArray.push(vertices[a]);
     colorsArray.push(vertexColors[a]);
     texCoordsArray.push(texCoord[0]);

     positionsArray.push(vertices[c]);
     colorsArray.push(vertexColors[a]);
     texCoordsArray.push(texCoord[2]);

     positionsArray.push(vertices[d]);
     colorsArray.push(vertexColors[a]);
     texCoordsArray.push(texCoord[3]);
}

function colorCube()
{
    quad(1, 0, 3, 2);
    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(6, 5, 1, 2);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
}

window.onload = function init() {

    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    colorCube();

    // Load the data into GPU data buffers and
    // Associate shader attributes with corresponding data buffers
    //***Colors** */
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    //***Vertices***
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positionsArray), gl.STATIC_DRAW);
    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    //***Texture Coordinates***
    var tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW);
    var texCoordLoc = gl.getAttribLocation(program, "aTexCoord");
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texCoordLoc);

    //
    // Initialize a texture
    //
    var image1 = document.getElementById("texImage");
    var image2 = document.getElementById("texImage2");
    var image3 = document.getElementById("texImage3");

    configureTexture(image1, image2, image3);

    thetaLoc = gl.getUniformLocation(program, "uTheta");

    requestAnimationFrame(animate);

}

//----------------------------------------------------------------------------
// Rendering Event Function
//----------------------------------------------------------------------------

function render()
{
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    gl.uniform3fv(thetaLoc, theta);
    gl.drawArrays(gl.TRIANGLES, 0, numPositions);

    
}

//----------------------------------------------------------------------------
// Animation Function
//----------------------------------------------------------------------------
function animate()
{
    var currentTime = new Date().getTime();
    var elapsed_sec = (currentTime - lastUpdateTime)/1000;
    lastUpdateTime = currentTime;
    if(anim)
    {
        var baseRot = degreesPerSecond*elapsed_sec;
        xrot += baseRot;
        yrot += baseRot;
        zrot += baseRot;
    }
    theta[0] = xrot;
    theta[1] = xrot;    
    theta[2] = xrot;
    render();
    requestAnimationFrame(animate);
}

//----------------------------------------------------------------------------
// Simpler Key Handling than Lab 3 Robot Arm
// Cannot recognize difference between shifted and unshifted keys
//----------------------------------------------------------------------------
document.onkeydown = function handleKeyDown(event) {
   //Get unshifted key character
   var c = event.keyCode;
   var key = String.fromCharCode(c);

  //Place key down detection code here
    if (key == "A")
    {
        anim = !anim;
    }

    //Z key switches between three images
    if (key == "Z")
    {
        if (selection >= 2) {
          selection = 0;
        }
        else {
          selection++;
        }
        gl.bindTexture(gl.TEXTURE_2D, texture[selection]);
        //console.log("x:", selection);
    }
}

