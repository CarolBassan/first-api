import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.listen(3333, () => {
  console.log(">>>> Started  server on PORT: 3333");
});

const products: any[] = [];
const categories: any[] = [];
let lastId = 0;

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, data: { msg: "Hello, i'm FIRST API!" } });
});

app.get("/version", (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: { version: "1.0.0" } });
});

/* route products */
app.post("/products", (req: Request, res: Response) => {
  const data = req.body;
  lastId += 1;

  products.push({ ...data, id: lastId });

  res.status(200).json({ success: true, data: { products } });
});

app.get("/products", (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: { products } });
});

app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const index = products.findIndex((item) => item.id === Number(id));

  const product = products[index];

  console.log(index);
  console.log(product);

  products[index] = { ...product, price: data.price, name: data.name };

  res.status(200).json({ success: true, data: { msg: "Updated" } });
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const index = products.findIndex((item) => item.id === Number(id));

  products.splice(index, 1);
  res.status(200).json({ success: true, data: { msg: "Deleted" } });
});
/* route products */

/* route categories */

app.get("/categories", (req: Request, res:  Response)=>{
  res.status(200).json({success: true, data:{categories}})
})

app.post('/categories', (req: Request, res: Response)=>{
  const data = req.body
  if(!data.name){
   return res.status(404).json({success: false, data:{msg: 'name is required'}})
  }
  categories.push(data)
  
  
  res.status(200).json({success: true, data:{categories}})
})

app.put('/categories/:name', (req: Request, res: Response)=>{
  const nameParam = req.params.name
  const exist = categories.findIndex(item=> item.name === nameParam) 
  if(exist === -1){
    return res.status(404).json({success: false, data:{msg: 'name not exist'}})
  }
  console.log(nameParam);
  

  res.status(200).json({success: true, data:{categories}})
})
/* route categories */