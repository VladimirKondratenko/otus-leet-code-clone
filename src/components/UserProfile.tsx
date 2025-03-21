import React, { useState } from 'react';
import { User } from '../types';

interface UserProfileProps {
  user: User;
  onUpdateRating: (userId: number, newRating: number) => Promise<void>;
  isAdmin?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateRating, isAdmin = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newRating, setNewRating] = useState(user.rating);
  const [error, setError] = useState<string>('');

  const handleRatingUpdate = async () => {
    try {
      await onUpdateRating(user.id, newRating);
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError('Ошибка при обновлении рейтинга');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="card-title">Профиль пользователя</h2>
            {isAdmin && (
              <button
                className="btn btn-outline-primary"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Отмена' : 'Редактировать'}
              </button>
            )}
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={user.email}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Имя пользователя</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.username}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Роль</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.role}
                  disabled
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Рейтинг</label>
                {isEditing ? (
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handleRatingUpdate}
                    >
                      Сохранить
                    </button>
                  </div>
                ) : (
                  <input
                    type="number"
                    className="form-control"
                    value={user.rating}
                    disabled
                  />
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Решенные задачи</label>
                <input
                  type="number"
                  className="form-control"
                  value={user.solvedProblems}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Статус</label>
                <input
                  type="text"
                  className={`form-control ${
                    user.isBlocked ? 'text-danger' : 'text-success'
                  }`}
                  value={user.isBlocked ? 'Заблокирован' : 'Активен'}
                  disabled
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger mt-3">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 