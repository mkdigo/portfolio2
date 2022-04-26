import { TKeys, TXY, TXYWH } from '../../types';
import config from '../config';
import { useCanvas, createImage } from '../helpers';

import playerImg from '../assets/player/1.png';

const { canvas, ctx } = useCanvas();

type TCharFrame = {
  amount: number;
  y: number;
};

export class Char {
  position: TXY;
  velocity: TXY;
  width: number;
  height: number;
  image: HTMLImageElement;
  flipImage: boolean;
  hitBox: TXYWH;
  attackHitBox: TXYWH;
  isJumping: boolean;
  isAttacking: boolean;
  isInvulnerable: boolean;
  isDeath: boolean;
  deathCount: number;
  health: number;
  damageDash: number;
  lastMove: string;
  win: boolean;
  frame: {
    size: TXY;
    idle: TCharFrame;
    attack: TCharFrame;
    run: TCharFrame;
    jump: TCharFrame;
    fall: TCharFrame;
    takeHit: TCharFrame;
    die1: TCharFrame;
    die2: TCharFrame;
    spellCast: TCharFrame;
    crouch: TCharFrame;
    defence: TCharFrame;
    hold: number;
    position: {
      x: number;
      y: number;
      amount: number;
    };
  };

  constructor({ position }: { position: TXY }) {
    this.position = position;
    this.velocity = {
      x: config.player.velocity.x,
      y: config.player.velocity.y,
    };
    this.width = 150;
    this.height = 150;

    (this.image = createImage(playerImg)), (this.flipImage = false);

    (this.frame = {
      hold: 6,
      position: {
        x: 0,
        y: 0,
        amount: 6,
      },
      size: {
        x: 56,
        y: 56,
      },
      idle: {
        amount: 6,
        y: 0,
      },
      attack: {
        amount: 8,
        y: 1,
      },
      run: {
        amount: 8,
        y: 2,
      },
      jump: {
        amount: 8,
        y: 3,
      },
      fall: {
        amount: 8,
        y: 4,
      },
      takeHit: {
        amount: 4,
        y: 5,
      },
      die1: {
        amount: 8,
        y: 6,
      },
      die2: {
        amount: 4,
        y: 7,
      },
      spellCast: {
        amount: 8,
        y: 8,
      },
      crouch: {
        amount: 3,
        y: 9,
      },
      defence: {
        amount: 3,
        y: 10,
      },
    }),
      (this.hitBox = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      });

    this.attackHitBox = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };

    this.isJumping = false;
    this.isAttacking = false;
    this.isInvulnerable = false;
    this.isDeath = false;
    this.deathCount = 0;
    this.health = 100;
    this.damageDash = -5;
    this.lastMove = '';
    this.win = false;

    this.setHitBox();
    this.setAttackHitBox();
  }

  setHitBox(): void {
    let offsetX = 0.33;
    let offsetY = 0;
    if (this.flipImage) offsetX = 0.39;
    if (this.isJumping) offsetY = 0.15;

    this.hitBox = {
      x: this.position.x + this.width * offsetX,
      y: this.position.y + this.height * 0.4 - this.height * offsetY,
      w: this.width * 0.28,
      h: this.height * 0.59,
    };
  }

  setAttackHitBox(): void {
    let offsetX = 0.33;
    if (this.flipImage) offsetX = 0.02;

    this.attackHitBox = {
      x: this.position.x + this.width * 1.7 * offsetX,
      y: this.position.y + this.height * 0.61,
      w: this.width * 0.4,
      h: this.height * 0.15,
    };
  }

  attack(): void {
    this.frame.position.y = this.frame.attack.y;
    this.frame.position.amount = this.frame.attack.amount;
  }

  damage({ damageDash, hp }: { damageDash: number; hp: number }): void {
    this.damageDash = damageDash;

    if (this.isInvulnerable === false) {
      this.isInvulnerable = true;

      if (this.health - hp > 0) {
        this.health -= hp;
        this.frame.position.y = this.frame.takeHit.y;
        this.frame.position.amount = this.frame.takeHit.amount;
      } else {
        this.health = 0;
        this.isDeath = true;
        this.deathCount++;
        this.frame.position.y = this.frame.die1.y;
        this.frame.position.amount = this.frame.die1.amount;
      }
      this.frame.position.x = 0;
    }
  }

  move(direction: string): void {
    if (this.isInvulnerable || this.isDeath || this.win) return;

    switch (direction) {
      case 'right':
        this.flipImage = false;

        if (canvas && this.position.x < canvas.width / 2)
          this.position.x += this.velocity.x;

        if (this.lastMove !== 'right') {
          this.lastMove = 'right';
          if (!this.isJumping) {
            this.frame.position.x = 0;
            this.frame.position.y = this.frame.run.y;
            this.frame.position.amount = this.frame.run.amount;
          }
        }
        break;
      case 'left':
        this.flipImage = true;

        if (this.position.x >= 50) this.position.x -= this.velocity.x;

        if (this.lastMove !== 'left') {
          this.lastMove = 'left';
          if (!this.isJumping) {
            this.frame.position.x = 0;
            this.frame.position.y = this.frame.run.y;
            this.frame.position.amount = this.frame.run.amount;
          }
        }
        break;
      case 'jump':
        if (this.velocity.y === 0) {
          this.isJumping = true;
          this.velocity.y = -17;
          this.frame.position.x = 0;

          if (this.lastMove !== 'jump') {
            this.lastMove = 'jump';
            this.frame.position.y = this.frame.jump.y;
            this.frame.position.amount = this.frame.jump.amount;
          }
        }
        break;
      case 'fall':
        if (this.lastMove !== 'fall') {
          this.lastMove = 'fall';
        }
        break;
      case 'attack':
        if (!this.isAttacking) {
          this.lastMove = 'attack';
          this.isAttacking = true;
          this.frame.position.x = 0;
          this.frame.position.y = this.frame.attack.y;
          this.frame.position.amount = this.frame.attack.amount;
        }
        break;
      default:
        this.lastMove = 'stop';
        this.frame.position.y = this.frame.idle.y;
        this.frame.position.amount = this.frame.idle.amount;
    }
  }

  draw(): void {
    if (ctx && canvas) {
      ctx.fillStyle = '#900';
      ctx.fillRect(canvas.width - 220, 20, 200, 25);
      ctx.fillStyle = '#090';
      ctx.fillRect(canvas.width - 220, 20, (200 * this.health) / 100, 25);

      ctx.fillStyle = '#fff';
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`Mortes: ${this.deathCount}`, canvas.width - 20, 70);

      ctx.save();
      if (this.flipImage) ctx.scale(-1, 1);
      ctx.drawImage(
        this.image,
        this.frame.size.x * this.frame.position.x,
        this.frame.size.y * this.frame.position.y + 1,
        this.frame.size.x,
        this.frame.size.y,
        this.flipImage ? -this.position.x - this.width : this.position.x,
        this.position.y,
        this.width,
        this.height
      );
      ctx.restore();
    }
  }

  update({ animationId, keys }: { animationId: number; keys: TKeys }): void {
    if (!canvas || !ctx) return;

    this.setHitBox();
    this.setAttackHitBox();

    if (this.hitBox.y > canvas.height) {
      this.isJumping = true;
      this.position.y = 0;
      this.position.x -= 200;
      this.velocity.y = 0;
      this.deathCount++;
      this.health = 0;
      setTimeout(() => {
        this.health = 100;
      }, 250);
    }

    // Moviments
    if (keys.k.pressed) this.move('attack');
    else if (keys.d.pressed && !this.isAttacking) this.move('right');
    else if (keys.a.pressed && !this.isAttacking) this.move('left');
    else {
      if (!this.isJumping && !this.isAttacking) this.move('stop');
    }

    if (keys.j.pressed && !this.isJumping) this.move('jump');

    if (this.isJumping && this.velocity.y > 0) {
      this.move('fall');
    }

    if (this.isInvulnerable) this.position.x += this.damageDash;

    if (this.win) {
      this.frame.position.y = this.frame.spellCast.y;
      this.frame.position.amount = this.frame.spellCast.amount;
      this.frame.hold = 12;

      ctx.textAlign = 'center';
      ctx.font = '24px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.fillText(
        'Você venceu essa fase, mas isso não significa que acabou.',
        canvas.width / 2,
        canvas.height / 2 - 70
      );
    }

    // Frames
    if (
      this.isJumping ||
      this.isAttacking ||
      this.isInvulnerable ||
      this.isDeath
    ) {
      if (this.frame.position.x < this.frame.position.amount - 1) {
        if (this.isJumping && !this.isAttacking) this.frame.position.x++;
        else if (animationId % this.frame.hold === 0) this.frame.position.x++;
      } else {
        this.isAttacking = false;
        this.isInvulnerable = false;
        this.lastMove = '';
      }

      if (
        this.isDeath &&
        this.frame.position.x === this.frame.position.amount - 1 &&
        this.frame.position.y === this.frame.die1.y
      ) {
        this.isInvulnerable = false;
        this.frame.position.x = 0;
        this.frame.position.y = this.frame.die2.y;
        this.frame.position.amount = this.frame.die2.amount;
        setTimeout(() => {
          this.isDeath = false;
          this.health = 100;
        }, 1500);
      }
    } else {
      if (animationId % this.frame.hold === 0) this.frame.position.x++;

      if (this.frame.position.x >= this.frame.position.amount)
        this.frame.position.x = 0;
    }

    this.draw();
  }
}
