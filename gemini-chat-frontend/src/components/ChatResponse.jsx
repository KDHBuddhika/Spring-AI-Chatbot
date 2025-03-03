import React from 'react';

const ChatResponse = ({ response, darkMode }) => {
  if (!response) {
    return null;
  }

  const { candidates, usageMetadata } = response;

  return (
    <div className="space-y-6">
      {candidates.map((candidate, index) => (
        <div key={index} className={`chat-bubble bot group hover:shadow-md ${
          darkMode ? 'dark:bg-gray-800 dark:border-gray-700 dark:text-white' : ''
        }`}>
          <div className="bg-white shadow-md rounded p-4 mb-4">
            <h5 className="font-bold text-lg mb-2">Candidate {index + 1}</h5>
            <p className="text-gray-700 mb-4">{candidate.content.parts[0].text}</p>

            {/* Citations Section */}
            <h6 className="font-bold mb-2">Citations</h6>
            <ul className="list-disc pl-5">
              {candidate?.citationMetadata?.citationSources.map((source, idx) => (
                <li key={idx} className="mb-2">
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline"
                  >
                    {source.url}
                  </a>{' '}
                  (Indexes: {source.startIndex} - {source.endIndex})
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Usage Metadata */}
      <h4 className="text-xl font-bold mt-6">Usage Metadata:</h4>
      <p className="text-gray-700">Prompt Token: {usageMetadata.promptTokenCount}</p>
      <p className="text-gray-700">Response Token: {usageMetadata.candidatesTokenCount}</p>
      <p className="text-gray-700">Total Token: {usageMetadata.totalTokenCount}</p>
    </div>
  );
};

export default ChatResponse;