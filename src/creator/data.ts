import { IInsertionData } from '.';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export function getComponentData({ fileName }: IInsertionData): string {
  return [
    `import React from 'react';`,
    '',
    `import {} from './styles';`,
    `import { ${fileName}Props } from './types';`,
    '',
    `const ${fileName}: React.FC<${fileName}Props> = () => {`,
    '  return <div />;',
    '};',
    '',
    `export default ${fileName};`,
    ''
  ].join('\n');
}

export function getComponentTypesData({ fileName }: IInsertionData): string {
  return `export interface ${fileName}Props {}\n`;
}

export function getComponentStylesData(): string {
  return `import styled from 'styled-components';\n`;
}

export function getComponentStoriesData({ fileName }: IInsertionData, folderName: string): string {
  return [
    `import type { Meta, StoryObj } from '@storybook/react';`,
    '',
    `import ${fileName} from './${fileName}';`,
    '',
    `const meta: Meta<typeof ${fileName}> = {`,
    `  title: '${folderName}/${fileName}',`,
    `  component: ${fileName},`,
    '};',
    '',
    `export default meta;`,
    '',
    `type Story = StoryObj<typeof ${fileName}>;`,
    '',
    `export const Default: Story = {};`,
    ''
  ].join('\n');
}

export function getComponentTestData({ fileName }: IInsertionData): string {
  return [
    `import { render } from '@testing-library/react';`,
    `import '@testing-library/jest-dom';`,
    '',
    `import ${fileName} from './${fileName}';`,
    '',
    `describe('${fileName}', () => {`,
    `  it('should render', () => {`,
    `    const { container } = render(<${fileName} />);`,
    `    expect(container).toBeInTheDocument();`,
    '  });',
    '});',
    ''
  ].join('\n');
}

export function getStoreStateData({ fileName }: IInsertionData): string {
  return [
    `import { StateCreator } from 'zustand';`,
    '',
    `import { ${capitalize(fileName)} } from './types';`,
    '',
    `const initialState = {};`,
    '',
    `export const ${fileName}StateCreator: StateCreator<${capitalize(fileName)}> = (`,
    `  set,`,
    `  get`,
    `) => ({`,
    `  ...initialState,`,
    '',
    `  actions: {},`,
    `});`,
    ''
  ].join('\n');
}

export function getStoreSelectorData({ fileName }: IInsertionData): string {
  return [
    `import { ${capitalize(fileName)}, Selector } from './types';`,
    '',
    `export const ${fileName}Selector: Selector<${capitalize(fileName)}> = {`,
    `  actions: (state) => state.actions,`,
    `};`,
    ''
  ].join('\n');
}

export function getStoreIndexData({ fileName }: IInsertionData): string {
  return [
    `import { create } from 'zustand';`,
    `import { subscribeWithSelector } from 'zustand/middleware';`,
    '',
    `import { ${fileName}StateCreator } from './${fileName}';`,
    '',
    `export * from './selector';`,
    '',
    `export const use${capitalize(fileName)} = create(`,
    `  subscribeWithSelector(${fileName}StateCreator)`,
    `);`,
    ''
  ].join('\n');
}

export function getStoreTypesData({ fileName }: IInsertionData): string {
  return [
    `interface ${capitalize(fileName)}Actions {}`,
    '',
    `export interface ${capitalize(fileName)} {`,
    `  actions: ${capitalize(fileName)}Actions;`,
    `}`,
    '',
    `export type Selector<T> = {`,
    `  [K in keyof T]: (state: T) => T[K];`,
    `};`,
    ''
  ].join('\n');
}
