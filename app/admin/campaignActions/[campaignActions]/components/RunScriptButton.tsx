"use client";

import { useState } from 'react';
import axios from 'axios';

interface RunScriptButtonProps {
  endpoint: string;
  campaignId: string;
  buttonText?: string;
  params?: { [key: string]: any };
}

const RunScriptButton: React.FC<RunScriptButtonProps> = ({ endpoint, campaignId, buttonText = 'Run API Call', params = {} }) => {
	const [loading, setLoading] = useState(false);
	const [scriptStatus, setScriptStatus] = useState<string>(''); 
	const [error, setError] = useState<string>('');

	const handleCallAPI = async () => {
		if (!endpoint) {
			setError('Endpoint is required');
			return;
		}

    setLoading(true);
    setError('');
    setScriptStatus('running');

    try {
		const response = await axios.post(`/api/callFlaskServerAPI?endpoint=${endpoint}`, { campaignId, ...params });

		if (response.status === 200) {
			setScriptStatus('finished');
			setError(response.data.error || '');
		} else {
			setScriptStatus('error');
			setError(response.data.error || 'An error occurred');
		}
		} catch (err: any) {
			setScriptStatus('error');
			setError(err.response?.data?.error || 'An error occurred while calling the web API');
		} finally {
			setLoading(false);
		}
	};

	const renderButtonText = () => {
		if (loading) return 'Loading...';
		if (scriptStatus === 'running') return 'Running...';
		if (scriptStatus === 'finished') return 'Finished';
		if (scriptStatus === 'error') return 'Error';
		return buttonText;
	};

	return (
		<div className="w-72 mb-2">
			<div
				className={`${
				loading || scriptStatus === 'running' ? 'bg-gray-400' : 'bg-red-400'
				} text-white rounded-xl py-2 px-4 w-full cursor-pointer text-center`}
				onClick={handleCallAPI}
				style={{ pointerEvents: loading ? 'none' : 'auto' }}
			>
				<h4>{renderButtonText()}</h4>
			</div>
			
			{error && (
				<div className="mt-4">
				<pre>{error}</pre>
				</div>
			)}
		</div>
	);
};

export default RunScriptButton;
