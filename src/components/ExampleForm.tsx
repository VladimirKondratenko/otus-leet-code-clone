import React, { memo, useCallback } from 'react';

interface Example {
  input: string;
  output: string;
  explanation: string;
}

interface ExampleFormProps {
  example: Example;
  index: number;
  onUpdate: (index: number, field: keyof Example, value: string) => void;
  onRemove: (index: number) => void;
}

const ExampleForm: React.FC<ExampleFormProps> = memo(({
  example,
  index,
  onUpdate,
  onRemove
}) => {
  const handleChange = useCallback((field: keyof Example) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onUpdate(index, field, e.target.value);
  }, [index, onUpdate]);

  return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="card-subtitle mb-2">Пример {index + 1}</h6>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => onRemove(index)}
          >
            Удалить
          </button>
        </div>
        <div className="mb-2">
          <label className="form-label">Входные данные</label>
          <input
            type="text"
            className="form-control"
            value={example.input}
            onChange={handleChange('input')}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Выходные данные</label>
          <input
            type="text"
            className="form-control"
            value={example.output}
            onChange={handleChange('output')}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Объяснение</label>
          <textarea
            className="form-control"
            value={example.explanation}
            onChange={handleChange('explanation')}
          />
        </div>
      </div>
    </div>
  );
});

ExampleForm.displayName = 'ExampleForm';

export default ExampleForm; 