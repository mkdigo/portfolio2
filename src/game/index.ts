import { Char } from './classes/Char';
import { Background } from './classes/Background';
import { Tileset } from './classes/Tileset';
import { Emblem } from './classes/Emblem';
import { Enemy } from './classes/Enemy';
import { Decoration, TImageIndex } from './classes/Decoration';

import { collision, createImage, useCanvas } from './helpers';
import { TKeys } from '../types/index';
import config from './config';

import bg1Img from './assets/background/1.png';
import bg2Img from './assets/background/2.png';
import bg3Img from './assets/background/3.png';

import htmlImg from './assets/emblems/html.png';
import cssImg from './assets/emblems/css.png';
import jsImg from './assets/emblems/js.png';
import tsImg from './assets/emblems/ts.png';
import reactImg from './assets/emblems/react.png';
import phpImg from './assets/emblems/php.png';
import mysqlImg from './assets/emblems/mysql.png';
import laravelImg from './assets/emblems/laravel.png';
import githubImg from './assets/emblems/github.png';

const { canvas } = useCanvas();

if (canvas) {
  canvas.width = 900;
  canvas.height = 560;
}

var player: Char;
var enemies: Enemy[] = [];
var backgrounds: Background[] = [];
var decorations: Decoration[] = [];
var tilesets: Tileset[] = [];
var emblems: Emblem[] = [];
var mapSize: number = 0;
var mapPosition: number = 0;
var mapMovingRight: boolean = false;
var mapMovingLeft: boolean = false;
var emblemPosition: number = 10;

function gameStart() {
  player = new Char({
    position: {
      x: 200,
      y: 50,
    },
  });

  enemies = [
    new Enemy({
      position: {
        x: 1800,
        y: 50,
      },
      width: 210,
      height: 210,
      image: 'goblin',
      emblem: new Emblem({
        position: {
          x: 330,
          y: (canvas?.height ?? 0) - 150,
        },
        image: createImage(jsImg),
        scale: 1,
        fixedPositionY: 0,
      }),
    }),
    new Enemy({
      position: {
        x: 2550,
        y: 50,
      },
      width: 95,
      height: 95,
      image: 'flyingEye',
      emblem: new Emblem({
        position: {
          x: 550,
          y: (canvas?.height ?? 0) - 150,
        },
        image: createImage(tsImg),
        scale: 1,
        fixedPositionY: 0,
      }),
    }),
    new Enemy({
      position: {
        x: 3000,
        y: 50,
      },
      width: 300,
      height: 300,
      image: 'mushroom',
      emblem: new Emblem({
        position: {
          x: 650,
          y: (canvas?.height ?? 0) - 150,
        },
        image: createImage(mysqlImg),
        scale: 1,
        fixedPositionY: 0,
      }),
    }),
    new Enemy({
      position: {
        x: 4300,
        y: 50,
      },
      width: 300,
      height: 300,
      image: 'skeleton',
      emblem: new Emblem({
        position: {
          x: 750,
          y: (canvas?.height ?? 0) - 150,
        },
        image: createImage(laravelImg),
        scale: 1,
        fixedPositionY: 0,
      }),
    }),
  ];

  backgrounds = [
    new Background({
      velocity: {
        x: 1,
        y: 0,
      },
      image: createImage(bg1Img),
    }),
    new Background({
      velocity: {
        x: 2,
        y: 0,
      },
      image: createImage(bg2Img),
    }),
    new Background({
      velocity: {
        x: 3,
        y: 0,
      },
      image: createImage(bg3Img),
    }),
  ];

  const addDecoration = ({
    image,
    size,
    gap,
  }: {
    image: TImageIndex;
    size: number;
    gap?: number;
  }): void => {
    if (!canvas) return;
    if (!gap) gap = 0;

    decorations.push(
      new Decoration({
        position: {
          x: mapSize + gap,
          y: canvas.height - size - 50,
        },
        image,
        size,
      })
    );
  };

  const addGround = ({ gap, up }: { gap?: number; up?: number }): void => {
    if (!canvas) return;
    // max gap: 180
    if (!gap) gap = 0;
    if (!up) up = 0;

    tilesets.push(
      new Tileset({
        element: 'ground',
        position: {
          x: mapSize + gap,
          y: canvas.height - up,
        },
      })
    );
    mapSize += 50 * 3 - 2 + gap;
  };

  const addEmblem = ({
    gap,
    up,
    imageUrl,
    scale,
    fixedPositionY,
  }: {
    gap?: number;
    up?: number;
    imageUrl: string;
    scale?: number;
    fixedPositionY?: number;
  }): void => {
    if (!canvas) return;
    if (!gap) gap = 0;
    if (!up) up = 150;
    else up = up + 150;
    if (!scale) scale = 1;

    emblems.push(
      new Emblem({
        position: {
          x: mapSize + gap,
          y: canvas.height - up,
        },
        image: createImage(imageUrl),
        scale,
        fixedPositionY,
      })
    );
  };

  // // Create Map
  addDecoration({ image: 'shop', size: 300, gap: 20 });
  addGround({});
  addGround({});
  addDecoration({ image: 'sign', size: 70, gap: 60 });
  addGround({});
  addDecoration({ image: 'rock3', size: 80, gap: 110 });
  addGround({ gap: 100 });
  addDecoration({ image: 'lamp', size: 120, gap: 50 });
  addEmblem({
    imageUrl: htmlImg,
    gap: -35,
    fixedPositionY: 7,
    scale: 1.25,
  });
  addGround({});
  addGround({ gap: 100, up: 50 });
  addGround({ gap: 100, up: 150 });
  addEmblem({
    imageUrl: cssImg,
    gap: 80,
    up: 260,
    fixedPositionY: 7,
    scale: 1.25,
  });
  addGround({ gap: 180 });
  addDecoration({ image: 'rock1', size: 40, gap: -100 });
  addDecoration({ image: 'rock2', size: 50, gap: -50 });
  addDecoration({ image: 'lamp', size: 120, gap: 50 });
  addGround({});
  addGround({});
  addGround({});
  addGround({});
  addGround({});
  addDecoration({ image: 'rock1', size: 40, gap: 0 });
  addDecoration({ image: 'rock2', size: 50, gap: 60 });
  addGround({ gap: -150, up: 150 });
  addGround({});
  addGround({ gap: -150, up: 150 });
  addEmblem({ imageUrl: reactImg, up: -30, gap: 80 });
  addGround({});
  addGround({ gap: -150, up: 150 });
  addDecoration({ image: 'rock3', size: 80, gap: 200 });
  addGround({ gap: 180 });
  addGround({});
  addDecoration({ image: 'lamp', size: 120, gap: 50 });
  addGround({});
  addGround({ gap: 100, up: 100 });
  addGround({ gap: 100, up: 200 });
  addEmblem({ imageUrl: phpImg, gap: 80, up: 260 });
  addGround({ gap: 180 });
  addDecoration({ image: 'rock1', size: 40, gap: 0 });
  addDecoration({ image: 'rock2', size: 50, gap: 50 });
  addGround({});
  addGround({});
  addGround({});
  addEmblem({ imageUrl: githubImg });
  addDecoration({ image: 'rock3', size: 80, gap: 0 });
  addGround({});
  addDecoration({ image: 'lamp', size: 120, gap: 50 });
  addGround({});
  addDecoration({ image: 'shop', size: 300 });
  addGround({});
  addGround({});
  addDecoration({ image: 'lamp', size: 120, gap: 50 });
  addGround({});

  animate();
}

const playerKeys: TKeys = {
  a: {
    // Left
    pressed: false,
  },
  d: {
    // Right
    pressed: false,
  },
  k: {
    // Attack
    pressed: false,
  },
  j: {
    // Jump
    pressed: false,
  },
};

function animate() {
  if (!canvas) return;

  const animationId = requestAnimationFrame(animate);

  // Map moviment
  mapMovingLeft = false;
  mapMovingRight = false;
  if (
    mapPosition < mapSize - canvas.width &&
    playerKeys.d.pressed &&
    player.position.x >= canvas.width / 2 &&
    !player.isAttacking
  ) {
    // Player moving to right
    mapPosition += config.player.velocity.x;
    mapMovingRight = true;
  } else if (
    mapPosition > 0 &&
    playerKeys.a.pressed &&
    player.position.x <= 50 &&
    !player.isAttacking
  ) {
    // Player moving to left
    mapPosition -= config.player.velocity.x;
    mapMovingLeft = true;
  }

  // Gravity
  player.position.y += player.velocity.y;
  player.velocity.y += config.gravity;

  enemies.forEach((enemy) => {
    enemy.position.y += enemy.velocity.y;
    enemy.velocity.y += config.gravity;
  });

  //Backgrounds
  backgrounds.forEach((background) => {
    background.update({ mapMovingLeft, mapMovingRight });
  });

  decorations.forEach((decoration) => {
    decoration.update({ mapMovingLeft, mapMovingRight, animationId });
  });

  // Tilesets
  tilesets.forEach((tileset) => {
    tileset.update({ mapMovingLeft, mapMovingRight });

    // Player collision
    if (
      player.position.y + player.height + player.velocity.y >=
        tileset.position.y + 2 &&
      player.position.y + player.height + player.velocity.y <=
        tileset.position.y + 30 &&
      player.hitBox.x + player.hitBox.w >= tileset.position.x &&
      player.hitBox.x <= tileset.position.x + tileset.width
    ) {
      player.velocity.y = 0;
      player.position.y = tileset.position.y - player.height + 3;
      player.isJumping = false;
    }

    if (
      player.isJumping &&
      player.hitBox.y < tileset.position.y + tileset.height &&
      player.hitBox.y > tileset.position.y &&
      player.hitBox.x + player.hitBox.w >= tileset.position.x &&
      player.hitBox.x <= tileset.position.x + tileset.width
    )
      player.velocity.y = 3;

    // Enemy collision
    enemies.forEach((enemy) => {
      if (
        enemy.position.y + enemy.height + enemy.velocity.y >=
          tileset.position.y &&
        enemy.hitBox.x + enemy.hitBox.w >= tileset.position.x &&
        enemy.hitBox.x <= tileset.position.x + tileset.width
      ) {
        enemy.velocity.y = 0;
      }
    });
  });

  // Emblems
  emblems.forEach((emblem) => {
    emblem.update({ mapMovingLeft, mapMovingRight });

    // Player collision
    if (
      collision({
        ax: player.hitBox.x,
        ay: player.hitBox.y,
        aw: player.hitBox.w,
        ah: player.hitBox.h,
        bx: emblem.position.x,
        by: emblem.position.y,
        bw: emblem.width,
        bh: emblem.height,
      }) &&
      !emblem.isFixed
    ) {
      emblem.get(emblemPosition);
      emblemPosition += emblem.width + 10;
    }
  });

  //Enemies
  enemies.forEach((enemy) => {
    let damageDash = -5;

    if (!enemy.isDeath) {
      if (
        player.position.x + player.width / 2 >
        enemy.position.x + enemy.width / 2
      ) {
        enemy.flipImage = false;
        damageDash = 5;
      } else enemy.flipImage = true;
    }

    // Enemy attack collison
    if (
      enemy.isAttacking &&
      enemy.frame.current === enemy.frame.amount / 2 + 1 &&
      !player.isInvulnerable &&
      collision({
        ax: enemy.attackHitBox.x,
        ay: enemy.attackHitBox.y,
        aw: enemy.attackHitBox.w,
        ah: enemy.attackHitBox.h,
        bx: player.hitBox.x,
        by: player.hitBox.y,
        bw: player.hitBox.w,
        bh: player.hitBox.h,
      })
    ) {
      player.damage({ damageDash, hp: 25 });
    }

    // Player attack collision
    if (
      player.isAttacking &&
      !enemy.isInvulnerable &&
      collision({
        ax: player.attackHitBox.x,
        ay: player.attackHitBox.y,
        aw: player.attackHitBox.w,
        ah: player.attackHitBox.h,
        bx: enemy.hitBox.x,
        by: enemy.hitBox.y,
        bw: enemy.hitBox.w,
        bh: enemy.hitBox.h,
      })
    ) {
      enemy.damage(25);
    }

    if (enemy.isDeath) {
      if (!enemy.emblem.isFixed) {
        enemy.emblem.get(emblemPosition);
        emblemPosition += enemy.emblem.width + 10;
      }
      enemy.emblem.update({ mapMovingLeft, mapMovingRight });
    }

    enemy.update({
      animationId,
      mapMovingLeft,
      mapMovingRight,
    });
  });

  if (mapPosition >= 4428) player.win = true;
  player.update({ animationId, keys: playerKeys });
}

gameStart();

const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#right');
const jumpButton = document.querySelector('#jump');
const attackButton = document.querySelector('#attack');

document.addEventListener('keydown', ({ key }) => {
  if (key === 'a') {
    playerKeys.a.pressed = true;
    leftButton?.classList.add('press');
  }
  if (key === 'd') {
    playerKeys.d.pressed = true;
    rightButton?.classList.add('press');
  }
  if (key === 'j') {
    playerKeys.j.pressed = true;
    jumpButton?.classList.add('press');
  }
  if (key === 'k') {
    playerKeys.k.pressed = true;
    attackButton?.classList.add('press');
  }
});

document.addEventListener('keyup', ({ key }) => {
  if (key === 'a') {
    playerKeys.a.pressed = false;
    leftButton?.classList.remove('press');
  }
  if (key === 'd') {
    playerKeys.d.pressed = false;
    rightButton?.classList.remove('press');
  }
  if (key === 'j') {
    playerKeys.j.pressed = false;
    jumpButton?.classList.remove('press');
  }
  if (key === 'k') {
    playerKeys.k.pressed = false;
    attackButton?.classList.remove('press');
  }
});

leftButton?.addEventListener('mousedown', () => {
  playerKeys.a.pressed = true;
});

leftButton?.addEventListener('mouseup', () => {
  playerKeys.a.pressed = false;
});

rightButton?.addEventListener('mousedown', () => {
  playerKeys.d.pressed = true;
});

rightButton?.addEventListener('mouseup', () => {
  playerKeys.d.pressed = false;
});

jumpButton?.addEventListener('mousedown', () => {
  playerKeys.j.pressed = true;
});

jumpButton?.addEventListener('mouseup', () => {
  playerKeys.j.pressed = false;
});

attackButton?.addEventListener('mousedown', () => {
  playerKeys.k.pressed = true;
});

attackButton?.addEventListener('mouseup', () => {
  playerKeys.k.pressed = false;
});
