// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

// YOUR CODE HERE!
function gameStart() {
   
    let answerBlock = {};
    let counter = 0;

    let body = document.querySelector('main');
    let questionBox = document.querySelector('section');
    let question = document.querySelector('h2');
    let questionLine = document.querySelector('.clue');
    let input = document.querySelector('input');
    let submit = document.querySelector('button');
    let score = document.querySelector('h3');
    let answer = document.querySelector('.answer');

    function newQuestion() {
        answer.textContent = ""
        let request = new XMLHttpRequest();
        request.open('GET', "https://jservice.io/api/random");
        request.addEventListener('load', function () {
            console.log('fetching new question...');
            let response = JSON.parse(request.responseText);
            console.log("response from API: " + response);
            answerBlock = response[0];
            console.log("answer block is currently... ");
            console.log(answerBlock);
            displayQuestion();
        });
        request.send();
        
        
    };

    function displayQuestion(info) {
        console.log(question);
        answer.classList.add('hidden');
        score.textContent =  + counter;
        question.textContent = answerBlock.category.title;
        questionLine.textContent = answerBlock.question;
        submit.addEventListener('click', submitAnswer);
    };

    function submitAnswer() {
        
        if (input.value.toLowerCase() != answerBlock.answer.toLowerCase()) {
            answer.textContent = `Sorry Wrong Answer. The Correct Answer Is: ` + answerBlock.answer;
            answer.classList.remove('hidden');
            setTimeout(newQuestion, 3500);
            counter = 0
        } else {
            answer.textContent = `You are Correct!`;
            answer.classList.remove('hidden');
            increaseScore();
            setTimeout(newQuestion, 3500);
        };
    };

    function increaseScore() {
        answer.textContent = `You are Correct!`;
        counter += 1;
        score.textContent = + counter;
    };

    newQuestion();
};

window.addEventListener('load', gameStart);

