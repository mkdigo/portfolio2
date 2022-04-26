import { useCanvas } from '../helpers';
import config from '../config';
import { TXY } from '../../types';

const { ctx } = useCanvas();

type TEmblem = {
  position: TXY;
  image: HTMLImageElement;
  scale?: number;
  fixedPositionY?: number;
};

export class Emblem {
  position: TXY;
  isFixed: boolean;
  fixedPosition: TXY;
  image: HTMLImageElement;
  width: number;
  height: number;

  constructor({ position, image, scale, fixedPositionY }: TEmblem) {
    if (!scale) scale = 1;

    this.position = position;
    this.isFixed = false;
    this.fixedPosition = {
      x: 0,
      y: fixedPositionY ? fixedPositionY : 20,
    };
    this.image = image;
    this.width = 56 * scale;
    this.height = 56 * scale;
  }

  get(positionX: number): void {
    this.isFixed = true;
    this.fixedPosition.x = positionX;
  }

  draw(): void {
    if (!ctx) return;

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update({
    mapMovingLeft,
    mapMovingRight,
  }: {
    mapMovingLeft: boolean;
    mapMovingRight: boolean;
  }): void {
    if (mapMovingRight && !this.isFixed) {
      // Player moving to right
      this.position.x -= config.player.velocity.x;
    } else if (mapMovingLeft && !this.isFixed) {
      // Player moving to left
      this.position.x += config.player.velocity.x;
    }

    if (this.isFixed) {
      if (this.position.y > this.fixedPosition.y) this.position.y -= 8;
      else this.position.y = this.fixedPosition.y;

      if (this.position.x > this.fixedPosition.x) this.position.x -= 8;
      else this.position.x = this.fixedPosition.x;
    }

    this.draw();
  }
}
