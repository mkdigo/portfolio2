export function useCanvas() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas?.getContext('2d');
  return { canvas, ctx };
}

export function createImage(src: string): HTMLImageElement {
  const image = new Image();
  image.src = String(src);
  return image;
}

type TCollition = {
  ax: number;
  ay: number;
  aw: number;
  ah: number;
  bx: number;
  by: number;
  bw: number;
  bh: number;
};

export function collision({
  ax,
  ay,
  aw,
  ah,
  bx,
  by,
  bw,
  bh,
}: TCollition): boolean {
  return ax + aw >= bx && ax <= bx + bw && ay + ah >= by && ay <= by + bh;
}
