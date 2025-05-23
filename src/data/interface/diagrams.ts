export interface DataDiagrams {
    type: string;
    labels: string[];
    datasets: {
        label: string;
        data: string[];
        backgroundColor: string;
        borderColor: string;
        // borderWidth: number;
    }[];
}

export interface OptionsDiagrams {
    responsive: boolean;
    plugins: {
        title: {
            display: boolean;
            text: string;
            color: string;
            font: {
                size: number;
                weight: "bold";
            };
        };
    };
    scales: {
        x: {
            ticks: {
                color: string;
                font: {
                    size: number;
                };
            };
        };
        y: {
            beginAtZero: boolean;
            ticks: {
                color: string,
                font: {
                    size: number,
                },
            },
        };
    };
}