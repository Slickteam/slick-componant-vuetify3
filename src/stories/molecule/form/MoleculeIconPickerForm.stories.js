import { MoleculeIconPickerForm } from '../../../components/molecule';

export default {
  title: 'Molecule/form/MoleculeIconPickerForm',
  component: MoleculeIconPickerForm,
  tags: ['docsPage'],
  args: {
    title: 'Click me',
  },
  argTypes: {
    // onClick: {},
    size: {
      control: {
        type: 'select',
      },
      options: ['x-small', 'small', 'default', 'large'],
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['outlined'],
    },
    color: {
      control: 'color',
    },
    icon: {
      control: {
        type: 'select',
      },
      options: ['mdi-home', 'mdi-'],
    },
    title: {
      control: 'text',
      description: 'Title accessibility in button',
    },
    to: {
      control: 'text',
    },
    href: {
      control: 'text',
    },
    target: {
      control: 'text',
    },
    showChip: {
      control: 'boolean',
    },
    contentChip: {
      control: 'text',
    },
  },
};

export const Primary = {
  args: {
    primary: true,
    title: 'Click me',
  },
};
