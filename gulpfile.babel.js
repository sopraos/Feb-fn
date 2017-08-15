/*
  Gulpfile.js
  ===========
  Plutôt que de gérer un fichier de configuration géant
	On divise chaque tâches dans son propre fichier dans gulpfile/tasks
*/

import path from 'path';
import requireDir from 'require-dir';

// Fallback pour windows << '../../' >>
process.env.PWD = process.env.PWD || path.resolve(process.cwd(), '');

// Exposer globalement les objets config
import { getTaskConfig, getPathConfig } from './gulpfile/util/tools';
global.PATH_CONFIG = getPathConfig();
global.TASK_CONFIG = getTaskConfig();

// Exige toutes les tâches dans gulpfile/tasks, y compris les sous-dossiers
requireDir('./gulpfile/tasks', { recurse: true });
