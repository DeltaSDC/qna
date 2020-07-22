import React, { Component } from 'react';
import Modal from './Modal';
import QuestionList from './QuestionList';
import QuestForm from './QuestForm';
import AnsForm from './AnsForm';
import Search from './Search';


class App extends Component {
  constructor() {
    super();

    this.state = {
      searchfield:"",
      imgcheck:false,
      value: '',
      qcount:2,
      acount:true,
      modal: false,
      modalInfo:"",
      ansform: false,
      ansformInfo:"",
      ansQuesId:"",
      quesform: false,
      questions:{
        product_id: "5",
        results: [
        {
        question_id: 36,
        question_body: "What fabric is the top made of?",
        question_date: "2018-06-17T00:00:00.000Z",
        asker_name: "funnygirl",
        question_helpfulness: 11,
        reported: 0,
        answers: {
        1: {
        id: 1,
        body: "Supposedly suede, but I think its synthetic",
        date: "2018-01-17T00:00:00.000Z",
        answerer_name: "Seller",
        helpfulness: 2,
        photos: []
        }}}
        ]
      }
    };
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.helpSubmit = this.helpSubmit.bind(this);
    this.productFetcher = this.productFetcher.bind(this);
    this.answerFetcher = this.answerFetcher.bind(this);
    this.qaSubmit = this.qaSubmit.bind(this);
    this.qaReport = this.qaReport.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.ansSelectForm = this.ansSelectForm.bind(this);
    this.quesSelectForm = this.quesSelectForm.bind(this)

  }
  // productFetcher(){
  //   fetch('http://52.26.193.201:3000/qa/5?count=1000')
  //   .then(response=> response.json())
  //   .then(data => this.setState({questions:data}))
  // }

  productFetcher(){
    let questions = {
      product_id: "5",
      results: [],
    }
    let QArr = [];
    Promise.all([
      fetch('http://ec2-54-153-45-48.us-west-1.compute.amazonaws.com:4003/qa/questions/8648883').then(Qdata => Qdata.json()),
      fetch('http://ec2-54-153-45-48.us-west-1.compute.amazonaws.com:4003/qa/answers/8648883').then(Adata => Adata.json()),
      fetch('http://ec2-54-153-45-48.us-west-1.compute.amazonaws.com:4003/qa/photos/896').then(Pdata => Pdata.json()),
    ])
    .then(([Qdata, Adata, Pdata]) => Qdata.forEach((question, i) => questions.results.push(
      {
        question_id: Qdata[i].question_id,
        question_body: Qdata[i].question_body,
        question_date: Qdata[i].question_date,
        asker_name: Qdata[i].asker_name,
        question_helpfulness: Qdata[i].question_helpfulness,
        reported: Qdata[i].reported,
        answers: {
        1: {
          id: 1,
          body: Adata[i].body,
          date: Adata[i].answer_date,
          answerer_name: Adata[i].answerer_name,
          helpfulness: Adata[i].helpfulness,
          photos: [Pdata[0].url, Pdata[0].url],
        }},
    })))
    .then(data => this.setState({
      questions,
    }))
    // .then(([Qdata, Adata, Pdata]) => this.setState({
    //   questions: {
    //     product_id: Qdata[0].product_id,
    //     results: [
    //       {
    //         question_id: Qdata[0].question_id,
    //         question_body: Qdata[0].question_body,
    //         question_date: Qdata[0].question_date,
    //         asker_name: Qdata[0].asker_name,
    //         question_helpfulness: Qdata[0].question_helpfulness,
    //         reported: Qdata[0].reported,
    //         answers: {
    //       1: {
    //         id: 1,
    //         body: Adata[0].body,
    //         date: Adata[0].answer_date,
    //         answerer_name: Adata[0].answerer_name,
    //         helpfulness: Adata[0].helpfulness,
    //         photos: [Pdata[0].url, Pdata[0].url],
    //         }}},
    //       {
    //         question_id: Qdata[1].question_id,
    //         question_body: Qdata[1].question_body,
    //         question_date: Qdata[1].question_date,
    //         asker_name: Qdata[1].asker_name,
    //         question_helpfulness: Qdata[1].question_helpfulness,
    //         reported: Qdata[1].reported,
    //         answers: {
    //         1: {
    //         id: 1,
    //         body: Adata[0].body,
    //         date: Adata[0].answer_date,
    //         answerer_name: Adata[0].answerer_name,
    //         helpfulness: Adata[0].helpfulness,
    //         photos: [Pdata[0].url, Pdata[0].url],
    //         }}}
    //       ]
    //   }
    // }))
    // .then(data => this.answerFetcher())
  }

  answerFetcher() {
    fetch('http://localhost:4003/qa/answers/8648883')
    .then(data => this.setState({
      questions: {
        product_id: this.state.product_id,
        results: [
          {
          question_id: 777,
          question_body: this.state.questions.results[0].question_body,
          question_date: this.state.questions.results[0].question_date,
          asker_name: this.state.questions.results[0].asker_name,
          question_helpfulness: this.state.questions.results[0].question_helpfulness,
          reported: this.state.questions.results[0].reported,
          answers: {
          1: {
          id: "y u no work",
          body: "What in the world!",
          date: data[0].answer_date,
          answerer_name: data[0].answerer_name,
          helpfulness: data[0].helpfulness,
          photos: []
          }}}
          ]
      }
    }))
  }

  componentDidMount(){
    // let qnaApp = document.getElementById('qnaApp').style.overflowY = "scroll";
    this.productFetcher();
  }

  onSearchChange(event){
    if(event.target.value.length>2){
    this.setState({searchfield:event.target.value})
    }
    if(event.target.value.length<=2){
      this.setState({searchfield:''})
      }
  }

  ansSelectForm(info="", quesid){
    this.setState({
       // true/false toggle
      ansform: !this.state.ansform,
      ansformInfo: info,
      ansQuesId:quesid,})
  }

  quesSelectForm(info=""){
    this.setState({
       // true/false toggle
      quesform: !this.state.quesform,
      })
  }

  selectModal=(info="") => {
    this.setState({
      // true/false toggle
      modal: !this.state.modal,
      modalInfo: info})
  }

  handleClick() {
    this.setState({qcount:this.state.qcount +2000});
     let elem = document.getElementById("qnaApp");
    elem.classList.add("qnaScroll");
  }

  handleClick2() {
    this.setState({acount:!this.state.acount});
    let elem = document.getElementById("qnaApp");
    elem.classList.add("qnaScroll");
  }

  handleClick3(e) {
    this.setState({imgcheck:!this.state.imgcheck});
  }

  qaReport(id, target){
    fetch(`http://52.26.193.201:3000/qa/${target}/${id}/report`,
    {method:'PUT'}
    )
    .then( response=>{this.productFetcher()})
  }

  helpSubmit(id, target){
    fetch(`http://52.26.193.201:3000/qa/${target}/${id}/helpful`,
    {method:'PUT'}
    ).then( response=>this.productFetcher())
  }

qaSubmit(submitObj, id, target, event){
  console.log("target",submitObj, id.product, target)

  event.preventDefault();
  let url;
  if (target === "answer"){
    url = `http://52.26.193.201:3000/qa/${id}/answers`
  } else if (target === "question"){
    url = `http://52.26.193.201:3000/qa/${id}`
  }
  fetch(url,
  {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(submitObj)
  })
  .then(response=>{this.productFetcher()})
}

  render(){

    let filteredQuestions=this.state.questions.results
    .filter(question=>{return question.question_body
    .toLowerCase().includes(this.state.searchfield.toLowerCase())})

    return (
      <div id="qnaApp">
        <div className="row">
          <div className="qnaSpacer d-none d-lg-block col-lg-2" />
          <div id="qna">
            <div className="qa-title">QUESTIONS AND ANSWERS</div>
            <Search
              onSearchChange={this.onSearchChange}
            />
            <div className="questionList">
              <QuestionList
                  questions = {filteredQuestions}
                  handleClick ={this.handleClick}
                  handleClick2 ={this.handleClick2}
                  acount = {this.state.acount}
                  helpSubmit={this.helpSubmit}
                  qaReport = {this.qaReport}
                  ansSelectForm={this.ansSelectForm}
                  qcount = {this.state.qcount}
                  quesSelectForm={this.quesSelectForm}
                  selectModal={this.selectModal}
                  searchfield= {this.state.searchfield}
              />
            </div>
          </div>
        <div className="model">
          <Modal
              displayModal={this.state.modal}
              closeModal={this.selectModal}
              modalInfo={this.state.modalInfo}
          />
          <QuestForm
              displayForm={this.state.quesform}
              quesCloseForm={this.quesSelectForm}
              product={this.state.questions.product_id}
              qaSubmit={this.qaSubmit}
          />
          <AnsForm
              displayForm={this.state.ansform}
              ansCloseForm={this.ansSelectForm}
              ansformInfo={this.state.ansformInfo}
              handleClick3={this.handleClick3}
              imgcheck={this.state.imgcheck}
              product={this.state.questions.product_id}
              question={this.state.ansformInfo}
              ansQuesId={this.state.ansQuesId}
              qaSubmit={this.qaSubmit}
          />
          </div>
          <div className="qnaSpacer d-none d-lg-block col-lg-2" />
          </div>
        </div>
    );
  }
}

export default App;
