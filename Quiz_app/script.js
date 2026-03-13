const domain = localStorage.getItem("domain");

const aptitude=[
{q:"What is 20% of 200?",a:["20","40","50","60"],c:1},
{q:"5 + 7 * 2 =",a:["24","19","26","17"],c:1},
{q:"Square of 12?",a:["124","144","154","164"],c:1},
{q:"50 / 5 =",a:["5","10","15","20"],c:1},
{q:"LCM of 4 and 6?",a:["12","18","24","6"],c:0},
{q:"Average of 10,20,30?",a:["20","30","15","10"],c:0},
{q:"15% of 100?",a:["10","15","20","25"],c:1},
{q:"10^2 ?",a:["100","10","20","200"],c:0},
{q:"100 / 4 ?",a:["10","15","25","20"],c:2},
{q:"3^3 ?",a:["9","27","18","12"],c:1}
];

const cs=[
{q:"HTML stands for?",a:["Hyper Text Markup Language","High Text Machine Language","Home Tool Markup Language","Hyperlinks Markup Language"],c:0},
{q:"Java is?",a:["Programming language","Browser","OS","Database"],c:0},
{q:"FIFO used in?",a:["Queue","Stack","Tree","Graph"],c:0},
{q:"LIFO used in?",a:["Stack","Queue","Tree","Array"],c:0},
{q:"Binary of 2?",a:["10","11","01","00"],c:0},
{q:"Which is programming language?",a:["Python","HTML","HTTP","FTP"],c:0},
{q:"Which company developed Java?",a:["Sun Microsystems","Google","IBM","Apple"],c:0},
{q:"Which is database?",a:["MySQL","HTML","CSS","JS"],c:0},
{q:"CPU stands for?",a:["Central Processing Unit","Computer Processing Unit","Central Program Unit","Control Processing Unit"],c:0},
{q:"Which is markup language?",a:["HTML","Python","Java","C"],c:0}
];

const os=[
{q:"Brain of computer?",a:["RAM","CPU","ROM","ALU"],c:1},
{q:"Which OS is open source?",a:["Linux","Windows","Mac","DOS"],c:0},
{q:"Full form of RAM?",a:["Random Access Memory","Run Access Memory","Read Access Memory","Rapid Access Memory"],c:0},
{q:"Which memory is volatile?",a:["RAM","ROM","HDD","SSD"],c:0},
{q:"Linux is?",a:["OS","Compiler","Language","Browser"],c:0},
{q:"Which is secondary memory?",a:["Hard Disk","RAM","Cache","Register"],c:0},
{q:"OS manages?",a:["Hardware","Files","Processes","All"],c:3},
{q:"Which is multitasking OS?",a:["Windows","DOS","None","BIOS"],c:0},
{q:"Full form of OS?",a:["Operating System","Open System","Order System","Output System"],c:0},
{q:"FCFS is?",a:["Scheduling Algorithm","Language","Memory","Protocol"],c:0}
];

let questions;

if(domain==="aptitude") questions=aptitude;
if(domain==="os") questions=os;
if(domain==="cs") questions=cs;

let index=0;
let score=0;

const question=document.getElementById("question");
const answers=document.getElementById("answer-buttons");
const result=document.getElementById("result");
const next=document.getElementById("next-btn");
const qnum=document.getElementById("question-number");
const progress=document.getElementById("progress");

function showQuestion(){

answers.innerHTML="";
result.innerHTML="";

qnum.innerHTML="Question "+(index+1)+" / "+questions.length;

progress.style.width=((index)/questions.length)*100+"%";

let q=questions[index];

question.innerHTML=q.q;

q.a.forEach((text,i)=>{

let btn=document.createElement("button");

btn.innerHTML=text;

btn.onclick=()=>{

checkAnswer(i);

Array.from(answers.children).forEach(button=>{
button.disabled=true;
});

};

answers.appendChild(btn);

});

}

function checkAnswer(i){

let buttons=answers.children;

if(i===questions[index].c){

result.innerHTML="Correct";
buttons[i].style.background="green";
score++;

}
else{

result.innerHTML="Wrong";
buttons[i].style.background="red";

buttons[questions[index].c].style.background="green";

}

}

next.onclick=()=>{

index++;

if(index<questions.length){

showQuestion();

}
else{

progress.style.width="100%";

answers.innerHTML="";
result.innerHTML="";
next.style.display="none";
qnum.innerHTML="";

let message="";

if(score>=7){
message="Congratulations!";
}
else if(score<=5){
message="You can do better. Try Again!";
}

question.innerHTML=message+"<br><br>Final Score : "+score+" / "+questions.length;

let restart=document.createElement("button");

restart.innerHTML="Restart Quiz";

restart.onclick=()=>location.reload();

answers.appendChild(restart);

}

}

showQuestion();