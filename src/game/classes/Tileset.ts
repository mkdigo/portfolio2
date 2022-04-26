import { createImage, useCanvas } from '../helpers';
import { TXY } from '../../types';
import config from '../config';

import tilesetImg from '../assets/tileset.png';

const { ctx } = useCanvas();

export class Tileset {
  position: TXY;
  image: HTMLImageElement;
  block: {
    amount: number;
    x: number;
    y: number;
  };
  width: number;
  height: number;

  constructor({ position, element }: { position: TXY; element: string }) {
    this.position = position;
    this.image = createImage(tilesetImg);

    let amount = 0;
    let x = 0;
    let y = 0;

    if (element === 'ground') {
      amount = 3;
      x = 5;
      y = 7;
    }

    this.block = {
      amount,
      x,
      y,
    };

    this.width = 50 * this.block.amount;
    this.height = 50;
    this.position.y -= this.height;
  }

  draw(): void {
    if (!ctx) return;

    ctx.drawImage(
      this.image,
      24 * this.block.x,
      24 * this.block.y,
      24 * this.block.amount,
      24,
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
    if (mapMovingRight) {
      // Player moving to right
      this.position.x -= config.player.velocity.x;
    } else if (mapMovingLeft) {
      // Player moving to left
      this.position.x += config.player.velocity.x;
    }

    this.draw();
  }
}
