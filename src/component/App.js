import React, { Component } from 'react';
import _ from 'lodash';
import Block from './Block';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {record:[{value: 0, operator: '+'}],hovered:false};
        this.numberClick = this.numberClick.bind(this);
        this.operatorClick = this.operatorClick.bind(this);
    }

    numberClick(v) {
        let records = this.state.record;
        records.push({value:parseInt(v), operator:(_.last(records)).operator});
        this.setState({record:records});
    }
    
    operatorClick(o) {
        let records = this.state.record;
        records.push({value:(_.last(records)).value, operator:o});
        this.setState({record:records});
    }

    deleteRecord(i){
        let records = this.state.record;
        _.pullAt(records,[i]);
        if(records.length ==0)
            records.push({value: 0, operator: '+'});
        this.setState({record:records});
    }

    calculateResult(){
        let result = 0;
        this.state.record.forEach((r) => {
            result = r.operator == '+' ? result + r.value : result - r.value;
        })
        return result;
    }

    componentDidUpdate(){
        this.hisBlock.scrollTop = this.hisBlock.scrollHeight;
    }

    style() {
      return {cursor:'pointer',listStyleType:'decimal',backgroundColor:'white',color:'black'}
    }

    render() {
        var numBlock = _.chunk(_.map(_.reverse(_.range(10)), (i) => {
            return <Block key={'i'+i} value={i} handleClick={this.numberClick} source={this.state}/>
        }),3);
        return (
            <div>
                <div style={{font:'24pt arial', textDecoration: 'underline'}}>Hello, Calculator.</div>
                <div style={{font:'bold 20pt arial', margin:'5px 5px 5px 5px', padding:'5px 5px 5px 5px', border:'2px #000 solid', width:'220px'}}>
                    Result:<span style={{color:'white', backgroundColor:'green',padding:'2px 2px 2px 2px'}}>{this.calculateResult()}</span>
                </div>
                <div style={{width: '180px', float:'left'}}>
                {_.map(numBlock,(b1,i) => {
                    return ( 
                    <div key={'b1'+i} style={{height:'60px'}}>
                    {_.map(b1,(b2) => {
                        return b2;
                    })}
                    </div>)
                })}
                </div>
                <div style={{width: '70px', height:'200px', float:'left'}}>
                    <Block value="-" handleClick={this.operatorClick} source={this.state}/>
                    <Block value="+" handleClick={this.operatorClick} source={this.state}/>
                </div>
                <div ref={(o) => { this.hisBlock = o; }} style={{width: '300px', height:'500px', float:'left', border:'red 2px solid',position: 'relative',overflowY: 'scroll'}}>
                    <div>History</div>
                    <ul>
                    {_.map(this.state.record,(r,i)=>{
                        return <li key={'r'+i} 
                   onClick={()=>this.deleteRecord(i)} 
                   style={this.style()} 
                   title="delete this record">{'Value:'+r.value+', Operator:'+r.operator}</li>
                    })}
                    </ul>
                </div>
            </div>
        )
    }
}


module.exports = App;