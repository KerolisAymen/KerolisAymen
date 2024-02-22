// Function to fetch the questions file and parse its contents
async function fetchQuestionsFromFile(filename) {
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

function fetchQuestionsFromJson(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}



function createoption(l, ans) {
  let option = document.createElement("div");
  option.className = "option";
  
  let letter = document.createElement("div");
  letter.className = "letter";
  letter.innerText = l;
  option.appendChild(letter);
  let answer = document.createElement("p");
  answer.className = "answer";
  answer.innerText = ans;
  option.appendChild(answer);
  return option;
}
function makequestion(qnumber, q, one, two, three, four) {
 
   
  let question = document.createElement("div");
  question.className = "question";
  

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

  options.appendChild( createoption("أ", one));
  options.appendChild(createoption("ب", two));
  options.appendChild(createoption("ج", three));
  options.appendChild(createoption("د", four));
  

  return question;
  
}

function adjustwidth(selector,one){
 // Get all flex options
 const options2 = document.querySelectorAll(selector);

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
}
// Usage example
const filename = "data.json";



fetchQuestionsFromJson(filename).then((questions) => {
  console.log(questions[0].question);
  for (let i = 0; i < questions.length; i++) {
    const question = makequestion(
      i + 1,
      questions[i].question,
      questions[i].options[0],
      questions[i].options[1],
      questions[i].options[2],
      questions[i].options[3]
    );
    let questions2 = document.getElementsByClassName("questions")[0];
    questions2.appendChild(question);
    adjustwidth(".option",questions[i].options[0]);
  }
  
});


setTimeout(function() {
  window.scroll({
    top: document.body.scrollHeight,
    left: 0,
    behavior: 'smooth'
  });
}, 100); // Wait for 2000 milliseconds (2 seconds)

  
 
