import productModel from '../model/productModel.js'
import slugify from 'slugify';
import fs from 'fs'


// create product
export const createProductController = async (req, res) => {
    try {
        const { name, color, price, category, quantity, shipping, description } = req.fields
        const { photo } = req.files
        // Validation
        if (!name) return res.status(400).send({ error: 'Name is required' });
        if (!description) return res.status(400).send({ error: 'Description is required' });
        if (!price) return res.status(400).send({ error: 'Price is required' });
        if (!category) return res.status(400).send({ error: 'Category is required' });
        if (!quantity) return res.status(400).send({ error: 'Quantity is required' });

        if (photo && photo.size > 1000000) {
            return res.status(400).send({ error: 'Photo should be less than 1 MB in size' });
        }

        const product = new productModel(
            {
                name,
                description,
                price,
                category,
                quantity,
                shipping,
                color,
                slug: slugify(name),
            }

        )

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: "Product create successfuly",
            product,
        })

    } catch (error) {

        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating product',
            error,
        });
    }
}



// get product
export const getProductController = async (req, res) => {
    try {

        const product = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 }).populate('category')
        res.status(201).send({
            success: true,
            total: product.length,
            message: 'All Product getting successfully',
            product,

        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting product',
            error,
        });
    }
}




// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const { slug } = req.params
        const product = await productModel.findOne({ slug }).select("-photo").populate('category')
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(201).send({
            success: true,
            message: 'Product getting successfully',
            product,

        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting product',
            error,
        });
    }
}


// get photo
export const getPhotoController = async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productModel.findById(pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting product photo',
            error,
        });
    }
}





// delete product
export const deleteProductController = async (req, res) => {
    try {
        const { pid } = req.params
        await productModel.findByIdAndDelete(pid)

        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting product',
            error,
        });
    }
}





// update product

// update product 
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        if (!name) return res.status(400).send({ error: 'Name is required' });
        if (!description) return res.status(400).send({ error: 'Description is required' });
        if (!price) return res.status(400).send({ error: 'Price is required' });
        if (!category) return res.status(400).send({ error: 'Category is required' });
        if (!quantity) return res.status(400).send({ error: 'Quantity is required' });

        if (photo && photo.size > 1000000) {
            return res.status(400).send({ error: 'Photo should be less than 1 MB in size' });
        }

        const { pid } = req.params
        const product = await productModel.findByIdAndUpdate(pid,
            { ...req.fields, slug: slugify(name) }, { new: true });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating  product',
            error,
        });
    }
}
