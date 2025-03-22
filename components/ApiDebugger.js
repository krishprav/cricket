// Add this temporary debug component
function ApiDebugger() {
    const [apiStatus, setApiStatus] = useState('Checking...');
    
    useEffect(() => {
      const checkApi = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/health`);
          if (response.ok) {
            setApiStatus('✅ Connected to API');
          } else {
            setApiStatus('❌ API Connection Failed');
          }
        } catch (error) {
          setApiStatus(`🔥 Connection Error: ${error.message}`);
        }
      };
      
      checkApi();
    }, []);
  
    return (
      <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg text-sm">
        <p>API URL: {API_BASE_URL}</p>
        <p>Status: {apiStatus}</p>
      </div>
    );
  }
  