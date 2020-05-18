
//npm install @babel/core

const parser = require("@babel/parser");
const traverse=require("@babel/traverse").default;
const t=require("@babel/types");
const generator=require("@babel/generator").default;
const fs=require("fs");

const jscode=fs.readFileSync("./ASTTestDemo.js",{
    encoding:"utf-8"
});
//console.log(jscode);


(function() {
	var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
	base64DecodeChars = new Array(( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), 62, ( - 1), ( - 1), ( - 1), 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), ( - 1), 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, ( - 1), ( - 1), ( - 1), ( - 1), ( - 1));
	this.base64encode = function(e) {
	    var r, a, c, h, o, t;
	    for (c = e.length, a = 0, r = ''; a < c;) {
	        if (h = 255 & e.charCodeAt(a++), a == c) {
	            r += base64EncodeChars.charAt(h >> 2),
	            r += base64EncodeChars.charAt((3 & h) << 4),
	            r += '==';
	            break
	        }
	        if (o = e.charCodeAt(a++), a == c) {
	            r += base64EncodeChars.charAt(h >> 2),
	            r += base64EncodeChars.charAt((3 & h) << 4 | (240 & o) >> 4),
	            r += base64EncodeChars.charAt((15 & o) << 2),
	            r += '=';
	            break
	        }
	        t = e.charCodeAt(a++),
	        r += base64EncodeChars.charAt(h >> 2),
	        r += base64EncodeChars.charAt((3 & h) << 4 | (240 & o) >> 4),
	        r += base64EncodeChars.charAt((15 & o) << 2 | (192 & t) >> 6),
	        r += base64EncodeChars.charAt(63 & t)
	    }
	    return r
	}
	this.base64decode = function(e) {
	    var r, a, c, h, o, t, d;
	    for (t = e.length, o = 0, d = ''; o < t;) {
	        do r = base64DecodeChars[255 & e.charCodeAt(o++)];
	        while (o < t && r == -1);
	        if (r == -1) break;
	        do a = base64DecodeChars[255 & e.charCodeAt(o++)];
	        while (o < t && a == -1);
	        if (a == -1) break;
	        d += String.fromCharCode(r << 2 | (48 & a) >> 4);
	        do {
	            if (c = 255 & e.charCodeAt(o++), 61 == c) return d;
	            c = base64DecodeChars[c]
	        } while ( o < t && c == - 1 );
	        if (c == -1) break;
	        d += String.fromCharCode((15 & a) << 4 | (60 & c) >> 2);
	        do {
	            if (h = 255 & e.charCodeAt(o++), 61 == h) return d;
	            h = base64DecodeChars[h]
	        } while ( o < t && h == - 1 );
	        if (h == -1) break;
	        d += String.fromCharCode((3 & c) << 6 | h)
	    }
	    return d
	}
	this.hexToBase64 = function(str) {
	    return base64encode(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
	}
	this.Base64Tohex = function(str) {
	    for (var i = 0,
	    bin = base64decode(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
	        var tmp = bin.charCodeAt(i).toString(16);
	        if (tmp.length === 1) tmp = "0" + tmp;
	        hex[hex.length] = tmp;
	    }
	    return hex.join("");
	}
}) ();
//hexToBase64 Base64Tohex base64decode base64encode
function HexEnc(code) {
    for (var hexstr=[],i=0,s;i<code.length;i++){
        s=code.charCodeAt(i).toString(16);
        hexstr+="\\x"+s;
    }
    return hexstr;
}
function UnicodeStr(str){
    var value='';
    for(var i=0;i<str.length;i++)
        value+="\\u"+("0000"+parseInt(str.charCodeAt(i)).toString(16)).substr(-4);
    return value;
}

//添加乱序函数
let newAst=parser.parse("");
newAst.program.body.push(t.expressionStatement(t.stringLiteral("__shift__")));
// let {code}=generator(newAst);
// console.log(code);

traverse(newAst,{
    StringLiteral(path){
        if(path.node.value=="__shift__"){
            path.replaceWithSourceString('!function(myArr,num){var lx=function(num){while(--num){myArr.push(myArr.shift());}};lx(++num);}(arr,0x12)');
            path.stop();
        }
    }
});
//16进制加密
//unicode
traverse(newAst,{
    MemberExpression(path){
        path.node.computed=true;
        if(t.isIdentifier(path.node.property)){
            var name=path.node.property.name;
            console.log(HexEnc(name));
            path.node.property=t.stringLiteral(HexEnc(name));
        }
    },
    Identifier(path){
        path.node.name=UnicodeStr(path.node.name);
    }
});


let ast=parser.parse(jscode);

var newArr=[];

traverse(ast,{
    //匹配函数
    FunctionDeclaration(path){
        //函数内部修改
        path.traverse({
            Identifier(innerPath){
                //作用域分为全局和局部
                path.scope.rename(innerPath.node.name=path.scope.generateUidIdentifier("_0x9876").name);
            }
        })
    },
    //匹配数组引用方式
    MemberExpression(path){
        path.node.computed=true;

        if(t.isIdentifier(path.node.property)){
            var name=path.node.property.name;
            path.node.property=t.stringLiteral(name);
        }
    },
    //匹配字符串
    StringLiteral(path){
        var position=newArr.indexOf(base64encode(path.node.value));
        var lengths=position;
        if(position==-1){
            var le=newArr.push(base64encode(path.node.value));
            lengths=le-1;
        }
        //直接path.node没办法修改，回到父标签，之后再选择回来（不知道为什么）
        var encStr=t.callExpression(t.identifier("atob"),[t.memberExpression(t.identifier("arr"),t.numericLiteral(lengths),true)])
        path.parent.type=="ReturnStatement" && (path.parent.argument=encStr);
        path.parent.type=="AssignmentExpression" && (path.parent.property=encStr);
        path.parent.type=="MemberExpression" && (path.parent.property=encStr);
        //path.parent.type=="ObjectProperty" && (path.parent.key=t.memberExpression(t.identifier("arr"),t.numericLiteral(lengths),true));
    }
})

//array直接无法赋值，需要转化为string  AST类型，map返回布尔值
var resultArr=newArr.map(function(v){
    return t.stringLiteral(v);
});

//解密
(function(myArr,num){
    var lx=function(num){
        while(--num){
            myArr.unshift(myArr.pop());
        }
    };
    lx(++num);
}(resultArr,0x12));

//插入标签 数组加到新的ast
newAst.program.body.unshift(t.variableDeclaration("var",[t.variableDeclarator(t.identifier("arr"),t.arrayExpression(resultArr))]));
let code1=generator(newAst).code;

//正则全局
code1=code1.replace(/\\\\x/g,"\\x");

let code2=generator(ast).code;
//console.log(code);
fs.writeFile("./demo.js",code1+code2,(err)=>{});