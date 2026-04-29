"use client";

import type { ArchivePhoto } from "@/lib/archive/types";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { type CSSProperties, useEffect, useRef } from "react";

const ARTBOARD_COLUMNS = 5;

function createLoopedArtboardPhotos(photos: ArchivePhoto[]) {
  if (photos.length === 0) {
    return photos;
  }

  const remainder = photos.length % ARTBOARD_COLUMNS;
  if (remainder === 0) {
    return photos;
  }

  const fillerCount = ARTBOARD_COLUMNS - remainder;
  return [...photos, ...photos.slice(0, fillerCount)];
}

class Plane extends THREE.Object3D {
  private readonly el: HTMLElement;

  private readonly mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;

  private readonly material: THREE.ShaderMaterial;

  private xOffset = 0;

  private yOffset = 0;

  private my = 1;

  private rect!: DOMRect;

  public x = 0;

  public y = 0;

  public halfW = 0;

  public halfH = 0;

  constructor(params: {
    el: HTMLElement;
    geometry: THREE.PlaneGeometry;
    material: THREE.ShaderMaterial;
    loader: THREE.TextureLoader;
    viewport: { ww: number; wh: number };
  }) {
    super();

    this.el = params.el;
    this.my = 1;

    this.material = params.material.clone();
    this.material.uniforms = {
      u_hover: { value: 0.0 },
      u_res: { value: new THREE.Vector2(1, 1) },
      u_size: { value: new THREE.Vector2(1, 1) },
      u_texture: { value: null },
      u_velo: { value: new THREE.Vector2(0, 0) },
      u_viewSize: {
        value: new THREE.Vector2(params.viewport.ww, params.viewport.wh),
      },
    };

    this.mesh = new THREE.Mesh(params.geometry, this.material);
    this.add(this.mesh);

    params.loader.load(this.el.dataset.src ?? "", (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      const image = texture.image as HTMLImageElement;

      this.material.uniforms.u_texture.value = texture;
      this.material.uniforms.u_size.value.x = image?.naturalWidth ?? 1;
      this.material.uniforms.u_size.value.y = image?.naturalHeight ?? 1;
    });

    this.resize(params.viewport.ww, params.viewport.wh);
  }

  resize(ww: number, wh: number) {
    this.rect = this.el.getBoundingClientRect();

    const width = this.rect.width;
    const height = this.rect.height;
    const left = this.rect.left + window.scrollX;
    const top = this.rect.top + window.scrollY;

    this.xOffset = left + width / 2 - ww / 2;
    this.yOffset = top + height / 2 - wh / 2;

    this.position.x = this.xOffset;
    this.position.y = this.yOffset;

    this.halfW = width / 2;
    this.halfH = height / 2;

    this.material.uniforms.u_res.value.x = width;
    this.material.uniforms.u_res.value.y = height;
    this.material.uniforms.u_viewSize.value.x = ww;
    this.material.uniforms.u_viewSize.value.y = wh;

    this.mesh.scale.set(width, height, 1);
  }

  update(
    cx: number,
    cy: number,
    max: { x: number; y: number },
    velo: { x: number; y: number },
  ) {
    const right = this.rect.right;
    const bottom = this.rect.bottom;

    this.y =
      gsap.utils.wrap(-(max.y - bottom), bottom, cy * this.my) - this.yOffset;
    this.x = gsap.utils.wrap(-(max.x - right), right, cx) - this.xOffset;

    this.material.uniforms.u_velo.value.x = velo.x;
    this.material.uniforms.u_velo.value.y = velo.y;

    this.position.x = this.x;
    this.position.y = this.y;
  }

  setHover(value: number) {
    gsap.to(this.material.uniforms.u_hover, {
      value,
      duration: 0.5,
      overwrite: "auto",
    });
  }

  dispose() {
    const texture = this.material.uniforms.u_texture
      .value as THREE.Texture | null;
    texture?.dispose();
    this.material.dispose();
  }
}

const DRAG_THRESHOLD = 6;

type ArtboardCanvasProps = {
  photos: ArchivePhoto[];
};

export function ArtboardCanvas({ photos }: ArtboardCanvasProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const routerRef = useRef(router);
  const isDragRef = useRef(false);
  const artboardPhotos = createLoopedArtboardPhotos(photos);
  const rowCount = Math.ceil(artboardPhotos.length / ARTBOARD_COLUMNS);

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) {
      return;
    }

    const existingCanvas = document.getElementById("home-canvas-webgl");
    if (existingCanvas?.parentNode) {
      existingCanvas.parentNode.removeChild(existingCanvas);
    }

    document.body.style.overscrollBehaviorX = "none";
    document.documentElement.style.overscrollBehaviorX = "none";
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overscrollBehavior = "none";

    let ww = window.innerWidth;
    let wh = window.innerHeight;

    const isFirefox = navigator.userAgent.includes("Firefox");
    const isWindows = navigator.appVersion.includes("Win");

    const multipliers = {
      firefox: isWindows ? 40 : 20,
      mouse: isWindows ? 1.2 : 0.6,
    };

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      ww / -2,
      ww / 2,
      wh / 2,
      wh / -2,
      1,
      1000,
    );
    camera.position.z = 1;
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(gsap.utils.clamp(1, 1.5, window.devicePixelRatio));
    renderer.setSize(ww, wh);
    renderer.setClearColor(0xe7e7e7, 1);

    const canvasEl = renderer.domElement;
    canvasEl.id = "home-canvas-webgl";
    canvasEl.style.position = "fixed";
    canvasEl.style.top = "0";
    canvasEl.style.left = "0";
    canvasEl.style.width = "100%";
    canvasEl.style.height = "100%";
    canvasEl.style.pointerEvents = "none";
    canvasEl.style.zIndex = "0";
    document.body.appendChild(canvasEl);

    const vertexShader = `
      precision mediump float;
      uniform vec2 u_velo;
      uniform vec2 u_viewSize;
      varying vec2 vUv;
      #define M_PI 3.1415926535897932384626433832795
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        float normalizedX = worldPos.x / u_viewSize.x;
        float curvature = cos(normalizedX * M_PI);
        worldPos.y -= curvature * u_velo.y * 0.6;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `;

    const fragmentShader = `
      precision mediump float;
      uniform vec2 u_res;
      uniform vec2 u_size;
      uniform vec2 u_velo;
      uniform float u_hover;
      uniform sampler2D u_texture;
      varying vec2 vUv;

      float random(vec2 p) {
        return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      vec2 cover(vec2 screenSize, vec2 imageSize, vec2 uv) {
        float screenRatio = screenSize.x / screenSize.y;
        float imageRatio = imageSize.x / imageSize.y;
        vec2 newSize = screenRatio < imageRatio
          ? vec2(imageSize.x * (screenSize.y / imageSize.y), screenSize.y)
          : vec2(screenSize.x, imageSize.y * (screenSize.x / imageSize.x));
        vec2 newOffset = (screenRatio < imageRatio
          ? vec2((newSize.x - screenSize.x) / 2.0, 0.0)
          : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;
        return uv * screenSize / newSize + newOffset;
      }

      void main() {
        vec2 uvCover = cover(u_res, u_size, vUv);
        vec2 rgbOffset = u_velo * 0.0002;
        float r = texture2D(u_texture, uvCover + rgbOffset).r;
        float g = texture2D(u_texture, uvCover).g;
        float b = texture2D(u_texture, uvCover - rgbOffset).b;

        vec4 color = vec4(r, g, b, 1.0);
        float grey = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        color.rgb = mix(vec3(grey), color.rgb, u_hover);
        float noise = random(uvCover * 550.0);
        color.rgb += (noise - 0.5) * 0.08 * (1.0 - u_hover * 0.5);

        float dist = distance(vUv, vec2(0.5, 0.5));
        float vignette = smoothstep(0.8, 0.2, dist * 0.9);
        color.rgb *= vignette;

        gl_FragColor = color;
      }
    `;

    const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
    const baseMaterial = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
    });
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";

    const planeEls = Array.from(
      gridEl.querySelectorAll<HTMLElement>(".js-plane"),
    );
    const planes = planeEls.map((el) => {
      const plane = new Plane({
        el,
        geometry,
        loader,
        material: baseMaterial,
        viewport: { ww, wh },
      });
      scene.add(plane);
      return plane;
    });

    const state = {
      cx: 0,
      cy: 0,
      diff: 0,
      isDragging: false,
      max: { x: 0, y: 0 },
      on: { x: 0, y: 0 },
      tx: 0,
      ty: 0,
      velo: { x: 0, y: 0 },
      wheel: { x: 0, y: 0 },
    };

    const resize = () => {
      ww = window.innerWidth;
      wh = window.innerHeight;

      camera.left = ww / -2;
      camera.right = ww / 2;
      camera.top = wh / 2;
      camera.bottom = wh / -2;
      camera.updateProjectionMatrix();

      renderer.setSize(ww, wh);

      const rect = gridEl.getBoundingClientRect();
      state.max.x = rect.left + Math.max(rect.width, gridEl.scrollWidth);
      state.max.y = rect.top + Math.max(rect.height, gridEl.scrollHeight);

      planes.forEach((plane) => plane.resize(ww, wh));
    };

    const tick = () => {
      const xDiff = state.tx - state.cx;
      const yDiff = state.ty - state.cy;

      state.cx += xDiff * 0.085;
      state.cy += yDiff * 0.085;

      state.cx = Math.round(state.cx * 100) / 100;
      state.cy = Math.round(state.cy * 100) / 100;

      state.diff = Math.max(Math.abs(yDiff * 0.0001), Math.abs(xDiff * 0.0001));

      const intensity = 0.025;
      state.velo.x = xDiff * intensity;
      state.velo.y = yDiff * intensity;

      planes.forEach((plane) =>
        plane.update(state.cx, state.cy, state.max, state.velo),
      );

      renderer.render(scene, camera);
    };

    let clickStartX = 0;
    let clickStartY = 0;
    let interactionStartedInGrid = false;

    const onMouseDown = (event: MouseEvent) => {
      const startedInGrid = gridEl.contains(event.target as Node);

      if (state.isDragging || !startedInGrid) {
        interactionStartedInGrid = false;
        return;
      }

      interactionStartedInGrid = true;
      isDragRef.current = false;
      clickStartX = event.clientX;
      clickStartY = event.clientY;
      state.isDragging = true;
      state.on.x = state.tx - event.clientX * 2.5;
      state.on.y = state.ty + event.clientY * 2.5;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (state.isDragging && interactionStartedInGrid) {
        const dx = event.clientX - clickStartX;
        const dy = event.clientY - clickStartY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > DRAG_THRESHOLD) {
          isDragRef.current = true;
        }

        state.tx = state.on.x + event.clientX * 2.5;
        state.ty = state.on.y - event.clientY * 2.5;
      }

      const mx = event.clientX - ww / 2;
      const my = wh / 2 - event.clientY;
      planes.forEach((plane) => {
        const isHovered =
          mx >= plane.position.x - plane.halfW &&
          mx <= plane.position.x + plane.halfW &&
          my >= plane.position.y - plane.halfH &&
          my <= plane.position.y + plane.halfH;
        plane.setHover(isHovered ? 1 : 0);
      });
    };

    const onMouseUp = (event: MouseEvent) => {
      state.isDragging = false;

      if (!interactionStartedInGrid) {
        return;
      }

      interactionStartedInGrid = false;

      if (!isDragRef.current) {
        const mx = event.clientX - ww / 2;
        const my = wh / 2 - event.clientY;

        for (let i = planes.length - 1; i >= 0; i--) {
          const plane = planes[i];
          if (
            mx >= plane.position.x - plane.halfW &&
            mx <= plane.position.x + plane.halfW &&
            my >= plane.position.y - plane.halfH &&
            my <= plane.position.y + plane.halfH
          ) {
            const photo = artboardPhotos[i];
            if (photo) {
              routerRef.current.push(
                `/photography?collection=${encodeURIComponent(photo.collectionSlug)}&photo=${encodeURIComponent(photo.id)}`,
              );
            }
            return;
          }
        }
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      const startedInGrid = gridEl.contains(event.target as Node);

      if (state.isDragging || !startedInGrid) {
        interactionStartedInGrid = false;
        return;
      }

      interactionStartedInGrid = true;
      state.isDragging = true;
      state.on.x = state.tx - event.touches[0].clientX * 2.5;
      state.on.y = state.ty + event.touches[0].clientY * 2.5;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!state.isDragging || !interactionStartedInGrid) {
        return;
      }

      event.preventDefault();
      state.tx = state.on.x + event.touches[0].clientX * 2.5;
      state.ty = state.on.y - event.touches[0].clientY * 2.5;
    };

    const onTouchEnd = () => {
      state.isDragging = false;
      interactionStartedInGrid = false;
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault();
      }

      state.wheel.x = event.deltaX * -1;
      state.wheel.y = event.deltaY * -1;

      if (isFirefox && event.deltaMode === 1) {
        state.wheel.x *= multipliers.firefox;
        state.wheel.y *= multipliers.firefox;
      }

      state.wheel.x *= multipliers.mouse;
      state.wheel.y *= multipliers.mouse;

      state.tx += state.wheel.x;
      state.ty -= state.wheel.y;
    };

    gsap.ticker.add(tick);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", resize);

    resize();

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", resize);

      planes.forEach((plane) => {
        scene.remove(plane);
        plane.dispose();
      });

      geometry.dispose();
      baseMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      document.body.style.overscrollBehaviorX = "";
      document.documentElement.style.overscrollBehaviorX = "";
      document.body.style.overscrollBehavior = "";
      document.documentElement.style.overscrollBehavior = "";
    };
  }, [artboardPhotos]);

  return (
    <div className="canvas__webgl-list-wrap">
      <div
        ref={gridRef}
        role="list"
        className="grid js-grid"
        style={
          {
            touchAction: "none",
            "--artboard-rows": rowCount,
          } as CSSProperties
        }
      >
        {artboardPhotos.map((photo, index) => (
          <div
            key={`${photo.id}-${index}`}
            role="listitem"
            className="div artboard-item"
          >
            <div className="js-plane-link">
              <figure className="js-plane" data-src={photo.webSrc} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
