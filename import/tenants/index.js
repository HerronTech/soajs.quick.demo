var tenants = [
	{
		"_id": '58bd20bc06f3698ba308dc18',
		"type": "client",
		"code": "DETE",
		"name": "Demo tenant 1",
		"description": "This tenant will use package 1 that contains 4 public APIs",
		"oauth": {},
		"applications": [
			{
				"product": "DEV",
				"package": "DEV_PACK1",
				"appId": '58bd240606f3698ba308dc21',
				"description": null,
				"_TTL": 21600000,
				"keys": [
					{
						"key": "0e379751d5dda1952d64022bae2324dd",
						"extKeys": [
							{
								"extKey": "",
								"device": {},
								"geo": {},
								"env": "DEV"
							}
						],
						"config": {
							"dev": {
								"demo": {
									"model": "memory"
								}
							}
						}
					}
				]
			}
		]
	},
	{
		"_id": '58bd22ef06f3698ba308dc19',
		"type": "client",
		"code": "DET1",
		"name": "Demo tenant 2",
		"description": "This tenant uses package 2 that has access to 2 private APIs with a non-multitenant mongo database.",
		"oauth": {},
		"applications": [
			{
				"product": "DEV",
				"package": "DEV_PACK2",
				"appId": '58bd23fc06f3698ba308dc20',
				"description": null,
				"_TTL": 21600000,
				"keys": [
					{
						"key": "3e448a272922fdb43f3d929940665ce2",
						"extKeys": [
							{
								"extKey": "",
								"device": {},
								"geo": {},
								"env": "DEV"
							}
						],
						"config": {
							"dev": {
								"demo": {
									"model": "mongo",
									"MT": false
								}
							}
						}
					}
				]
			}
		]
	},
	{
		"_id": '58bd234e06f3698ba308dc1a',
		"type": "client",
		"code": "DET2",
		"name": "Demo tenant 3",
		"description": "This tenant uses package 2 that has access to 2 private APIs with a non-multitenant mongo database.",
		"oauth": {},
		"applications": [
			{
				"product": "DEV",
				"package": "DEV_PACK2",
				"appId": '58bd23f406f3698ba308dc1f',
				"description": null,
				"_TTL": 21600000,
				"keys": [
					{
						"key": "dc67afb5a31d9ae13c0ad6e2001cf87d",
						"extKeys": [
							{
								"extKey": "",
								"device": {},
								"geo": {},
								"env": "DEV"
							}
						],
						"config": {
							"dev": {
								"demo": {
									"model": "mongo",
									"MT": false
								}
							}
						}
					}
				]
			}
		]
	},
	{
		"_id": '58bd239506f3698ba308dc1b',
		"type": "client",
		"code": "DET3",
		"name": "Demo tenant 4",
		"description": "This tenant uses package 3 that has 4 private APIs with a multitenant mongo database.",
		"oauth": {},
		"applications": [
			{
				"product": "DEV",
				"package": "DEV_PACK2",
				"appId": '58bd23e806f3698ba308dc1e',
				"description": null,
				"_TTL": 21600000,
				"keys": [
					{
						"key": "3417d6117caf342da1128c7fa1bc2095",
						"extKeys": [
							{
								"extKey": "",
								"device": {},
								"geo": {},
								"env": "DEV"
							}
						],
						"config": {
							"dev": {
								"model": "mongo",
								"MT": true
							}
						}
					}
				]
			}
		]
	},
	{
		"_id": '58bd23aa06f3698ba308dc1c',
		"type": "client",
		"code": "DET4",
		"name": "Demo tenant 5",
		"description": "This tenant uses package 3 that has 4 private APIs with a multitenant mongo database.",
		"oauth": {},
		"applications": [
			{
				"product": "DEV",
				"package": "DEV_PACK2",
				"appId": '58bd23dd06f3698ba308dc1d',
				"description": null,
				"_TTL": 21600000,
				"keys": [
					{
						"key": "5e3219ee6f9aa9a96e8bc2d1e4fa3e80",
						"extKeys": [
							{
								"extKey": "",
								"device": {},
								"geo": {},
								"env": "DEV"
							}
						],
						"config": {
							"dev": {
								"demo": {
									"model": "mongo",
									"MT": true
								}
							}
						}
					}
				]
			}
		]
	}
];

module.exports = tenants;