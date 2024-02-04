export const enum ERRORS {
  emptyWorkspace = 'Can not define workspace folder. No worspace found.',
  severalWorkspaces = 'Can not define workspace folder, because you use several workspaces.',
  emptyInput = 'Input is empty.',
  invalidInput = 'Invalid input. Entered path does not exists.',
  invalidPath = 'Invalid && path or name. Expected letters, numbers, spaces, "_", "-", "\\", "/" symbols'
}

export const enum PROMPT_MSG {
  rootFolder = 'Enter an absolute path to the base folder (where the path starts)',
  filePath = 'Enter the file name (without extension) and (optionally) path with / or \\ (e.g. user/profile/Avatar or Avatar)'
}

// Regular expression for checking user input
export const PATH_REG_EXP = /^(\w|\d|_)+(\w|\d|\s|_|-|\/|\\)+?$/i;
