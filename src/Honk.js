/* global Promise */
import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import inherits from 'inherits';

import showToast from 'show-toast';

import {
  reduce
} from 'min-dash';

export default function Honk(eventBus, injector) {

  injector.invoke(CommandInterceptor, this);

  const audio = new Audio(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/honk-sound.mp3',
  );

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  function _handler(context) {

    const {
      command
    } = context;

    let granularEvents = [];

    const recordEvents = (e) => {
      granularEvents.push({
        ...e
      });
    };

    const _honk = async (context) => {

      console.log('honk fired.', context);

      // wait for every operation to be done
      await sleep(500);

      if (!granularEvents.length) {
        return;
      }

      console.log(`Making a honk for each ${granularEvents.length} operation 🦆.`);

      // show toast
      showToast({
        str: 'Honk 🦆🦆🦆!',
        time: 500,
        position: 'top'
      });

      await reduce(granularEvents, async (promise, e) => {
        await promise;

        // honk
        const clonedAudio = audio.cloneNode();
        await clonedAudio.play();

        await sleep(200);

        console.log('🦆');

      }, Promise.resolve());

      granularEvents = [];

      return false;
    };

    eventBus.on('commandStack.executed', recordEvents);

    eventBus.on(`commandStack.${command}.postExecute`, _honk);

  }

  this.preExecute([
    'shape.create',
    'shape.move',
    'shape.delete'
  ], _handler);
}

Honk.$inject = [
  'eventBus',
  'injector'
];

inherits(Honk, CommandInterceptor);