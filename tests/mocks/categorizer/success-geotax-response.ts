export default {
    "success": true,
    "data": {
        "content": "Last year I moved from San Francisco to New York.",
        "language": "en",
        "version": "sensei: 4.7.0; disambiguator: 15.0-QNTX-2016",
        "categories": [
            {
                "namespace": "cat-geo_en_1.0",
                "id": "185.",
                "label": "United States of America",
                "hierarchy": [
                    "United States of America"
                ],
                "score": 60,
                "frequency": 50.0,
                "winner": true,
                "positions": [
                    {
                        "start": 23,
                        "end": 36
                    },
                    {
                        "start": 40,
                        "end": 48
                    }
                ]
            },
            {
                "namespace": "cat-geo_en_1.0",
                "id": "18505.",
                "label": "California",
                "hierarchy": [
                    "United States of America",
                    "California"
                ],
                "score": 30,
                "frequency": 25.0,
                "winner": true,
                "positions": [
                    {
                        "start": 23,
                        "end": 36
                    }
                ]
            },
            {
                "namespace": "cat-geo_en_1.0",
                "id": "18533.",
                "label": "New York State",
                "hierarchy": [
                    "United States of America",
                    "New York State"
                ],
                "score": 30,
                "frequency": 25.0,
                "winner": true,
                "positions": [
                    {
                        "start": 40,
                        "end": 48
                    }
                ]
            }
        ],
        "extraData": {
            "geojson": {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                -98.57,
                                39.82
                            ]
                        },
                        "properties": {
                            "geonameId": "6252001",
                            "id": "/185.",
                            "name": "/United States of America"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                -120,
                                37
                            ]
                        },
                        "properties": {
                            "geonameId": "5332921",
                            "id": "/185./18505.",
                            "name": "/United States of America/United States of America/California"
                        }
                    },
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                -75,
                                43
                            ]
                        },
                        "properties": {
                            "geonameId": "5128638",
                            "id": "/185./18533.",
                            "name": "/United States of America/United States of America/New York State"
                        }
                    }
                ]
            }
        }
    }
}
