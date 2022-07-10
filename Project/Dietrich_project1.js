//Jacob Dietrich
var camera;
var scene;
var renderer;
var geometry;
var material;

var frontLeg1;
var frontLeg2;
var backLeg1;
var backLeg2;
var rotateNeckDir = 0;
var rotateTailDir = 0;
var rotateFrontKneeDir = 0;
var rotateBackKneeDir = 0;
var neckDegree = 0;
var tailDegree = 0;
var frontDegree = 0;
var backDegree = 0;
var frontKneeDegree = 0;
var backKneeDegree = 0;
var rotateFrontDir = 0;
var rotateBackDir = 1;

function init() {
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('lightblue', 1);
	document.body.appendChild(renderer.domElement);
	createCamera();
	createLights();
	createObjects();
}

function main() {
	init();
}

function createMaterials() {
	const ground = new THREE.MeshStandardMaterial({
		color: 0x008000, //green
		flatShading: true,
	});

	ground.color.convertSRGBToLinear();

	const sun = new THREE.MeshPhongMaterial({
		emissive: 0xFFFF00,
	});

  sun.color.convertSRGBToLinear();

	const barn = new THREE.MeshStandardMaterial({
		color: 0xFF0000,
		flatShading: true,
	});

  barn.color.convertSRGBToLinear();
	
  const barnRoof = new THREE.MeshStandardMaterial({
		color: 0xC0C0C0,
		flatShading: true,
	});

  barnRoof.color.convertSRGBToLinear();

  const silo = new THREE.MeshStandardMaterial({
    color: 0x8B0000,
    flatShading: true,
  });

  silo.color.convertSRGBToLinear();

  const siloTop = new THREE.MeshStandardMaterial({
    color: 0xC0C0C0,
    flatShading: true,
  });

  siloTop.color.convertSRGBToLinear();

  const barnDoor = new THREE.LineBasicMaterial({
    color:0x000000,
  });

  const tire = new THREE.MeshStandardMaterial({
    color: 0x000000,
    flatShading: true,
  });

	return {
		ground,
		sun,
		barn,
		barnRoof,
    silo,
    siloTop,
    barnDoor,
    tire,
	};
}

function createGeometries() {
	const groundGeo = new THREE.PlaneBufferGeometry(1000.0, 1000.0, 1.0, 1);

	const sunGeo = new THREE.SphereBufferGeometry(3, 100, 100);

	const barnGeo = new THREE.BoxBufferGeometry(11.2,10,15);
	const barnRoofGeo = new THREE.CylinderBufferGeometry(6,6,14.9,10,8,false,0);

  const siloGeo = new THREE.CylinderBufferGeometry(4,4,20,50,50,false,0);
	const siloTopGeo = new THREE.ConeBufferGeometry(4.5,5,16);

  const barnDoorGeo = new THREE.WireframeGeometry(new THREE.BoxBufferGeometry(8, 8, 8));

  const tireGeo = new THREE.TorusBufferGeometry(0.8,0.3,3,24);

  return {
		groundGeo,
		sunGeo,
		barnGeo,
		barnRoofGeo,
    siloGeo,
    siloTopGeo,
    barnDoorGeo,
    tireGeo,
	};
}

function createObjects() {
	mainGroup = new THREE.Group();
	scene.add(mainGroup);

	const materials = createMaterials();
	const geometries = createGeometries();
	const gridHelper = new THREE.GridHelper(1000, 100);
	gridHelper.rotation.x = Math.PI / 2;
	groundGeo = new THREE.Mesh(geometries.groundGeo, materials.ground);
	groundGeo.add(gridHelper);
	groundGeo.rotation.x = Math.PI / 2;

	groundGeo.position.set(0.0, 15.0, 0);
	mainGroup.add(groundGeo);

	sunGeo = new THREE.Mesh(geometries.sunGeo, materials.sun);
	sunGeo.position.set(-20.0, -40.0, 0.0);
	mainGroup.add(sunGeo);

	barnGeo = new THREE.Mesh(geometries.barnGeo, materials.barn);
	barnGeo.position.set(20,10,50);
	mainGroup.add(barnGeo);

	barnRoofGeo = new THREE.Mesh(geometries.barnRoofGeo, materials.barnRoof);
	barnRoofGeo.position.set(20,7,50);
	barnRoofGeo.rotation.x = Math.PI / 2;
	mainGroup.add(barnRoofGeo);

  siloGeo = new THREE.Mesh(geometries.siloGeo, materials.silo);
  siloGeo.position.set(10,5,40);
  mainGroup.add(siloGeo);

  siloTopGeo = new THREE.Mesh(geometries.siloTopGeo, materials.siloTop);
  siloTopGeo.position.set(10,-7.5,40);
  siloTopGeo.rotation.x = Math.PI / 1;
  mainGroup.add(siloTopGeo);

  barnDoorGeo = new THREE.LineSegments(geometries.barnDoorGeo, materials.barnDoor);
  barnDoorGeo.position.set(20,11,53.5);
  mainGroup.add(barnDoorGeo);

  tireGeo = new THREE.Mesh(geometries.tireGeo, materials.tire);
  tireGeo.position.set(20,3,58);
  mainGroup.add(tireGeo);

	const scene1 = new THREE.Scene();
	const objects = [];

	const radius = 0.7;
	const widthSegments = 60;
	const heightSegments = 60;
	const sphereHeadGeometry = new THREE.SphereBufferGeometry(
		radius,
		widthSegments,
		heightSegments
	);

	const cylinderBodyGeometry = new THREE.CylinderBufferGeometry(2,2,1,50,50,false,1);
	const cylinderTailGeometry = new THREE.CylinderBufferGeometry(1,1,1,50,50,false,1);
  const cylinderUpperLegGeometry = new THREE.CylinderBufferGeometry(0.3,0.3,2,50,50,false,1);
  const cylinderLowerLegGeometry = new THREE.CylinderBufferGeometry(0.3,0.3,1.5,50,50,false,1);
  const cat = new THREE.Object3D();
  scene.add(cat);
  objects.push(cat);

  const catMaterial = new THREE.MeshStandardMaterial({
    color: 0xffebcd,
    flatShading: true,
  });
  catMaterial.color.convertSRGBToLinear();

  const catMesh = new THREE.Mesh(cylinderBodyGeometry, catMaterial);
  catMesh.scale.set(0.5, 4, 0.5);
  cat.position.set(13,14.4,60);
	cat.rotation.x = Math.PI / 1;
	cat.rotation.z = Math.PI / 2;
	cat.scale.set(0.3,0.3,1);
	cat.add(catMesh);
  objects.push(catMesh);

  const neck = new THREE.Object3D();
  neck.position.x = 0.5;
  neck.position.y = 1.8;
  neck.position.z = 0;
  neck.rotation.x = 0; // -1 to 1
  neck.rotation.y = 0;
  neck.rotation.z = 0;
  cat.add(neck);
  objects.push(neck);

  const headMaterial = new THREE.MeshStandardMaterial({ //earthMaterial
    color: 0xffebcd,
    flatShading: true,
  });
  headMaterial.color.convertSRGBToLinear();

  const headMesh = new THREE.Mesh(sphereHeadGeometry, headMaterial);
  headMesh.position.y = 0.7;
  neck.add(headMesh);
  objects.push(headMesh);

  const tailJoint = new THREE.Object3D();
  tailJoint.position.x = 0.7;
  tailJoint.position.y = -2;
  tailJoint.position.z = 0;
  tailJoint.rotation.x = 0;
  tailJoint.rotation.y = 0;
  tailJoint.rotation.z = 1;
  cat.add(tailJoint);
  objects.push(tailJoint);

  const tailMaterial = new THREE.MeshStandardMaterial({
    color: 0xffebcd,
    flatShading: true,
  });
  tailMaterial.color.convertSRGBToLinear();

  const tailMesh = new THREE.Mesh(cylinderTailGeometry, tailMaterial);
  tailMesh.scale.set(0.2, 3, 0.2);
  tailMesh.position.y = -1.3;
  tailJoint.add(tailMesh);
  objects.push(tailMesh);

  const FlegJoint = new THREE.Object3D();
  const BlegJoint = new THREE.Object3D();
  const frontKnee = new THREE.Object3D();
  const backKnee = new THREE.Object3D();

  FlegJoint.position.x = -0.8;
  FlegJoint.position.y = 2;
  FlegJoint.position.z = 0;

  BlegJoint.position.x = -0.8;
  BlegJoint.position.y = -1.5;
  BlegJoint.position.z = 0;
  
  FlegJoint.add(frontKnee);
  objects.push(frontKnee);
  
  frontKnee.position.x = -1.4;
  frontKnee.position.y = 1;
  frontKnee.position.z = 0;

  BlegJoint.add(backKnee);
  objects.push(backKnee);

  backKnee.position.x = -1.4;
  backKnee.position.y = -2;
  backKnee.position.z = 0;

  cat.add(frontKnee);
  objects.push(frontKnee);
  cat.add(backKnee);
  objects.push(backKnee);
  cat.add(FlegJoint);
  cat.add(BlegJoint); 
  objects.push(FlegJoint);
  objects.push(BlegJoint);
  createLegs();

	
  function createLeg() {
    const group = new THREE.Group();
    scene.add(group);

    const upperLeg = new THREE.Mesh(
      cylinderUpperLegGeometry,
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
  
    upperLeg.position.y = 0.8;
    upperLeg.position.x = -2;
    upperLeg.position.z = -3.6;
    upperLeg.rotation.z = 2;
    group.add(upperLeg);
    const lowerLeg = new THREE.Mesh(
      cylinderLowerLegGeometry,
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    group.add(lowerLeg);
    lowerLeg.position.y = 1;
    lowerLeg.position.x = -3.4;
    lowerLeg.position.z = -3.6;
    lowerLeg.rotation.z = 1;

    return group;
  }

  function createLegs() {
    var move = 3;
    var i = 1;
    for (i = 0; i < 2; i++) {
      if(i === 0) {
        frontLeg1 = createLeg();
        frontLeg1.scale.set(0.5,1,1);
        frontLeg1.position.set(0,0.5,move);
        move += 1;
        FlegJoint.add(frontLeg1);
        scene.add(frontLeg1);
        cat.add(frontLeg1);
      }
      if(i === 1) {
        frontLeg2 = createLeg();
        frontLeg2.scale.set(0.5,1,1);
        frontLeg2.position.set(0,0.5,move);
        move += 1;
        FlegJoint.add(frontLeg2);
        scene.add(frontLeg2);
        cat.add(frontLeg2);
      }
    }
    i = 1;
    move = 3;
    for (i = 0; i < 2; i++) {
      if(i === 0) {
        backLeg1 = createLeg();
        backLeg1.scale.set(0.5,1,1);
        backLeg1.position.set(0,-3,move);
        move += 1;
        BlegJoint.add(backLeg1);
        scene.add(backLeg1);
        cat.add(backLeg1);
      }
      if(i === 1) {
        backLeg2 = createLeg();
        backLeg2.scale.set(0.5,1,1);
        backLeg2.position.set(0,-3,move);
        move += 1;
        BlegJoint.add(backLeg2);
        scene.add(backLeg2);
        cat.add(backLeg2);
      }
    }
  }
}

function createCamera() {
	camera = new THREE.PerspectiveCamera(
		1000,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.x = 10;
	camera.position.y = 10;
	camera.position.z = 90;
}

function createLights() {
	{
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		scene.add(light);
	}
	{
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(1, -2, -4);
		scene.add(light);
	}
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
main();
animate();
