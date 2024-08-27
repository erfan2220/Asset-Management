const Config_menu =[
    {
        id:1,
        title:"RAN",
        itemsFirst:
            [
                {
                    id:1,
                    title:"Nokia",
                    api: "api/report/nokia_chm",
                    Sites: []
                    // Sites:
                    //     [
                    //         {
                    //             id:1,
                    //             title:"IPBB"
                    //         },
                    //         {
                    //             id:2,
                    //             title:"IPBC"
                    //         },
                    //
                    //     ]

                },
                {
                    id:2,
                    title:"Huawei",
                    api: "api/report/daily",
                    Sites: []
                    // Sites:
                    //     [
                    //         {
                    //             id:1,
                    //             title:"IPBE"
                    //         },
                    //         {
                    //             id:2,
                    //             title:"IPBF"
                    //         },
                    //
                    //     ]
                },
                {
                    id:3,
                    title:"Ericsson",
                    api: "api/report/daily",
                    Sites: []
                    // Sites:
                    //     [
                    //         {
                    //             id:1,
                    //             title:"IPBA"
                    //         },
                    //         {
                    //             id:2,
                    //             title:"IPBQ"
                    //         },
                    //
                    //     ]
                }
            ]

    },
    {
        id:2,
        title:"CORE",
        itemsFirst:
            [
                {
                    id:1,
                    title:"Nokia",
                    api: "api/report/nokia_core",
                    Sites: []
                    // Sites:
                    //     [
                    //         {
                    //             id:1,
                    //             title:"IPBR"
                    //         },
                    //         {
                    //             id:2,
                    //             title:"IPBO"
                    //         },
                    //
                    //     ]
                },
                {
                    id:2,
                    title:"Huawei",
                    api: "api/report/daily",
                    Sites: []
                    // Sites:
                    //     [
                    //         {
                    //             id:1,
                    //             title:"IPBP"
                    //         },
                    //         {
                    //             id:2,
                    //             title:"IPBU"
                    //         },
                    //
                    //     ]
                },
                {
                    id:3,
                    title:"Ericsson",
                    api: "api/report/daily",
                    Sites: []
                    // Sites:
                    //     [
                    //         {
                    //             id:1,
                    //             title:"IPBN"
                    //         },
                    //         {
                    //             id:2,
                    //             title:"IPBM"
                    //         },
                    //
                    //     ]
                }
            ]

    },
    {
        id:3,
        title:"TRANSMISSION",
        itemsFirst:
            [
                {
                    id:1,
                    title:"IPBB",
                    api: "api/transmission/ipbb",
                    Sites: []

                },
                {
                    id:2,
                    title:"IPBH",
                    api: "api/transmission/ipbh",
                    Sites: []
                },
                {
                    id:3,
                    title:"CS",
                    api: "api/transmission/CS",
                    Sites: []
                },
                {
                    id:4,
                    title:"PS",
                    api: "api/transmission/ps",
                    Sites: []
                },
                {
                    id:5,
                    title:"CBS",
                    api: "api/transmission/cbs",
                    Sites: []
                },
                {
                    id:6,
                    title:"CLOUD",
                    api: "api/transmission/cloud",
                    Sites: []
                },
                {
                    id:7,
                    title:"HSS",
                    api: "api/transmission/hss",
                    Sites: []
                },
                {
                    id:8,
                    title:"VAS",
                    api: "api/transmission/vas",
                    Sites: []
                },


            ]

    },
    {
        id:4,
        title:"Custom Report",
        itemsFirst:
            [
                {
                    id:1,
                    title:"Comparison Report",
                    api:"Custom Report1",
                    Sites: []
                },
                {
                    id:2,
                    title:"Top 10 Change",
                    api:"http://10.15.90.86:1022/api/v1/chmperparam",
                    Sites: []
                },



            ]
    },

]

export default Config_menu;