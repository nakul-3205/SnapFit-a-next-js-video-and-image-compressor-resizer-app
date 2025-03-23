import express from 'express'



const app=express()
const port =8080

app.use(express.json())
let teadata=[]
let nextid=1
//create
app.post("/tea",(req,res)=>{
    const {name,price}=req.body
    const newtea={id:nextid++,name,price}
    teadata.push(newtea)
    res.status(201).send(newtea)
})
//read
app.get("/teas",(req,res)=>{
    res.status(200).send(teadata)
})
app.get("/tea/:id",(req,res)=>{
    const tajj=teadata.find(t => t.id===parseInt(req.params.id))
    if (!tajj){
        return res.status(404).send("tea not found")
    }
    
        return res.status(200).send(tajj)
    

})
//update
app.put("/teas/:id",(req,res)=>{
    const tajj=teadata.find(t => t.id===parseInt(req.params.id))
    if (!tajj){
        res.status(404).send("tea not found")
    }
    const {name,price}=req.body
    tajj.name = name;
    tajj.price = price;

})

app.delete('/teas/:id',(req,res)=>{
    const index=teadata.findIndex(t=>t.id===parseInt(req.params.id))
    if(index==-1){
        return res.status(404).send("teanotfound")
    }
    else{
        teadata.splice(index,1)
        return res.status(200).send("tea found")


    }

})

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})
