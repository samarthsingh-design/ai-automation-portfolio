/**
 * AI Automation Portfolio
 * 3D Particle Cloud Hero with GPU Fluid Simulation & GPGPU Position Physics
 */

(function () {
  'use strict';

  // 1. Embedded 64x64 soft grey sphere matcap data URI
  const MATCAP_DATA_URI = "data:image/png;base64,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";

  const canvas = document.getElementById('bg');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const isMobile = window.innerWidth <= 760;

  // 512x512 = 262,144 points desktop, 256x256 = 65,536 mobile
  const simDim = isMobile ? 256 : 512;
  const particleCount = simDim * simDim;

  // Fluid simulation parameters
  const FLUID_SIM_RES = 256;
  const FLUID_DYE_RES = 512;
  const VELOCITY_DISSIPATION = 0.985;
  const DENSITY_DISSIPATION = 0.975;
  const PRESSURE_DISSIPATION = 0.96;
  const PRESSURE_ITERATIONS = 8;
  const CURL_STRENGTH = 18.0;
  const FIXED_DT = 1.0 / 60.0;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(dpr);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1.0);
  renderer.autoClear = false;

  // Camera setup: FOV 30, base position (-1.17, 0, 6) looking at origin
  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
  const baseCamPos = new THREE.Vector3(-1.17, 0, 6);
  camera.position.copy(baseCamPos);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Particle group: balanced in viewport, rotation (-28.4°, 390°, 4.92°), scale (5, 5, 6)
  const particleGroup = new THREE.Group();
  particleGroup.position.set(0.2, 0.14, -1);
  const baseRotX = -28.4 * Math.PI / 180;
  const baseRotY = 390.0 * Math.PI / 180;
  const baseRotZ = 4.92 * Math.PI / 180;
  particleGroup.rotation.set(baseRotX, baseRotY, baseRotZ);
  particleGroup.scale.set(5, 5, 6);
  scene.add(particleGroup);

  // Fullscreen quad utility for GPGPU passes
  const quadGeo = new THREE.PlaneGeometry(2, 2);
  const quadCam = new THREE.Camera();
  const quadScene = new THREE.Scene();
  const quadMesh = new THREE.Mesh(quadGeo, null);
  quadScene.add(quadMesh);

  function renderQuad(material, target) {
    quadMesh.material = material;
    renderer.setRenderTarget(target);
    renderer.render(quadScene, quadCam);
    renderer.setRenderTarget(null);
  }

  // Ping-pong render target helper
  function createDoubleRT(w, h, options) {
    let readRT = new THREE.WebGLRenderTarget(w, h, options);
    let writeRT = new THREE.WebGLRenderTarget(w, h, options);
    return {
      get read() { return readRT; },
      get write() { return writeRT; },
      swap() {
        const tmp = readRT;
        readRT = writeRT;
        writeRT = tmp;
      }
    };
  }

  // ==========================================
  // 2. GPU FLUID SIMULATION PIPELINE
  // ==========================================
  const halfFloatType = THREE.HalfFloatType;

  const simFmtOptions = {
    type: halfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    stencilBuffer: false
  };

  const fluidVelocity = createDoubleRT(FLUID_SIM_RES, FLUID_SIM_RES, simFmtOptions);
  const fluidDensity = createDoubleRT(FLUID_DYE_RES, FLUID_DYE_RES, simFmtOptions);
  const fluidPressure = createDoubleRT(FLUID_SIM_RES, FLUID_SIM_RES, {
    ...simFmtOptions,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter
  });
  const curlTarget = new THREE.WebGLRenderTarget(FLUID_SIM_RES, FLUID_SIM_RES, {
    ...simFmtOptions,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter
  });
  const divergenceTarget = new THREE.WebGLRenderTarget(FLUID_SIM_RES, FLUID_SIM_RES, {
    ...simFmtOptions,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter
  });

  const baseQuadVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `;

  // Fluid Splat Shader
  const splatMaterial = new THREE.ShaderMaterial({
    vertexShader: baseQuadVertexShader,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uTarget;
      uniform vec2 uPoint;
      uniform vec2 uLastPoint;
      uniform vec4 uColor;
      uniform float uRadius;
      uniform float uAspect;
      varying vec2 vUv;

      float distToSegment(vec2 p, vec2 a, vec2 b, float aspect) {
        vec2 pa = (p - a) * vec2(aspect, 1.0);
        vec2 ba = (b - a) * vec2(aspect, 1.0);
        float baLen2 = dot(ba, ba);
        if (baLen2 < 0.000001) return length(pa);
        float h = clamp(dot(pa, ba) / baLen2, 0.0, 1.0);
        return length(pa - ba * h);
      }

      void main() {
        vec4 base = texture2D(uTarget, vUv);
        float d = distToSegment(vUv, uLastPoint, uPoint, uAspect);
        float splat = exp(- (d * d) / max(0.000001, uRadius * uRadius));
        gl_FragColor = base + uColor * splat;
      }
    `,
    uniforms: {
      uTarget: { value: null },
      uPoint: { value: new THREE.Vector2() },
      uLastPoint: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Vector4() },
      uRadius: { value: 0.05 },
      uAspect: { value: 1.0 }
    },
    depthTest: false,
    depthWrite: false
  });

  // Fluid Curl Shader
  const curlMaterial = new THREE.ShaderMaterial({
    vertexShader: baseQuadVertexShader,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uVelocity;
      uniform vec2 uTexelSize;
      varying vec2 vUv;

      void main() {
        float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).y;
        float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).y;
        float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).x;
        float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).x;
        float curl = 0.5 * ((R - L) - (T - B));
        gl_FragColor = vec4(curl, 0.0, 0.0, 1.0);
      }
    `,
    uniforms: {
      uVelocity: { value: null },
      uTexelSize: { value: new THREE.Vector2(1.0 / FLUID_SIM_RES, 1.0 / FLUID_SIM_RES) }
    },
    depthTest: false,
    depthWrite: false
  });

  // Vorticity Confinement Shader
  const vorticityMaterial = new THREE.ShaderMaterial({
    vertexShader: baseQuadVertexShader,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform vec2 uTexelSize;
      uniform float uCurlValue;
      uniform float uDt;
      varying vec2 vUv;

      void main() {
        float L = texture2D(uCurl, vUv - vec2(uTexelSize.x, 0.0)).x;
        float R = texture2D(uCurl, vUv + vec2(uTexelSize.x, 0.0)).x;
        float B = texture2D(uCurl, vUv - vec2(0.0, uTexelSize.y)).x;
        float T = texture2D(uCurl, vUv + vec2(0.0, uTexelSize.y)).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        float len = length(force);
        if (len > 0.0001) {
          force = (force / len) * vec2(1.0, -1.0);
          force *= uCurlValue * C;
        } else {
          force = vec2(0.0);
        }

        vec2 vel = texture2D(uVelocity, vUv).xy;
        vel += force * uDt;
        gl_FragColor = vec4(vel, 0.0, 1.0);
      }
    `,
    uniforms: {
      uVelocity: { value: null },
      uCurl: { value: null },
      uTexelSize: { value: new THREE.Vector2(1.0 / FLUID_SIM_RES, 1.0 / FLUID_SIM_RES) },
      uCurlValue: { value: CURL_STRENGTH },
      uDt: { value: FIXED_DT }
    },
    depthTest: false,
    depthWrite: false
  });

  // Divergence Shader
  const divergenceMaterial = new THREE.ShaderMaterial({
    vertexShader: baseQuadVertexShader,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uVelocity;
      uniform vec2 uTexelSize;
      varying vec2 vUv;

      void main() {
        float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
        float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
        float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
        float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `,
    uniforms: {
      uVelocity: { value: null },
      uTexelSize: { value: new THREE.Vector2(1.0 / FLUID_SIM_RES, 1.0 / FLUID_SIM_RES) }
    },
    depthTest: false,
    depthWrite: false
  });

  // Pressure Solve Shader (Jacobi iteration)
  const pressureMaterial = new THREE.ShaderMaterial({
    vertexShader: baseQuadVertexShader,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      uniform vec2 uTexelSize;
      uniform float uPressureDissipation;
      varying vec2 vUv;

      void main() {
        float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
        float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
        float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
        float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
        float div = texture2D(uDivergence, vUv).x;

        float pressure = (L + R + B + T - div) * 0.25 * uPressureDissipation;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `,
    uniforms: {
      uPressure: { value: null },
      uDivergence: { value: null },
      uTexelSize: { value: new THREE.Vector2(1.0 / FLUID_SIM_RES, 1.0 / FLUID_SIM_RES) },
      uPressureDissipation: { value: PRESSURE_DISSIPATION }
    },
    depthTest: false,
    depthWrite: false
  });

  // Gradient Subtract Shader
  const gradientSubtractMaterial = new THREE.ShaderMaterial({
    vertexShader: baseQuadVertexShader,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      uniform vec2 uTexelSize;
      varying vec2 vUv;

      void main() {
        float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
        float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
        float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
        float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;

        vec2 vel = texture2D(uVelocity, vUv).xy;
        vel -= 0.5 * vec2(R - L, T - B);
        gl_FragColor = vec4(vel, 0.0, 1.0);
      }
    `,
    uniforms: {
      uPressure: { value: null },
      uVelocity: { value: null },
      uTexelSize: { value: new THREE.Vector2(1.0 / FLUID_SIM_RES, 1.0 / FLUID_SIM_RES) }
    },
    depthTest: false,
    depthWrite: false
  });

  // Advect Velocity Shader
  const advectVelocityMaterial = new THREE.ShaderMaterial({
    vertexShader: baseQuadVertexShader,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uVelocity;
      uniform vec2 uTexelSize;
      uniform float uDt;
      uniform float uDissipation;
      varying vec2 vUv;

      void main() {
        vec2 vel = texture2D(uVelocity, vUv).xy;
        vec2 coord = vUv - uDt * vel * uTexelSize;
        vec2 result = texture2D(uVelocity, coord).xy * uDissipation;
        gl_FragColor = vec4(result, 0.0, 1.0);
      }
    `,
    uniforms: {
      uVelocity: { value: null },
      uTexelSize: { value: new THREE.Vector2(1.0 / FLUID_SIM_RES, 1.0 / FLUID_SIM_RES) },
      uDt: { value: FIXED_DT },
      uDissipation: { value: VELOCITY_DISSIPATION }
    },
    depthTest: false,
    depthWrite: false
  });

  // Advect Density Shader
  const advectDensityMaterial = new THREE.ShaderMaterial({
    vertexShader: baseQuadVertexShader,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uVelocity;
      uniform sampler2D uDensity;
      uniform vec2 uTexelSize;
      uniform float uDt;
      uniform float uDissipation;
      varying vec2 vUv;

      void main() {
        vec2 vel = texture2D(uVelocity, vUv).xy;
        vec2 coord = vUv - uDt * vel * uTexelSize;
        vec4 result = texture2D(uDensity, coord) * uDissipation;
        gl_FragColor = result;
      }
    `,
    uniforms: {
      uVelocity: { value: null },
      uDensity: { value: null },
      uTexelSize: { value: new THREE.Vector2(1.0 / FLUID_DYE_RES, 1.0 / FLUID_DYE_RES) },
      uDt: { value: FIXED_DT },
      uDissipation: { value: DENSITY_DISSIPATION }
    },
    depthTest: false,
    depthWrite: false
  });

  // ==========================================
  // 3. GPGPU PARTICLE POSITION SIMULATION
  // ==========================================

  // Origin texture: Initial random positions uniform in [-1, 1]³
  const initialPosData = new Float32Array(particleCount * 4);
  const randomAttrData = new Float32Array(particleCount * 4);
  const simUvData = new Float32Array(particleCount * 2);

  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * 2.0 - 1.0;
    const y = Math.random() * 2.0 - 1.0;
    const z = Math.random() * 2.0 - 1.0;

    initialPosData[i * 4 + 0] = x;
    initialPosData[i * 4 + 1] = y;
    initialPosData[i * 4 + 2] = z;
    initialPosData[i * 4 + 3] = 1.0;

    randomAttrData[i * 4 + 0] = Math.random();
    randomAttrData[i * 4 + 1] = Math.random();
    randomAttrData[i * 4 + 2] = Math.random();
    randomAttrData[i * 4 + 3] = Math.random();

    simUvData[i * 2 + 0] = ((i % simDim) + 0.5) / simDim;
    simUvData[i * 2 + 1] = (Math.floor(i / simDim) + 0.5) / simDim;
  }

  const originTexture = new THREE.DataTexture(
    initialPosData,
    simDim,
    simDim,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  originTexture.minFilter = THREE.NearestFilter;
  originTexture.magFilter = THREE.NearestFilter;
  originTexture.needsUpdate = true;

  const posRTOptions = {
    type: THREE.FloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    depthBuffer: false,
    stencilBuffer: false
  };

  const posRT = createDoubleRT(simDim, simDim, posRTOptions);

  // Copy initial positions into both particle RTs
  const copyInitMaterial = new THREE.ShaderMaterial({
    vertexShader: baseQuadVertexShader,
    fragmentShader: `
      uniform sampler2D uTexture;
      varying vec2 vUv;
      void main() {
        gl_FragColor = texture2D(uTexture, vUv);
      }
    `,
    uniforms: { uTexture: { value: originTexture } },
    depthTest: false,
    depthWrite: false
  });
  renderQuad(copyInitMaterial, posRT.read);
  renderQuad(copyInitMaterial, posRT.write);

  // GPGPU Simulation Shader Material
  const simMaterial = new THREE.ShaderMaterial({
    vertexShader: baseQuadVertexShader,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uCurrentPos;
      uniform sampler2D uOriginPos;
      uniform sampler2D uFluidVelocity;
      uniform sampler2D uFluidDensity;
      uniform vec2 uCursorScreenUV;
      uniform float uAspect;
      uniform float uCursorActive;
      uniform float uCursorSpeed;
      uniform float uTime;
      uniform float uHZ;
      uniform mat4 uModelMatrix;
      uniform mat4 uInverseModelMatrix;
      uniform mat4 uViewProjectionMatrix;
      uniform mat4 uCameraWorldMatrix;
      varying vec2 vUv;

      vec3 rotateByQuat(vec4 q, vec3 v) {
        return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
      }

      // Analytic curl of three sine-sum potentials (Bridson-style), normalized
      vec3 curlNoise(vec3 p) {
        float s1 = sin(p.y * 1.7 + p.z * 1.3);
        float c1 = cos(p.y * 1.7 + p.z * 1.3);
        float s2 = sin(p.z * 1.5 + p.x * 1.9);
        float c2 = cos(p.z * 1.5 + p.x * 1.9);
        float s3 = sin(p.x * 1.4 + p.y * 1.6);
        float c3 = cos(p.x * 1.4 + p.y * 1.6);

        float s4 = sin(p.y * 3.1 - p.z * 2.7);
        float s5 = sin(p.z * 2.9 - p.x * 3.3);
        float s6 = sin(p.x * 3.5 - p.y * 2.8);

        vec3 v;
        v.x = c3 * 1.6 - c1 * 1.3 + s4 * 0.5;
        v.y = c1 * 1.7 - c2 * 1.9 + s5 * 0.5;
        v.z = c2 * 1.5 - c3 * 1.4 + s6 * 0.5;

        float len = length(v);
        return len > 0.0001 ? v / len : vec3(0.0);
      }

      // A smooth, organic sculpted hollow ring/torus-like mass with softer lobes
      float sdfShapeRaw(vec3 p) {
        float rMajor = 0.33;
        float rMinor = 0.13;
        float theta = atan(p.y, p.x);
        rMinor += 0.035 * sin(theta * 2.0 + p.z * 4.0) + 0.02 * cos(theta * 3.0);
        float lenXY = length(p.xy);
        float dRing = length(vec2(lenXY - rMajor, p.z)) - rMinor;
        float wave = (sin(p.x * 7.0) * cos(p.y * 7.0 + p.z * 5.0)) * 0.02;
        return dRing + wave;
      }

      float sdfShape(vec3 p) {
        float len = length(p);
        if (len > 0.8) {
          return len - 0.7;
        }
        vec3 pMod = p;
        // Mirror depth axis: p.z = sqrt(p.z*p.z + 0.0215) - sqrt(0.012)
        pMod.z = sqrt(pMod.z * pMod.z + 0.0215) - sqrt(0.012);
        // Rotate by quaternion (0.5, 0.5, 0.5, 0.5)
        pMod = rotateByQuat(vec4(0.5, 0.5, 0.5, 0.5), pMod);
        return sdfShapeRaw(pMod);
      }

      vec3 sdfNormal(vec3 p) {
        float eps = 0.001;
        vec3 n = vec3(
          sdfShape(p + vec3(eps, 0.0, 0.0)) - sdfShape(p - vec3(eps, 0.0, 0.0)),
          sdfShape(p + vec3(0.0, eps, 0.0)) - sdfShape(p - vec3(0.0, eps, 0.0)),
          sdfShape(p + vec3(0.0, 0.0, eps)) - sdfShape(p - vec3(0.0, 0.0, eps))
        );
        float l = length(n);
        return l > 0.00001 ? n / l : vec3(0.0, 1.0, 0.0);
      }

      void main() {
        vec3 pos = texture2D(uCurrentPos, vUv).xyz;
        vec3 origin = texture2D(uOriginPos, vUv).xyz;

        float distFromCenter = length(pos);
        if (distFromCenter > 2.5) {
          pos = normalize(pos) * 2.5;
        }

        pos += curlNoise(pos * 0.1 + uTime * 0.05) * 1.0 * 0.0002 * uHZ;

        vec3 gradient = sdfNormal(pos);
        float sdf = sdfShape(pos);

        vec3 normPos = length(pos) > 0.0001 ? normalize(pos) : vec3(0.0, 1.0, 0.0);
        pos += cross(normPos, gradient) * 0.0005;

        // Localized cursor star dispersion & fluid interaction
        vec4 worldPos = uModelMatrix * vec4(pos, 1.0);
        vec4 clipPos = uViewProjectionMatrix * worldPos;
        vec2 screenUV = (clipPos.xy / clipPos.w) * 0.5 + 0.5;

        vec3 localScatter = vec3(0.0);
        float starInfluence = 0.0;

        if (screenUV.x >= 0.0 && screenUV.x <= 1.0 && screenUV.y >= 0.0 && screenUV.y <= 1.0) {
          // Direct star dispersion: active when touching stars
          if (uCursorActive > 0.5) {
            vec2 toCursor = screenUV - uCursorScreenUV;
            toCursor.x *= uAspect;
            float dist = length(toCursor);

            // Responsive contact radius: immediately triggers when touching stars
            float contactRadius = 0.18;

            if (dist < contactRadius && dist > 0.0001) {
              starInfluence = smoothstep(contactRadius, 0.005, dist);
              vec2 pushDir = toCursor / dist;

              vec3 worldPush = uCameraWorldMatrix[0].xyz * pushDir.x + uCameraWorldMatrix[1].xyz * pushDir.y;
              vec3 localPush = (uInverseModelMatrix * vec4(worldPush, 0.0)).xyz;

              // Fluid wake momentum from cursor motion
              vec2 vel = texture2D(uFluidVelocity, screenUV).xy;
              vec3 worldFlow = uCameraWorldMatrix[0].xyz * vel.x + uCameraWorldMatrix[1].xyz * vel.y;
              vec3 localFlow = (uInverseModelMatrix * vec4(worldFlow, 0.0)).xyz;

              // 3D scatter: push away radially from cursor + drag along motion + billow along normal
              vec3 scatterDir = normalize(localPush * 1.0 + normPos * 0.45);

              // Vivid movable force: stars move freely and dynamically under cursor
              float pushPower = (0.012 + uCursorSpeed * 0.016) * pow(starInfluence, 1.1);
              localScatter = (scatterDir * pushPower + localFlow * 0.00045 * starInfluence);
            }
          }
        }

        // When touching stars, soften the SDF constraint so stars move freely!
        float sdfResistance = mix(1.0, 0.15, starInfluence);
        pos += -gradient * clamp(sdf * 0.45, -0.035, 0.035) * sdfResistance;

        // Smooth spring bringing stars back into the flow stream
        float springStrength = mix(0.0006, 0.00018, starInfluence);
        pos += (origin - pos) * springStrength * uHZ;

        // Apply dynamic star movement
        pos += localScatter * uHZ;

        gl_FragColor = vec4(pos, 1.0);
      }
    `,
    uniforms: {
      uCurrentPos: { value: null },
      uOriginPos: { value: originTexture },
      uFluidVelocity: { value: null },
      uFluidDensity: { value: null },
      uCursorScreenUV: { value: new THREE.Vector2(0.5, 0.5) },
      uAspect: { value: 1.0 },
      uCursorActive: { value: 0.0 },
      uCursorSpeed: { value: 0.0 },
      uTime: { value: 0.0 },
      uHZ: { value: 1.0 },
      uModelMatrix: { value: new THREE.Matrix4() },
      uInverseModelMatrix: { value: new THREE.Matrix4() },
      uViewProjectionMatrix: { value: new THREE.Matrix4() },
      uCameraWorldMatrix: { value: new THREE.Matrix4() }
    },
    depthTest: false,
    depthWrite: false
  });

  // ==========================================
  // 4. PARTICLE RENDERING
  // ==========================================
  const textureLoader = new THREE.TextureLoader();
  const matcapTexture = textureLoader.load(MATCAP_DATA_URI);
  matcapTexture.generateMipmaps = false;
  matcapTexture.minFilter = THREE.LinearFilter;
  matcapTexture.magFilter = THREE.LinearFilter;

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(particleCount * 3), 3));
  particleGeometry.setAttribute('aSimUv', new THREE.BufferAttribute(simUvData, 2));
  particleGeometry.setAttribute('aRandom', new THREE.BufferAttribute(randomAttrData, 4));

  const particleMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      uniform sampler2D uPosTexture;
      uniform float uDPR;
      uniform float uTime;
      attribute vec4 aRandom;
      attribute vec2 aSimUv;

      varying vec4 vRandom;
      varying float vScale;

      void main() {
        vRandom = aRandom;

        vec3 pos = texture2D(uPosTexture, aSimUv).xyz;
        pos *= mix(1.0, 1.5, pow(aRandom.y, 150.0));

        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vec4 mvPosition = viewMatrix * worldPos;

        float distToCamera = length(mvPosition.xyz);
        float scale = smoothstep(3.0, 15.0, distToCamera) * mix(0.5, 1.0, aRandom.z);
        vScale = scale;

        gl_PointSize = max(1.0, 0.04 * uDPR * 2.0 * scale * (1000.0 / distToCamera));
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform sampler2D uMatcap;
      uniform float uTime;
      varying vec4 vRandom;
      varying float vScale;

      vec3 blendSoftLight(vec3 base, vec3 blend) {
        return vec3(
          (blend.r < 0.5) ? (2.0 * base.r * blend.r + base.r * base.r * (1.0 - 2.0 * blend.r)) : (sqrt(base.r) * (2.0 * blend.r - 1.0) + 2.0 * base.r * (1.0 - blend.r)),
          (blend.g < 0.5) ? (2.0 * base.g * blend.g + base.g * base.g * (1.0 - 2.0 * blend.g)) : (sqrt(base.g) * (2.0 * blend.g - 1.0) + 2.0 * base.g * (1.0 - blend.g)),
          (blend.b < 0.5) ? (2.0 * base.b * blend.b + base.b * base.b * (1.0 - 2.0 * blend.b)) : (sqrt(base.b) * (2.0 * blend.b - 1.0) + 2.0 * base.b * (1.0 - blend.b))
        );
      }

      vec3 blendOverlay(vec3 base, vec3 blend) {
        return vec3(
          (base.r < 0.5) ? (2.0 * base.r * blend.r) : (1.0 - 2.0 * (1.0 - base.r) * (1.0 - blend.r)),
          (base.g < 0.5) ? (2.0 * base.g * blend.g) : (1.0 - 2.0 * (1.0 - base.g) * (1.0 - blend.g)),
          (base.b < 0.5) ? (2.0 * base.b * blend.b) : (1.0 - 2.0 * (1.0 - base.b) * (1.0 - blend.b))
        );
      }

      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        if (length(coord) > 0.5) discard;
        if (vScale < 0.1) discard;

        // Base colour mix(0.0, 0.2, random.x) grey, mixed to lavender (0.6, 0.45, 1.0) by pow(random.z, 100)
        vec3 grey = vec3(mix(0.0, 0.2, vRandom.x));
        vec3 lavender = vec3(0.6, 0.45, 1.0);
        vec3 col = mix(grey, lavender, pow(vRandom.z, 100.0));

        // Sparkle
        float sparkle = 0.5 + (0.4 + sin(uTime * 4.0 + vRandom.y * 20.0)) * pow(vRandom.z, 10.0) * 2.5;
        col *= sparkle;

        // Matcap sampled with rotated sprite UV
        float rotAngle = sin(uTime + vRandom.z * 20.0) * 0.5 + 1.0;
        float cosA = cos(rotAngle);
        float sinA = sin(rotAngle);
        mat2 rot = mat2(cosA, -sinA, sinA, cosA);
        vec2 matcapUv = rot * coord + vec2(0.5);
        matcapUv = clamp(matcapUv, 0.0, 1.0);
        vec3 matcapCol = texture2D(uMatcap, matcapUv).rgb;

        vec3 softLit = blendSoftLight(col, matcapCol);
        col = mix(col, softLit, 0.8);
        vec3 overlaid = blendOverlay(col, matcapCol);
        col = mix(col, overlaid, 0.2);

        gl_FragColor = vec4(col, 1.0);
      }
    `,
    uniforms: {
      uPosTexture: { value: null },
      uMatcap: { value: matcapTexture },
      uDPR: { value: dpr },
      uTime: { value: 0.0 }
    },
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthTest: true,
    depthWrite: false
  });

  const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
  particleGroup.add(particleMesh);

  // ==========================================
  // 5. SMOOTH MOUSE & TOUCH FLUID INTERACTION
  // ==========================================
  function clampMap(val, inMin, inMax, outMin, outMax) {
    const t = Math.max(0.0, Math.min(1.0, (val - inMin) / (inMax - inMin)));
    return outMin + t * (outMax - outMin);
  }

  const pointer = {
    // Raw destination target from pointer events
    targetX: window.innerWidth * 0.5,
    targetY: window.innerHeight * 0.5,
    // Smoothly interpolated coordinates (current frame)
    currentX: window.innerWidth * 0.5,
    currentY: window.innerHeight * 0.5,
    // Previous frame smoothly interpolated coordinates
    prevX: window.innerWidth * 0.5,
    prevY: window.innerHeight * 0.5,
    // Low-pass filtered velocity
    vx: 0,
    vy: 0,
    hasMovedOnce: false
  };

  function updatePointer(x, y) {
    pointer.targetX = x;
    pointer.targetY = y;
    if (!pointer.hasMovedOnce) {
      pointer.currentX = x;
      pointer.currentY = y;
      pointer.prevX = x;
      pointer.prevY = y;
      pointer.hasMovedOnce = true;
    }
  }

  window.addEventListener('pointermove', (e) => {
    updatePointer(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // ==========================================
  // 6. ACTIVE NAVIGATION HIGHLIGHTING
  // ==========================================
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let currentId = 'intro';
    const scrollY = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Smooth scroll click handler for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          if (history.pushState) {
            history.pushState(null, '', targetId);
          }
          setTimeout(updateActiveNav, 150);
        }
      }
    });
  });

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // Initial route / hash scroll check on page load
  function checkInitialRoute() {
    let target = window.location.hash;
    if (!target || target === '#') {
      const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase().replace(/\.html?$/, '');
      if (cleanPath === 'projects' || cleanPath === 'project' || cleanPath === 'about' || cleanPath === 'contact' || cleanPath === 'footer' || cleanPath === 'intro') {
        target = `#${cleanPath === 'contact' ? 'footer' : (cleanPath === 'project' ? 'projects' : cleanPath)}`;
      }
    }
    if (target) {
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          updateActiveNav();
        }
      }, 300);
    }
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', checkInitialRoute);
  } else {
    checkInitialRoute();
  }

  // ==========================================
  // 7. PROJECTS SLIDEABLE CAROUSEL
  // ==========================================
  const projectsTrack = document.getElementById('projects-track');
  const carouselPrev = document.getElementById('carousel-prev');
  const carouselNext = document.getElementById('carousel-next');
  const carouselCurrent = document.getElementById('carousel-current');
  const indicatorPills = document.querySelectorAll('.indicator-pill');
  const projectCards = document.querySelectorAll('.projects-track .project-card');
  const totalSlides = projectCards.length;
  let activeSlideIndex = 0;

  function updateCarouselState(index) {
    activeSlideIndex = (index + totalSlides) % totalSlides;
    if (carouselCurrent) {
      carouselCurrent.textContent = String(activeSlideIndex + 1).padStart(2, '0');
    }
    indicatorPills.forEach((pill, idx) => {
      if (idx === activeSlideIndex) {
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
      } else {
        pill.classList.remove('active');
        pill.setAttribute('aria-selected', 'false');
      }
    });
  }

  function scrollToSlide(index) {
    const targetIdx = (index + totalSlides) % totalSlides;
    if (projectsTrack && projectCards[targetIdx]) {
      const targetCard = projectCards[targetIdx];
      const offsetLeft = targetCard.offsetLeft - projectsTrack.offsetLeft;
      projectsTrack.scrollTo({
        left: offsetLeft,
        behavior: 'smooth'
      });
      updateCarouselState(targetIdx);
    }
  }

  if (carouselPrev && carouselNext && projectsTrack) {
    carouselPrev.addEventListener('click', () => {
      scrollToSlide(activeSlideIndex - 1);
    });

    carouselNext.addEventListener('click', () => {
      scrollToSlide(activeSlideIndex + 1);
    });

    indicatorPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const slideIdx = parseInt(pill.getAttribute('data-slide'), 10);
        if (!isNaN(slideIdx)) {
          scrollToSlide(slideIdx);
        }
      });
    });

    // Keyboard navigation
    projectsTrack.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToSlide(activeSlideIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToSlide(activeSlideIndex + 1);
      }
    });

    // Debounced scroll listener to sync active slide on manual swipe / trackpad scroll
    let scrollTimeout = null;
    projectsTrack.addEventListener('scroll', () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const trackScrollLeft = projectsTrack.scrollLeft;
        let closestIdx = 0;
        let minDiff = Infinity;
        projectCards.forEach((card, idx) => {
          const cardLeft = card.offsetLeft - projectsTrack.offsetLeft;
          const diff = Math.abs(cardLeft - trackScrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });
        updateCarouselState(closestIdx);
      }, 60);
    }, { passive: true });
  }

  // ==========================================
  // 8. DUMMY N8N WORKFLOW CANVAS INTERACTIVE ENGINE & STUDIO MODAL
  // ==========================================
  const PROJECT_WORKFLOWS_DATA = [
  {
    "idx": 0,
    "slug": "Workflows / ai-email-triage-drafter",
    "nodesCount": "16 NODES",
    "badge": "ACTIVE IN N8N",
    "title": "AI EMAIL DRAFTER & HUMAN-IN-THE-LOOP TRIAGE",
    "img": "images/workflow-email-drafter.png",
    "desc": "Automatically reads incoming emails, understands what the customer is asking using AI, and writes a complete, professional response draft. Before anything is sent, it delivers a preview to your team's Slack or Telegram with a simple 'Approve' or 'Edit' button—giving you full control in just one click.",
    "howItWorks": "Automatically reads incoming emails, understands what the customer is asking using AI, and writes a complete, professional response draft. Before anything is sent, it delivers a preview to your team's Slack or Telegram with a simple 'Approve' or 'Edit' button—giving you full control in just one click.",
    "problemSolved": "Saves business owners and support teams 2–3 hours every day spent answering emails. Customers get fast, well-written replies without the team having to type out the same responses from scratch or worry about AI sending mistakes."
  },
  {
    "idx": 1,
    "slug": "Workflows / ai-lead-qualification",
    "nodesCount": "18 NODES",
    "badge": "ACTIVE IN N8N",
    "title": "AI INBOUND LEAD QUALIFICATION & ENRICHMENT ENGINE",
    "img": "images/workflow-lead-qualification.png",
    "desc": "Whenever someone fills out a contact form on your website, this system instantly visits their company website, gathers background information, and uses AI to see if they are an ideal client. It automatically sorts leads into Hot, Warm, or Cold, saves their profile into Google Sheets, and sends an urgent notification to your sales team.",
    "howItWorks": "Whenever someone fills out a contact form on your website, this system instantly visits their company website, gathers background information, and uses AI to see if they are an ideal client. It automatically sorts leads into Hot, Warm, or Cold, saves their profile into Google Sheets, and sends an urgent notification to your sales team.",
    "problemSolved": "Stops good business leads from slipping away. Sales reps no longer have to spend 20 minutes manually researching every company that contacts them—hot leads get contacted within minutes instead of hours."
  },
  {
    "idx": 2,
    "slug": "Workflows / b2b-lead-nurture-watcher",
    "nodesCount": "14 NODES",
    "badge": "ACTIVE IN N8N",
    "title": "AUTONOMOUS B2B LEAD MAKING & INBOX REPLY WATCHER",
    "img": "images/workflow-lead-nurturing.png",
    "desc": "Runs daily follow-up email campaigns automatically. It sends personalized, step-by-step follow-ups to potential clients and constantly watches your inbox. The moment a client replies, the automation immediately pauses follow-ups and alerts you so you can jump in and close the deal.",
    "howItWorks": "Runs daily follow-up email campaigns automatically. It sends personalized, step-by-step follow-ups to potential clients and constantly watches your inbox. The moment a client replies, the automation immediately pauses follow-ups and alerts you so you can jump in and close the deal.",
    "problemSolved": "Solves the hassle of remembering to follow up with dozens of potential clients. It also prevents the common mistake of accidentally sending automated follow-up emails to someone who has already replied."
  },
  {
    "idx": 3,
    "slug": "Workflows / enterprise-rag-support",
    "nodesCount": "11 NODES",
    "badge": "ACTIVE IN N8N",
    "title": "ENTERPRISE RAG KNOWLEDGE PIPELINE & SUPPORT CHATBOT",
    "img": "images/workflow-rag-chatbot.png",
    "desc": "An intelligent 24/7 assistant that reads your company's Google Docs and product guides. When a customer or team member asks a question, the AI finds the exact right information from your private documents and answers accurately—citing its sources without making things up.",
    "howItWorks": "An intelligent 24/7 assistant that reads your company's Google Docs and product guides. When a customer or team member asks a question, the AI finds the exact right information from your private documents and answers accurately—citing its sources without making things up.",
    "problemSolved": "Stops your support team from answering the exact same customer questions over and over again. Customers get instant, 24/7 answers based strictly on your company's verified information, freeing staff for high-value tasks."
  },
  {
    "idx": 4,
    "slug": "Workflows / ai-news-video-generator",
    "nodesCount": "15 NODES",
    "badge": "ACTIVE IN N8N",
    "title": "MULTI-SOURCE AI TECH NEWS & REEL CONCEPT GENERATOR",
    "img": "images/workflow-news-reel-notion.png",
    "desc": "Automatically scans the top technology websites and news feeds every morning, removes duplicate articles, and picks the most exciting stories. Then, it uses AI to write ready-to-record short video scripts and social media hooks, organizing everything into a clean Notion board.",
    "howItWorks": "Automatically scans the top technology websites and news feeds every morning, removes duplicate articles, and picks the most exciting stories. Then, it uses AI to write ready-to-record short video scripts and social media hooks, organizing everything into a clean Notion board.",
    "problemSolved": "Eliminates the 5–10 hours each week creators and marketing teams spend searching for news and brainstorming content ideas. Gives you a daily list of proven, high-performing video concepts ready to record."
  },
  {
    "idx": 5,
    "slug": "Workflows / order-fulfillment-router",
    "nodesCount": "17 NODES",
    "badge": "ACTIVE IN N8N",
    "title": "MULTI-SHEET ORDER FULFILLMENT & NOTIFICATION ROUTER",
    "img": "images/workflow-order-routing-slack.png",
    "desc": "Connects customer orders across different Google Sheets, matches order details automatically, and cleans up the data. It then sorts orders into clear stages—Pending, Processing, Refunded, or Cancelled—and instantly notifies the packing team on Slack and the customer via email.",
    "howItWorks": "Connects customer orders across different Google Sheets, matches order details automatically, and cleans up the data. It then sorts orders into clear stages—Pending, Processing, Refunded, or Cancelled—and instantly notifies the packing team on Slack and the customer via email.",
    "problemSolved": "Eliminates shipping delays, human data-entry mistakes, and confusion caused by managing orders across multiple messy spreadsheets. Orders get processed faster, and customers stay updated automatically."
  }
];

  // Helper to initialize interactive pan/zoom on any canvas viewport
  function setupPanZoomCanvas(viewportEl, stageEl, zoomLabelEl, options = {}) {
    let scale = 1.0;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let hasMoved = false;

    const minScale = options.minScale || 0.6;
    const maxScale = options.maxScale || 2.8;

    function applyTransform() {
      stageEl.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
      if (zoomLabelEl) {
        zoomLabelEl.textContent = `${Math.round(scale * 100)}%`;
      }
    }

    function resetView() {
      scale = 1.0;
      panX = 0;
      panY = 0;
      applyTransform();
    }

    function zoomStep(delta) {
      const newScale = Math.max(minScale, Math.min(maxScale, scale + delta));
      scale = parseFloat(newScale.toFixed(2));
      applyTransform();
    }

    // Pointer events for smooth drag
    viewportEl.addEventListener('pointerdown', (e) => {
      // Don't drag if clicking an action button
      if (e.target.closest('button') || e.target.closest('.canvas-topbar')) return;
      isDragging = true;
      hasMoved = false;
      startX = e.clientX - panX;
      startY = e.clientY - panY;
      viewportEl.setPointerCapture(e.pointerId);
    });

    viewportEl.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      hasMoved = true;
      panX = e.clientX - startX;
      panY = e.clientY - startY;
      applyTransform();
    });

    const stopDrag = (e) => {
      if (isDragging) {
        isDragging = false;
        try {
          viewportEl.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    viewportEl.addEventListener('pointerup', stopDrag);
    viewportEl.addEventListener('pointercancel', stopDrag);

    // Mouse wheel zoom (prevent page scroll when hovering canvas)
    viewportEl.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 0.12 : -0.12;
      const newScale = Math.max(minScale, Math.min(maxScale, scale + zoomFactor));
      scale = parseFloat(newScale.toFixed(2));
      applyTransform();
    }, { passive: false });

    // Double click to reset
    viewportEl.addEventListener('dblclick', (e) => {
      if (e.target.closest('button')) return;
      resetView();
    });

    return {
      resetView,
      zoomStep,
      setScale: (s) => {
        scale = Math.max(minScale, Math.min(maxScale, s));
        applyTransform();
      },
      hasDragged: () => hasMoved
    };
  }

  // Set up each in-card dummy canvas frame
  const canvasFrames = document.querySelectorAll('.dummy-canvas-frame');
  canvasFrames.forEach((frame) => {
    const projectIdx = parseInt(frame.getAttribute('data-project-idx') || '0', 10);
    const viewport = frame.querySelector('.canvas-viewport');
    const stage = frame.querySelector('.canvas-stage');
    const zoomLabel = frame.querySelector('.canvas-zoom-label');
    const zoomInBtn = frame.querySelector('.canvas-zoom-btn.zoom-in');
    const zoomOutBtn = frame.querySelector('.canvas-zoom-btn.zoom-out');
    const zoomResetBtn = frame.querySelector('.canvas-zoom-btn.zoom-reset');
    const runBtn = frame.querySelector('.canvas-tool-btn.btn-run');
    const inspectBtn = frame.querySelector('.canvas-tool-btn.btn-inspect');
    const enlargeBtn = frame.querySelector('.canvas-enlarge-btn');
    const toast = frame.querySelector('.canvas-exec-toast');

    if (viewport && stage) {
      const pz = setupPanZoomCanvas(viewport, stage, zoomLabel, { minScale: 0.65, maxScale: 2.5 });

      if (zoomInBtn) zoomInBtn.addEventListener('click', () => pz.zoomStep(0.2));
      if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => pz.zoomStep(-0.2));
      if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => pz.resetView());

      // Simulated run execution
      if (runBtn) {
        runBtn.addEventListener('click', () => {
          if (runBtn.classList.contains('is-running')) return;
          runBtn.classList.add('is-running');
          runBtn.innerHTML = '<span class="run-icon">●</span> Executing...';
          stage.classList.add('is-executing');

          setTimeout(() => {
            stage.classList.remove('is-executing');
            runBtn.classList.remove('is-running');
            runBtn.innerHTML = '<span class="run-icon">▶</span> Test';

            if (toast) {
              toast.classList.add('show');
              setTimeout(() => {
                toast.classList.remove('show');
              }, 2800);
            }
          }, 1200);
        });
      }

      // Open inspector modal
      const openModalHandler = (e) => {
        e.stopPropagation();
        openCanvasModal(projectIdx);
      };

      if (inspectBtn) inspectBtn.addEventListener('click', openModalHandler);
      if (enlargeBtn) enlargeBtn.addEventListener('click', openModalHandler);
    }
  });

  // Modal Inspector Engine
  const modalEl = document.getElementById('canvas-modal');
  const modalBackdrop = document.getElementById('canvas-modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalWorkflowSlug = document.getElementById('modal-workflow-slug');
  const modalCanvasViewport = document.getElementById('modal-canvas-viewport');
  const modalCanvasStage = document.getElementById('modal-canvas-stage');
  const modalCanvasImg = document.getElementById('modal-canvas-img');
  const modalNodeCountBadge = document.getElementById('modal-node-count-badge');
  const modalPipelineTitle = document.getElementById('modal-pipeline-title');
  const modalWorkflowExplainer = document.getElementById('modal-workflow-explainer');
  const modalBtnRun = document.getElementById('modal-btn-run');
  const modalExecToast = document.getElementById('modal-exec-toast');
  const modalToastMsg = document.getElementById('modal-toast-msg');
  const modalZoomOut = document.getElementById('modal-zoom-out');
  const modalZoomIn = document.getElementById('modal-zoom-in');
  const modalZoomFit = document.getElementById('modal-zoom-fit');
  const modalZoomReset = document.getElementById('modal-zoom-reset');
  const modalZoomDisplay = document.getElementById('modal-zoom-display');
  const modalToggleSidebar = document.getElementById('modal-toggle-sidebar');
  const modalSidebar = document.getElementById('modal-sidebar');

  let modalPz = null;
  if (modalCanvasViewport && modalCanvasStage) {
    modalPz = setupPanZoomCanvas(modalCanvasViewport, modalCanvasStage, modalZoomDisplay, { minScale: 0.4, maxScale: 3.2 });
  }

  function openCanvasModal(projectIdx) {
    const data = PROJECT_WORKFLOWS_DATA[projectIdx] || PROJECT_WORKFLOWS_DATA[0];
    if (!modalEl) return;

    if (modalWorkflowSlug) modalWorkflowSlug.textContent = data.slug;
    if (modalNodeCountBadge) modalNodeCountBadge.textContent = data.nodesCount;
    if (modalPipelineTitle) modalPipelineTitle.textContent = data.title;
    if (modalToastMsg) modalToastMsg.textContent = `Workflow executed successfully &bull; ${data.nodesCount} active`;

    if (modalCanvasImg) {
      modalCanvasImg.src = data.img;
      modalCanvasImg.alt = `${data.title} Diagram`;
    }

    if (modalWorkflowExplainer) {
      modalWorkflowExplainer.textContent = data.howItWorks;
    }
    const modalWorkflowProblem = document.getElementById('modal-workflow-problem');
    if (modalWorkflowProblem) {
      modalWorkflowProblem.textContent = data.problemSolved || '';
    }

    if (modalPz) {
      modalPz.resetView();
    }

    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCanvasModal() {
    if (!modalEl) return;
    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCanvasModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeCanvasModal);

  // Modal zoom buttons
  if (modalZoomIn && modalPz) modalZoomIn.addEventListener('click', () => modalPz.zoomStep(0.25));
  if (modalZoomOut && modalPz) modalZoomOut.addEventListener('click', () => modalPz.zoomStep(-0.25));
  if (modalZoomReset && modalPz) modalZoomReset.addEventListener('click', () => modalPz.resetView());
  if (modalZoomFit && modalPz) modalZoomFit.addEventListener('click', () => modalPz.setScale(0.85));

  // Modal simulated execution
  if (modalBtnRun && modalCanvasStage) {
    modalBtnRun.addEventListener('click', () => {
      if (modalBtnRun.classList.contains('is-running')) return;
      modalBtnRun.classList.add('is-running');
      modalBtnRun.innerHTML = '<span class="run-icon">●</span> Executing...';
      modalCanvasStage.classList.add('is-executing');

      setTimeout(() => {
        modalCanvasStage.classList.remove('is-executing');
        modalBtnRun.classList.remove('is-running');
        modalBtnRun.innerHTML = '<span class="run-icon">▶</span> Test Workflow';

        if (modalExecToast) {
          modalExecToast.classList.add('show');
          setTimeout(() => {
            modalExecToast.classList.remove('show');
          }, 3000);
        }
      }, 1200);
    });
  }

  // Toggle sidebar on mobile
  if (modalToggleSidebar && modalSidebar) {
    modalToggleSidebar.addEventListener('click', () => {
      modalSidebar.classList.toggle('mobile-open');
      modalToggleSidebar.classList.toggle('active');
    });
  }

  // Keyboard shortcut: Escape to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalEl && modalEl.classList.contains('is-open')) {
      closeCanvasModal();
    }
  });

  // ==========================================
  // 8. ANIMATION & PHYSICS SIMULATION LOOP
  // ==========================================
  const clock = new THREE.Clock();
  const invModelMatrix = new THREE.Matrix4();
  const viewProjMatrix = new THREE.Matrix4();

  function animate() {
    requestAnimationFrame(animate);

    const delta = Math.min(clock.getDelta(), 0.1);
    const elapsedTime = clock.getElapsedTime();
    const HZ = delta * 60.0;

    // Smooth cursor interpolation with exponential easing
    pointer.prevX = pointer.currentX;
    pointer.prevY = pointer.currentY;

    // Responsive smoothing factor: 0.22 gives instant response with zero jitter
    const ease = 0.22;
    pointer.currentX += (pointer.targetX - pointer.currentX) * ease;
    pointer.currentY += (pointer.targetY - pointer.currentY) * ease;

    const rawDx = pointer.currentX - pointer.prevX;
    const rawDy = pointer.currentY - pointer.prevY;

    // Continuous velocity low-pass filter (smooth velocity vector)
    pointer.vx += (rawDx - pointer.vx) * 0.35;
    pointer.vy += (rawDy - pointer.vy) * 0.35;
    const speed = Math.hypot(pointer.vx, pointer.vy);

    // Fixed camera: the cloud stays firmly in its exact position without shifting
    camera.position.set(baseCamPos.x, baseCamPos.y, baseCamPos.z);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();

    // Subtle scroll-driven parallax rotation
    const scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollRatio = window.scrollY / scrollMax;
    particleGroup.rotation.y = baseRotY + scrollRatio * 0.35;
    particleGroup.rotation.x = baseRotX + scrollRatio * 0.12;

    // 1. Fluid Splat
    if (speed > 0.02) {
      const isMobileView = window.innerWidth <= 760;
      // Generous baseline radius so even delicate pointer movements create a soft, full brush
      const radiusPx = clampMap(speed, 0.0, 8.0, 32.0, isMobileView ? 60.0 : 75.0);
      const radiusUV = radiusPx / Math.max(window.innerWidth, window.innerHeight);

      // Controlled velocity scaling to prevent explosive velocity spikes
      const forceScale = clampMap(speed, 0.0, 10.0, 1.6, 4.0);

      const u1 = pointer.prevX / window.innerWidth;
      const v1 = 1.0 - (pointer.prevY / window.innerHeight);
      const u2 = pointer.currentX / window.innerWidth;
      const v2 = 1.0 - (pointer.currentY / window.innerHeight);
      const aspect = window.innerWidth / window.innerHeight;

      // Splat velocity with continuous smoothed directional force
      splatMaterial.uniforms.uTarget.value = fluidVelocity.read.texture;
      splatMaterial.uniforms.uPoint.value.set(u2, v2);
      splatMaterial.uniforms.uLastPoint.value.set(u1, v1);
      splatMaterial.uniforms.uColor.value.set(pointer.vx * forceScale, -pointer.vy * forceScale, 1.0, 0.0);
      splatMaterial.uniforms.uRadius.value = radiusUV;
      splatMaterial.uniforms.uAspect.value = aspect;
      renderQuad(splatMaterial, fluidVelocity.write);
      fluidVelocity.swap();

      // Splat density (soft white glow)
      splatMaterial.uniforms.uTarget.value = fluidDensity.read.texture;
      splatMaterial.uniforms.uColor.value.set(1.0, 1.0, 1.0, 1.0);
      renderQuad(splatMaterial, fluidDensity.write);
      fluidDensity.swap();
    }

    // 2. Fluid Curl
    curlMaterial.uniforms.uVelocity.value = fluidVelocity.read.texture;
    renderQuad(curlMaterial, curlTarget);

    // 3. Fluid Vorticity Confinement
    vorticityMaterial.uniforms.uVelocity.value = fluidVelocity.read.texture;
    vorticityMaterial.uniforms.uCurl.value = curlTarget.texture;
    renderQuad(vorticityMaterial, fluidVelocity.write);
    fluidVelocity.swap();

    // 4. Fluid Divergence
    divergenceMaterial.uniforms.uVelocity.value = fluidVelocity.read.texture;
    renderQuad(divergenceMaterial, divergenceTarget);

    // 5. Fluid Pressure Solve (8 Jacobi iterations for ultra-smooth incompressibility)
    pressureMaterial.uniforms.uDivergence.value = divergenceTarget.texture;
    for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
      pressureMaterial.uniforms.uPressure.value = fluidPressure.read.texture;
      renderQuad(pressureMaterial, fluidPressure.write);
      fluidPressure.swap();
    }

    // 6. Fluid Gradient Subtract
    gradientSubtractMaterial.uniforms.uPressure.value = fluidPressure.read.texture;
    gradientSubtractMaterial.uniforms.uVelocity.value = fluidVelocity.read.texture;
    renderQuad(gradientSubtractMaterial, fluidVelocity.write);
    fluidVelocity.swap();

    // 7. Fluid Advect Velocity
    advectVelocityMaterial.uniforms.uVelocity.value = fluidVelocity.read.texture;
    renderQuad(advectVelocityMaterial, fluidVelocity.write);
    fluidVelocity.swap();

    // 8. Fluid Advect Density
    advectDensityMaterial.uniforms.uVelocity.value = fluidVelocity.read.texture;
    advectDensityMaterial.uniforms.uDensity.value = fluidDensity.read.texture;
    renderQuad(advectDensityMaterial, fluidDensity.write);
    fluidDensity.swap();

    // 9. Particle Simulation GPGPU Pass
    particleGroup.updateMatrixWorld();
    invModelMatrix.copy(particleGroup.matrixWorld).invert();
    viewProjMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);

    const normSpeed = Math.min(speed / 10.0, 3.0);

    simMaterial.uniforms.uCurrentPos.value = posRT.read.texture;
    simMaterial.uniforms.uFluidVelocity.value = fluidVelocity.read.texture;
    simMaterial.uniforms.uFluidDensity.value = fluidDensity.read.texture;
    simMaterial.uniforms.uCursorScreenUV.value.set(
      pointer.currentX / window.innerWidth,
      1.0 - (pointer.currentY / window.innerHeight)
    );
    simMaterial.uniforms.uAspect.value = window.innerWidth / window.innerHeight;
    simMaterial.uniforms.uCursorActive.value = pointer.hasMovedOnce ? 1.0 : 0.0;
    simMaterial.uniforms.uCursorSpeed.value = normSpeed;
    simMaterial.uniforms.uTime.value = elapsedTime;
    simMaterial.uniforms.uHZ.value = HZ;
    simMaterial.uniforms.uModelMatrix.value.copy(particleGroup.matrixWorld);
    simMaterial.uniforms.uInverseModelMatrix.value.copy(invModelMatrix);
    simMaterial.uniforms.uViewProjectionMatrix.value.copy(viewProjMatrix);
    simMaterial.uniforms.uCameraWorldMatrix.value.copy(camera.matrixWorld);

    renderQuad(simMaterial, posRT.write);
    posRT.swap();

    // 10. Render Particle Scene to Screen
    particleMaterial.uniforms.uPosTexture.value = posRT.read.texture;
    particleMaterial.uniforms.uTime.value = elapsedTime;

    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(scene, camera);
  }

  // ==========================================
  // 8. RESPONSIVE VIEWPORT & FULL-PAGE COVER FRAMING
  // ==========================================
  function updateResponsiveCloud() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const aspect = w / h;

    // Transition factor between portrait (0.0) and landscape (1.0)
    // 0.5 is narrow phone portrait, 1.2 is comfortable landscape
    const t = Math.max(0.0, Math.min(1.0, (aspect - 0.5) / (1.2 - 0.5)));
    const s = t * t * (3.0 - 2.0 * t); // smoothstep

    // Mobile / Portrait framing (aspect <= 0.5)
    const mobCamX = 0.0;
    const mobCamY = 0.0;
    const mobCamZ = 6.6;
    const mobPosX = 0.0;
    const mobPosY = 0.25;
    const mobPosZ = -1.0;
    const mobScale = 3.6;

    // Landscape / Desktop base framing (aspect >= 1.2)
    // When height in pixels is less than width in pixels (aspect > 1.0),
    // scale up proportionally to aspect so the cloud covers the entire page
    // and never appears small or cropped.
    const deskCamX = -0.85;
    const deskCamY = 0.0;
    const deskCamZ = 5.5;
    const deskPosX = 0.15;
    const deskPosY = 0.08;
    const deskPosZ = -1.0;

    // Dynamic cover scale for landscape: ensures full screen coverage at any width/height ratio
    const landscapeCoverMultiplier = Math.max(1.0, aspect * 0.75);
    const deskScale = 5.8 * landscapeCoverMultiplier;

    // Interpolate camera & position
    baseCamPos.x = mobCamX + (deskCamX - mobCamX) * s;
    baseCamPos.y = mobCamY + (deskCamY - mobCamY) * s;
    baseCamPos.z = mobCamZ + (deskCamZ - mobCamZ) * s;

    particleGroup.position.x = mobPosX + (deskPosX - mobPosX) * s;
    particleGroup.position.y = mobPosY + (deskPosY - mobPosY) * s;
    particleGroup.position.z = mobPosZ + (deskPosZ - mobPosZ) * s;

    // Compute final scale
    const currentScale = mobScale + (deskScale - mobScale) * s;
    particleGroup.scale.set(currentScale, currentScale, currentScale * 1.2);

    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    const currentDPR = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setSize(w, h);
    renderer.setPixelRatio(currentDPR);
    if (particleMaterial && particleMaterial.uniforms && particleMaterial.uniforms.uDPR) {
      particleMaterial.uniforms.uDPR.value = currentDPR;
    }
  }

  // Initial responsive framing
  updateResponsiveCloud();

  // Window resize handler
  window.addEventListener('resize', updateResponsiveCloud);

  // Start animation loop
  animate();
})();
