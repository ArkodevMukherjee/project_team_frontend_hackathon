import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image file');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/classify', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError('An error occurred while classifying the image');
    } finally {
      setLoading(false);
    }
  };

  return (

    <>

    <Header />
    <div className=" container mt-0 -5App flex flex-col items-center justify-center min-h-screen p-4">
      <header className="w-full bg-gray-800 text-white p-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Plant Disease Classifier</h1>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 w-full border border-gray-300 rounded p-2"
          />
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4 text-white font-semibold rounded w-full ${
              loading ? 'bg-gray-500' : 'bg-blue-500'
            } hover:bg-blue-600`}
          >
            {loading ? 'Classifying...' : 'Classify Image'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {prediction && <p className="text-green-500 mt-4 text-xl">Prediction: {prediction}</p>}
      </main>
    </div>

    <Footer />
    </>
  );
}

export default App;
