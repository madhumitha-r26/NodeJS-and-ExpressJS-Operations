// ----------------------EXPRESS JS OPERATIONS-------------------------------

const express= require("express");
const app=express();
app.use(express.json());

const port = 8081;
const todoList=["learn","apply things","succeed"]

app.get("/todos",(req,res)=>{
    res.status(200).send(todoList);
});

app.post("/todos",(req,res)=>{
    let newToDoItem=req.body.name;
    todoList.push(newToDoItem);
    res.status(201).send({message:"Task Added Successfully"});
});

app.delete("/todos",(req,res)=>{
    const deleteThisItem=req.body.name;
    todoList.find((elem,index)=>{
        if(elem==deleteThisItem){
            todoList.splice(index,1);
        }
    });
    res.status(204).send({message:"`Deleted item ${req.body.name}`"});
});


app.listen(port,()=>{
    console.log(`NodeJS Server Started Running on port ${port}`);
});








// ----------------------NODEJS OPERATIONS-------------------------------


/*these won't come in express*/

const http=require("http");
// const port = 8081;
// const todoList=["learn","apply things","succeed"]


http.createServer((req, res) => {
// call back func
const { method, url} = req;  //method must be in capital letters
if(url==="/todos") //checking the root with the URL
{     
    if(method==="GET")   //method works on GET by default
    {
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(todoList.toString());
    }
    else if(method==="POST")
    {
        let body="";
        req
        .on("error",(err)=>{
            console.log(err)
        })
        .on("data",(chunk)=>{
            body+=chunk;
        })
        .on("end",()=>{
            body=JSON.parse(body);
            // console.log("data:",body);
            let newToDo=todoList;
            newToDo.push(body.item);
            console.log(newToDo);
        });
    }
    else if(method==="DELETE")
    {
        let body="";
        req
        .on("error",(err)=>{
            console.log(err)
        })
        .on("data",(chunk)=>{
            body+=chunk;
        })
        .on("end",()=>{
            body=JSON.parse(body);
            let deleteThisItem=body.item;
            for(let i=0;i<todoList.length;i++){
                if(todoList[i]===deleteThisItem){
                    todoList.splice(i,1);
                    break;
                }
            }
        });
    }
    else
    {
        res.writeHead(501);
    }
}
else
{
    res.writeHead(404);
}
res.end();

})
.listen(port, () => {
// call back func
console.log(`NodeJS Server Started Runnin on Port: ${port}`);
});

