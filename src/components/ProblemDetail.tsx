import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Problem, Example } from '../types';

interface ProblemDetailProps {
  problem: Problem;
  onSubmit: (code: string) => Promise<void>;
}

const ProblemDetail: React.FC<ProblemDetailProps> = ({ problem, onSubmit }) => {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(code);
      setOutput('Решение отправлено на проверку');
    } catch (error) {
      setOutput('Ошибка при отправке решения');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Левая панель с описанием задачи */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{problem.title}</h2>
              <div className="mb-3">
                <span className={`badge bg-${problem.difficulty === 'Easy' ? 'success' : 
                  problem.difficulty === 'Medium' ? 'warning' : 'danger'}`}>
                  {problem.difficulty}
                </span>
              </div>
              <div className="mb-3">
                <h5>Теги:</h5>
                <div className="d-flex gap-2">
                  {problem.tags.map(tag => (
                    <span key={tag.id} className="badge bg-secondary">{tag.name}</span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h5>Описание:</h5>
                <p>{problem.description}</p>
              </div>
              <div>
                <h5>Примеры:</h5>
                {problem.examples.map((example: Example, index: number) => (
                  <div key={index} className="card mb-2">
                    <div className="card-body">
                      <h6>Пример {index + 1}</h6>
                      <p><strong>Входные данные:</strong> {example.input}</p>
                      <p><strong>Выходные данные:</strong> {example.output}</p>
                      <p><strong>Объяснение:</strong> {example.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Правая панель с редактором кода */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title">Решение</h5>
                <button 
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </button>
              </div>
              <Editor
                height="500px"
                defaultLanguage="typescript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyond: false,
                }}
              />
              {output && (
                <div className="mt-3">
                  <h6>Результат:</h6>
                  <pre className="bg-light p-3 rounded">{output}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail; 