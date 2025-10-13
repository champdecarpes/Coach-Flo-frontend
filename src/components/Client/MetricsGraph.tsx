import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchMetric } from '@/features/metrics/metricSlice';

// Регистрация модулей Chart.js
Chart.register(...registerables);

// Список доступных метрик для выбора
const availableMetrics = [
  { key: 'weight', label: 'Weight (kg)' },
  { key: 'body_fat', label: 'Body Fat (%)' },
  { key: 'body_fat_mass', label: 'Body Fat Mass' },
  { key: 'lean_body_mass', label: 'Lean Body Mass' },
  { key: 'chest', label: 'Chest Circumference' },
  { key: 'shoulder', label: 'Shoulder Circumference' },
  { key: 'waist', label: 'Waist Circumference' },
  { key: 'resting_heart_rate', label: 'Resting Heart Rate' },
  { key: 'thigh_left', label: 'Left Thigh' },
  { key: 'thigh_right', label: 'Right Thigh' },
  { key: 'hip', label: 'Hip Circumference' },
  { key: 'calf_left', label: 'Left Calf' },
  { key: 'calf_right', label: 'Right Calf' },
  { key: 'height', label: 'Height' },
  { key: 'bicep_left', label: 'Left Bicep' },
  { key: 'bicep_right', label: 'Right Bicep' },
  { key: 'steps', label: 'Steps' },
  { key: 'sleep', label: 'Sleep (h)' },
];

// Возможные типы графиков
const chartTypes = [
  { value: 'line', label: 'Line' },
  { value: 'bar', label: 'Bar' },
];

export default function MetricsGraph() {
  const dispatch = useAppDispatch();
  const metricsData = useAppSelector((state) => state.metrics.data);
  const loading = useAppSelector((state) => state.metrics.loading);
  const error = useAppSelector((state) => state.metrics.error);

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['weight']);
  const [chartType, setChartType] = useState<string>('line');

  // Загружаем данные для каждой выбранной метрики
  useEffect(() => {
    selectedMetrics.forEach((metric) => {
      dispatch(fetchMetric({ metric }));
    });
  }, [dispatch, selectedMetrics]);

  // Обработчик выбора метрик
  const handleMetricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
    setSelectedMetrics(selected);
  };

  // Обработчик выбора типа графика
  const handleChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(e.target.value);
  };

  // Формирование данных для Chart.js: первая метрика задаёт ось X
  const chartData = {
    labels:
      metricsData[selectedMetrics[0]]?.map((pt) =>
        new Date(pt.timestamp).toLocaleDateString()
      ) || [],
    datasets: selectedMetrics.map((metric) => ({
      label: availableMetrics.find((m) => m.key === metric)?.label || metric,
      data: metricsData[metric]?.map((pt) => pt.value) || [],
      fill: false,
    })),
  };

  // Общие настройки графика
  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'nearest' as const,
      intersect: false,
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  // Выбираем компонент графика в зависимости от типа
  const ChartComponent = chartType === 'bar' ? Bar : Line;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Metrics Over Time</h2>
      <div className="mb-4 flex flex-wrap space-x-4">
        <div className="flex flex-col mr-4">
          <label className="mb-2 font-medium">Select Metrics</label>
          <select
            multiple
            value={selectedMetrics}
            onChange={handleMetricChange}
            className="border p-2 rounded w-56 h-40"
          >
            {availableMetrics.map((metric) => (
              <option key={metric.key} value={metric.key}>
                {metric.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Chart Type</label>
          <select
            value={chartType}
            onChange={handleChartTypeChange}
            className="border p-2 rounded"
          >
            {chartTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && (
        <div className="bg-white p-4 rounded shadow">
          <ChartComponent data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}
