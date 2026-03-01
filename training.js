export async function createProduct(product){
    try{
        let newProduct = await fetch(`http://localhost:3000/product`,{
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify({
                id : product.id,
                name : product.name,
                price : product.price,
                stock : product.stock,
                category : product.category,
                sellerId : product.sellerId,
                createdAt : Date.now(),
                description : product.description
            })
        })
        let result =  await newProduct.json(); // for easy debug purpose
        console.log(result);
        return result;
    }catch(error){
        console.log(error);
    }
}

app.post(`/product`,(req,res)=>{
    try{
        const {id , name , price , stock , category , sellerId , createdAt , description} = req.body;
        db.prepare(`
            INSERT INTO products
            (id , name , price , stock , category , sellerId , createdAt , description)
            VALUES
            (?,?,?,?,?,?,?,?)
            `).run(id,name,price,stock,category,sellerId,createdAt,description);
        const newProduct = db.prepare(`
            SELECT * FROM products
            WHERE id = ?
            `).get(id);
        return res.json(newProduct);
    }catch(error){
        res.status(500).json({log: `failed to create product`, error: error.message})
    }
})

export async function selectProduct(productId){
    try{
        let product = fetch(`http://localhost:3000/products/${encodeURIComponent(productId)}`,{
            method : 'SELECT'
        })
        let result = await product.json();
        console.log(result);
        return result;
    }catch(error){
        console.log(error);
    }
}

app.get(`/products/:id`,(req,res)=>{
    try{
        let product = db.prepare(`
            SELECT * FROM products
            WHERE id = ?
            `).get(req.params.id)
        return res.json(product);
    }catch(error){
        res.status(500).json({log: `failed to find product`, error: error.message})
    }
})

export async function findAllProducts(){
    try{
        let arrayOfProducts = await fetch(`http://localhost:3000/products`,{
            method : 'GET'
        })
        let result = await arrayOfProducts.json();
        console.log(result);
        return result;
    }catch(error){
        console.log(error);
    }
}

app.get(`/products`,(req,res)=>{
    try{
        let arrayOfProducts = db.prepare(`
            SELECT * FROM products
            `).all();
            return res.json(arrayOfProducts);
    }catch(error){
        res.status(500).json({log: `failed find all product`, error: error.message})
    }
})

export async function modifyProduct(product){
    try{
        let modifyProduct = await fetch(`http://localhost:3000/products/${encodeURIComponent(product.id)}`,{
            method : 'PUT',
            headers : {'content-type' : 'application.json'},
            body : JSON.stringify(product)
        })
        const result = await modifyProduct.json();
        console.log(result);
        return result;
    }catch(error){
        console.log(error);
    }
}

app.put('/products/:id',(req,res)=>{
    try{
        const {name,price,stock,category,sellerId,createdAt,description} = req.body
        db.prepare(`
            UPDATE products SET
            name = ?,
            price = ?,
            stock = ?,
            category = ?,
            sellerId = ?,
            createdAt = ?,
            description = ?
            WHERE id = ?
            `).run(name,price,stock,category,sellerId,createdAt,description,req.params.id);
        let updatedProduct = db.prepare(`
            SELECT * FROM products
            WHERE id = ?
            `).get(req.params.id);
        return res.json(updatedProduct);
    }catch(error){
        res.status(500).json({log: `failed update product`, error: error.message})
    }
})

export async function deleteProduct(productId){
    try{
        let deleteProduct = await fetch(`http://localhost:3000/products/${encodeURIComponent(productId)}`,{
            method:'DELETE'
        })
        console.log('Item was deleted');
    }catch(error){
        console.log(error);
    }
}

app.delete('/products/:id',(req,res)=>{
    try{
        db.prepare(`
            DELETE FROM products
            WHERE id = ?
            `).run(req.params.id);
        console.log('product deleted');
    }catch(error){
            res.status(500).json({log: `failed to delete product`, error: error.message})
    }

})