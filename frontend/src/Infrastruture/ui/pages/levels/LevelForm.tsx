import React, { useState, useEffect } from 'react';
import { Button, Input } from '../../components';
import type { Level } from '../../../../Core/Models/Level';
import { LevelService } from '../../../../Core/Services/LevelService';
import { ApiLevelRepository } from '../../../api/ApiLevelRepository';

interface LevelFormProps {
  level?: Level | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const LevelForm: React.FC<LevelFormProps> = ({ level, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const levelService = new LevelService(new ApiLevelRepository());

  useEffect(() => {
    if (level) {
      setName(level.name);
    } else {
      setName('');
    }
    setErrors({});
  }, [level]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      if (level) {
        await levelService.updateLevel(level.id, { name: name.trim() });
      } else {
        await levelService.createLevel({ name: name.trim() });
      }

      onSubmit();
    } catch (err: any) {
      if (err.message) {
        setErrors({ general: err.message });
      } else {
        setErrors({ general: 'Erro ao salvar nível' });
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{errors.general}</p>
        </div>
      )}

      <Input
        label="Nome"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite o nome do nível"
        required
        error={errors.name}
        disabled={loading}
      />

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Salvando...' : level ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </form>
  );
};

export default LevelForm;
