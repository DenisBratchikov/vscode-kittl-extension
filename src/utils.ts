import { workspace, window } from 'vscode';
import * as fs from 'fs';
import { IConfig } from '.';
import { ERRORS, PROMPT_MSG, PATH_REG_EXP } from './constants';

export async function getConfig(rootFolder: string | undefined): Promise<IConfig | never> {
  let rootPath: string | undefined = rootFolder;
  if (!rootPath) {
    const folders = workspace.workspaceFolders;
    if (!folders) {
      showError(new Error(ERRORS.emptyWorkspace));
      rootPath = await getPathWithUserPrompt(PROMPT_MSG.rootFolder, true);
    } else if (folders.length > 1) {
      showError(new Error(ERRORS.severalWorkspaces));
      rootPath = await getPathWithUserPrompt(PROMPT_MSG.rootFolder, true);
    } else {
      rootPath = folders[0].uri.path;
    }
  }

  const filePath = await geFilePath();

  return {
    rootPath,
    filePath
  };
}

async function getPathWithUserPrompt(placeholder: string, checkExistence?: boolean): Promise<string | never> {
  const userInput: string | undefined = await window.showInputBox({ placeHolder: placeholder });
  if (!userInput || !userInput.trim()) {
    throw new Error(ERRORS.emptyInput);
  }
  if (checkExistence && !fs.existsSync(userInput)) {
    throw new Error(ERRORS.invalidInput);
  }
  return userInput;
}

export async function geFilePath(): Promise<string | never> {
  const componentPath = await getPathWithUserPrompt(PROMPT_MSG.filePath);
  return getCheckedPath(componentPath);
}

function getCheckedPath(path: string): never | string {
  if (!PATH_REG_EXP.test(path)) {
    throw new Error(ERRORS.invalidPath);
  }
  return path.replace(/\s/g, '');
}

export function showError(error: Error | null): void {
  if (error) {
    window.showErrorMessage(error.message);
  }
}

export function errorDecorator(cb: Function): (err: NodeJS.ErrnoException | null) => void {
  return (error: Error | null) => {
    if (error) {
      showError(error);
    } else {
      cb();
    }
  };
}
