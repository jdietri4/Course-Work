//Jacob Dietrich

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

function main() {
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  const fov = 40;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
  camera.position.set(0,10,10);
  camera.up.set(1, 1, 1);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();

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
    light.position.set(1, -30, -20);
    scene.add(light);
  }

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

  objects.forEach(node => {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 1;
    node.add(axes);
  });

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

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {

    if(rotateFrontDir === 0) {
      frontLeg1.rotateZ(0.005);
      frontLeg2.rotateZ(0.005);
      frontDegree += 1;
      if(frontDegree >= 50) {
        rotateFrontDir = 1;
      }
    } else {
      frontLeg1.rotateZ(-0.005);
      frontLeg2.rotateZ(-0.005);
      frontDegree -= 1;
      if(frontDegree <= 0) {
        rotateFrontDir = 0;
      }
    }

    if(rotateBackDir === 1) {
      backLeg1.rotateZ(-0.005);
      backLeg2.rotateZ(-0.005);
      backDegree += 1;
      if(backDegree >= 50) {
        rotateBackDir = 0;
      }
    } else {
      backLeg1.rotateZ(0.005);
      backLeg2.rotateZ(0.005);
      backDegree -= 1;
      if(backDegree <= 0) {
        rotateBackDir = 1;
      }
    }

    if(rotateNeckDir === 0) {
      neck.rotateX(-0.005);
      neckDegree += 1;
      if(neckDegree >= 90) {
        rotateNeckDir = 1;
      }
    } else {
      neck.rotateX(0.005);
      neckDegree -= 1;
      if(neckDegree <= -90) {
        rotateNeckDir = 0;
      }
    }

    if(rotateTailDir === 0) {
      tailJoint.rotateX(-0.005);
      tailDegree += 1;
      if(tailDegree >= 90) {
        rotateTailDir = 1;
      }
    } else {
      tailJoint.rotateX(0.005);
      tailDegree -= 1;
      if(tailDegree <= -90) {
        rotateTailDir = 0;
      }
    }

    if(rotateFrontKneeDir === 0) {
      frontKnee.rotateZ(0.005);
      frontKneeDegree += 1;
      if(frontKneeDegree >= 50) {
        rotateFrontKneeDir = 1;
      }
    } else {
      frontKnee.rotateZ(-0.005);
      frontKneeDegree -= 1;
      if(frontKneeDegree <= 0) {
        rotateFrontKneeDir = 0;
      }
    }

    if(rotateBackKneeDir === 0) {
      backKnee.rotateZ(-0.005);
      backKneeDegree += 1;
      if(backKneeDegree >= 50) {
        rotateBackKneeDir = 1;
      }
    } else {
      backKnee.rotateZ(0.005);
      backKneeDegree -= 1;
      if(backKneeDegree <= 0) {
        rotateBackKneeDir = 0;
      }
    }

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();