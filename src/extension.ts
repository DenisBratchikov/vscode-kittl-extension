import * as vscode from 'vscode';
import Creator from './creator/creator';
import { showError, getConfig } from './utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const createComponent = vscode.commands.registerCommand('extension.createComponent', (folder) => {
    // The code you place here will be executed every time your command is executed

    getConfig(folder?.fsPath)
      .then((cfg) => new Creator(cfg).execute())
      .catch(showError);
  });

  const createLibComponent = vscode.commands.registerCommand('extension.createLibComponent', (folder) => {
    // The code you place here will be executed every time your command is executed

    getConfig(folder?.fsPath)
      .then((cfg) => new Creator(cfg, 'lib').execute())
      .catch(showError);
  });

  const createStore = vscode.commands.registerCommand('extension.createStore', (folder) => {
    // The code you place here will be executed every time your command is executed

    getConfig(folder?.fsPath)
      .then((cfg) => new Creator(cfg, 'store').execute())
      .catch(showError);
  });

  context.subscriptions.push(createComponent, createLibComponent, createStore);
}

// this method is called when your extension is deactivated
export function deactivate() {}
