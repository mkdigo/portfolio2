import './styles/style.scss';
import './styles/header.scss';
import './styles/game.scss';
import './styles/skills.scss';
import './styles/projects.scss';
import './styles/profile.scss';

import './game';

import { getAge } from './helpers';

const ageBox = document.querySelector('#ageBox');

if (ageBox) ageBox.innerHTML = String(getAge('1985-06-20'));
