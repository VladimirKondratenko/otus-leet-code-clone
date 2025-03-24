import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tag, Table } from 'antd';
import { fetchProblems } from '../../store/slices/problemsSlice';
import { RootState } from '../../store';
import { Problem } from '../../models/problem';
import { TagSelector } from '../TagSelector/TagSelector';

export const ProblemsList: React.FC = () => {
  const dispatch = useDispatch();
  const { items: problems, loading } = useSelector((state: RootState) => state.problems);

  useEffect(() => {
    dispatch(fetchProblems());
  }, [dispatch]);

  const handleAddTag = async (problemId: number, tagIds: number[]) => {
    try {
      await fetch(`/api/problems/${problemId}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tagIds }),
      });
      dispatch(fetchProblems());
    } catch (error) {
      console.error('Error adding tags:', error);
    }
  };

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Problem) => (
        <Link to={`/problems/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Сложность',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (difficulty: string) => (
        <Tag color={
          difficulty === 'Easy' ? 'green' :
          difficulty === 'Medium' ? 'orange' : 'red'
        }>
          {difficulty}
        </Tag>
      ),
    },
    {
      title: 'Теги',
      key: 'tags',
      render: (record: Problem) => (
        <TagSelector
          value={record.tags.map(tag => tag.id)}
          onChange={(value) => handleAddTag(record.id, value)}
          style={{ width: '100%' }}
        />
      ),
    },
  ];

  return (
    <div>
      <h1>Список задач</h1>
      <Table
        columns={columns}
        dataSource={problems}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}; 