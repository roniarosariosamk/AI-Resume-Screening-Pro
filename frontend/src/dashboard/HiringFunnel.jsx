function HiringFunnel() {

    const stages = [

        {
            title: "Applicants",
            count: 156,
            color: "bg-cyan-500"
        },

        {
            title: "Screened",
            count: 102,
            color: "bg-blue-500"
        },

        {
            title: "Shortlisted",
            count: 45,
            color: "bg-green-500"
        },

        {
            title: "Interview",
            count: 18,
            color: "bg-yellow-500"
        },

        {
            title: "Hired",
            count: 6,
            color: "bg-purple-500"
        }

    ];

    return (

        <div className="mt-14">

            <h2 className="text-3xl font-bold text-white mb-8">

                📊 Hiring Funnel

            </h2>

            <div className="space-y-5">

                {

                    stages.map((stage,index)=>(

                        <div key={index}>

                            <div className="flex justify-between text-white mb-2">

                                <span>{stage.title}</span>

                                <span>{stage.count}</span>

                            </div>

                            <div className="w-full h-5 bg-slate-800 rounded-full">

                                <div

                                    className={`${stage.color} h-5 rounded-full`}

                                    style={{

                                        width:`${stage.count/156*100}%`

                                    }}

                                />

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default HiringFunnel;