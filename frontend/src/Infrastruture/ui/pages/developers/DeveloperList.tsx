import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Loading } from '../../components';
import type { TableColumn } from '../../components';
import type { Developer } from '../../../../Core/Models/Developer';
import { DeveloperService } from '../../../../Core/Services/DeveloperService';
import { ApiDeveloperRepository } from '../../../api/ApiDeveloperRepository';
import DeveloperForm from './DeveloperForm';

const DeveloperList: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const developerService = new DeveloperService(new ApiDeveloperRepository());

  const loadDevelopers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await developerService.getAllDevelopers();
      setDevelopers(data);
    } catch (err) {
      setError('Erro ao carregar desenvolvedores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevelopers();
  }, []);

  const handleCreate = () => {
    setEditingDeveloper(null);
    setIsModalOpen(true);
  };

  const handleEdit = (developer: Developer) => {
    setEditingDeveloper(developer);
    setIsModalOpen(true);
  };

  const handleDelete = async (developer: Developer) => {
    if (!window.confirm(`Tem certeza que deseja excluir o desenvolvedor "${developer.name}"?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      await developerService.deleteDeveloper(developer.id);
      await loadDevelopers();
    } catch (err) {
      setError('Erro ao excluir desenvolvedor');
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormSubmit = async () => {
    setIsModalOpen(false);
    await loadDevelopers();
  };

  const columns: TableColumn<Developer>[] = [
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
      key: 'sexo',
      label: 'Sexo',
      render: (value: string) => value === 'M' ? 'Masculino' : 'Feminino',
    },
    {
      key: 'data_nascimento',
      label: 'Data de Nascimento',
      render: (value: string) => {
        if (!value) return '-';
        // Extrai apenas a parte da data (YYYY-MM-DD) para evitar problemas de timezone
        const dateOnly = value;
        const [year, month, day] = dateOnly.split('-');
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString('pt-BR');
      },
    },
    {
      key: 'hobby',
      label: 'Hobby',
    },
    {
      key: 'level.name',
      label: 'Nível',
      render: (_, developer: Developer) => developer.level?.name || '-',
    },
    {
      key: 'actions',
      label: 'Ações',
      className: 'w-40',
      render: (_, developer: Developer) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleEdit(developer)}
          >
            Editar
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(developer)}
            disabled={isDeleting}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <Loading text="Carregando desenvolvedores..." />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Desenvolvedores</h1>
        <Button onClick={handleCreate}>
          Novo Desenvolvedor
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <Table
          data={developers}
          columns={columns}
          emptyMessage="Nenhum desenvolvedor cadastrado"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDeveloper ? 'Editar Desenvolvedor' : 'Novo Desenvolvedor'}
        size="lg"
      >
        <DeveloperForm
          developer={editingDeveloper}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default DeveloperList;
