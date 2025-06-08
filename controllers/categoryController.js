import categoryModel from "../models/categoryModel.js"
class categoryController
{
    static getAllCategories = async (req,res) =>{
        try {
            const fetchAllCategories = await categoryModel.find({})
            return res.status(200).json(fetchAllCategories)
        } catch (error) {
            return res.status(400).json({message: error.message})
        }
    }
    
    static addNewCategories = async (req,res) =>{
            
        const { title } = req.body;
        try {

            if(title){
                const newCategory = new categoryModel({
                    title,
                })
                const savedCategory = await newCategory.save()
                if(savedCategory){

                    return res.status(200).json({message: "added category successfully"})
                }else{
                    return res.status(400).json({message: "save the category"})
                }

            }else{
                return res.status(400).json({message: "give title"})
            }
            
        } catch (error) {
            return res.status(400).json({message: error.message})
        }

    }

}

export default categoryController;