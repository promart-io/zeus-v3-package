/*
 * Copyright (c) 2017 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 */

var dao = require('zeus-accounts/data/dao/Deliver/Clusters.js')

exports.getTile = function() {
	return {
		'name': 'Clusters',
		'group': 'Deliver',
		'icon': 'cubes',
		'location': '/services/v3/web/zeus-accounts/ui/Deliver/index.html',
		'count': dao.customDataCount(),
		'order': '300'
	};
};
