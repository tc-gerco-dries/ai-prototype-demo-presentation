import {makeProject} from '@motion-canvas/core';

import generic_ai_assistant from './scenes/generic_ai_assistant?scene';
import custom_ai_assistant from './scenes/custom_ai_assistant?scene';

export default makeProject({
  scenes: [
    generic_ai_assistant,
    custom_ai_assistant
  ],
});
