import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, InputNumber, Button } from 'antd';
import { User } from '../../models/user';

export const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRatingChange = async (userId: number, newRating: number) => {
    try {
      await fetch(`/api/users/${userId}/rating`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: newRating }),
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const columns = [
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
      render: (text: string, record: User) => (
        <Link to={`/users/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Рейтинг',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number, record: User) => (
        <InputNumber
          value={rating}
          onChange={(value) => handleRatingChange(record.id, value || 0)}
          min={0}
        />
      ),
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return (
    <div>
      <h1>Список пользователей</h1>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}; 