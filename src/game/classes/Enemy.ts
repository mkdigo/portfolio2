import { Emblem } from './Emblem';
import { createImage, useCanvas } from '../helpers';
import { TXY, TXYWH } from '../../types';
import config from '../config';

import goblinIdleImg from '../assets/enemies/goblin/idle.png';
import goblinAttackImg from '../assets/enemies/goblin/attack.png';
import goblinTakeHitImg from '../assets/enemies/goblin/takeHit.png';
import goblinDeathImg from '../assets/enemies/goblin/death.png';

import flyingEyeIdleImg from '../assets/enemies/flyingEye/idle.png';
import flyingEyeAttackImg from '../assets/enemies/flyingEye/attack.png';
import flyingEyeTakeHitImg from '../assets/enemies/flyingEye/takeHit.png';
import flyingEyeDeathImg from '../assets/enemies/flyingEye/death.png';

import mushroomIdleImg from '../assets/enemies/mushroom/idle.png';
import mushroomAttackImg from '../assets/enemies/mushroom/attack.png';
import mushroomTakeHitImg from '../assets/enemies/mushroom/takeHit.png';
import mushroomDeathImg from '../assets/enemies/mushroom/death.png';

import skeletonIdleImg from '../assets/enemies/skeleton/idle.png';
import skeletonAttackImg from '../assets/enemies/skeleton/attack.png';
import skeletonTakeHitImg from '../assets/enemies/skeleton/takeHit.png';
import skeletonDeathImg from '../assets/enemies/skeleton/death.png';

const { ctx } = useCanvas();

type TEnemy = {
  position: TXY;
  width: number;
  height: number;
  image: 'goblin' | 'flyingEye' | 'mushroom' | 'skeleton';
  emblem: Emblem;
};

type TImage = {
  frame: TXYWH;
  hitBox: {
    rightOffsetX: number;
    rightOffsetY: number;
    leftOffsetX: number;
    leftOffsetY: number;
  };
  attackHitBox: {
    rightOffsetX: number;
    rightOffsetY: number;
    leftOffsetX: number;
    leftOffsetY: number;
  };
  idle: {
    image: HTMLImageElement;
    amount: number;
  };
  attack: {
    image: HTMLImageElement;
    amount: number;
  };
  takeHit: {
    image: HTMLImageElement;
    amount: number;
  };
  death: {
    image: HTMLImageElement;
    amount: number;
  };
};

export class Enemy {
  position: TXY;
  width: number;
  height: number;
  emblem: Emblem;
  velocity: TXY;
  image: 'goblin' | 'flyingEye' | 'mushroom' | 'skeleton';
  images: {
    goblin: TImage;
    flyingEye: TImage;
    mushroom: TImage;
    skeleton: TImage;
  };
  frame: {
    current: number;
    hold: number;
    x: number;
    y: number;
    w: number;
    h: number;
    image: HTMLImageElement;
    amount: number;
  };
  flipImage: boolean;
  health: number;
  isInvulnerable: boolean;
  isDeath: boolean;
  isAttacking: boolean;
  hitBox: TXYWH;
  attackHitBox: TXYWH;

  constructor({ position, width, height, image, emblem }: TEnemy) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.image = image;
    this.velocity = {
      x: 3,
      y: 0,
    };
    this.images = {
      goblin: {
        frame: {
          x: 28,
          y: 1,
          w: 100,
          h: 100,
        },
        hitBox: {
          rightOffsetX: 0.42,
          rightOffsetY: 0.67,
          leftOffsetX: 0.42,
          leftOffsetY: 0.67,
        },
        attackHitBox: {
          rightOffsetX: 0.08,
          rightOffsetY: 0.67,
          leftOffsetX: 0.08,
          leftOffsetY: 0.67,
        },
        idle: {
          image: createImage(goblinIdleImg),
          amount: 4,
        },
        attack: {
          image: createImage(goblinAttackImg),
          amount: 8,
        },
        takeHit: {
          image: createImage(goblinTakeHitImg),
          amount: 4,
        },
        death: {
          image: createImage(goblinDeathImg),
          amount: 4,
        },
      },
      flyingEye: {
        frame: {
          x: 54,
          y: 50,
          w: 50,
          h: 50,
        },
        hitBox: {
          rightOffsetX: 0.28,
          rightOffsetY: 0.2,
          leftOffsetX: 0.28,
          leftOffsetY: 0.2,
        },
        attackHitBox: {
          rightOffsetX: 0.15,
          rightOffsetY: 0.3,
          leftOffsetX: 0.15,
          leftOffsetY: 0.3,
        },
        idle: {
          image: createImage(flyingEyeIdleImg),
          amount: 4,
        },
        attack: {
          image: createImage(flyingEyeAttackImg),
          amount: 8,
        },
        takeHit: {
          image: createImage(flyingEyeTakeHitImg),
          amount: 4,
        },
        death: {
          image: createImage(flyingEyeDeathImg),
          amount: 4,
        },
      },
      mushroom: {
        frame: {
          x: 0,
          y: -50,
          w: 150,
          h: 150,
        },
        hitBox: {
          rightOffsetX: 0.44,
          rightOffsetY: 0.77,
          leftOffsetX: 0.44,
          leftOffsetY: 0.77,
        },
        attackHitBox: {
          rightOffsetX: 0.3,
          rightOffsetY: 0.8,
          leftOffsetX: 0.3,
          leftOffsetY: 0.8,
        },
        idle: {
          image: createImage(mushroomIdleImg),
          amount: 4,
        },
        attack: {
          image: createImage(mushroomAttackImg),
          amount: 8,
        },
        takeHit: {
          image: createImage(mushroomTakeHitImg),
          amount: 4,
        },
        death: {
          image: createImage(mushroomDeathImg),
          amount: 4,
        },
      },
      skeleton: {
        frame: {
          x: 0,
          y: -50,
          w: 150,
          h: 150,
        },
        hitBox: {
          rightOffsetX: 0.4,
          rightOffsetY: 0.66,
          leftOffsetX: 0.4,
          leftOffsetY: 0.66,
        },
        attackHitBox: {
          rightOffsetX: 0.0,
          rightOffsetY: 0.65,
          leftOffsetX: 0.0,
          leftOffsetY: 0.65,
        },
        idle: {
          image: createImage(skeletonIdleImg),
          amount: 4,
        },
        attack: {
          image: createImage(skeletonAttackImg),
          amount: 8,
        },
        takeHit: {
          image: createImage(skeletonTakeHitImg),
          amount: 4,
        },
        death: {
          image: createImage(skeletonDeathImg),
          amount: 4,
        },
      },
    };
    this.frame = {
      current: 0,
      hold: 9,
      x: this.images[this.image].frame.x,
      y: this.images[this.image].frame.y,
      w: this.images[this.image].frame.w,
      h: this.images[this.image].frame.h,
      image: this.images[this.image].idle.image,
      amount: this.images[this.image].idle.amount,
    };
    this.flipImage = true;
    this.health = 100;
    this.isInvulnerable = false;
    this.isDeath = false;
    this.isAttacking = false;
    this.hitBox = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
    this.attackHitBox = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
    this.emblem = emblem;
  }

  setHitBox(): void {
    let offsetX = this.images[this.image].hitBox.rightOffsetX;
    let offsetY = this.images[this.image].hitBox.rightOffsetY;
    if (this.flipImage) offsetX = this.images[this.image].hitBox.leftOffsetX;
    if (this.flipImage) offsetY = this.images[this.image].hitBox.leftOffsetY;

    this.hitBox = {
      x: this.position.x + this.width * offsetX,
      y: this.position.y + this.height * offsetY,
      w: this.width - this.width * offsetX * 2,
      h: this.height * (1 - offsetY),
    };
  }

  setAttackHitBox(): void {
    let offsetX = this.images[this.image].attackHitBox.rightOffsetX;
    let offsetY = this.images[this.image].attackHitBox.rightOffsetY;
    if (this.flipImage)
      offsetX = this.images[this.image].attackHitBox.leftOffsetX;
    if (this.flipImage)
      offsetY = this.images[this.image].attackHitBox.leftOffsetY;

    this.attackHitBox = {
      x: this.position.x + this.width * offsetX,
      y: this.position.y + this.height * offsetY,
      w: this.width - this.width * offsetX * 2,
      h: this.height * (1 - offsetY),
    };
  }

  damage(hp: number): void {
    if (this.isInvulnerable === false) {
      this.isInvulnerable = true;
      if (this.health - hp > 0) {
        this.health -= hp;
        this.frame.image = this.images[this.image].takeHit.image;
        this.frame.amount = this.images[this.image].takeHit.amount;
      } else {
        this.health = 0;
        this.isDeath = true;
        this.frame.image = this.images[this.image].death.image;
        this.frame.amount = this.images[this.image].death.amount;
      }
      this.frame.current = 0;
      this.frame.hold = 12;
    }
  }

  attack(): void {
    this.isAttacking = true;
    this.frame.image = this.images[this.image].attack.image;
    this.frame.amount = this.images[this.image].attack.amount;
    this.frame.current = 0;
  }

  draw(): void {
    if (!ctx) return;

    // Render Health
    ctx.fillStyle = '#900';
    ctx.fillRect(this.hitBox.x, this.hitBox.y - 20, this.hitBox.w, 5);
    ctx.fillStyle = '#090';
    ctx.fillRect(
      this.hitBox.x,
      this.hitBox.y - 20,
      (this.hitBox.w * this.health) / 100,
      5
    );

    // Render Enemy
    ctx.save();
    if (this.flipImage) ctx.scale(-1, 1);
    ctx.drawImage(
      this.frame.image,
      this.frame.x + 150 * this.frame.current,
      this.frame.y,
      this.frame.w,
      this.frame.h,
      this.flipImage ? -this.position.x - this.width : this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    ctx.restore();
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
    this.setHitBox();
    this.setAttackHitBox();

    if (!this.emblem.isFixed) {
      this.emblem.position.x = this.hitBox.x;
      this.emblem.position.y = this.hitBox.y;
    }

    if (mapMovingLeft) {
      this.position.x += config.player.velocity.x;
    } else if (mapMovingRight) {
      this.position.x -= config.player.velocity.x;
    }

    if (animationId % this.frame.hold === 0) this.frame.current++;

    if (animationId % 150 === 0 && !this.isAttacking && !this.isDeath)
      this.attack();

    if (this.frame.current >= this.frame.amount) {
      this.frame.current = 0;
      if ((this.isInvulnerable && !this.isDeath) || this.isAttacking) {
        this.isInvulnerable = false;
        this.isAttacking = false;
        this.frame.hold = 9;
        this.frame.image = this.images[this.image].idle.image;
        this.frame.amount = this.images[this.image].idle.amount;
      }
      if (this.isDeath) this.frame.current = this.frame.amount - 1;
    }

    this.draw();
  }
}
