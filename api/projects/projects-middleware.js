// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const id = await Project.get(req.params.id)
        if (id) {
            req.project = id
            next()
        } else {
            next({ status: 404, message: "No project found" })
        }
    } catch (err) {
        next(err)
    }
}

function validateProject(req, res, next) {
    try {
        const { name, description } = req.body
        if (!name || !description) {
            res.status(400).json({
                message: "missing required info"
            })
            next()
        } else {
            next()
        }
    }
    catch (err) {
        next(err)
    }
}

function validateProjectUpdate(req, res, next) {
    try {
        const { name, description, completed } = req.body
        console.log(req.body)
        if (!name || !description || completed === undefined) {
            res.status(400).json({
                message: "missing required info"
            })
            next()
        } else {
            next()
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    validateProjectId,
    validateProject,
    validateProjectUpdate
} 