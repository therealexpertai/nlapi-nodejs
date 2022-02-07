export default {
    "success": true,
    "data": {
        "content": "Michael Jordan was one of the best basketball players of all time. Scoring was Jordan's stand-out skill, but he still holds a defensive NBA record, with eight steals in a half.",
        "language": "en",
        "version": "sensei: 4.7.0; disambiguator: 16.0-QNTF-2017",
        "knowledge": [
            {
                "syncon": 628,
                "label": "action",
                "properties": [
                    {
                        "type": "DBpediaId",
                        "value": "dbpedia.org/page/Score_(game)"
                    },
                    {
                        "type": "WikiDataId",
                        "value": "Q522344"
                    }
                ]
            },
            {
                "syncon": 25683,
                "label": "quality.human_feature",
                "properties": [
                    {
                        "type": "DBpediaId",
                        "value": "dbpedia.org/page/Skill"
                    },
                    {
                        "type": "WikiDataId",
                        "value": "Q205961"
                    }
                ]
            },
            {
                "syncon": 41582,
                "label": "person.basketball_player",
                "properties": [
                    {
                        "type": "DBpediaId",
                        "value": "dbpedia.org/page/Basketball_player"
                    },
                    {
                        "type": "WikiDataId",
                        "value": "Q3665646"
                    }
                ]
            },
            {
                "syncon": 54372,
                "label": "object"
            },
            {
                "syncon": 86967,
                "label": "other"
            },
            {
                "syncon": 111940,
                "label": "event.happening"
            },
            {
                "syncon": 160439,
                "label": "other"
            }
        ],
        "sentiment": {
            "overall": 15.3,
            "negativity": 0.0,
            "positivity": 15.3,
            "items": [
                {
                    "lemma": "",
                    "syncon": -1,
                    "sentiment": 5.0,
                    "items": [
                        {
                            "lemma": "but",
                            "syncon": 160439,
                            "sentiment": -1.0
                        },
                        {
                            "lemma": "steal",
                            "syncon": 54372,
                            "sentiment": 6.0
                        }
                    ]
                },
                {
                    "lemma": "basketball player",
                    "syncon": 41582,
                    "sentiment": 5.0,
                    "items": [
                        {
                            "lemma": "good",
                            "syncon": 86967,
                            "sentiment": 5.0
                        }
                    ]
                },
                {
                    "lemma": "scoring",
                    "syncon": 628,
                    "sentiment": 9.5,
                    "items": [
                        {
                            "lemma": "stand-out;skill",
                            "syncon": 111940,
                            "sentiment": 9.5
                        }
                    ]
                },
                {
                    "lemma": "skill",
                    "syncon": 25683,
                    "sentiment": 3.5,
                    "items": [
                        {
                            "lemma": "scoring",
                            "syncon": 628,
                            "sentiment": 3.5
                        }
                    ]
                }
            ]
        }
    }
}
