import { createImage, useCanvas } from '../helpers';
import config from '../config';
import { TXY } from '../../types';

import shopImg from '../assets/decorations/shop_anim.png';
import lampImg from '../assets/decorations/lamp.png';
import signImg from '../assets/decorations/sign.png';
import fence1Img from '../assets/decorations/fence_1.png';
import rock1Img from '../assets/decorations/rock_1.png';
import rock2Img from '../assets/decorations/rock_2.png';
import rock3Img from '../assets/decorations/rock_3.png';

const { ctx } = useCanvas();

type TImage = {
  image: HTMLImageElement;
  frameAmount: number;
  hold: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type TImageIndex =
  | 'shop'
  | 'lamp'
  | 'sign'
  | 'fence1'
  | 'rock1'
  | 'rock2'
  | 'rock3';

type TDecoration = {
  position: TXY;
  image: TImageIndex;
  size: number;
};

export class Decoration {
  position: TXY;
  width: number;
  height: number;
  images: {
    shop: TImage;
    lamp: TImage;
    sign: TImage;
    fence1: TImage;
    rock1: TImage;
    rock2: TImage;
    rock3: TImage;
  };
  frame: {
    current: number;
    x: number;
    y: number;
    w: number;
    h: number;
    amount: number;
    image: HTMLImageElement;
    hold: number;
  };

  constructor({ position, image, size }: TDecoration) {
    this.position = position;
    this.width = size;
    this.height = size;

    this.images = {
      shop: {
        image: createImage(shopImg),
        frameAmount: 6,
        hold: 10,
        x: 0,
        y: 0,
        w: 118,
        h: 128,
      },
      lamp: {
        image: createImage(lampImg),
        frameAmount: 1,
        hold: 10,
        x: 0,
        y: 0,
        w: 57,
        h: 57,
      },
      sign: {
        image: createImage(signImg),
        frameAmount: 1,
        hold: 10,
        x: 0,
        y: 0,
        w: 31,
        h: 31,
      },
      fence1: {
        image: createImage(fence1Img),
        frameAmount: 1,
        hold: 10,
        x: 0,
        y: -54,
        w: 73,
        h: 73,
      },
      rock1: {
        image: createImage(rock1Img),
        frameAmount: 1,
        hold: 10,
        x: 0,
        y: -9,
        w: 20,
        h: 20,
      },
      rock2: {
        image: createImage(rock2Img),
        frameAmount: 1,
        hold: 10,
        x: 0,
        y: -15,
        w: 27,
        h: 27,
      },
      rock3: {
        image: createImage(rock3Img),
        frameAmount: 1,
        hold: 10,
        x: 0,
        y: -27,
        w: 45,
        h: 45,
      },
    };

    this.frame = {
      current: 0,
      x: this.images[image].x,
      y: this.images[image].y,
      w: this.images[image].w,
      h: this.images[image].h,
      amount: this.images[image].frameAmount,
      image: this.images[image].image,
      hold: this.images[image].hold,
    };
  }

  draw(): void {
    if (!ctx) return;

    ctx.drawImage(
      this.frame.image,
      this.frame.x + this.frame.w * this.frame.current + 0.5,
      this.frame.y,
      this.frame.w - 1,
      this.frame.h,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update({
    animationId,
    mapMovingLeft,
    mapMovingRight,
  }: {
    animationId: number;
    mapMovingLeft: boolean;
    mapMovingRight: boolean;
  }): void {
    if (mapMovingLeft) {
      this.position.x += config.player.velocity.x;
    } else if (mapMovingRight) {
      this.position.x -= config.player.velocity.x;
    }

    if (animationId % this.frame.hold === 0) this.frame.current++;
    if (this.frame.current >= this.frame.amount) this.frame.current = 0;
    this.draw();
  }
}
