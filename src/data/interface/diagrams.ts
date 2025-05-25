export interface DataDiagrams {
    type: string;
    labels: string[];
    datasets: {
        label: string;
        data: string[];
        backgroundColor: string | string[];
        borderColor: string | string[];
        // borderWidth: number;
    }[];
}

export interface OptionsDiagrams {
    responsive: boolean;
    plugins: {
        legend?: {
            position: "right" | "left" | "top" | "bottom" | "center" | "chartArea" ;
        };
        tooltip?: {
            enabled: boolean;
        }
        title?: {
            display: boolean;
            text: string;
            color: string;
            font: {
                size: number;
                weight: "bold";
            };
        };
    };
    scales?: {
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


export interface DataPieDiagram {
    labels: string[],
    datasets: {
        label: string,
        data: string[],
        backgroundColor: string[] | string,
        borderColor: string[] | string,
        borderWidth: number,
    }[],
}
