// Function to fetch the questions file and parse its contents
function fetchQuestionsFromFile(filename) {
  return fetch(filename)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      const lines = data.split("\n");
      const questions = lines.map((line) => {
        const [question, ...options] = line.split(",");
        return { question, options };
      });
      return questions;
    })
    .catch((error) => {
      console.error("Error fetching file:", error);
      return [];
    });
}

// Usage example
const filename = "data.txt";
fetchQuestionsFromFile(filename).then((questions) => {
  console.log(questions[0].question);
  for (let i = 0; i < questions.length; i++) {
    makequestion(
      i + 1,
      questions[i].question,
      questions[i].options[0],
      questions[i].options[1],
      questions[i].options[2],
      questions[i].options[3]
    );
  }
});

function makequestion(qnumber, q, one, two, three, four) {
  let questions = document.getElementsByClassName("questions")[0];
  let question = document.createElement("div");
  question.className = "question";
  questions.appendChild(question);

  let questionNumberBox = document.createElement("div");
  questionNumberBox.className = "questionNumberBox";
  question.appendChild(questionNumberBox);

  let innerbox = document.createElement("div");
  innerbox.className = "innerbox";
  innerbox.innerText = qnumber; /////////////////
  questionNumberBox.appendChild(innerbox);

  let div = document.createElement("div");
  div.className = "Div";
  question.appendChild(div);

  let questiontext = document.createElement("h2");
  questiontext.className = "questiontext";
  questiontext.innerText = q; ///////////////
  div.appendChild(questiontext);

  let options = document.createElement("div");
  options.className = "options";
  div.appendChild(options);

  createoption("أ", one);
  createoption("ب", two);
  createoption("ج", three);
  createoption("د", four);

  // Get all flex options
  const options2 = document.querySelectorAll(".option");

  // Find the width of the widest sibling
  let maxWidth = 0;
  for (let i = options2.length - 1; i >= options2.length - 4; i--) {
    maxWidth = Math.max(maxWidth, options2[i].offsetWidth);
  }

  // Apply the width to all flex options
  for (let i = options2.length - 1; i >= options2.length - 4; i--) {
    options2[i].style.width = maxWidth + 1 + "px";
  }

  if (one == undefined) {
    for (let i = options2.length - 1; i >= options2.length - 4; i--) {
      options2[i].style.width = "-webkit-fill-available";
    }
  }

  function createoption(l, ans) {
    let option = document.createElement("div");
    option.className = "option";
    options.appendChild(option);
    let letter = document.createElement("div");
    letter.className = "letter";
    letter.innerText = l;
    option.appendChild(letter);
    let answer = document.createElement("p");
    answer.className = "answer";
    answer.innerText = ans;
    option.appendChild(answer);
  }
}
