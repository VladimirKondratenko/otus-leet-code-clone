import React, { useEffect } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags } from '../../store/slices/tagsSlice';
import { RootState } from '../../store';
import { Tag } from '../../models/tag';

const { Option } = Select;

interface TagSelectorProps {
  value?: number[];
  onChange?: (value: number[]) => void;
  style?: React.CSSProperties;
}

export const TagSelector: React.FC<TagSelectorProps> = ({ value, onChange, style }) => {
  const dispatch = useDispatch();
  const { items: tags, loading } = useSelector((state: RootState) => state.tags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <Select
      mode="multiple"
      placeholder="Выберите теги"
      value={value}
      onChange={onChange}
      loading={loading}
      style={style}
    >
      {tags.map(tag => (
        <Option key={tag.id} value={tag.id}>{tag.name}</Option>
      ))}
    </Select>
  );
}; 