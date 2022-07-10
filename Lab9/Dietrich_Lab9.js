//Jacob Dietrich
var camera;
var scene;
var renderer;
var geometry;
var material;
var lane;

function init() {
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('gray', 1);
	document.body.appendChild(renderer.domElement);
	createCamera();
	createLights();
	createObjects();
}

function createMaterials() {
	const lane = new THREE.MeshStandardMaterial({
		color: 0xFFEBCD, //blanched almond
		flatShading: true,
	});

	lane.color.convertSRGBToLinear();

	const pins = new THREE.MeshPhongMaterial({
		color: 0xffffff, //White
		flatShading: true,
	});

	pins.color.convertSRGBToLinear();

	const bball = new THREE.MeshPhongMaterial({
		color: 0x483d8b, //Dark Slate Blue
		flatShading: true,
	});

	bball.color.convertSRGBToLinear();

  const lamp = new THREE.MeshPhongMaterial({
    color: 0xC0C0C0,
    flatShading: true,
  });

  lamp.color.convertSRGBToLinear();

  const bulb = new THREE.MeshPhongMaterial({
    emissive: 0x696969,
  })

	return {
		lane,
		pins,
		bball,
    lamp,
    bulb,
	};
}

function createGeometries() {
	const laneGeo = new THREE.PlaneGeometry(30.0, 210.0, 1.0, 1);

	const ballGeo = new THREE.SphereBufferGeometry(3, 12, 8);

  const lampPostGeo = new THREE.CylinderGeometry(1,1,40);

  const lampBulbGeo = new THREE.SphereGeometry(3,30,30,0,180,0,360);

	return {
		laneGeo,
		ballGeo,
    lampPostGeo,
    lampBulbGeo,
	};
}

function createPin() {
	const group = new THREE.Group();
	const level1 = new THREE.Mesh(
		new THREE.CylinderGeometry(4.0, 3.0, 15),
		new THREE.MeshLambertMaterial({ color: 0xffffff })
	);
	level1.position.y = 1;
	group.add(level1);
	const level2 = new THREE.Mesh(
		new THREE.TorusBufferGeometry(2, 1.6, 20, 24),
		new THREE.MeshLambertMaterial({ color: 0xff0000 })
	);
	level2.position.y = -6;
	level2.rotation.x = Math.PI / 2;
	group.add(level2);
	const level3 = new THREE.Mesh(
		new THREE.OctahedronBufferGeometry(4,4),
		new THREE.MeshLambertMaterial({ color: 0xffffff })
	);
	level3.position.y = -9;
	group.add(level3);
	return group;
}

function createObjects() {
	var move = -12.0;

	var i = 1;
	for (i = 0; i < 4; i++) {
		var pin1 = createPin();
		pin1.scale.set(0.5, 0.6, 0.5);
		pin1.position.set(move, 10, -70);
		move += 8;
		scene.add(pin1);
	}

	i = 1;
	for (i = 0; i < 3; i++) {
		var pin2 = createPin();
		pin2.scale.set(0.5, 0.6, 0.5);
		pin2.position.set(move - 28, 10, -50);
		move += 8;
		scene.add(pin2);
	}

	i = 1;
	for (i = 0; i < 2; i++) {
		var pin3 = createPin();
		pin3.scale.set(0.5, 0.6, 0.5);
		pin3.position.set(move - 48, 10, -30);
		move += 8;
		scene.add(pin3);
	}

	var pin4 = createPin();
	pin4.scale.set(0.5, 0.6, 0.5);
	pin4.position.set(move - 60, 10, -10);
	move += 8;
	scene.add(pin4);

	laneAll = new THREE.Group();
	scene.add(laneAll);

	const materials = createMaterials();
	const geometries = createGeometries();

	laneGeo = new THREE.Mesh(geometries.laneGeo, materials.lane);
	laneGeo.rotation.x = Math.PI / 2;

	laneGeo.position.set(0.0, 15.0, 0);

	ballGeo = new THREE.Mesh(geometries.ballGeo, materials.bball);
	ballGeo.position.set(-2.0, 12.0, 100.0);

  {
    const color = 0xffffff;
    const intensity = 2.0;
    const light = new THREE.SpotLight(color, intensity, 1000);
    light.position.set(-10.0, 10.0, 100.0);
    light.target = ballGeo;
    scene.add(light);
  }

  lampPostGeo = new THREE.Mesh(geometries.lampPostGeo, materials.lamp);
  lampPostGeo.position.set(-20.0, 11.0, 0.0);

  lampBulbGeo = new THREE.Mesh(geometries.lampBulbGeo, materials.bulb);
  lampBulbGeo.position.set(-20.0, -10.0, 0.0);

	laneAll.add(laneGeo, ballGeo, lampPostGeo, lampBulbGeo);
}

function createCamera() {
	camera = new THREE.PerspectiveCamera(
		1000,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1;
	camera.position.z = 120;
}

function createLights() {
	{
		const color = 0xFFFFFF;
		const intensity = 2;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(0, -1.0, -10);
		scene.add(light);
	}
	/*{
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(1, -2, -4);
		scene.add(light);
	}*/
  {
    const color = 0xffffff;
    //const color = 0x8A2BE2;
    const intensity = 1.2;
    const light = new THREE.PointLight(color, intensity, 600);
    light.position.set(-20.0,-10.0,0.0);
    scene.add(light);
  }
  {
    const color = 0xffffff;
    const intensity = 0.5;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
  }
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);

	ballGeo.rotation.x -= 1;
}
init();
animate();