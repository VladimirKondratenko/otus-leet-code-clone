import React, { useState, useEffect } from 'react';
import { Problem, Tag, Example } from '../types';

interface ProblemFormProps {
  problem?: Problem;
  tags: Tag[];
  onSubmit: (problem: Omit<Problem, 'id'>) => Promise<void>;
  onCancel: () => void;
}

const ProblemForm: React.FC<ProblemFormProps> = ({ problem, tags, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Problem, 'id'>>({
    title: '',
    description: '',
    difficulty: 'Easy',
    tags: [],
    examples: [],
  });

  useEffect(() => {
    if (problem) {
      setFormData({
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty,
        tags: problem.tags,
        examples: problem.examples,
      });
    }
  }, [problem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const addExample = () => {
    setFormData(prev => ({
      ...prev,
      examples: [
        ...prev.examples,
        { input: '', output: '', explanation: '' }
      ]
    }));
  };

  const removeExample = (index: number) => {
    setFormData(prev => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index)
    }));
  };

  const updateExample = (index: number, field: keyof Example, value: string) => {
    setFormData(prev => ({
      ...prev,
      examples: prev.examples.map((example, i) => 
        i === index ? { ...example, [field]: value } : example
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">
            {problem ? 'Редактирование задачи' : 'Создание новой задачи'}
          </h2>

          <div className="mb-3">
            <label className="form-label">Название</label>
            <input
              type="text"
              className="form-control"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Описание</label>
            <textarea
              className="form-control"
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Сложность</label>
            <select
              className="form-select"
              value={formData.difficulty}
              onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
            >
              <option value="Easy">Легкая</option>
              <option value="Medium">Средняя</option>
              <option value="Hard">Сложная</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Теги</label>
            <div className="d-flex flex-wrap gap-2">
              {tags.map(tag => (
                <div key={tag.id} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`tag-${tag.id}`}
                    checked={formData.tags.some(t => t.id === tag.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          tags: [...prev.tags, tag]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          tags: prev.tags.filter(t => t.id !== tag.id)
                        }));
                      }
                    }}
                  />
                  <label className="form-check-label" htmlFor={`tag-${tag.id}`}>
                    {tag.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <label className="form-label">Примеры</label>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={addExample}
              >
                Добавить пример
              </button>
            </div>
            {formData.examples.map((example, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="card-subtitle mb-2">Пример {index + 1}</h6>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeExample(index)}
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
                      onChange={(e) => updateExample(index, 'input', e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Выходные данные</label>
                    <input
                      type="text"
                      className="form-control"
                      value={example.output}
                      onChange={(e) => updateExample(index, 'output', e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Объяснение</label>
                    <textarea
                      className="form-control"
                      value={example.explanation}
                      onChange={(e) => updateExample(index, 'explanation', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {problem ? 'Сохранить' : 'Создать'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Отмена
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProblemForm; 