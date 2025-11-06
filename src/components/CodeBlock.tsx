import React from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  return (
    <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto text-sm">
      <code>{children}</code>
    </pre>
  );
};

export default CodeBlock;