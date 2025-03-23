import React, { memo, useCallback, useMemo } from 'react';
import ProblemBasicInfo from './ProblemBasicInfo';
import ExampleForm from './ExampleForm';
import TagSelector from './TagSelector';

interface Example {
  input: string;
  output: string;
  explanation: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Problem {
  id?: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: Tag[];
  examples: Example[];
}

interface ProblemFormProps {
  problem?: Problem;
  tags: Tag[];
  onSubmit: (data: Omit<Problem, 'id'>) => Promise<void>;
  onCancel: () => void;
}

const ProblemForm: React.FC<ProblemFormProps> = memo(({
  problem,
  tags,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = React.useState<Omit<Problem, 'id'>>({
    title: '',
    description: '',
    difficulty: 'Easy',
    tags: [],
    examples: [],
    ...problem
  });

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  }, [formData, onSubmit]);

  const handleBasicInfoChange = useCallback((field: 'title' | 'description' | 'difficulty', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleTagChange = useCallback((tag: Tag, isChecked: boolean) => {
    setFormData(prev => ({
      ...prev,
      tags: isChecked
        ? [...prev.tags, tag]
        : prev.tags.filter(t => t.id !== tag.id)
    }));
  }, []);

  const addExample = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      examples: [
        ...prev.examples,
        { input: '', output: '', explanation: '' }
      ]
    }));
  }, []);

  const removeExample = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index)
    }));
  }, []);

  const updateExample = useCallback((index: number, field: keyof Example, value: string) => {
    setFormData(prev => ({
      ...prev,
      examples: prev.examples.map((example, i) => 
        i === index ? { ...example, [field]: value } : example
      )
    }));
  }, []);

  const selectedTags = useMemo(() => 
    tags.filter(tag => formData.tags.some(t => t.id === tag.id)),
    [tags, formData.tags]
  );

  const availableTags = useMemo(() => 
    tags.filter(tag => !formData.tags.some(t => t.id === tag.id)),
    [tags, formData.tags]
  );

  const formTitle = useMemo(() => 
    problem ? 'Редактирование задачи' : 'Создание новой задачи',
    [problem]
  );

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">{formTitle}</h2>

          <ProblemBasicInfo
            title={formData.title}
            description={formData.description}
            difficulty={formData.difficulty}
            onChange={handleBasicInfoChange}
          />

          <TagSelector
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagSelect={handleTagChange}
          />

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
              <ExampleForm
                key={index}
                example={example}
                index={index}
                onUpdate={updateExample}
                onRemove={removeExample}
              />
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
});

ProblemForm.displayName = 'ProblemForm';

export default ProblemForm; 