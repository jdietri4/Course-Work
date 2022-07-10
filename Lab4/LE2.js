/*
 * LE2.js
 * Demonstrate lighting.
*/


//----------------------------------------------------------------------------
// Variable Setup
//----------------------------------------------------------------------------

// This variable will store the WebGL rendering context
var gl;
var canvas;
var vao;
var program;


//Sphere Variables
var va = vec4(0.0, 0.0, -1.0,1);
var vb = vec4(0.0, 0.942809, 0.333333, 1);
var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
var vd = vec4(0.816497, -0.471405, 0.333333,1);
var numTimesToSubdivide = 4;
var index = 0;
var points = [];
var normals = [];

var red =       vec4(1.0, 0.0, 0.0, 1.0);
var green =     vec4(0.0, 1.0, 0.0, 1.0);
var blue =      vec4(0.0, 0.0, 1.0, 1.0);
var lightred =  vec4(1.0, 0.5, 0.5, 1.0);
var lightgreen= vec4(0.5, 1.0, 0.5, 1.0);
var lightblue = vec4(0.5, 0.5, 1.0, 1.0);
var white =     vec4(1.0, 1.0, 1.0, 1.0);
var black =     vec4(0.0, 0.0, 0.0, 1.0);


//Variables for Transformation Matrices
var mv = new mat4();
var p = new mat4();
var mvLoc, projLoc;


//Interaction support variables
var myX, myY, motion = false, animate = true;
var cubeRot = mat4();

//Variables for Lighting
var light;
var material;
var lighting;
var uColor;



//----------------------------------------------------------------------------
// Initialization Event Function
//----------------------------------------------------------------------------
window.onload = function init() {
    // Set up a WebGL Rendering Context in an HTML5 Canvas
    canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext("webgl2"); // basic webGL2 context
    if (!gl) {
        canvas.parentNode.innerHTML("Cannot get WebGL2 Rendering Context");
    }

    //  Configure WebGL
    //  eg. - set a clear color
    //      - turn on depth testing
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    //  Load shaders and initialize attribute buffers
    program = initShaders(gl, "diffuse-vert", "diffuse-frag");
    gl.useProgram(program);

    tetrahedron(va, vb, vc, vd, numTimesToSubdivide);


    //Create a vertex array object to allow us to switch back to local
    //data buffers after using uofrGraphics calls.
    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);


    // Load the data into GPU data buffers and
    // Associate shader attributes with corresponding data buffers
    //***Vertices***
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    program.vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(program.vPosition, 4, gl.FLOAT, gl.FALSE, 0, 0);
    gl.enableVertexAttribArray(program.vPosition);


    //***Normals***
    normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);
    program.vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(program.vNormal, 3, gl.FLOAT, gl.FALSE, 0, 0);
    gl.enableVertexAttribArray(program.vNormal);


    // Get addresses of transformation uniforms
    projLoc = gl.getUniformLocation(program, "p");
    mvLoc = gl.getUniformLocation(program, "mv");

    //Set up viewport
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    //Set up projection matrix
    p = perspective(45.0, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    gl.uniformMatrix4fv(projLoc, gl.FALSE, flatten(p));


    // Get  light uniforms
    light = {};   // initialize this light object
    light.diffuse = gl.getUniformLocation(program, "light.diffuse");
    light.ambient = gl.getUniformLocation(program, "light.ambient");
    light.position = gl.getUniformLocation(program, "light.position");


    // Get material uniforms
    material = {};
    material.diffuse = gl.getUniformLocation(program, "material.diffuse");
    material.ambient = gl.getUniformLocation(program, "material.ambient");

    // Get and set other lighting state
    // Enable Lighting
     lighting = gl.getUniformLocation(program, "lighting");
     gl.uniform1i(lighting, 1);

    //Set color to use when lighting is disabled
    uColor = gl.getUniformLocation(program, "uColor");
    gl.uniform4fv(uColor, white);

    //Set up uofrGraphics
    urgl = new uofrGraphics(gl);
    urgl.connectShader(program, "vPosition", "vNormal", "uColor");

    //Set up some mouse interaction
    canvas.onmousedown = startDrag;
    canvas.onmousemove = moveDrag;
    canvas.onmouseup = endDrag;
    canvas.ondblclick = resetCube;

    requestAnimationFrame(render);
};



//----------------------------------------------------------------------------
// Rendering Event Function
//----------------------------------------------------------------------------
var rx = 0, ry = 0;
function render() {
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
   

    //Set initial view
    //var eye = vec3(0.0, 0.0, 10.0); //Default
	var eye = vec3(10.0, 0.0, 0.0); //Jacob Dietrich
    var at =  vec3(0.0, 0.0, 0.0);
    var up =  vec3(0.0, 1.0, 0.0);

    mv = lookAt(eye, at, up);

    ///////////////////
    //Set up light properties here

    //Defaults:
    //gl.uniform4fv(light.diffuse, vec4(0.8, 0.8, 0.8, 1.0)); //Default ------------------
	gl.uniform4fv(light.diffuse, vec4(0.0, 1.0, 0.0, 1.0));  //Jacob Dietrich
    gl.uniform4fv(light.ambient, vec4(0.2, 0.2, 0.2, 1.0));  //Jacob Dietrich
    //var lpos = vec4(0.0, 0.0, 1.0, 0.0); //Default
	//var lpos = vec4(0.0, 1.0, 0.0, 0.0); //Jacob Dietrich
	//var lpos = vec4(1.0, 0.0, 0.0, 0.0); //Jacob Dietrich
    //gl.uniform4fv(light.position, mult(mv,lpos)); //Jacob Dietrich
	//gl.uniform4fv(light.position, lpos); //Default

    //EXERCISE: put Positional light position settings here
	var lpos = vec4(0.0, 1.0, 0.0, 1.0); //Jacob Dietrich
	gl.uniform4fv(light.position, lpos); 
	//gl.unifrom4fv(light.position, mult(mv,lpos)); //Jacob Dietrich
    
	//EXERCISE: put Directional light position settings here
	//var lpos = vec4(0.0, 0.0, 1.0, 0.0); //Jacob Dietrich
	
    //EXERCISE: put Diffuse and ambient light color settings here


    //set cube materials to white
    gl.uniform4fv(material.diffuse, vec4(0.8, 0.8, 0.8, 1.0)); //Jacob Dietrich
    gl.uniform4fv(material.ambient, vec4(0.4, 0.4, 0.4, 1.0)); //Jacob Dietrich

    var cubeTF = mult(mv, cubeRot);
    gl.uniformMatrix4fv(mvLoc, gl.FALSE, flatten(cubeTF));
    urgl.drawSolidCube(1.0)
   
    //////////
    //EXERCISE: set Up Left Object materials to red cube as instructed in exercise

    mv = mat4();
    mv = lookAt(eye, at, up);
    mv = mult(mv, translate(-2, 2, 0));
	gl.uniform4fv(material.diffuse, vec4(1.0, 0.0, 0.0, 1.0)); //Jacob Dietrich
	//gl.uniform4fv(material.ambient, vec4(0.7, 0.0, 0.0, 1.0)); //Jacob Dietrich
    gl.uniform4fv(material.ambient, vec4(0.0, 0.0, 0.0, 1.0)); //Jacob Dietrich
	// mv = mult(mv, cubeRot);
    gl.uniformMatrix4fv(mvLoc, gl.FALSE, flatten(mv));
    for( var i=0; i<index; i+=3)
        gl.drawArrays(gl.TRIANGLES, i, 3);



    ///////////
    //EXERCISE: set Lower Left Object materials to green as instructed in exercise

    mv = mat4();
    mv = lookAt(eye, at, up);
    mv = mult(mv, translate(2, -2, 0));
	gl.uniform4fv(material.diffuse, vec4(0.0, 1.0, 0.0, 1.0)); //Jacob Dietrich
	gl.uniform4fv(material.ambient, vec4(0.0, 0.7, 0.0, 1.0)); //Jacob Dietrich
	//gl.uniform4fv(material.ambient, vec4(0.0, 0.0, 0.0, 1.0)); //Jacob Dietrich
    //mv = mult(mv, cubeRot);    
    gl.uniformMatrix4fv(mvLoc, gl.FALSE, flatten(mv));
    for( var i=0; i<index; i+=3)
        gl.drawArrays(gl.TRIANGLES, i, 3);

    if (animate == true) {
        requestAnimationFrame(render);
        cubeRot = rotateX(rx);
        cubeRot = mult(cubeRot, rotateY(ry));
        rx += .8;
        ry += 2.;
    }
}


//Mouse motion handlers
function startDrag(e) {
    myX = e.clientX;
    myY = e.clientY;
    motion = true;
    animate = false;
}

function moveDrag(e) {
    if (motion) {
        var dX = e.clientX - myX;
        var dY = (e.clientY) - myY;
        myX = e.clientX;
        myY = e.clientY;
        var s = 1;
        cubeRot = mult(rotateX(dY * s), cubeRot);
        cubeRot = mult(rotateY(dX * s), cubeRot);
        requestAnimationFrame(render);

    }
}

function endDrag(e) {
    motion = false;
}

function resetCube(e) {
    //cubeRot = mat4();
    animate = true;
    requestAnimationFrame(render);
}

function triangle(a, b, c) {

     points.push(a);
     points.push(b);
     points.push(c);

     // normals are vectors

     normals.push(vec4(a[0],a[1], a[2], 0.0));
     normals.push(vec4(b[0],b[1], b[2], 0.0));
     normals.push(vec4(c[0],c[1], c[2], 0.0));

     index += 3;
}


function divideTriangle(a, b, c, count) {
    if (count > 0) {

        var ab = mix( a, b, 0.5);
        var ac = mix( a, c, 0.5);
        var bc = mix( b, c, 0.5);

        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);

        divideTriangle(a, ab, ac, count - 1);
        divideTriangle(ab, b, bc, count - 1);
        divideTriangle(bc, c, ac, count - 1);
        divideTriangle(ab, bc, ac, count - 1);
    }
    else {
        triangle(a, b, c);
    }
}


function tetrahedron(a, b, c, d, n) {
    divideTriangle(a, b, c, n);
    divideTriangle(d, c, b, n);
    divideTriangle(a, d, b, n);
    divideTriangle(a, c, d, n);
}
