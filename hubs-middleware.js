const Hubs = require('./hubs-model');

function validateHub(req, res, next) {
	// in httpie, send numbers with key:=value
	if (typeof req.body.name != 'string' || req.body.name.trim() == '') {
		res.status(400).json({ message: 'name is required' });
		return;
	}

	req.hub = { name: req.body.name.trim() };
	next();
}


function ensureHubIdExists(req, res, next) {
	Hubs.findById(req.params.id)
		.then(hub => {
			if (hub) {
				req.existingHub = hub;
				next();
			} else {
				res.status(404).json({ message: 'Hub not found' });
			}
		})
		.catch(error => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: 'Error retrieving the hub',
			});
		});
}


module.exports = {
	validateHub,
	ensureHubIdExists,
};