import BarChartComponent from "./BarChartComponent";
import { format, subDays } from 'date-fns';
import { Campaign } from "@prisma/client";


interface TotalMessagesProps {
    last7DaysSentMessages: number[];
    last7DaysConversations: number[];
}

const Summary: React.FC<TotalMessagesProps> = ({ last7DaysSentMessages, last7DaysConversations }) => {
    
    const generateLast7DaysLabels = (): string[] => {
        const labels: string[] = [];
      
        for (let i = 0; i < 7; i++) {
          const date = subDays(new Date(), i);
          const formattedDate = format(date, 'MMM dd'); // 
          labels.unshift(formattedDate); // Ajouter la date formatée au début du tableau pour inverser l'ordre
        }
      
        return labels;
    };


    const chartData = {
        labels: generateLast7DaysLabels(),
        sentMessages: last7DaysSentMessages,
        answers: last7DaysConversations
    };
    

    return ( 
        <div 
        className="
            p-6
            h-full
            flex-1 
            flex 
            flex-col
            justify-center 
            items-center 
            bg-white
            rounded-3xl
            relative
            shadow-md
            w-1/2
        "
        >
            <BarChartComponent chartData={chartData}/>
            <h4 className="absolute top-4 left-4">Summary</h4>
            <h5 className="absolute top-10 left-4 ">Last week</h5>
        </div>
    );
}

export default Summary;