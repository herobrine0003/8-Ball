document.addEventListener('DOMContentLoaded', () => {
    const magic8Ball = document.getElementById('eight-ball');
    const magic8BallForm = document.getElementById('magic8ball-form');

    const answers = [
        'It is certain.',
        'It is decidedly so.',
        'Without a doubt.',
        'Yes, definitely.',
        'You may rely on it.',
        'As I see it, yes.',
        'Most likely.',
        'Outlook good.',
        'Yes.',
        'No.',
        'Maybe.',
        'Signs point to yes.',
        'Reply hazy, try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Ask again.',
        'Don\'t count on it.',
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.'
    ];

    magic8BallForm.addEventListener('submit', askQuestion);
    magic8Ball.addEventListener('click', askQuestion);

    document.getElementById('install-button').addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                }
                deferredPrompt = null;
            });
        }
    });

    async function askQuestion(event) {
      // doing if (event) fixes a bug that spams console with errors
      // without a reason, saying that event is "undefined". if not used.
      // ofc that will happen, so this fix just checks if the event 
      // var is defined correctly instead of spamming errors without a lot of
      // information about it, why did i write a whole poerm about this? idk.
        if (event) {
            event.preventDefault();

            const questionInput = document.getElementById('question-input');
            const question = questionInput.value.trim();

            if (!question) {
                magic8Ball.textContent = 'Input a Question.';
                return;
            }

            const randomIndex = Math.floor(Math.random() * answers.length);
            const answer = answers[randomIndex];

            magic8Ball.classList.add('shake');

            setTimeout(() => {
                magic8Ball.classList.remove('shake');
                showAnswer(answer);
            }, 500);
        }
    }

    function showAnswer(answer) {
        magic8Ball.textContent = answer;
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/src/sw.js')
      });
}