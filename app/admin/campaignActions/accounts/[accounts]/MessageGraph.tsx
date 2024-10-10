import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);

// Définir le type des données du graphique
interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        borderColor: string;
        tension: number;
    }[];
}

interface MessageGraphProps {
    instagramAccountId: string; // Typage explicite de la prop
}

const MessageGraph: React.FC<MessageGraphProps> = ({ instagramAccountId }) => {
    const [chartData, setChartData] = useState<ChartData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Appeler l'API via une requête POST en envoyant l'instagramAccountId
                const response = await axios.post('/api/getSentMessagesByInstagramAccountId', {
                    instagramAccountId: instagramAccountId,
                });

                const data = response.data;

                // Initialiser les comptes de messages par jour
                const messageCounts = Array(7).fill(0); // Initialise un tableau de 7 zéros
                const last7Days = Array.from({ length: 7 }, (_, i) => {
                    const day = new Date();
                    day.setDate(day.getDate() - i);
                    return day.toLocaleDateString('fr-CA'); // Format 'YYYY-MM-DD'
                }).reverse();

                // Pour chaque message, incrémenter le nombre de messages envoyés ce jour-là
                data.forEach((message: { createdAt: string }) => {
                    const messageDate = new Date(message.createdAt).toLocaleDateString('fr-CA');
                    const index = last7Days.indexOf(messageDate);
                    if (index !== -1) {
                        messageCounts[index] += 1; // Incrémente uniquement pour le jour correspondant
                    }
                });

                // Mettre à jour les données du graphique
                setChartData({
                    labels: last7Days, // Les 7 derniers jours comme labels
                    datasets: [
                        {
                            label: 'Messages sent',
                            data: messageCounts, // Nombre de messages par jour
                            fill: false,
                            borderColor: 'rgba(75,192,192,1)',
                            tension: 0.1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching message data:', error);
            }
        };

        fetchData();
    }, [instagramAccountId]);

    if (!chartData) return <p>Loading chart...</p>;

    return <Line data={chartData} />;
};

export default MessageGraph;
