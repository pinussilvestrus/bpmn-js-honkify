import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import inherits from 'inherits';

export default function Honk(injector) {

  injector.invoke(CommandInterceptor, this);

  const audio = new Audio(
    'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1569957993/honk-sound.mp3',
  );

  function honk(context) {

    console.log('honk fired.', context);

    audio.play();

    return false;
  }

  this.execute([ 'shape.create', 'shape.move', 'shape.delete' ], honk);
}

Honk.$inject = [
  'injector'
];

inherits(Honk, CommandInterceptor);