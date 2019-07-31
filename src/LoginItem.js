import React from "react";
import error from "./images/error.png"
import correct from "./images/correct.png"
import "./css/LoginItem.css"

class LoginItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rule:this.props.data.rule,
            ifsame:[
                {first:2,second:3}
            ]
        }
        this.check=this.check.bind(this);
        this.change=this.change.bind(this);
    }

    check(e){
        if(this.state.rule!=''){
            //该字段需要匹配正则来判断输入的值是否符合要求
            let cresult=(this.state.rule).test(e.target.value);
            let flag=false;
            for(let i=0; i<this.state.ifsame.length; i++){
                if(this.props.data.id===this.state.ifsame[i].first){
                    flag=true;
                }
            }
            if(flag){
                this.props.checkResult(this.props.data.id,cresult,true);
            }else{
                this.props.checkResult(this.props.data.id,cresult);
            }
        }else{
            //该字段通过比较两个值来判断是否符合要求
            this.props.checkResult(this.props.data.id,'');
        }
    }

    change(e){
        this.props.getVal(this.props.data.id,e.target.value);
    }

    render(){
        const {name,type,check:checkr,error:err,value}=this.props.data;
      
        return(
            <div className='wrapper'>
                <span className='name'>{name}</span>
                <input className='input' type={type} value={value} onChange={this.change} onBlur={this.check}></input>
                {checkr==null? null: <img className='checkImg' alt='验证结果' src={checkr?correct:error}></img>}
                {checkr==null? null: checkr ?null:<span className='errorInfo'>{err}</span>}
            </div>
        )
    }

}

export default LoginItem;