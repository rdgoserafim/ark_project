import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Loading } from '../../components';
import type { TableColumn } from '../../components';
import type { Level } from '../../../../Core/Models/Level';
import { LevelService } from '../../../../Core/Services/LevelService';
import { ApiLevelRepository } from '../../../api/ApiLevelRepository';
import LevelForm from './LevelForm';

const LevelList: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLevel, setEditingLevel] = useState<Level | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const levelService = new LevelService(new ApiLevelRepository());

  const loadLevels = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await levelService.getAllLevels();
      setLevels(data);
    } catch (err) {
      setError('Erro ao carregar níveis');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLevels();
  }, []);

  const handleCreate = () => {
    setEditingLevel(null);
    setIsModalOpen(true);
  };

  const handleEdit = (level: Level) => {
    setEditingLevel(level);
    setIsModalOpen(true);
  };

  const handleDelete = async (level: Level) => {
    if (!window.confirm(`Tem certeza que deseja excluir o nível "${level.name}"?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      await levelService.deleteLevel(level.id);
      await loadLevels();
    } catch (err) {
      setError('Erro ao excluir nível');
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormSubmit = async () => {
    setIsModalOpen(false);
    await loadLevels();
  };

  const columns: TableColumn<Level>[] = [
    {
      key: 'id',
      label: 'ID',
      className: 'w-20',
    },
    {
      key: 'name',
      label: 'Nome',
    },
    {
      key: 'created_at',
      label: 'Criado em',
      render: (value) => value ? new Date(value).toLocaleDateString('pt-BR') : '-',
    },
    {
      key: 'actions',
      label: 'Ações',
      className: 'w-40',
      render: (_, level) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleEdit(level)}
          >
            Editar
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(level)}
            disabled={isDeleting}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <Loading text="Carregando níveis..." />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Níveis</h1>
        <Button onClick={handleCreate}>
          Novo Nível
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <Table
          data={levels}
          columns={columns}
          emptyMessage="Nenhum nível cadastrado"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingLevel ? 'Editar Nível' : 'Novo Nível'}
        size="md"
      >
        <LevelForm
          level={editingLevel}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default LevelList;
