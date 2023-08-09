// import slugify from 'slugify';
// import categoryModel from '../model/categoryModel.js';

// export const createCategoryController = async (req, res) => {
//     try {
//         const { name } = req.body;
//         if (!name) {
//             return res.status(401).send({ message: "Name is required" });
//         }
        
//         const existingCategory = await categoryModel.findOne({ name });
//         if (existingCategory) {
//             return res.status(200).send({
//                 success: false,
//                 message: "Category Already Exists",
//             });
//         }
        
//         const category = await new categoryModel({
//             name,
//             slug: slugify(name)
//         }).save();
        
//         res.status(201).send({
//             success: true,
//             message: "New category created",
//             category,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             error,
//             message: "Error while creating Category",
//         });
//     }
// };
