import React from "react";
import LoginItem from "./LoginItem"
import Button from "./button"
import "./css/Login.css"
import "./css/initial.css"

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            item:[
                { id:1, rule: /^[a-zA-Z0-9\u4E00-\u9FA5]{6,20}$/, name: "用户名：", type:'text', check:null, error: '用户名6-20位, 可包含汉字、英文、数字、下划线' },{ id:2, rule: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}/, name: "密码：", type:'password', check:null, error: '密码8-30位, 必须包含大小字母、数字、特称字符',get:true},
                { id:3, rule: '', name: "确认密码：", type:'password', check:null, error: '两次密码输入不相同' ,get:true, firstval:'', secondval:'' },
                {id:4,rule:/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,name:'邮箱：',type:'text',check:null,error:'邮箱格式不正确'},
                {id:5,rule:/^[1][3,4,5,7,8][0-9]{9}$/,name:'手机号：',type:'text',check:null,error:'手机号格式错误'}
            ],
            // 需要比较两个值是否相等的，在初始化对象的被比较对象中需要get属性、用来比较的对象需要get、firstval、secondval属性
            ifsame:[
                {first:2,second:3}
            ],
            //提交按钮里面写的内容
            button:{
                submit:'提交',
                reset:'重置'
            }
        };
        this.getVal=this.getVal.bind(this);
        this.checkResult=this.checkResult.bind(this);
        this.submit=this.submit.bind(this);
        this.reset=this.reset.bind(this);
    }

    getVal(id,val){
        for(let i=0; i<this.state.ifsame.length; i++){
            if(id==this.state.ifsame[i].first){
                this.setState((preState)=>({item: preState.item.map(item=>(item.id==this.state.ifsame[i].second?{...item,firstval:val}:item))}));
            }
            if(id==this.state.ifsame[i].second){
                this.setState((preState)=>({item: preState.item.map(item=>(item.id==this.state.ifsame[i].second?{...item,secondval:val}:item))}));
            }
        }
    }

    checkResult(id,cresult,first){
        if(cresult===''){
            //不是通过正则去判断的输入框，进行自身对比
            this.setState((preState)=>({item:preState.item.map(item=>( item.id===id ? {...item, check:item.firstval==item.secondval&&item.firstval!==''?true:false} : item))}));
        }else{
            if(first===true){
                //是被对比的值，不但需要将自己输入框内是否符合正则的结果写入check属性，还要判断跟自己比较的那个值是否还相等
                let second=null;
                for(let i=0; i<this.state.ifsame.length; i++){
                    if(this.state.ifsame[i].first==id){
                        second=this.state.ifsame[i].second;
                    }
                }
                this.setState((preState)=>({item:preState.item.map(item=>( item.id===second ? {...item, check:item.firstval==item.secondval&&item.firstval!==''?true:false} : item))}));
            }
            //需要将正则判断结果写入check属性
            this.setState((preState)=>({item:preState.item.map(item=>( item.id===id ? {...item, check:cresult} : item))}));
        }
    }

    submit(){
        console.log("submit");
    }

    reset(){
        let input=document.getElementsByTagName('input');
        for(let i of input){
            i.value='';
        }
        for(let i=0; i<this.state.ifsame.length; i++){
            this.setState((preState)=>({item:preState.item.map(item=>( item.id===this.state.ifsame[i].second ? {...item, firstval:'',secondval:''} : item))}));
        }
        this.setState((preState)=>({item:preState.item.map(item=>( {...item, check:null} ))}));
        
    }

    render(){
        let count=0;
        return(
            <div className='login'>
                {
                    this.state.item.map( item => <LoginItem key={++count} data={item} getVal={this.getVal} checkResult={this.checkResult}/> )
                }
                <Button name={this.state.button.submit} click={this.submit}/>
                <Button name={this.state.button.reset} click={this.reset}/>
            </div>
        )
    }

}
export default Login;