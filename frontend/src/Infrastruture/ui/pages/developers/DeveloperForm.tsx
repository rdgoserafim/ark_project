import React, { useState, useEffect } from 'react';
import { Button, Input, Select } from '../../components';
import type { SelectOption } from '../../components';
import type { Developer } from '../../../../Core/Models/Developer';
import type { Level } from '../../../../Core/Models/Level';
import { DeveloperService } from '../../../../Core/Services/DeveloperService';
import { LevelService } from '../../../../Core/Services/LevelService';
import { ApiDeveloperRepository } from '../../../api/ApiDeveloperRepository';
import { ApiLevelRepository } from '../../../api/ApiLevelRepository';

interface DeveloperFormProps {
  developer?: Developer | null;
  onSubmit: () => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  sexo: string;
  data_nascimento: string;
  hobby: string;
  level_id: string;
}

const DeveloperForm: React.FC<DeveloperFormProps> = ({ developer, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    sexo: '',
    data_nascimento: '',
    hobby: '',
    level_id: '',
  });
  const [levels, setLevels] = useState<Level[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingLevels, setLoadingLevels] = useState(true);

  const developerService = new DeveloperService(new ApiDeveloperRepository());
  const levelService = new LevelService(new ApiLevelRepository());

  useEffect(() => {
    loadLevels();
  }, []);

  useEffect(() => {
    if (developer) {
      setFormData({
        name: developer.name,
        sexo: developer.sexo,
        data_nascimento: developer.data_nascimento,
        hobby: developer.hobby,
        level_id: developer.level_id.toString(),
      });
    } else {
      setFormData({
        name: '',
        sexo: '',
        data_nascimento: '',
        hobby: '',
        level_id: '',
      });
    }
    setErrors({});
  }, [developer]);

  const loadLevels = async () => {
    try {
      setLoadingLevels(true);
      const data = await levelService.getAllLevels();
      setLevels(data);
    } catch (err) {
      console.error('Erro ao carregar níveis:', err);
    } finally {
      setLoadingLevels(false);
    }
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.sexo) {
      newErrors.sexo = 'Sexo é obrigatório';
    }

    if (!formData.data_nascimento) {
      newErrors.data_nascimento = 'Data de nascimento é obrigatória';
    } else {
      const birthDate = new Date(formData.data_nascimento);
      const today = new Date();
      if (birthDate >= today) {
        newErrors.data_nascimento = 'Data de nascimento deve ser anterior à data atual';
      }
    }

    if (!formData.hobby.trim()) {
      newErrors.hobby = 'Hobby é obrigatório';
    }

    if (!formData.level_id) {
      newErrors.level_id = 'Nível é obrigatório';
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

      const developerData = {
        name: formData.name.trim(),
        sexo: formData.sexo,
        data_nascimento: formData.data_nascimento,
        hobby: formData.hobby.trim(),
        level_id: parseInt(formData.level_id, 10),
      };

      if (developer) {
        await developerService.updateDeveloper(developer.id, developerData);
      } else {
        await developerService.createDeveloper(developerData);
      }

      onSubmit();
    } catch (err: any) {
      if (err.message) {
        setErrors({ general: err.message });
      } else {
        setErrors({ general: 'Erro ao salvar desenvolvedor' });
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sexoOptions: SelectOption[] = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Feminino' },
  ];

  const levelOptions: SelectOption[] = levels.map(level => ({
    value: level.id,
    label: level.name,
  }));

  if (loadingLevels) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{errors.general}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleInputChange('name')}
          placeholder="Digite o nome completo"
          required
          error={errors.name}
          disabled={loading}
        />

        <Select
          label="Sexo"
          name="sexo"
          value={formData.sexo}
          onChange={handleInputChange('sexo')}
          options={sexoOptions}
          placeholder="Selecione o sexo"
          required
          error={errors.sexo}
          disabled={loading}
        />

        <Input
          label="Data de Nascimento"
          name="data_nascimento"
          type="date"
          value={formData.data_nascimento}
          onChange={handleInputChange('data_nascimento')}
          required
          error={errors.data_nascimento}
          disabled={loading}
        />

        <Select
          label="Nível"
          name="level_id"
          value={formData.level_id}
          onChange={handleInputChange('level_id')}
          options={levelOptions}
          placeholder="Selecione o nível"
          required
          error={errors.level_id}
          disabled={loading}
        />
      </div>

      <Input
        label="Hobby"
        name="hobby"
        value={formData.hobby}
        onChange={handleInputChange('hobby')}
        placeholder="Digite o hobby favorito"
        required
        error={errors.hobby}
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
          {loading ? 'Salvando...' : developer ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </form>
  );
};

export default DeveloperForm;
