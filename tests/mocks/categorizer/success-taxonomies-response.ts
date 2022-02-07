export default {
    "taxonomies": [
        {
            "description": "The iptc document classification resources classify texts based on the IPTC Media Topics taxonomy",
            "languages": [
                {
                    "code": "en",
                    "name": "English"
                },
                {
                    "code": "es",
                    "name": "Spanish"
                },
                {
                    "code": "fr",
                    "name": "French"
                },
                {
                    "code": "de",
                    "name": "German"
                },
                {
                    "code": "it",
                    "name": "Italian"
                }
            ],
            "name": "iptc"
        },
        {
            "contract": "https://github.com/therealexpertai/nlapi-openapi-specification/blob/master/geotax-w-geojson.yaml",
            "description": "The geotax document classification resources recognize geographic places cited in the text and return corresponding countries' names. In addition, when requested with a specific query-string parameter, they return extra-data containing equivalent GeoJSON objects. Refer to the specific OpenAPI document (https://github.com/therealexpertai/nlapi-openapi-specification/blob/master/geotax-w-geojson.yaml) for this special use of the API resources.",
            "languages": [
                {
                    "code": "en",
                    "name": "English"
                },
                {
                    "code": "es",
                    "name": "Spanish"
                },
                {
                    "code": "fr",
                    "name": "French"
                },
                {
                    "code": "de",
                    "name": "German"
                },
                {
                    "code": "it",
                    "name": "Italian"
                }
            ],
            "name": "geotax"
        },
        {
            "description": "The emotional-traits document classification resources classify documents in terms of feelings like joy, surprise, irritation, etc. expressed in the text. In addition, when requested with a specific query-string parameter, they return extra-data containing the main groups to which the emotional traits belong. Especially with longer texts, main groups are an useful abstract of the detailed classification. Refer to the specific OpenAPI document (https://github.com/therealexpertai/nlapi-openapi-specification/blob/master/emotional-traits-w-main-groups.yaml) for this special use of the API resources.",
            "languages": [
                {
                    "code": "en",
                    "name": "English"
                },
                {
                    "code": "de",
                    "name": "German"
                }
            ],
            "name": "emotional-traits"
        },
        {
            "description": "The behavioral-traits document classification resources classify document in terms of personality traits like curiosity, honesty, negativity, etc. the text deals with.",
            "languages": [
                {
                    "code": "en",
                    "name": "English"
                },
                {
                    "code": "de",
                    "name": "German"
                }
            ],
            "name": "behavioral-traits"
        }
    ]
}
