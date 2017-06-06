/*
  Gulpfile.js
  ===========
  Plutôt que de gérer un fichier de configuration géant
	On divise chaque tâches dans son propre fichier dans gulpfile/tasks
*/

import { getPathConfig } from './gulpfile/util/tools';
global.PATH_CONFIG = getPathConfig();

import { taskConfig } from './gulpfile/util/tools';
global.TASK_CONFIG = taskConfig;

import requireDir from 'require-dir';

requireDir('./gulpfile/tasks', { recurse: true });
