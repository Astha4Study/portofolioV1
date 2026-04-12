export { };

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: new (...args: unknown[]) => unknown;
  export const MeshLineMaterial: new (...args: unknown[]) => unknown;
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: Record<string, unknown>;
    meshLineMaterial: Record<string, unknown>;
  }
}