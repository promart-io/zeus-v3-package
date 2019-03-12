/*
 * Copyright (c) 2017 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 */

var extensions = require('core/v3/extensions');
var request = require('http/v3/request');
var response = require('http/v3/response');

var perspectives = [];

var relativePath = getRelativePath(request.getParameter('pathSegments'));
var perspectiveExtensions = extensions.getExtensions('launchpad-zeus-perspective');
for (var i = 0; perspectiveExtensions !== null && i < perspectiveExtensions.length; i++) {
    var perspectiveExtension = require(perspectiveExtensions[i]);
    var perspective = perspectiveExtension.getPerspective(relativePath);
    perspectives.push(perspective);
}

perspectives.sort(function(p, n) {
	return parseInt(p.order, 0) - parseInt(n.order, 0);
});

response.println(JSON.stringify(perspectives));

function getRelativePath(pathSegments) {
	var relativePath = '/';
	for (var i = 0; i < pathSegments; i ++) {
		relativePath += '../';
	}
	return relativePath;
}
