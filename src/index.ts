import * as THREE from "three";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Vector3
} from "three";
import { WEBGL } from "three/examples/jsm/WebGL";
import { BufferGeometryUtils } from "./Utils/threeUtils";

const COMMON_MATERIAL = new MeshPhongMaterial({
  color: 0xff32de,
  specular: "hsl(183, 60%, 2%)",
  shadowSide: THREE.DoubleSide
});

const scene = new THREE.Scene();
scene.background = new Color(0xffff);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const changeVertexColor = (geometry: BufferGeometry, color: Color) => {
  const vertexCount = geometry.getAttribute("position").count;
  geometry.setAttribute(
    "color",
    new BufferAttribute(new Float32Array(vertexCount * 3), 3)
  );
  const vertexColorArray = geometry.getAttribute("color");
  console.log("---", vertexColorArray);

  for (let i = 0; i < vertexCount; i += 1) {
    vertexColorArray.setXYZ(i, color.r, color.g, color.b);
  }
};

const createBoxMesh = (position?: Vector3, color?: Color) => {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = COMMON_MATERIAL;
  if (color) {
    boxMaterial.color = color;
  }
  const boxMesh = new Mesh(boxGeometry, boxMaterial);
  if (position) {
    boxMesh.position.setX(position.x);
    boxMesh.position.setY(position.y);
    boxMesh.position.setZ(position.z);
  }
  return boxMesh;
};

const createLine = (geometry, position?: Vector3) => {
  const edge = new EdgesGeometry(geometry);
  const line = new LineSegments(
    edge,
    new LineBasicMaterial({ color: 0xffffff })
  );
  if (position) {
    line.position.setX(position.x);
    line.position.setY(position.y);
    line.position.setZ(position.z);
  }
  return line;
};

const generateGeometryByMesh = (mesh: Mesh, position?: Vector3) => {
  const geometry = mesh.geometry.clone() || new BufferGeometry();
  geometry.translate(position.x, position.y, position.z);
  return geometry;
};

const markAsSelect = (obj3d: Mesh) => {
  const mat = obj3d.material;
  if (!(mat instanceof Array)) {
    obj3d.material = new MeshPhongMaterial({
      color: 0x336afe,
      specular: "hsl(183, 60%, 2%)",
      shadowSide: THREE.DoubleSide
    });
  } else {
    mat.forEach((m) => {
      m = new MeshPhongMaterial({
        color: 0x336afe,
        specular: "hsl(183, 60%, 2%)",
        shadowSide: THREE.DoubleSide
      });
    });
  }
};

const isArray = (obj: any) => {
  return obj instanceof Array;
};

/** --------------------------- function ------------------------------- */

const cube = new THREE.Mesh();

/** generate object 3Ds */
(() => {
  const box1 = createBoxMesh();
  const box2 = createBoxMesh(new Vector3(1, 0, 0), new Color(0xff21df));
  const box3 = createBoxMesh(new Vector3(0, 1, 0));
  const box4 = createBoxMesh(new Vector3(1, 1, 0));
  cube.add(box1, box2, box3, box4);

  const lineGroup = new Group();
  cube.children.forEach((box) => {
    const line = createLine((box as Mesh).geometry, box.position);
    lineGroup.add(line);
  });
  // cube.add(lineGroup);
})();

/** handle Cube */
(() => {
  const childrenGeometry = cube.children
    .filter((box) => box instanceof Mesh)
    .map((box) => generateGeometryByMesh(box as Mesh, box.position));

  const cubeGeometry = BufferGeometryUtils.mergeBufferGeometries(
    childrenGeometry
  );
  cube.geometry = cubeGeometry;
  const cubeLine = createLine(cube.geometry);
  cube.add(cubeLine);

  /** hide all box */
  cube.children.forEach((box) => {
    // if (!isArray((box as Mesh).material)) {
    //   ((box as Mesh).material as Material).colorWrite = false;
    // }
    // box.visible = false;
  });

  // if (!isArray(cube.material)) {
  //   (cube.material as Material).colorWrite = false;
  // }
  // cube.material = COMMON_MATERIAL.clone();
  markAsSelect(cube);

  cube.children.forEach((box) => {
    if (!isArray((box as Mesh).material)) {
      ((box as Mesh).material as Material).color = new Color(0xff432);
    }
  });
  cube.scale.set(2, 2, 2);
})();

const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(50, 50, 50);
scene.add(light);

scene.add(cube);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

if (WEBGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
