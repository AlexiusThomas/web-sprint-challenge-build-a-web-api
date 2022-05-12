// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if (action) {
            req.action = action
            next()
        } else {
            next({
                status: 404,
                message: "No project found"
            })
        }
    } catch (err) {
        next
    }
}
async function validateAction(req, res, next) {
    try {
        const { description, notes } = req.body
        if (!notes || !description) {
            res.status(400).json({
                message: "Missing valid notes or description"
            })
        }else{
            next()
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    validateActionId,
    validateAction
}