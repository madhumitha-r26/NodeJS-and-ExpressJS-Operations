const http= require("http");
const port = 8081;

const todoList=["learn","apply things","succeed"]

http
.createServer((req, res) => {
// call back func
const { method, url} = req;
if(url==="/todos"){
    if(method=="GET")
    {
    res.writeHead(200);
    res.write(todoList.toString());
    }
}
res.end();

})
.listen(port, () => {
// call back func
console.log(`Nodejs Server Started Runnin on Port: ${port}`);
});
