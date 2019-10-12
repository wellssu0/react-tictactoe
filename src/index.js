import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//提示框没写
const DetailBox = (props) =>{
  return <div className="detailArea"></div>
}

//游戏框
const GameBox = (props) =>{
  const {checker,changeCheckerArr,resetState} = props

  const handleClick = (index,item) => {
    if(item == null){
      changeCheckerArr(index)
    }
  }
  const handleReset =() => {
    resetState()
  }

  return <div className="zz">
    <div className="armsL"></div>
    <div className="armsR"></div>
    <div className="checkerArea">
      {
        checker.map((item,index)=>(
          <div className="checkerItem" key={index}
            onClick={()=>handleClick(index,item)}
          >{item}</div>
        ))
      }
    </div>
    <div className="reset" onClick={handleReset}>reset</div>
  </div>
}

//游戏
class Game extends React.Component{
  state = {
    checker:Array(9).fill(null),
    isX:true,
    isGameOver:false,
    userWin:false,
    xWin:false,
  }

  changeCheckerArr = (index) => {
    const {checker,isX} = this.state
    const checkerCopy = checker
    isX ? checkerCopy.splice(index,1,"X") : checkerCopy.splice(index,1,"O") 
    this.setState({
      checker:checkerCopy,
      isX:!isX
    })
    this.checkWinner()
  }
  resetState = () => {
    this.setState({
      checker:Array(9).fill(null),
      isX:true,
      isGameOver:false,
      userWin:false,
      xWin:false,
    })
  }
  checkWinner = () => {
    const { checker } = this.state
    const lines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
    for(let i = 0; i<lines.length; i++){
      const [a,b,c] = lines[i]
      if(checker[a]!==null && checker[a]===checker[b] && checker[b]===checker[c]){
        if(checker[a]==="X"){
          this.setState({
            isGameOver:true,
            userWin:true,
            xWin:true,
          })
        }if(checker[a]==="O"){
          this.setState({
            isGameOver:true,
            userWin:true,
          })
        }
      }else if(checker.filter(item=>item===null).length===0){
        this.setState({
          isGameOver:true
        })
      }
    }
    

  } 


  
  render(){
    const {checker,isX,isGameOver,userWin,xWin,winner} = this.state
    return (
      <div className="main">
        <div className='gameName'>TICTACTOE</div>
        <h2 className={isGameOver?"title red":"title"}>{isGameOver? userWin? xWin? 'X__WIN' : "O__WIN":"DOGFALL" : isX ? 'X__GO' : "O__GO"}</h2>
        <GameBox 
          checker={checker} 
          changeCheckerArr={this.changeCheckerArr}
          resetState={this.resetState}
          >
        </GameBox>
        <DetailBox></DetailBox>
      </div>
    )
  } 
}

ReactDOM.render(<Game />, document.getElementById('root'))