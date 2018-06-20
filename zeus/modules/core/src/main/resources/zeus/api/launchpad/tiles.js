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
var response = require('http/v3/response');

var tiles = [];

var tileExtensions = extensions.getExtensions('launchpad-zeus-tiles');
for (var i = 0; tileExtensions !== null && i < tileExtensions.length; i++) {
    var tileExtension = require(tileExtensions[i]);
    var tile = tileExtension.getTile();
    tiles.push(tile);
}

tiles.sort(function(p, n) {
	var result = parseInt(p.order, 0) - parseInt(n.order, 0);
	if (result === 0) {
		result = p.name > n.name ? 1 : p.name < n.name ? -1 : 0;
	}
	return result;
});

response.println(JSON.stringify(tiles));
