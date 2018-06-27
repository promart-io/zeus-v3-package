var dao = require('zeus-applications/data/dao/Services')

exports.create = function(applicationId, services) {
	for (var i = 0; i < services.length; i ++) {
		dao.create({
			'Name': services[i].metadata.name,
			'Type': services[i].spec.type,
			'Port': services[i].spec.ports[0].port,
			'Application': applicationId
		});
	}
};

exports.delete = function(applicationId) {
	var services = dao.list({
		'Application': applicationId
	});

	for (var i = 0; i < services.length; i ++) {
		dao.delete(services[i].Id);
	}
};