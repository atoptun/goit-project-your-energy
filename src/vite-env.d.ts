/// <reference types="vite/client" />
/// <reference types="@spiriit/vite-plugin-svg-spritemap/dist/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.webp' {
  const src: string;
  export default src;
}
declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}
declare module '*.mp3' {
  const src: string;
  export default src;
}
