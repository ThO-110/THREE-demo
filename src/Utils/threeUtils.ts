import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { LuminosityShader } from "three/examples/jsm/shaders/LuminosityShader";
import { SobelOperatorShader } from "three/examples/jsm/shaders/SobelOperatorShader";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sky } from "three/examples/jsm/objects/Sky";
import {
  CSS2DObject,
  CSS2DRenderer
} from "three/examples/jsm/renderers/CSS2DRenderer";
import { SelectionBox } from "three/examples/jsm/interactive/SelectionBox";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";
import { ColladaExporter } from "three/examples/jsm/exporters/ColladaExporter";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils";
import { unzipSync } from "three/examples/jsm/libs/fflate.module.min";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";

// todo (ssh 2021-6-30) 引自three/examples/jsm/postprocessing/SSAOPass。本想直接import，但会有异常
//  （Attempted import error: 'SSAOPassOUTPUT' is not exported from 'three/examples/jsm/postprocessing/SSAOPass'.），
//  暂不明原因，后面再排查。
enum SSAOPassOUTPUT {
  Default,
  SSAO,
  Blur,
  Beauty,
  Depth,
  Normal
}

export {
  Line2,
  LineGeometry,
  LineMaterial,
  EffectComposer,
  RenderPass,
  ShaderPass,
  OutlinePass,
  LuminosityShader,
  SobelOperatorShader,
  SSAOPass,
  SSAOPassOUTPUT,
  OrbitControls,
  Sky,
  CSS2DObject,
  CSS2DRenderer,
  SelectionBox,
  OBJExporter,
  ColladaExporter,
  BufferGeometryUtils,
  unzipSync,
  ColladaLoader
};
