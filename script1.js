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

new Promise((resolve,reject)=>{
  console.log("c"); 
}).then(()=>{
  
})
{

}
function fetchQuestionsFromJson(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function toArabicNumeral(en) {
  return ("" + en).replace(/[0-9]/g, function(t) {
      return "٠١٢٣٤٥٦٧٨٩".slice(+t, +t+1);
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
function makequestion(qnumber, q, one, two, three, four, picsrc) {
  let question = document.createElement("div");
  question.className = "question";

  let questionNumberBox = document.createElement("div");
  questionNumberBox.className = "questionNumberBox";
  question.appendChild(questionNumberBox);

  let svg = document.createElement("img");
  svg.className = "svg";
  svg.src = "/polygon1.svg";
  questionNumberBox.appendChild(svg);

  let innerbox = document.createElement("div");
  innerbox.className = "innerbox";
  innerbox.innerText = qnumber;
  questionNumberBox.appendChild(innerbox);

  let div = document.createElement("div");
  div.className = "Div";
  question.appendChild(div);

  let questiontext = document.createElement("h2");
  questiontext.className = "questiontext";
  questiontext.innerText =q; ///////////////
  div.appendChild(questiontext);

  let options = document.createElement("div");
  options.className = "options";
  div.appendChild(options);

  if (one != undefined) options.appendChild(createoption("أ", one));
  if (two != undefined) options.appendChild(createoption("ب", two));
  if (three != undefined) options.appendChild(createoption("ج", three));
  if (four != undefined) options.appendChild(createoption("د", four));

  if (picsrc != undefined) {
    const picdiv = document.createElement("div");
    picdiv.className="picdiv"; 
    let pic = document.createElement("img");
    pic.className = "questionpic";
    pic.src = "pics\\" + picsrc.split("\\")[picsrc.split("\\").length - 1];
    console.log(picsrc.split("\\"));
    pic.draggable="true"; 
    picdiv.appendChild(pic);
    question.appendChild(picdiv);
  }

  return question;
}

function adjustwidth(selector, one) {
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


    if (questions[i].questions == undefined) {
      const question = makequestion(
        i + 1,
        questions[i].question,
        questions[i].options[0],
        questions[i].options[1],
        questions[i].options[2],
        questions[i].options[3],
        questions[i].imgsrc
      );
      let questions2 = document.getElementsByClassName("questions")[0];
      questions2.appendChild(question);
      // if(questions[i].imgsrc== undefined)
      // setTimeout(() => {
        
        adjustwidth(".option", questions[i].options[0]);
      // }, 0);
    } else {
      const complexquestion = makequestion(
        i + 1,
        questions[i].complexquestion,
        undefined,
        undefined,
        undefined,
        undefined
      );
      for (let j = 0; j < questions[i].questions.length; j++) {
        let imgsrc;
        if (j == 0) imgsrc = questions[i].imgsrc;
        else imgsrc = undefined;
        const innerquestion = makequestion(
          j + 1,
          questions[i].questions[j].question,
          questions[i].questions[j].options[0],
          questions[i].questions[j].options[1],
          questions[i].questions[j].options[2],
          questions[i].questions[j].options[3],
          imgsrc
        );
        complexquestion.appendChild(innerquestion);
        complexquestion.style.display = "block";
        innerquestion.style.border = "none";
        innerquestion.style.marginRight = "1cm";
        let questions2 = document.getElementsByClassName("questions")[0];
        questions2.appendChild(complexquestion);
        adjustwidth(".option");
      }
    }
  }
});

setTimeout(function () {
  window.scroll({
    top: document.body.scrollHeight,
    left: 0,
    // behavior: "smooth",
  });
}, 100); // Wait for 2000 milliseconds (2 seconds)
