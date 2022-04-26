import { TXY } from '../../types';
import { useCanvas } from '../helpers';

const { canvas, ctx } = useCanvas();

type TBG = {
  position: TXY;
};

export class Background {
  velocity: TXY;
  width: number;
  height: number;
  bg1: TBG;
  bg2: TBG;
  bg3: TBG;
  image: HTMLImageElement;

  constructor({ velocity, image }: { velocity: TXY; image: HTMLImageElement }) {
    this.velocity = velocity;
    this.width = canvas?.width ?? 0;
    this.height = canvas?.height ?? 0;
    this.bg1 = {
      position: {
        x: -this.width,
        y: 0,
      },
    };
    this.bg2 = {
      position: {
        x: 0,
        y: 0,
      },
    };
    this.bg3 = {
      position: {
        x: this.width,
        y: 0,
      },
    };
    this.image = image;
  }

  draw(): void {
    if (!ctx) return;

    ctx.drawImage(
      this.image,
      this.bg1.position.x,
      this.bg1.position.y,
      this.width,
      this.height
    );
    ctx.drawImage(
      this.image,
      this.bg2.position.x,
      this.bg2.position.y,
      this.width,
      this.height
    );
    ctx.drawImage(
      this.image,
      this.bg3.position.x,
      this.bg3.position.y,
      this.width,
      this.height
    );
  }

  update({
    mapMovingRight,
    mapMovingLeft,
  }: {
    mapMovingRight: boolean;
    mapMovingLeft: boolean;
  }): void {
    // 3 for remove the gap
    if (this.bg1.position.x < -this.width * 2)
      this.bg1.position.x = this.width - 3;
    if (this.bg2.position.x < -this.width * 2)
      this.bg2.position.x = this.width - 3;
    if (this.bg3.position.x < -this.width * 2)
      this.bg3.position.x = this.width - 3;

    if (this.bg1.position.x > this.width * 2)
      this.bg1.position.x = -this.width + 3;
    if (this.bg2.position.x > this.width * 2)
      this.bg2.position.x = -this.width + 3;
    if (this.bg3.position.x > this.width * 2)
      this.bg3.position.x = -this.width + 3;

    if (mapMovingRight) {
      // Player moving to right
      this.bg1.position.x -= this.velocity.x;
      this.bg2.position.x -= this.velocity.x;
      this.bg3.position.x -= this.velocity.x;
    } else if (mapMovingLeft) {
      // Player moving to left
      this.bg1.position.x += this.velocity.x;
      this.bg2.position.x += this.velocity.x;
      this.bg3.position.x += this.velocity.x;
    }

    this.draw();
  }
}
