const ucsbOrganizationFixtures = {
    oneOrganization:
      {
       "id": 1,
        "orgCode": "ZPR",
        "orgTranslationShort": "Zeta Phi Rho",
        "orgTranslation": "Zeta Phi Rho at UCSB", 
        "inactive": true     
      },

    threeOrganizations:
    [
        {
            "id": 2,
            "orgCode": "WICS",
             "orgTranslationShort": "Women in CS",
             "orgTranslation": "Women in Computer Science at UCSB",
            "inactive": false

        },

        {
            "id": 3,
            "orgCode": "SKY",
             "orgTranslationShort": "Skydiving Club",
             "orgTranslation": "Skydiving Club at UCSB",
            "inactive": false

        },

        {
            "id": 4,
            "orgCode": "KRC",
             "orgTranslationShort": "KOREAN RADIO CL",
             "orgTranslation": "KOREAN RADIO CLUB",
            "inactive": true

        },
        
    ]
};

export { ucsbOrganizationFixtures };