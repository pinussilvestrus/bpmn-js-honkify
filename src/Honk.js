import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import inherits from 'inherits';

import showToast from 'show-toast';

export default function Honk(injector) {

  injector.invoke(CommandInterceptor, this);

  const audio = new Audio(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/honk-sound.mp3',
  );

  function _honk(context) {

    console.log('honk fired.', context);

    // honk
    audio.play();

    // show toast
    showToast({
      str: 'Honk 🦆🦆🦆!',
      time: 500,
      position: 'top'
    });
    return false;
  }

  this.execute([
    'shape.create',
    'shape.move',
    'shape.delete'
  ], _honk);
}

Honk.$inject = [
  'injector'
];

inherits(Honk, CommandInterceptor);