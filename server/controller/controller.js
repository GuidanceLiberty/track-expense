import model from '../models/model.js'

// POST: http://localhost:9090/api/categories
export const createCategories = async (req, res) => {
    try {
        const Create = new model.Categories({
            type: "Investment",
            color: '#FCBE44', // dark
        });

        const savedCategory = await Create.save();
        return res.json(savedCategory);
    } catch (err) {
        return res.status(400).json({
            message: `Error while creating categories: ${err.message}`
        });
    }
}


// GET: http://localhost:9090/api/categories
export const getCategories = async (req, res) =>{
    let data = await model.Categories.find({})

  let filter = await data.map(v => Object.assign({}, {type: v.type, color: v.color}));
    return res.json(filter);
}

// POST http://localhost:9090/api/transaction
export const createTransaction = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Post HTTP Data not Provided" });
        }

        const { name, type, amount } = req.body;

        const create = new model.Transaction({
            name,
            type,
            amount,
            date: new Date()
        });

        const savedTransaction = await create.save();
        return res.json(savedTransaction);

    } catch (err) {
        return res.status(400).json({
            message: `Error while creating transaction: ${err.message}`
        });
    }
};


// GET http://localhost:9090/api/transaction
export const getTransaction = async (req, res) =>{
    let data = await model.Transaction.find({});
    return res.json(data);
}


// DELETE http://localhost:9090/api/transaction
export const deleteTransaction = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Request body not found" });
        }

        const result = await model.Transaction.deleteOne(req.body);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No matching transaction found" });
        }

        return res.json({ message: "Record Deleted" });
    } catch (err) {
        return res.status(500).json({ message: `Error while deleting transaction: ${err.message}` });
    }
};


// GET http://localhost:9090/api/labels
export const getLabels = async(req, res) => {

    model.Transaction.aggregate([
        {
            $lookup:{
                from: "categories",
                localField: 'type',
                foreignField:"type",
                as:"categories_info"
            }
        },
        {
           $unwind: "$categories_info" 
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, {_id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color']}))
        res.json(data);
    }).catch(error =>{
        res.status(400).json("Lookup Collection Error");
    })
}
