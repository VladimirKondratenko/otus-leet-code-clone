import React, { memo, useCallback } from 'react';

interface Tag {
  id: number;
  name: string;
}

interface TagSelectorProps {
  availableTags: Tag[];
  selectedTags: Tag[];
  onTagSelect: (tag: Tag, isChecked: boolean) => void;
}

const TagSelector: React.FC<TagSelectorProps> = memo(({
  availableTags,
  selectedTags,
  onTagSelect
}) => {
  const handleTagChange = useCallback((tag: Tag, isChecked: boolean) => {
    onTagSelect(tag, isChecked);
  }, [onTagSelect]);

  const renderTag = useCallback((tag: Tag, isSelected: boolean) => (
    <div key={tag.id} className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={`tag-${tag.id}`}
        checked={isSelected}
        onChange={(e) => handleTagChange(tag, e.target.checked)}
      />
      <label className="form-check-label" htmlFor={`tag-${tag.id}`}>
        {tag.name}
      </label>
    </div>
  ), [handleTagChange]);

  return (
    <div className="mb-3">
      <label className="form-label">Теги</label>
      <div className="d-flex flex-wrap gap-2">
        {availableTags.map(tag => renderTag(tag, false))}
        {selectedTags.map(tag => renderTag(tag, true))}
      </div>
    </div>
  );
});

TagSelector.displayName = 'TagSelector';

export default TagSelector; 