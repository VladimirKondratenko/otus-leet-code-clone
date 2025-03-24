import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProblemsList } from './components/ProblemsList/ProblemsList';
import { UsersList } from './components/UsersList/UsersList';
import { Layout } from './components/Layout/Layout';

export const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/problems" element={<ProblemsList />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Layout>
  );
}; 