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
								"extKey": "cf2a739938ff3dc3a083fd64f78d439ad559c3e618794e8b53ec72849d7ffe178b27a064eb616c462d4a5d8f77e841ac6643ca25470ee2641da7a81e358dd82a5fe27f7a556022609267280df60b084afd7b81ccb4edc3b1add3ff8ec2c76b7a",
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
								"extKey": "b2a0196c4b8d459133d68493b3bf5a199f639257d9b82c20c42c9a7179865f72f22a3bef63fdc77f3a42dc3245bd7154f7daeaff3766290d0086d7d3b803d6881837aa88a0c3c038d7fddea1839894eaf285d7d4af467dd39dd5124e21eca10c",
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
								"extKey": "2541e398a5f7c05fb85c93277de915a0dd931732de8c2a74884646b7b95e448f9e5410f9ffd5d936b5d64c8bb00f86cb552b122c98cc0b300536ffc921b5cab41c148125557d6a329a23b28a82295b8f2fe6d4d1602dee45e22f34a7fba0a646",
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
				"package": "DEV_PACK3",
				"appId": '58bd23e806f3698ba308dc1e',
				"description": null,
				"_TTL": 21600000,
				"keys": [
					{
						"key": "3417d6117caf342da1128c7fa1bc2095",
						"extKeys": [
							{
								"extKey": "50f0b025b5714f8c88b98b4bbc1d6a440245e22fd458157c0d55e875b25b97ef22bdaec7bf480c031ea0be6f15779e54ac8c947a9d602313a9b7cc7bf87365f722020b3db5d3d39736fcabcd6d92dead2ae4eb33ee2fb1dbeab407b8b0b589a3",
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
				"package": "DEV_PACK3",
				"appId": '58bd23dd06f3698ba308dc1d',
				"description": null,
				"_TTL": 21600000,
				"keys": [
					{
						"key": "5e3219ee6f9aa9a96e8bc2d1e4fa3e80",
						"extKeys": [
							{
								"extKey": "1499293cee0d07251981350c011c0d50742dfa4084d321c416865ab7e06c138653df279b29a2aed406044894b89d624687d979cb0eb3ad7bfcfddc2d6443df1d03d720c660e39184783f173125515c537672864b61850e6d9b3928c3400dac0e",
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