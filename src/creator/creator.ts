import * as path from 'path';
import * as fs from 'fs';

import {
  getComponentData,
  getComponentTypesData,
  getComponentStylesData,
  getComponentTestData,
  getComponentStoriesData,
  getStoreStateData,
  getStoreSelectorData,
  getStoreIndexData,
  getStoreTypesData
} from './data';
import { IConfig } from '..';
import { errorDecorator, showError } from '../utils';
import { ERRORS } from './constants';
import { IInsertionData, TCreationType } from '.';

/**
 * Creates folder with given path
 * @param {string} path Path with the folder name
 * @param {Function} callback Function, that will be called on success creation
 */
function createFolder(path: string, callback: Function): void {
  fs.access(path, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      fs.mkdir(path, errorDecorator(callback));
    } else {
      callback();
    }
  });
}

function createFoldersRecursively(root: string, folders: string[], cb: Function): void {
  if (!folders.length) {
    cb(root);
  }
  const folderPath = path.join(root, folders.shift() as string);
  createFolder(folderPath, () => createFoldersRecursively(folderPath, folders, cb));
}

/**
 * Creates file with given path and data
 * @param {string} path Path to the file
 * @param {string} data Data to write in the file
 * @param {Function} callback Function, that will be called on success creation
 */
function createFile(path: string, data: string, callback: Function): void {
  fs.access(path, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      fs.appendFile(path, data, errorDecorator(callback));
    } else {
      showError(new Error(ERRORS.fileAlreadyExists.replace('%%', path)));
    }
  });
}

/**
 * Class for creating a react files structure/
 */
export default class Creator {
  private readonly creationType: TCreationType;
  private readonly folders: string[];
  private readonly fileName: string;
  private readonly dataParams: IInsertionData;
  private rootPath: string;

  constructor(config: IConfig, creationType?: TCreationType) {
    const { dir, base } = path.parse(config.filePath);
    this.folders = path.normalize(dir).split(path.sep);
    this.fileName = base;
    this.creationType = creationType;
    this.dataParams = {
      fileName: this.fileName
    };
    this.rootPath = config.rootPath;
  }

  async execute(): Promise<void> {
    this.rootPath = await this._createFolders(this.rootPath, this.folders);

    if (this.creationType === 'store') {
      return this._creteStoreStructure();
    }
    return this._createComponentStructure();
  }

  private async _creteStoreStructure(): Promise<void> {
    this.rootPath = await this._createFolders(this.rootPath, [this.fileName]);
    await Promise.all([
      this._createFile(this.rootPath, `${this.fileName}.ts`, getStoreStateData(this.dataParams)),
      this._createFile(this.rootPath, 'selector.ts', getStoreSelectorData(this.dataParams)),
      this._createFile(this.rootPath, 'index.ts', getStoreIndexData(this.dataParams)),
      this._createFile(this.rootPath, 'types.ts', getStoreTypesData(this.dataParams))
    ]);
  }

  private async _createComponentStructure(): Promise<void> {
    const folderName = path.normalize(this.rootPath).split(path.sep).pop() ?? '';
    this.rootPath = await this._createFolders(this.rootPath, [this.fileName]);

    await Promise.all(
      [
        this._createFile(this.rootPath, `${this.fileName}.tsx`, getComponentData(this.dataParams)),
        this._createFile(this.rootPath, 'types.ts', getComponentTypesData(this.dataParams)),
        this._createFile(this.rootPath, 'styles.ts', getComponentStylesData())
      ].concat(
        this.creationType === 'lib'
          ? [
              this._createFile(this.rootPath, `${this.fileName}.test.tsx`, getComponentTestData(this.dataParams)),
              this._createFile(
                this.rootPath,
                `${this.fileName}.stories.tsx`,
                getComponentStoriesData(this.dataParams, folderName)
              )
            ]
          : []
      )
    );
  }

  /**
   * Recursively creates folders from root path
   * @param {string} root Path to the root folder
   * @param {string[]} folders Folder names to create
   */
  private async _createFolders(root: string, folders: string[]): Promise<string> {
    return new Promise((resolve) => createFoldersRecursively(root, folders, resolve));
  }

  /**
   * Creates file with given path and data
   * @param {string} root Path to the root folder (where we create file)
   * @param {string} name File name with extension
   * @param {string} data Data to write in the file
   */
  private async _createFile(root: string, name: string, data: string): Promise<void> {
    return new Promise((resolve) => createFile(path.join(root, name), data, resolve));
  }
}
