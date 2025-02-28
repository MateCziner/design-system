import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import SemanticModal from './SemanticModal';
import { SemanticModalVariants } from './SemanticModal.enums';
import { SemanticModalProps } from './SemanticModal.types';
import { Inline, Padbox, Stack } from '../layout';
import { Button } from '../Button';
import { ButtonColors } from '../Button/Button.enums';
import { SpaceSizes } from '../../theme';
import { generateControl } from '../../utils/tests/storybook';

export default {
  title: 'components/modals/SemanticModal',
  component: SemanticModal,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 600,
    },
  },
  argTypes: {
    variant: {
      ...generateControl('select', SemanticModalVariants),
    },
    actions: {
      control: { disable: true },
    },
    primaryButtonColor: {
      ...generateControl('select', ButtonColors),
    },
  },
} as Meta;

export const Playground: Story<SemanticModalProps> = (args) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <Padbox paddingSize={SpaceSizes.xxl}>
      <Inline justify="center">
        <Button onClick={() => setIsShown(!isShown)}>
          Open semantic modal
        </Button>
      </Inline>
      {isShown && <SemanticModal onClose={() => setIsShown(false)} {...args} />}
    </Padbox>
  );
};

Playground.parameters = {
  screenshot: { skip: true },
  docs: {
    source: { type: 'code' },
  },
};

Playground.args = {
  actions: [
    {
      label: 'Secondary',
      name: 'Secondary',
      onClick: action('click-action-secondary'),
    },
    {
      label: 'Primary',
      name: 'Primary',
      onClick: action('click-action-primary'),
    },
  ],
  message:
    'You can replace this with a local component. You can also just override the text, but keep in mind that you might lose content that way.',
  title: 'This is a placeholder',
  primaryButtonColor: ButtonColors.primary,
};

const SemanticModalTemplate: Story<SemanticModalProps> = (args) => (
  <SemanticModal {...args} />
);

export const Success = SemanticModalTemplate.bind({});
Success.args = {
  actions: [
    {
      label: 'Secondary',
      name: 'Secondary',
      onClick: action('click-action-secondary'),
    },
    {
      label: 'Primary',
      name: 'Primary',
      onClick: action('click-action-primary'),
    },
  ],
  message:
    'You can replace this with a local component. You can also just override the text, but keep in mind that you might lose content that way.',
  title: 'This is a placeholder',
  onClose: action('close-modal'),
  variant: SemanticModalVariants.success,
};

export const Warn = SemanticModalTemplate.bind({});
Warn.args = {
  ...Success.args,
  variant: SemanticModalVariants.warn,
};

export const Error = SemanticModalTemplate.bind({});
Error.args = {
  ...Success.args,
  variant: SemanticModalVariants.error,
};

export const Ban = SemanticModalTemplate.bind({});
Ban.args = {
  ...Success.args,
  variant: SemanticModalVariants.ban,
};

export const MultiParagraphMessage = SemanticModalTemplate.bind({});
MultiParagraphMessage.args = {
  ...Success.args,
  message: (
    <Stack gap="md">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in
        dignissim enim. Interdum et malesuada fames ac ante ipsum primis in
        faucibus.
      </p>
      <p>
        Duis sem eros, ultrices eu mi eget, blandit vestibulum mauris.
        Pellentesque at hendrerit orci. Aliquam vel ligula lectus. Curabitur
        varius sed mauris ut aliquam. Integer sed iaculis quam, eget dignissim
        nulla.
      </p>
    </Stack>
  ),
};
