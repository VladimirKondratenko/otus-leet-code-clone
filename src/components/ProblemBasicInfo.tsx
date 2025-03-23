import React, { memo, useCallback } from 'react';

interface ProblemBasicInfoProps {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onChange: (field: 'title' | 'description' | 'difficulty', value: string) => void;
}

const ProblemBasicInfo: React.FC<ProblemBasicInfoProps> = memo(({
  title,
  description,
  difficulty,
  onChange
}) => {
  const handleChange = useCallback((field: 'title' | 'description' | 'difficulty') => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    onChange(field, e.target.value);
  }, [onChange]);

  return (
    <>
      <div className="mb-3">
        <label className="form-label">Название</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={handleChange('title')}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Описание</label>
        <textarea
          className="form-control"
          value={description}
          onChange={handleChange('description')}
          rows={4}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Сложность</label>
        <select
          className="form-select"
          value={difficulty}
          onChange={handleChange('difficulty')}
          required
        >
          <option value="Easy">Легкая</option>
          <option value="Medium">Средняя</option>
          <option value="Hard">Сложная</option>
        </select>
      </div>
    </>
  );
});

ProblemBasicInfo.displayName = 'ProblemBasicInfo';

export default ProblemBasicInfo; 