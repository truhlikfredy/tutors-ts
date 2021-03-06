import * as fs from 'fs';
import * as path from 'path';
const glob = require('glob');
import {getImageFile, getParentFolder, readFileFromTree} from '../utils/futils';
import {getHeader, parse, parseWithoutHeader} from '../utils/mdutils';

export abstract class LearningObject {
  parent?: LearningObject;
  course: LearningObject;
  title: string;
  img: string;
  icon: string;
  link: string;
  folder: string;
  parentFolder: string;
  objectives: string;
  objectivesWithoutHeader: string;
  credits: string;
  gitterid: string;

  constructor(parent?: LearningObject) {
    if (parent) {
      this.parent = parent;
    }
  }

  reap(pattern: string): void {
    this.folder = path.basename(process.cwd());
    this.parentFolder = getParentFolder();
    this.img = getImageFile(pattern);
    this.credits = readFileFromTree('credits');
    this.gitterid = readFileFromTree('gitter');
    this.link = 'index.html';
    if (fs.existsSync(pattern + '.md')) {
      this.title = getHeader(pattern + '.md');
      this.objectives = parse(pattern + '.md');
      this.objectivesWithoutHeader = parseWithoutHeader(pattern + '.md');
    } else {
      this.title = pattern;
    }
  }

  abstract publish(path: string): void;
}

export abstract class CompositeLearningObject extends LearningObject {
  los: Array<LearningObject>;

  constructor(parent?: LearningObject) {
    super(parent);
  }
}
