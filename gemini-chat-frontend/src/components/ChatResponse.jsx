import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
          <div className="bg-white shadow-md rounded p-4 mb-4 dark:bg-gray-800 dark:text-white">
            <h5 className="font-bold text-lg mb-2">Candidate {index + 1}</h5>
            
            {/* Render Markdown Content */}
            <div className="text-gray-700 mb-4 dark:text-gray-300">
              <ReactMarkdown
                children={candidate.content.parts[0].text}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  strong({ node, children, ...props }) {
                    return (
                      <strong className="font-bold" {...props}>
                        {children}
                      </strong>
                    );
                  },
                  ul({ node, children, ...props }) {
                    return (
                      <ul className="list-disc pl-5" {...props}>
                        {children}
                      </ul>
                    );
                  },
                  ol({ node, children, ...props }) {
                    return (
                      <ol className="list-decimal pl-5" {...props}>
                        {children}
                      </ol>
                    );
                  },
                  h1({ node, children, ...props }) {
                    return (
                      <h1 className="text-2xl font-bold my-2" {...props}>
                        {children}
                      </h1>
                    );
                  },
                  h2({ node, children, ...props }) {
                    return (
                      <h2 className="text-xl font-bold my-2" {...props}>
                        {children}
                      </h2>
                    );
                  },
                  h3({ node, children, ...props }) {
                    return (
                      <h3 className="text-lg font-bold my-2" {...props}>
                        {children}
                      </h3>
                    );
                  },
                  p({ node, children, ...props }) {
                    return (
                      <p className="my-2" {...props}>
                        {children}
                      </p>
                    );
                  },
                }}
              />
            </div>

            {/* Citations Section */}
            <h6 className="font-bold mb-2">Citations</h6>
            <ul className="list-disc pl-5">
              {candidate?.citationMetadata?.citationSources.map((source, idx) => (
                <li key={idx} className="mb-2">
                  <a 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline"
                  >
                    {source.uri}
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
      <p className="text-gray-700 dark:text-gray-300">Prompt Token: {usageMetadata.promptTokenCount}</p>
      <p className="text-gray-700 dark:text-gray-300">Response Token: {usageMetadata.candidatesTokenCount}</p>
      <p className="text-gray-700 dark:text-gray-300">Total Token: {usageMetadata.totalTokenCount}</p>
    </div>
  );
};

export default ChatResponse;