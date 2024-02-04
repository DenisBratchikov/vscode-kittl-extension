# VSCode Extension. File Structure Creator for React with Kittl company standards

This extension allows you to create react component file structure with one command. It gets file name and path (optionally) from prompt dialog and creates folders and files with some preset code.

## Usage

The extension can be activated both via command palette and via folder context menu in VSCode file explorer. There are three commands for creating file structure:
* Create component
* Create ui lib component (basic component with mandatory tests and stories)
* Create store

In both commands you will be asked for a path to the file / file name. You may specify either relative path from the current workspace (e.g. **Header/Profile/Avatar**) or just a file name (e.g. **Grid**). In first case, the whole structure will be created (**/Header/Profile/Avatar/Avatar.tsx**), in second case only one folder with the file will be created (**/Grid/Grid.tsx**).

## Installation

You can download the extension from the VSCode marketplace [here](https://marketplace.visualstudio.com/items?itemName=DenisBratchikov.kittl-dev-kit).

## License

File Structure Creator is released under the [MIT License](https://github.com/DenisBratchikov/vscode-kittl-extension/blob/master/LICENSE).

## Release

### 1.0.0

* Create extenstion
