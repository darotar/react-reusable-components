import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Arrow from '../components/arrow';
import Button from '../components/button';

storiesOf('Arrow', module)
  .add('default', () => <Arrow onClick={action('clicked')} />)

storiesOf('Button', module)
.add('default', () => <Button onClick={action('нажал')}>Жми</Button>)